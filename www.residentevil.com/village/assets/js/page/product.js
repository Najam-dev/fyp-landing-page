(function ($) {
  /*==========================================================================
  /  処理
  /==========================================================================*/
  $(function () {
    init();
  });
  $(win).on('load', function () {
    loadfunc();
  });
  $(win).on('load scroll', function () {
    scrollfunc();
  });
  /*==========================================================================
  /  関数
  /==========================================================================*/
  function init() {
    // 商品選択
    ! function () {
      var trigger = '[data-js-trigger="lineup"]',
        lineupCtr = '[data-js-elem="lineupCtr"]',
        lineup = '[data-js-elem="lineup"]',
        lineupItem = '[data-js-elem="lineupItem"]',
        privilege = '[data-js-elem="privilege"]';
      $(doc).on(click, trigger + '[data-lineup-select="edition"]', function (e) {
        e.preventDefault;
        edition = $(this).attr('data-lineup-select-edition');
        platform = $(lineup).attr('data-lineup-platform');
        if (platform === 'stadia') {
          if (edition === 'gold') {
            $(trigger).removeClass(active);
            $(this).addClass(active);
            $(trigger + '[data-lineup-select-platform="ps5"]').addClass(active);
            $(lineup + ', ' + lineupCtr).attr({
              'data-lineup-edition': edition,
              'data-lineup-platform': 'ps5'
            });
            $(lineupItem).removeClass('is-select');
            $(lineupItem + '[data-lineupItem="' + edition + '_ps5"]').addClass('is-select');
            $(privilege).removeClass(show);
            setTimeout(function () {
              if (edition != 'standard') {
                $(privilege).addClass(show);
              }
            }, 50);
          } else {
            $(trigger + '[data-lineup-select="edition"]').removeClass(active);
            $(this).addClass(active);
            $(lineup + ', ' + lineupCtr).attr('data-lineup-edition', edition);
            $(lineupItem).removeClass('is-select');
            $(lineupItem + '[data-lineupItem="' + edition + '_' + platform + '"]').addClass('is-select');
            $(privilege).removeClass(show);
            setTimeout(function () {
              if (edition != 'standard') {
                $(privilege).addClass(show);
              }
            }, 50);
          }
        } else {
          $(trigger + '[data-lineup-select="edition"]').removeClass(active);
          $(this).addClass(active);
          $(lineup + ', ' + lineupCtr).attr('data-lineup-edition', edition);
          $(lineupItem).removeClass('is-select');
          $(lineupItem+'[data-lineupItem="'+edition+'_'+platform+'"]').addClass('is-select');
          $(privilege).removeClass(show);
          setTimeout(function () {
            if(edition != 'standard' && edition != 'bundle'){
              $(privilege).addClass(show);
            }
          }, 50);
        }
      });
      $(doc).on(click, trigger + '[data-lineup-select="platform"]', function (e) {
        e.preventDefault;
        platform = $(this).attr('data-lineup-select-platform');
        edition = $(lineup).attr('data-lineup-edition');
        $(trigger + '[data-lineup-select="platform"]').removeClass(active);
        $(this).addClass(active);
        $(lineup).attr('data-lineup-platform', platform);
        $(lineupItem).removeClass('is-select');
        $(lineupItem + '[data-lineupItem="' + edition + '_' + platform + '"]').addClass('is-select');
        $(privilege).removeClass(show);
        setTimeout(function () {
          if(edition != 'standard' && edition != 'bundle'){
            $(privilege).addClass(show);
          }
        }, 50);
      });
    }();
  }

  function loadfunc() {
    // ページアクセス制御
    ! function () {
      var ed = getParam('edition'),
        pl = getParam('platform');
      var contsId,
        listClass;
      if (ed === 'sta') {
        contsId = 'normal';
      } else if (ed === 'col') {
        contsId = 'collectors';
      } else if (ed === 'del') {
        contsId = 'digital';
      } else if (ed === 'com') {
        contsId = 'bundle';
      }
      if (pl === 'ps5') {
        listClass = 'ps5';
      } else if (pl === 'ps4') {
        listClass = 'ps4';
      } else if (pl === 'xbx') {
        listClass = 'xboxsx';
      } else if (pl === 'xbo') {
        listClass = 'xboxone';
      } else if (pl === 'stm') {
        listClass = 'steam';
      } else if (pl === 'sta') {
        listClass = 'stadia';
      }
      if (ed != null && pl != null) {
        // アンカーリンク
        var hash = '#' + contsId;
        var tgt = $(hash);
        if (tgt != '') {
          var pos = tgt.offset().top;
          $('html, body').animate({
            scrollTop: pos
          }, 1);
          // タブ
          $('' + hash + ' *[data-elem="tabContainer"]').find('.' + active + '[data-handle="tabBtn"]').removeClass(active);
          $('' + hash + ' *[data-elem="tabContainer"]').find('.' + show + '[data-elem="tabBox"]').removeClass(show);
          $('' + hash + ' .platform-list-' + listClass + '[data-handle="tabBtn"]').addClass(active);
          $('' + hash + ' .tab-box-' + listClass + '[data-elem="tabBox"]').addClass(show);
        }
      }

      function getParam(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
      }
    }();
  }

  function scrollfunc() {
    ! function () {
      var elem = '*[data-elem="scrollPoint"]';
      $(elem).each(function () {
        var position = $(win).scrollTop();
          $(win).height();
          var thisOffset = $(this).offset().top,
          animPos = position > thisOffset;
        if (animPos) {
          $('.page-logo').addClass('is-show');
        } else {
          $('.page-logo').removeClass('is-show');
        }
      });
      var styleChangeElem = '[data-elem="styleChange"]';
      if ($(styleChangeElem).length) {
        $(styleChangeElem).each(function () {
          var position = $(win).scrollTop();
            $(win).height();
            var thisOffset = $(this).offset().top,
            animPos = position > thisOffset;
          if (animPos && $(body).hasClass('page-product')) {
            $('*[data-js-elem="langSelect"]').removeClass('is-black');
          } else {
            $('*[data-js-elem="langSelect"]').addClass('is-black');
          }
        });
      }
    }();
  }
  // root
  for (var root, dir = document.getElementsByTagName("script"), i = dir.length; i--;) {
    var match = dir[i].src.match(/(^|.*\/)top\.js$/);
    if (match) {
      root = match[1];
      break
    }
  }})(jQuery);
