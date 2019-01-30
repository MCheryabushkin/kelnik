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