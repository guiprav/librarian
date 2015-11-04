'use strict';

$(function() {
    $('body').keyup(function(event) {
        var code = event.keyCode || event.which;

        if(code !== 27) {
            return;
        }

        if(!$('.lbrNavTreeContainer').is(':visible')) {
            UIkit.offcanvas.show('.lbrNavTreeContainer');
        }
        else {
            UIkit.offcanvas.hide();
        }

        return false;
    });
});
