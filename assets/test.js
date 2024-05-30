$("#sliderv2 > div").hide();
$("#sliderv2 > div:first").show();

function slideOnce() {
    var $current = $('#sliderv2 > div:visible');
    var $next = $current.next().length ? $current.next() : $('#sliderv2 > div:first');

    $current.animate({left: '-100%'}, 1000, function () {
        $(this).css('left', '100%').hide();
    });

    $next.css('left', '100%').show().animate({left: '0%'}, 1000);
    console.log('Slid!');
}

var interval = setInterval(slideOnce, 4000);