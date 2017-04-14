// setup
var setup = function() {
    // tab click
    $('.ai-tab > a').on('click', function () {
        var self = $(this);
        $('.active').removeClass('active');
        self.addClass('active');
    });

    // tab action
    var tabAction = function (position, showLogin) {
        $(".ai-block").animate({
            "left": position
        }, "fast");
        $('#id-div-login').toggle(showLogin);
        $('#id-div-signup').toggle(!showLogin);
    };

    $('#id-a-signup').on('click', function() {
        var position = '100px';
        var showLogin = false;
        tabAction(position, showLogin);
    });
    $('#id-a-login').on('click', function() {
        var position = '155px';
        var showLogin = true;
        tabAction(position, showLogin);
    });
};

var __main = function() {
    setup();
    $('#id-a-login').click();
};

$(document).ready(function(){
    __main();
});
