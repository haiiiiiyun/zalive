(function($){
  $(function(){
    //object zAlive_i18n (contains all text string for translation) is defined in wp_localize_script(in functions.php )

    // top nav
    var menuItems = $('.menu-item-has-children'),
        isMobile = $('body').hasClass('is-mobile');
    if(isMobile){
      var nav = $('.navbar .nav'),
          searchbox = $('#searchbox'),
          navHeight,
          navHeight_initial,
          searchboxHeight = searchbox.outerHeight(),
          searchboxPadding = 10,
          translateElements = $('body').children(':not(#header,#wpadminbar,script,style)') ;
      navHeight_initial = navHeight = nav.height();
      nav.height(0).addClass('triggered');
      searchbox.css({'height':0,'padding':0});
      $('.mobile-mark .mobile-item').on('touchend',function(){
        $(this).toggleClass('active');
      });
      $('.mobile-mark .mobile-item-search').on('touchend',function(){
        searchbox.toggleClass('active');
        if($(this).hasClass('active')){
          if(nav.hasClass('active')){
            $('.mobile-mark .mobile-item-nav').trigger('touchend');
          }
          searchbox.transition({height:searchboxHeight,padding:searchboxPadding},200,'out');
          translateElements.transition({y:searchboxHeight + searchboxPadding*2 },200,'out');
          $('#s').focus();
        }else{
          searchbox.transition({height:0,padding:0},200,'out');
          translateElements.transition({y:0 },200,'out');
        }
      });
      $('.mobile-mark .mobile-item-nav').on('touchend',function(){
        nav.toggleClass('active');
        menuItems.removeClass('active');
        if(nav.hasClass('active')){
          if(searchbox.hasClass('active')){
            $('.mobile-mark .mobile-item-search').trigger('touchend');
          }
          nav.transition({height:navHeight_initial},200,'out');
          translateElements.transition({y:navHeight_initial},200,'out');
          navHeight = navHeight_initial;
        }else{
          nav.transition({height:0},200,'out');
          translateElements.transition({y:0},200,'out');
        }
      });
      menuItems.each(function(){
        var _this = $(this); 
            aTag = _this.children('a');
        aTag.on('touchend',function(e){
          if(!_this.hasClass('active')){
            navHeight += _this.children('.sub-menu').height();
            nav.transition({height:navHeight},200,'out');
            translateElements.transition({y:navHeight},200);
            e.preventDefault();
            _this.toggleClass('active');
          }
        });
      });
    }else{
      menuItems.each(function(i){
        var _this = $(this);
        _this.hover(function(){
          _this.toggleClass('active');
        });
      });
    }
    
    //show site tagline(description) if it's hidden by option 
    if( $('.tagline-hidden').length != 0 ){
      $('#header .brand').hover(function(){
        $('.tagline-hidden').animate({'top':'+=35'});
      },function(){
        $('.tagline-hidden').animate({'top':'-=35'});
      });
    }
    
    //slider
    if($('#zSlider').length != 0){
      $('#zSlider').carousel({interval: parseInt(zAlive_i18n.slider_pause_time) }).bind('slid',function(){
        $('#zSlider .description li.active').removeClass('active');
        $('#zSlider .description li:eq(' + $('#zSlider .carousel-inner .active').index('#zSlider .carousel-inner .item') + ')').addClass('active');
      });
      $('#zSlider .description li').click(function(){
        $('#zSlider').carousel($(this).index('#zSlider .description li'));
      });
      $('#zSlider .description li').hover(
        function(){$(this).addClass('over')},
        function(){$(this).removeClass('over')}
      );
    }
    
    //set custom hot commented articles and random articles widget visible only on desktop 
    $('#sidebar .widget_zalive_widget_mostcommentedandrandomarticles').addClass('visible-desktop');
    
    //set custom recent comments widget visible only on desktop 
    $('.widget_zalive_widget_recentcomments img').addClass('visible-desktop');
    
    //gotop
    if($.isFunction($.scrollUp)){
      $.scrollUp({
        scrollName: 'goTop', // Element ID
        topDistance: '300', // Distance from top before showing element (px)
        topSpeed: 300, // Speed back to top (ms)
        animation: 'fade', // Fade, slide, none
        animationInSpeed: 200, // Animation in speed (ms)
        animationOutSpeed: 200, // Animation out speed (ms)
        scrollText: zAlive_i18n.gotop, // Text for element
        activeOverlay: false // Set CSS color to display scrollUp active point, e.g '#00FFFF'
      });
    }
    
    //beautify the form and submit button on respond form
    $('#respond .form-submit').addClass('row-fluid').prepend('<div class="span2 divider"></div>');
    $('#respond  #submit').addClass('btn pull-left');
    
    //submit comment by using Ctrl+Enter shortcut
    $('#commentform').keypress(function(e){
      if(e.ctrlKey && e.which == 13 || e.which == 10) {
        $('#submit').click();
      }
    });
    
  });
})(jQuery);