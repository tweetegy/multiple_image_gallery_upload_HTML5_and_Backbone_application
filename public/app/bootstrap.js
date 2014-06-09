(function($) {

    $(document).ready(function() {

	window.defaultImage = new Image();
	window.defaultGallery = new Gallery({collection: [window.defaultImage]});

	window.galleryView = new GalleryView({collection: window.defaultGallery});
	window.imageSelectionView = new ImageSelectionView({collection: window.defaultGallery});

	window.App = new ImageGalleryRouter();
	Backbone.history.start();
	
    });

})(jQuery);
