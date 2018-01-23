var ccmn = {

    apis : ['locate', 'presence'],

    makeApiRequest : function (url, api, type) {
        var username = $('#login').val();
        var password = $('#' + api).val();

        console.log(username + ':' + password);

        var response = $.ajax({
            url: 'https://' + url,
            type: "GET",
            jsonp: 'jsonp_callback',
            dataType: "json",
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            },
            success: function (data) {
                var response = transport.responseText.evalJSON(true);
            }
        });

        return response;
    }
};

$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            if (callback) {
                callback();
            }
        });
        return this;
    }
});

$(document).ready(function() {
    inAnimation = 'fadeInRightBig';

    $('.panel-item').click( function (event) {
        var cur = event.target;
        var targets = $('.panel-item');
        var cur_index = 0;

        for (; cur_index < targets.length; cur_index++)
            if (cur === targets[cur_index])
                break;

        $.each($('.dashboard-item'), function (index) {
            $(this).addClass('hide');
            $(this).removeClass('animated visible ' + inAnimation);
        });
        $($('.dashboard-item')[cur_index]).removeClass('hide');
        $($('.dashboard-item')[cur_index]).addClass('animated visible ' + inAnimation);
    });
});



//  "https://cisco-cmx.unit.ua/api/location/v1/attributes",

// var siteId = ccmn.makeApiRequest('cisco-presence.unit.ua/api/config/v1/sites', ccmn.apis[1], 'GET');
//
// console.log(siteId);