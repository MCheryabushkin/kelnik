$('.toTop a').click(function() {
    $("html, body").animate({
        scrollTop: 0 + "px"
    },{
        duration: 500,
        easing: "swing"
    });
    $('.js_to-top ').removeClass('show');
    return false;
});

var scrollPos = 0;
$(window).on('scroll', function(){
    var st = $(this).scrollTop();
    if (st > scrollPos || st < 10){
        $('.js_to-top ').removeClass('show');
    } else {
        if(st > 100){
            $('.js_to-top ').addClass('show');
        }
    }
    scrollPos = st;
});