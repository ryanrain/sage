// http://youmightnotneedjquery.com/#ready
function ready(fn) {
  if (document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
} 

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) { func.apply(context, args); }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) { func.apply(context, args); }
  };
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
  var closeSlideout = debounce(function() {
    slideout.close();
  }, 500, true);

  window.addEventListener('resize', closeSlideout);

  largeScreens();
}); 

