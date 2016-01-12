<header class="banner">
  <div class="container-fluid">

    <a class="site-title" href="<?= esc_url(home_url('/')); ?>"><?php bloginfo('name'); ?></a>
    
    <button class="navbar-toggler hidden-md-up" type="button" data-toggle="collapse" data-target="#primary-nav">
      &#9776;
    </button>

    <nav class="collapse navbar-toggleable-sm" role="navigation" id="primary-nav">
      <?php      
      if (has_nav_menu('primary_navigation')) :
        wp_nav_menu([
          'theme_location' => 'primary_navigation', 
          'walker' => new wp_bootstrap_navwalker(), 
          'menu_class' => 'nav navbar-nav'
        ]);
      endif;
      ?>
    </nav>

    <?php get_search_form(); ?>

  </div>
</header>
