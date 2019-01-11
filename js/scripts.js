$(document).ready(function ($) {
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
});
var  arrowPosition = function () {
  var nav = document.querySelector('.slider-item__nav').getBoundingClientRect(),
    sliderItem = document.querySelector('.slider-item').getBoundingClientRect(),
    itemHeight = document.querySelector('.slider-item').clientHeight,
    navHeight = document.querySelector('.slider-item__nav').clientHeight;
  var top = itemHeight - (nav.top - sliderItem.top) - navHeight;
      document.querySelector('.slick-prev').style.bottom = top + 'px';
      document.querySelector('.slick-next').style.bottom = top + 'px';

};

window.onload = function () {
  arrowPosition();
};

document.querySelector('.slider').addEventListener("change", function () {
  arrowPosition();
});