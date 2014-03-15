imgr
====

This is jquery plugin to load images as a background image or normal image element. It is mobile optimised so it is compatible with almost every device out there.

####How it works?
The plugin checks the position of an image or a div (to be loaded as background image) once on every touchmove (for touch devices) or mousewheel(non touch devices) event with respect to the window or the visual viewport. If the element is within that bounds it loads that image. 


####How to use it?
The usage is pretty simple 
1. An image element or an element with background image must be assigned a class "imgr" with its data-src attribute set to the url of the image.
2. In your javascript you can call the plugin in two ways.
```
$("rootSelector").imgr(options) OR $.imgr(options)
//rootSelector is the rootContainer selector where all your elements to be loaded are present.
```

####Configurational parameters.
1. atOnce - (default-false) set to true if you dont want all images to be loaded at once and not on scroll.
2. margin - (default-50) This is the margin while checking if the element is visible on screen. For e.g if margin is set to 200 the element will be assumed to be visible 200px before its actually on the screen 
3. fadeIn - (default-true) whether to fade in the images when they are loaded or not.
 
```
//an example options object
$(".container").imgr({
	margin:0,
	fadeIn:false 
});
