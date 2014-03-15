imgr
====

imgr is a lightweight mobile optimised jquery plugin to lazy load images as a background image or normal image element. The default behavior is to load images as user scrolls on the screen and element becomes

####How it works?
The plugin checks the position of an image or a div (to be loaded as background image) once on every touchmove (for touch devices) or mousewheel(non touch devices) event with respect to the window or the visual viewport. If the element is within that bounds it loads that image.


####How to use it?.

1. An image element or an element with background image must be assigned a class "imgr" with its data-src attribute set to the url of the image.
```
<img class='imgr' data-src='imageurl'/>
	OR
<div class='imgr' data-src='imageurl'>Background image</div>
```
2. In your javascript you can call the plugin in two ways.
```
$("rootSelector").imgr(options) 
//rootSelector is the rootContainer selector where all your elements to be loaded are present.
//Pass empty string for default body to be picked up.
```

####Configurational parameters.
1. atOnce - (default-false) set to true if you want all the images to be loaded at once and not on scroll.
2. margin - (default-50) Margin used while checking if the element is visible on screen. For e.g if margin is set to 200 the element is assumed to be visible 200px before its actually on the screen.
3. fadeIn - (default-true) whether to fade in the images or not when they are loaded.
 
```
//an example options object
$(".container").imgr({
	margin:0,
	fadeIn:false 
});
```

####Demos
1. Vertical scroll lazy loading  - demos/demo1
2. Horizontal scroll lazy loading  - demos/demo1

####Stages of image load
You can use the class applied to image element at different stages to control the styling of the images.

1. When the plugin is called and the image is not loaded yet. Class "imgrr" is applied to the image element.
2. When the image is loaded (once its visible on screen). Class "imgrr" is removed and "imgrrd" is applied to the element.

####Installing and Building
 The dependencies and build is managed through grunt and you can use following steps to locally run grunt.
 
1. Clone the git project
2. run - npm install (installs npm dependencies)
3. run - grunt (runs jshint,cleans and builds the files under dist/).
