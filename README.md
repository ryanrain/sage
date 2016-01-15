Forked from the Bootstrap 4 branch of [https://github.com/roots/sage](Sage), a WordPress starter theme based on HTML5 Boilerplate, gulp, Bower, and Bootstrap Sass, that will help you make better themes.

This developer starter theme is a little more opinionated than Sage in order to save time on common initial tasks (such as building a mobile header), with extra focus on best practices to speed up mobile performance. 

Changes made to Sage original:
 - Added a mobile header with mobile menu and search.
 - Restored the Bootstrap dropdown with a v4 walker.
 - Greatly simplified the gulpfile. Cut the number of node modules in half. 
 - Ready-to-use responsive javascript workflow that let's you quickly enable conditional loading of additional javascript on screens above a specified breakpoint. 
 - No jQuery on mobile. Mobile menu uses [https://github.com/viljamis/responsive-nav.js](Responsive Menu) rather than jQuery-dependent bootstrap js. Why? [http://modernweb.com/2014/03/10/is-jquery-too-big-for-mobile/#soisjquerytoobig](1)