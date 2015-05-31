
$(document).ready(function(e) {
    var $results = $('#results');
    var $code = $('#code');

    $('#hint').click(function(e) {
        e.preventDefault();

        var $hintContainer = $('#hint-container');

        $.ajax({
            url: '/hint',
            success: function(res) {
                $hintContainer.html(res);
            }
        });
    });

    $('#restart').click(function(e) {
        e.preventDefault();

        $.ajax({
            url: '/start_again',
            success: function(res) {
                $results.html('');
                $code.val('');
            }
        });
    });

    $('#input-code').click(function(e) {
        e.preventDefault();

        var code = $code.val();
        var $layout = $('<div></div>');

        $.ajax({
            url: '/input_code',
            data: {
                code: code
            },
            success: function(res) {
                var $layoutClone = $layout.clone();
                $layoutClone.html(res);

                $results.append($layoutClone);
            }
        });
    });
});