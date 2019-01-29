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