<header class="banner">
  <div class="container">

    <div class="navbar-header">
      
      <button class="navbar-toggler hidden-md-up" type="button" data-toggle="collapse" data-target="#primary-nav">
        &#9776;
      </button>
      
      <a class="navbar-brand" href="<?= esc_url(home_url('/')); ?>"><?php bloginfo('name'); ?></a>

    </div>

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

  </div>
</header>
