
$(function() {

  $(".header__burger").on('click', function(){
    $(".header__burger,.header__nav").toggleClass('active');
  });


  $('.header__try-now, .button__main').on('click', function(){
    $('.overlay, #try-now').fadeIn('slow');
  });
  $('.modal-icon__close').on('click', function(){
    $('.overlay, #try-now').fadeOut('slow');
  });
  function ibg(){
    $.each($(".ibg"), function(index, val){
        if($(this).find('img').length>0){
            $(this).css('background-image', 'url("'+$(this).find('img').attr('src')+'")');
        }
      });
    }
    ibg();

    @@include('slick.min.js');

    $('.slider').slick({
      slidesToShow: 3,
      slidesToScroll: 3,
      arrows: true,
      dots: true,
      easing: 'linear',
      autoplay: false,
      pauseOnFocus: true,
      pauseOnHover: true,
      pauseOnDotsHover: true,
      waitForAnimate: true,
    });
  });


