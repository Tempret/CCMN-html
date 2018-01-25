var ccmn = {

    apis : ['locate', 'presence'],

    siteId : NaN,

    setSiteId : function (data) {
        ccmn.siteId = data[0].aesUId;
        console.log("Site id:", data[0].aesUId);
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
    },

    randomArray : function (length, max) {
        return Array.apply(null, Array(length)).map(function() {
            return Math.round(Math.random() * max);
        });
    },

    chart: NaN,

};

$(document).ready(function() {
    inAnimation = 'fadeInRightBig';

    /* DASHBOARD ANIMATION */
    $('.panel-item').on("click", function (event) {
        var cur = event.target;
        var targets = $('.panel-item');
        var cur_index = 0;

        if (!$(cur).hasClass('panel-item'))
            cur = cur.parentElement;

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
    /* dashboard animation END*/


    ccmn.makeApiRequest('cisco-presence.unit.ua/api/config/v1/sites', ccmn.apis[1], 'GET', ccmn.setSiteId, NaN);

    var timerId = setInterval(function() {
        ccmn.makeApiRequest('cisco-presence.unit.ua/api/presence/v1/connected/count/today', ccmn.apis[1], 'GET', ccmn.setTotalVisitors, {siteId:ccmn.siteId});
    }, 5000);

    /* charts END*/
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Yellow"],
            datasets: [{
                label: '# of Votes',
                data: [46, 28, 9, 63, 9, 1, 37, 75, 32, 89, 74, 2, 54, 70, 69, 23, 57, 47, 72, 55],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            },
            {
                label: '# of Votes',
                data: [46, 28, 9, 63, 9, 1, 37, 75, 32, 89, 74, 2, 54, 70, 69, 23, 57, 47, 72, 55],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
    ccmn.chart = myChart;

});


