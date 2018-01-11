$(document).ready(function() {
    var inAnimation = 'fadeInUpBig';
    var outAnimation = 'hinge';

    $('.pop-up').each(function() {
        $(this).addClass(outAnimation);
    });

    $('html').click(function (event) {
        if (!$(event.target).hasClass('panel-item')) {
            $('.pop-up').each(function() {
                $(this).removeClass(inAnimation);
                $(this).addClass(outAnimation);
            });
        };
    });
    $("#menu").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top - 110;
        $('body,html').animate({scrollTop: top}, 500);
    });
    $('.panel-item').click(function() {
        var popUp = $(this).find('.pop-up');

        if (popUp.css("display") == 'none') {
            popUp.css('display', 'block');
        };

        if (popUp.hasClass(outAnimation)) {
            $('.pop-up').each(function() {
                $(this).removeClass(inAnimation);
                $(this).addClass(outAnimation);
            });
            popUp.addClass(inAnimation);
            popUp.removeClass(outAnimation);
        }
        else if (popUp.hasClass(inAnimation)) {
            $('.pop-up').each(function() {
                $(this).removeClass(inAnimation);
                $(this).addClass(outAnimation);
            });
        };
    });
});