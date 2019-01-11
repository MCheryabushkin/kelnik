$('.slider').slick({
    dots: false,
    arrow: true,
    infinite: false,
    prevArrow: '<button type="button" id="nextBtn" class="slick-prev slick-arrow"></button>',
    nextArrow: '<button type="button" class="slick-next slick-arrow"></button>'
});

var countSlider = function () {
    var count = $('.product-slider .slider-item').length;
    $('.product-slider .slider-item__all').text(count);
    $('.product-slider .slider-item').each(function () {
        $(this).find('.slider-item__now').text(parseInt($(this).attr('data-slick-index')) + 1);
    });
    var count1 = $('.coctail-slider .slider-item').length;
    $('.coctail-slider .slider-item__all').text(count1);
    $('.coctail-slider .slider-item').each(function () {
        $(this).find('.slider-item__now').text(parseInt($(this).attr('data-slick-index')) + 1);
    });
};
countSlider();