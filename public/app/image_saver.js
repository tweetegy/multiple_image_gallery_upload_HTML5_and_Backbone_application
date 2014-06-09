$(document).ready(function() {

    window.Image = Backbone.Model.extend({
	defaults: {
	    "filename": "preview.png",
	    "data": "img/preview.png"
	}	
    });

    window.Gallery = Backbone.Collection.extend({
	model: Image,
	url: "/images",

	setFromFiles: function(files) {
	    this.reset();
	    self = this;

	    console.log(self);

	    for (var i = 0, f; f = files[i]; i++) {
		var reader = new FileReader();

		reader.onload = (function(theFile, theId) {
		    return function(e) {
			image = new window.Image();
			image.set({id: theId})
			image.set({filename: theFile.name});
			image.set({data: e.target.result});
			self.add(image);
		    };
		})(f);

		reader.readAsDataURL(f,i);
	    }
	}
    });

    window.ImageView = Backbone.View.extend({
	tagName: 'span',
	template: _.template($("#image-template").html()),

	initialize: function() {
	    _.bindAll(this, 'render');
	},

	render: function() {
	    $(this.el).html(this.template(this.model.toJSON()));
	    return this; 
	}
    });

    window.ImageSelectionView = Backbone.View.extend({
	events: {
	    'change #myGallery': 'dispatchUpdateGalleryPreview',
	    'click #saveGallery': 'dispatchSaveGallery'
	},

	template: _.template($("#gallery-selection-template").html()),

	initialize: function() {
	    _.bindAll(this, 'render');
	},

	render: function() {
	    $(this.el).html(this.template({}));
	    return this;   
	},

	dispatchSaveGallery: function() {
	    Backbone.sync("create", this.collection);
	},

	dispatchUpdateGalleryPreview: function(e) {
	    this.collection.setFromFiles(e.target.files);
	}
    });

    window.GalleryView = Backbone.View.extend({
	template: _.template($("#gallery-template").html()),

	initialize: function() {
	    _.bindAll(this, 'render');
	    this.collection.bind('add', this.render);
	},

	render: function(){
	    var $images,
            collection = this.collection;

            $(this.el).html(this.template({}));
            $images = this.$("#thumbnails");
            this.collection.each(function(image) {
                var view = new ImageView({
                    model: image,
                    collection: collection
                });
                $images.append(view.render().el);
            });

            return this;
	}
    });

    window.ImageGalleryRouter = Backbone.Router.extend({
	routes: {
	    '': 'home'
	},

	home: function(){
	    $('#container').empty();     
 	    $('#container').append(window.galleryView.render().el);  
	    $('#container').append(window.imageSelectionView.render().el);  
	}
    });

});