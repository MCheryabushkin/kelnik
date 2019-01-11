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
