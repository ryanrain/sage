// http://youmightnotneedjquery.com/#ready
function ready(fn) {
  if (document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
} 

// Fires if the screen width is more than the "md" breakpoint defined in the css.
function largeScreens(){
  var hiddenMdUp = document.querySelector('.hidden-md-up');
  if (window.getComputedStyle(hiddenMdUp, null).getPropertyValue("display") === "none"){
    // action to take for larger screens
    console.log(hiddenMdUp);
  }
}


ready(function(){

  var slideout = new Slideout({
    'panel': document.querySelector('.wrap'),
    'menu': document.getElementById('primary-nav-container'),
    'padding': 256,
    'tolerance': 70
  });

  // Toggle button
  document.querySelector('.mobile-nav-button').addEventListener('click', function() {
    slideout.toggle();
  });

  // close menu upon resize

  largeScreens();
}); 

