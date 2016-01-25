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

var loadScript = function(script, cb){

  var scr = document.createElement('script');
  scr.src = script;

  if(scr.readyState){
    scr.onreadystatechange = function(){
        if(scr.readyState === 'complete' || scr.readyState === 'loaded'){
           scr.onreadystatechange = null;
           if(cb === 'function'){
              args = [].slice.call(arguments, 1);
              cb.apply(this, args);
           }
        }
    };
  }
  else {
    scr.onload = function(){
       if(cb === 'function'){
          args = [].slice.call(arguments, 1);
          cb.apply(this, args);
       }
    };
  }

  var head = document.getElementsByTagName('head')[0];
  head.insertBefore(scr, head.firstChild);  
};

// Fires if the screen width is more than the "md" breakpoint defined in the css.
function loadLargeScreenJs(){
  var hiddenMdUp = document.querySelector('.hidden-md-up');
  if (window.getComputedStyle(hiddenMdUp, null).getPropertyValue("display") === "none"){
    loadScript(sage.templateUrl + '/dist/scripts/large-screen.js');
  }
}


ready(function(){

  // Initiate Slideout mobile menu https://github.com/mango/slideout
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

  // conditionally load largeScreen js file upon initial page load
  loadLargeScreenJs();

  // Resize tasks: close the slideout menu, and load the larger screen js if necessary
  var resizeLayout = debounce(function() {
    slideout.close();
    if (typeof largeScreenLoaded === 'undefined') {
      loadLargeScreenJs();
    }
  }, 100, true);
  window.addEventListener('resize', resizeLayout);

}); 

