$(document).ready(function() {
    var inAnimation = 'bounceIn';
    var outAnimation = 'bounceOut';

    $('.pop-up').each(function() {
        $(this).addClass(outAnimation);
    });

    $('#submit').click(function () {
        var username = "RO";
        var password = "just4reading";
        $.ajax({
            url: "https://cisco-cmx.unit.ua/api/location/v1/attributes",
            type: "GET",
            jsonp: 'jsonp_callback',
            dataType: "json",
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            },
            success: function (data) {
                console.log(data);
            },
        });
    });

    // $('html').click(function (event) {
    //     if (!$(event.target).hasClass('panel-item')) {
    //         $('.pop-up').each(function() {
    //             $(this).removeClass(inAnimation);
    //             $(this).addClass(outAnimation);
    //         });
    //     };
    // });

    // $('.panel-item').click(function() {
    //     var popUp = $(this).find('.pop-up');
    //
    //     if (popUp.css("display") == 'none') {
    //         popUp.css('display', 'block');
    //     };
    //
    //     if (popUp.hasClass(outAnimation)) {
    //         $('.pop-up').each(function() {
    //             $(this).removeClass(inAnimation);
    //             $(this).addClass(outAnimation);
    //         });
    //         popUp.addClass(inAnimation);
    //         popUp.removeClass(outAnimation);
    //     }
    //     else if (popUp.hasClass(inAnimation)) {
    //         $('.pop-up').each(function() {
    //             $(this).removeClass(inAnimation);
    //             $(this).addClass(outAnimation);
    //         });
    //     };
    // });
});