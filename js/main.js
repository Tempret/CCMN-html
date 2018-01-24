var ccmn = {

    apis : ['locate', 'presence'],

    siteId : NaN,

    setSiteId : function (data) {
        ccmn.siteId = data[0].aesUId;
    },

    setTotalVisitors : function (data) {
        // console.log(data);
        $('.total-visitors').next().text(data);
    },

    makeApiRequest : function (url, api, type, callback, data) {
        var username = $('#login').val();
        var password = $('#' + api).val();

        $.ajax({
            url: 'https://' + url,
            type: type,
            jsonp: 'jsonp_callback',
            data: data,
            dataType: "json",
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            },
            success: function (data) {
                callback(data);
            }
        });
    }
};

$(document).ready(function() {
    inAnimation = 'fadeInRightBig';

    $('.panel-item, .menu-icons').on("click", function (event) {
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

        console.log($(cur).hasClass('hide'));
    });

    ccmn.makeApiRequest('cisco-presence.unit.ua/api/config/v1/sites', ccmn.apis[1], 'GET', ccmn.setSiteId, NaN);

    var timerId = setInterval(function() {
        ccmn.makeApiRequest('cisco-presence.unit.ua/api/presence/v1/connected/count/today', ccmn.apis[1], 'GET', ccmn.setTotalVisitors, {siteId:ccmn.siteId});
    }, 5000);

});