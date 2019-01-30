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