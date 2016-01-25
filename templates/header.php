<header class="banner">

    <a class="site-title" href="<?= esc_url(home_url('/')); ?>"><?php bloginfo('name'); ?></a>
    
    <button class="hidden-md-up mobile-nav-button" type="button">
      &#9776;
    </button>

    <?php get_search_form(); ?>

</header>
