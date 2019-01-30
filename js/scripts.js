$(document).ready(function ($) {
    var lazyload = lazyload || {};
    
    (function($, lazyload) {
    
        "use strict";
    
        var page = 2,
            buttonId = ".js_show-more",
            loadingId = "#loading-div",
            container = ".flat-list";
    
        lazyload.load = function() {
    
            var url = "./" + page + ".html";
    
            $(buttonId).hide();
            $(loadingId).show();
    
            $.ajax({
                url: url,
                success: function(response) {
                    if (!response || response.trim() == "NONE") {
                        $(buttonId).fadeOut();
                        $(loadingId).text("No more entries to load!");
                        return;
                    }
                    appendContests(response);
                    $(container).isotope('reloadItems');
                    $(container).isotope();
                },
                error: function(response) {
                    $(loadingId).text("Sorry, there was some error with the request. Please refresh the page.");
                }
            });
        };
    
        var appendContests = function(response) {
            var id = $(buttonId);
    
            $(buttonId).show();
            $(loadingId).hide();
    
            $(response).appendTo($(container));
            page += 1;
        };
    
    })(jQuery, lazyload);
    
    
    $('body').on("click", '.js_show-more', function () {
        var heightList = $('.flat-list').innerHeight();
        $('.flat-list').css('height', heightList + heightList + 'px');
        lazyload.load();
    });
    var menuCounter = 0;
    $('.header__menu-mobile').on("click", function () {
        if (!menuCounter) {
            $('.menu-mobile').css("left", "0px");
            $("body").css("overflow", "hidden");
            menuCounter = 1;
        } else {
            $('.menu-mobile').css("left", "-9999px");
            $("body").css("overflow-y", "scroll");
            menuCounter = 0;
        }
    });
    $('.menu-mobile a').on("click", function () {
        $('.menu-mobile').css("left", "-9999px");
        $("body").css("overflow-y", "scroll");
        menuCounter = 0;
    });
    var row = $('.flat-list'),
        item = $('.flats-item__square'),
        flatCounter = 0,
        priceCounter = 0;
    
    var isotope = row.isotope({
        filter: '.flats-item',
        itemSelector: '.flats-item',
        getSortData: {
            number: '.flats-item__square parseInt',
            price: function( itemElem ) {
                var weight = $( itemElem ).find('.flats-item__price').text();
                return parseFloat( weight.replace( /\s/g, '') );
            }
        },
        masonry: {
            isFitWidth: true
        }
    });
    
    $('#room').on("click", function () {
        $(this).addClass('active');
        $('#price').removeClass('active');
        if (!flatCounter) {
            isotope.isotope({
                sortBy: 'number',
                sortAscending: false
            });
            flatCounter = 1;
            $(this).removeClass('minToMax');
        } else {
            isotope.isotope({
                sortBy: 'number',
                sortAscending: true
            });
            flatCounter = 0;
            $(this).addClass('minToMax');
        }
    });
    $('#price').on("click", function () {
        $(this).addClass('active');
        $('#room').removeClass('active');
        if (!priceCounter) {
            isotope.isotope({
                sortBy: 'price',
                sortAscending: true
            });
            priceCounter = 1;
            $(this).addClass('minToMax');
        } else {
            isotope.isotope({
                sortBy: 'price',
                sortAscending: false
            });
            priceCounter = 0;
            $(this).removeClass('minToMax');
        }
    });
    
    $('.flats-item__star').on("click", function () {
        if($(this).hasClass("active")) {
            $(this).removeClass("active");
        } else {
            $(this).addClass("active");
        }
    
    });
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
});