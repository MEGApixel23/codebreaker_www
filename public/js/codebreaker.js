
$(document).ready(function(e) {
    var $results = $('#results');
    var $code = $('#code');

    $('#get-hint').click(function(e) {
        e.preventDefault();

        var $hintContainer = $('#hint');

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
                if (res === true) {
                    var username = prompt('You won! Enter your initials to save score');

                    saveUsername(username);
                } else if (res === false) {
                    if (confirm('You loose. Start again?')) {
                        $.get('/start_again', function() {
                            window.location.href = window.location.href;
                        });
                    }
                } else {
                    var $layoutClone = $layout.clone();
                    $layoutClone.html(code + ' : ' + res);

                    $results.append($layoutClone);
                }
            }
        });
    });

    $('#code').mask('6666', {
        translation: {
            '6': {
                pattern: /[0-6]/,
            },
            placeholder: "1234"
        }
    });

    $('#show-scores').click(function() {
        $.ajax({
            url: '/scores',
            success: function(res) {
                var $scores = $('#scores-table tbody'),
                    $layout = $('<tr><td class="username"></td><td class="tries"></td></tr>');

                for (var i=0; i<res.length; i++) {
                    var $clone = $layout.clone();

                    $clone.find('.username').text(res[i].name);
                    $clone.find('.tries').text(parseInt(res[i].tries) + 1);

                    $scores.append($clone);
                }
            }
        });
    });

    $('#restart').click(function(e) {
        $.get('/start_again');

        $('#results').html('');
        $('#hint').html('');
    });

    function saveUsername(username) {
        $.ajax({
            url: '/save_results',
            data: {
                name: username
            },
            success: function(res) {
                console.log(res);
            }
        });
    }
});