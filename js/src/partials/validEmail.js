$('#email').blur(function() {
    if($(this).val() != '') {
        var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if(pattern.test($(this).val())){
            $(this).css({'border' : '1px solid #569b44'});
            $('#valid').text('Success');
            $('#valid').css({ "color": "#21d221", "position": "relative" });
            $('.group-item input').hide();
            $('.group-item button').hide();
            $('.policy').hide();
        } else {
            $(this).css({'border': '1px solid #ff0000'});
            $('#valid').text('Не верно');
            $('#valid').css("color", "red");
        }
    } else {
        $(this).css({'border' : '1px solid #ff0000'});
        $('#valid').text('Поле email не должно быть пустым');
    }
});

$('.group-item button').on("click", function () {
    return false;
});