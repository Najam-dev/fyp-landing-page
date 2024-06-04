(function ($) {
    /*==========================================================================
    /  処理
    /==========================================================================*/
    $(function() {
        init();
    });
    $(win).on('load scroll', function() {
        scrollfunc();
    });
    /*==========================================================================
    /  関数
    /==========================================================================*/
    function init() {
        if($('*[data-handle="iframePlayer"]').length > 0) {
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
        $(doc).on(click, 'a[data-handle="iframePlayer"]', function(e){
            e.preventDefault();
            var youtubeId = $(this).attr('data-yt'),
                elemId = $(this).parents('.video-thumb').next('.video-player').find('.video-player-item').attr('id');
            player = new YT.Player(elemId, {
                videoId: youtubeId,
                playerVars: {
                    autoplay: 1,
                    enablejsapi: 1,
                    controls: 0,
                    modestbranding: 1,
                    loop: 1,
                    playsinline: 1,
                    wmode: 'transparent',
                    origin: location.protocol + '//' + location.hostname + '/'
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange':onPlayerStateChange
                }
            });
            $(this).parents('.video-thumb').next('.video-player').addClass('is-play');
            return false;
        });
        function onPlayerReady(e) {
            e.target.mute();
            e.target.seekTo(0);
            e.target.playVideo();
        }
        function onPlayerStateChange(e) {
            var duration = e.target.getDuration() * 1000 - 500;
            if (e.data === YT.PlayerState.PLAYING) {
                setTimeout(function () {
                    e.target.mute();
                    e.target.seekTo(0);
                    e.target.playVideo();
                }, duration);
            }
        }
    }
    function scrollfunc() {
        !function(){
        var animText ='*[data-anim="text"]',
            animImage ='*[data-anim="image"]',
            animElem ='*[data-anim="elem"]',
            animFadeIn = '*[data-anim="fadeIn"]';
            $(animText).each(function() {
                var position = $(win).scrollTop(),
                    winH = $(win).height(),
                    thisOffset = $(this).offset().top,
                    animPos = position + (winH / 1.2) > thisOffset;
                if(animPos) {
                    $(this).addClass('is-anim');
                }
            });
            $(animImage).each(function() {
                var position = $(win).scrollTop(),
                    winH = $(win).height(),
                    thisOffset = $(this).offset().top,
                    animPos = position + (winH / 1.2) > thisOffset;
                if(animPos) {
                    $(this).addClass('is-anim');
                }
            });
            $(animElem).each(function() {
                var position = $(win).scrollTop(),
                    winH = $(win).height(),
                    thisOffset = $(this).offset().top,
                    animPos = position + (winH / 1.2) > thisOffset;
                if(animPos) {
                    $(this).addClass('is-anim');
                }
            });
          $(animFadeIn).each(function () {
            var position = $(win).scrollTop(),
              winH = $(win).height(),
              thisOffset = $(this).offset().top,
              animPos = position + (winH / 1.2) > thisOffset;
            if (animPos) {
              $(this).addClass('is-anim');
            }
          });
        }();
    }
})(jQuery);
