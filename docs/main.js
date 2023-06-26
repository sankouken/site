$(function () {
    let _timerCoverArt = 0;
    let _timerCoverArtInterval = 3000;
    const _fadeDurationMsec = 5000;
    const $frontCover = $('#Cover .front');

    // Cover Art
    const ChangeCoverArt = function () {
        let $active = $frontCover.find('img.active');
        let $next = $active.next('img');
        if ($next && $next.length > 0) {
            setTimeout(() => {
                $active.fadeOut(_fadeDurationMsec, () => {
                    $active.removeClass('active');
                });
                $next.show().animate(
                    {
                        height: '100%',
                        opacity: 1,
                    },
                    _fadeDurationMsec,
                    false,
                    function () {
                        $next.addClass('active');
                    }
                );
                _timerCoverArt = setTimeout(
                    ChangeCoverArt,
                    _timerCoverArtInterval
                );
            }, 3000);
        } else {
            _timerCoverArt = 0;
        }
        return;
    };

    $frontCover
        .find('img.active')
        .show()
        .animate(
            {
                height: '100%',
                opacity: 1,
            },
            _fadeDurationMsec,
            false,
            () => {
                _timerCoverArt = setTimeout(
                    ChangeCoverArt,
                    _timerCoverArtInterval
                );
            }
        );

    // Tap to Scroll
    $('a[href^="#"]').on('click', function () {
        var speed = 100; // スクロール速度(ミリ秒)
        var href = $(this).attr('href');
        var target = $(href == '#' || href == '' ? 'html' : href);
        var position = target.offset().top;
        $('html').animate({ scrollTop: position }, speed, 'linear');
        return false;
    });
});
