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
                var response=transport.responseText.evalJSON(true);
            }
        });

        return response;
    }
};

$(document).ready(function() {
    ccmn.inAnimation = 'bounceIn';
    ccmn.outAnimation = 'bounceOut';
});

//  "https://cisco-cmx.unit.ua/api/location/v1/attributes",

var siteId = ccmn.makeApiRequest('cisco-presence.unit.ua/api/config/v1/sites', ccmn.apis[1], 'GET');

console.log(siteId);