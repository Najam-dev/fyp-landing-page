// IE11/デバイス判定 Class設定
function configuration() {
  $(function () {
    // ブラウザ IE11
    ! function () {
      var ua = window.navigator.userAgent.toLowerCase();
      // userAgent
      var flag = (function (u) {
        return {
          WinTablet: u.indexOf('windows') != -1 && u.indexOf('touch') != -1,
          Tablet: u.indexOf('ipad') != -1 || (u.indexOf('android') != -1 && u.indexOf('mobile') == -1) || (u.indexOf('firefox') != -1 && u.indexOf('tablet') != -1) || u.indexOf('kindle') != -1 || u.indexOf('silk') != -1 || u.indexOf('playbook') != -1,
          Mobile: (u.indexOf('windows') != -1 && u.indexOf('phone') != -1) || u.indexOf('iphone') != -1 || u.indexOf('ipod') != -1 || (u.indexOf('android') != -1 && u.indexOf('mobile') != -1) || (u.indexOf('firefox') != -1 && u.indexOf('mobile') != -1) || u.indexOf('blackberry') != -1,
          Win: u.indexOf('win') != -1,
          Mac: u.indexOf('mac') != -1,
          Ie: ua.indexOf('msie') != -1 || ua.indexOf('trident') != -1,
          Edge: ua.indexOf('edge') != -1,
          Android: ua.indexOf('android') != -1 && ua.indexOf('mobile') != -1,
          Chrome: ua.indexOf('chrome') != -1,
          Safari: ua.indexOf('safari') != -1,
          Firefox: ua.indexOf('firefox') != -1,
          Opera: ua.indexOf('opera') != -1
        }
      })(ua);
      // デバイス
      if (flag.Mobile) {
        $(body).addClass('ua-sp');
      } else if (flag.Tablet) {
        $(body).addClass('ua-tb');
      } else if (flag.WinTablet) {
        if (('ontouchstart' in document) && ('orientation' in window)) {
          $(body).addClass('ua-tb');
        } else {
          $(body).addClass('ua-pc');
        }
      } else {
        $(body).addClass('ua-pc');
      }
      // OS
      if (flag.Win) {
        $(body).addClass('ua-win');
      } else if (flag.Mac) {
        $(body).addClass('ua-mac');
      }
      // ブラウザ
      if (flag.Ie) {
        $(body).addClass('ua-ie');
      } else if (flag.Edge) {
        $(body).addClass('ua-edge');
      } else if (flag.Android) {
        $(body).addClass('ua-android');
      } else if (flag.Chrome) {
        $(body).addClass('ua-chrome');
      } else if (flag.Safari) {
        $(body).addClass('ua-safari');
      } else if (flag.Firefox) {
        $(body).addClass('ua-firefox');
      } else if (flag.Opera) {
        $(body).addClass('ua-opera');
      }
      ieMouseWheel();
    }();
    // target="_blank" rel属性付与
    !function(){
      $('a[target="_blank"]').each(function() {
          $(this).attr('rel', 'noopener');
      });
    }();
  });
  // IEスクロール制御
  function ieMouseWheel() {
    if ($(body).hasClass('ua-ie') || $(body).hasClass('ua-edge')) {
      $(body).on('mousewheel', function () {
        event.preventDefault();
        var wd = event.wheelDelta;
        var csp = window.pageYOffset;
        window.scrollTo(0, csp - wd);
      });
    }
  }
}

// 共通制御
function common() {
  $(function () {
    // グローバルナビ
    ! function () {
      var handle = '*[data-handle="gnavBtn"]',
        elem = '*[data-elem="pageHeader"]';
      mqhandle(mql);
      mql.addListener(mqhandle);

      function mqhandle(mq) {
        $(doc).off('click mouseenter', handle);
        $(doc).off('mouseleave', '' + elem + '.is-hover');
        if (mq.matches) {
          $(doc).on({
            'mouseenter': function () {
              $(elem).removeClass(disable).addClass(active);
              setTimeout(function () {
                $(elem).addClass('is-hover');
              }, 500);
            }
          }, handle);
          $(doc).on({
            'mouseleave': function () {
              $(elem).removeClass(active).addClass(disable);
            }
          }, '' + elem + '.is-hover');
        } else {
          $(doc).on(click, handle, function () {
            $(elem).removeClass(disable).addClass(active);
          });
          $(doc).on(click, '' + elem + '.' + active + ' ' + handle + ', ' + elem + '.' + active + ' .gnav-list-item a', function () {
            $(elem).removeClass(active).addClass(disable);
          });
        }
      }
    }();
    // スムーススクロール
    ! function () {
      $.easing.quart = function (x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
      };
      $(doc).on(click, 'a.smooth-scroll[href^="#"]', function () {
        var href = $(this).attr('href'),
          target = $(href == "#" || href == "" ? 'html' : href),
          position = target.offset().top;
        $('html, body').animate({
          scrollTop: position
        }, 400);
        return false;
      });
    }();
    // matchHeight
    ! function () {
      var elem = '*[data-elem-mh="mh"] .mh';
      if ($(elem).length > 0) {
        $(elem).matchHeight();
      }
    }();
  });
  $(win).on('load scroll', function () {
    ! function () {
      if ($(body).hasClass('page-layer') && $('*[data-elem="buyBtn"]').length > 0) {
        var position = $(win).scrollTop(),
          winH = $(win).height(),
          footerOffset = $('footer').offset().top;
        if (position + winH > footerOffset) {
          $('*[data-elem="buyBtn"]').addClass('is-fixed');
        } else {
          $('*[data-elem="buyBtn"]').removeClass('is-fixed');
        }
      }
    }();
  });
}

// 言語選択
function langSelect() {
  // 対象言語
  const targetLang = [
    { code: 'blank', value: 'blank', label: 'Select Language' },
    { code: 'en-US', value: 'us', label: 'English[US]' },
    { code: 'en-GB', value: 'uk', label: 'English[UK]' },
    { code: 'fr', value: 'fr', label: 'Français' },
    { code: 'it', value: 'it', label: 'Italiano' },
    { code: 'de', value: 'de', label: 'Deutsch' },
    { code: 'es', value: 'es', label: 'Español' },
    { code: 'pt-BR', value: 'pt-br', label: 'Português do Brasil' },
    { code: 'zh-HK', value: 'hk', label: '繁體中文' },
    { code: 'zh-CN', value: 'cn', label: '简体中文' },
    { code: 'ko', value: 'kr', label: '한국어' },
    { code: 'en', value: 'en-asia', label: 'English[ASIA]' },
    { code: 'ja', value: 'jp', label: '日本語' }
  ];
  const elem = '[data-js-elem="langSelect"]',
        select = elem+' select';
  // html
  if($(elem).length > 0){
    // OPTIONタグ設定
    let dom = '<div class="langselect-inner">';
        dom += '<select class="langselect-box" name="langSelectBox" id="langSelectBox">';
        for (var i in targetLang) {
          dom += '<option class="'+targetLang[i].code+'" value="'+targetLang[i].value+'">'+targetLang[i].label+'</option>';
        }
        dom += '</select>';
        dom += '</div>';
    $(elem).html(dom);
    // セレクトボックス装飾
    !function(){
      $(select).SumoSelect();
      const lang = $('html').attr('lang');
      const label = $(select+' option.'+lang).html(),
            target = $(''+elem+' .opt:contains("'+label+'")');
      $(elem+' .CaptionCont span').html(label);
      $(select+' option').attr('selected', false);
      $(select+' option.'+lang+'').attr('selected', true);
      $(elem+' .opt').removeClass('is-selected');
      $(target).addClass('is-selected');
    }();
    // 言語間リンク
    $(doc).on('change', select, function() {
      const langValue = $(this).val(),
            url = location.href,
            urlArr = url.split('/'),
            page = $(body).attr('data-page'),
            pageJp = $(body).attr('data-page-jp');
      if(langValue != 'blank') {
        Cookies.set(selectLang, langValue, { expires: cookieExp, samesite: 'lax', path: '/'});
        let href,
            langDir,
            pageDir,
            pageName,
            pageJpFlag;
        // GE版分岐
        if(page === 'ge'){
          langDir = '/'+urlArr[5]+'/';
        } else {
          langDir = '/'+urlArr[4]+'/';
          pageDir = '/'+urlArr[5]+'/';
          pageName = urlArr[6];
        }
        // 遷移先
        const langDirReplace = '/'+langValue+'/';
        // JPのみ/D版ページ判定
        if(pageJp != undefined){
          pageJpFlag = pageJp;
        } else {
          pageJpFlag = '';
        }
        if(langValue != 'jp'){
          if(pageJpFlag === 'only') {
            href = url.replace(langDir, langDirReplace).replace(pageDir, '').replace(pageName, '');
          } else if(pageJpFlag != '') {
            if(page != 'topics' || page != 'top') {
              if(page === 'product') {
                href = url.replace(langDir, langDirReplace).replace(pageDir, '/product/');
              } else {
                href = url.replace(langDir, langDirReplace).replace(pageDir, '/'+pageJpFlag+'/');
              }
            } else if(page === 'topics') {
              href = url.replace(langDir, langDirReplace).replace(pageName, pageJpFlag);
            }
          } else {
            href = url.replace(langDir, langDirReplace);
          }
        } else {
          if((pageDir != '' && pageDir != '//') || (pageName != '' && pageName != undefined)){
            if(pageJpFlag === 'only') {
              href = url.replace(langDir, langDirReplace).replace(pageDir, '').replace(pageName, '');
            } else if(pageJpFlag != '') {
              if(page != 'topics' || page != 'top') {
                href = url.replace(langDir, langDirReplace).replace(pageDir, '/'+pageJpFlag+'-d/');
              } else if(page === 'topics') {
                href = url.replace(langDir, langDirReplace).replace(pageName, pageJpFlag+'-d');
              }
            } else {
              href = url.replace(langDir, langDirReplace);
            }
          } else {
            href = url.replace(langDir, langDirReplace);
          }
        }
        window.location.href = href;
      }
    });
  }
}

// モーダル
function mfp() {
  $(function () {
    // 年齢認証
    ! function () {
      if (ageGatePassCookie === undefined || ageGatePassCookie === 'false') {
        $('.age-check').each(function () {
          $(this).prepend('<a class="age-check-modal" href="./modal/age.html" data-handle="modalAge" data-modal="mfp-fade mfp-age"></a>');
        });
        $('.age-check-simple').each(function () {
          $(this).prepend('<a class="age-check-modal" href="./modal/age.html" data-handle="modalAgeSimple" data-modal="mfp-fade mfp-age-simple"></a>');
        });
        $('#images .images-box').find('.img:not(.age-check)').each(function (i) {
          $(this).children('a').attr('data-modal', '' + i + ' mfp-fade mfp-loading mfp-images');
        });
      } else {
        if (ageGatePassCookie === 'true') {
          $(body).addClass('is-over').find('.age-check').removeClass('age-check mfp-age-simple age-check-trailer');
        } else if (ageGatePassCookie === 'false') {
          $(body).addClass('is-under');
        }
      }
      // 対象年齢以下
      if (ageUnderCookie) {
        $(body).addClass('is-under');
      }
      ! function () {
        var handle = '*[data-handle="modalAge"]',
          targetAge = 18;
        $(doc).find(handle).magnificPopup({
          type: 'ajax',
          mainClass: 'mfp-fade',
          removalDelay: 250,
          disableOn: function () {
            return slideMove;
          },
          callbacks: {
            open: function () {
              modalOpen();
            },
            close: function () {
              modalClose();
            },
            beforeOpen: function () {
              this.st.mainClass = this.st.el.attr('data-modal');
            },
            parseAjax: function (mfpResponse) {
              mfpResponse.data = $(mfpResponse.data).find('#modalAge');
            },
            ajaxContentAdded: function () {
              var birthYear = '#year',
                birthMonth = '#month',
                birthDay = '#day',
                enter = '#enter',
                under = '#enterUnder';
              setTimeout(function () {
                // 最初のInputをフォーカス
                $('input[type="number"]').eq(0).focus();
                // Cookieから年月日復元
                if (ageBirthCookie != undefined) {
                  var isRestored = {
                    birth: false,
                    lang: false,
                    birthYear: -1,
                    birthMonth: -1,
                    birthDate: -1,
                    lang_str: ""
                  };
                  if (ageBirthCookie && ageBirthCookie.length === 8) {
                    $(birthYear).val(ageBirthCookie.substr(0, 4));
                    $(birthMonth).val(ageBirthCookie.substr(4, 2));
                    $(birthDay).val(ageBirthCookie.substr(6, 2));
                    isRestored.birthYear = ageBirthCookie.substr(0, 4);
                    isRestored.birthMonth = ageBirthCookie.substr(4, 2);
                    isRestored.birthDate = ageBirthCookie.substr(6, 2);
                    isRestored.birth = true;
                  }
                }
                // 年入力チェック
                $(doc).on({
                  blur: function () {
                    var value = this.value,
                      length = this.value.length,
                      maxlength = $(this).attr('size');
                    if (length > maxlength || value.search(/^[-]?[0-9]+(\.[0-9]+)?$/) || this.value < 1900 || this.value > 2100) {
                      $(this).addClass('is-error');
                    } else {
                      $(this).removeClass('is-error');
                    }
                  },
                  keyup: function () {
                    var value = this.value,
                      length = this.value.length,
                      maxlength = $(this).attr('size');
                    if (length != maxlength || value.search(/^[-]?[0-9]+(\.[0-9]+)?$/) || this.value < 1900 || this.value > 2100) {
                      $(this).addClass('is-error');
                    } else {
                      $(this).removeClass('is-error');
                      $('input[name="myFm"]').focus();
                    }
                  }
                }, birthYear);
                // 月入力チェック
                $(doc).on({
                  blur: function () {
                    var value = this.value,
                      length = this.value.length,
                      maxlength = $(this).attr('size');
                    if (length > maxlength || value.search(/^[-]?[0-9]+(\.[0-9]+)?$/) || this.value > 12 || this.value == 0) {
                      $(this).addClass('is-error');
                    } else {
                      $(this).removeClass('is-error');
                    }
                  },
                  keyup: function () {
                    var value = this.value,
                      length = this.value.length,
                      maxlength = $(this).attr('size');
                    if (length != maxlength || value.search(/^[-]?[0-9]+(\.[0-9]+)?$/) || this.value > 12 || this.value == 0) {
                      $(this).addClass('is-error');
                    } else {
                      $(this).removeClass('is-error');
                      $('input[name="myFd"]').focus();
                    }
                  }
                }, birthMonth);
                // 日入力チェック
                $(doc).on({
                  blur: function () {
                    var value = this.value,
                      length = this.value.length,
                      maxlength = $(this).attr('size');
                    if (length > maxlength || value.search(/^[-]?[0-9]+(\.[0-9]+)?$/) || this.value > 31 || this.value == 0) {
                      $(this).addClass('is-error');
                    } else {
                      $(this).removeClass('is-error');
                    }
                  },
                  keyup: function () {
                    var value = this.value,
                      length = this.value.length,
                      maxlength = $(this).attr('size');
                    if (length != maxlength || value.search(/^[-]?[0-9]+(\.[0-9]+)?$/) || this.value > 31 || this.value == 0) {
                      $(this).addClass('is-error');
                    } else {
                      $(this).removeClass('is-error');
                      $('input[name="myFy"]').focus();
                    }
                  }
                }, birthDay);
                $(birthYear).add($(birthMonth)).add($(birthDay)).on('keypress keyup blur', function () {
                  if ($(birthYear).val() !== "" && $(birthMonth).val() !== "" && $(birthDay).val() !== "") {
                    var year = $(birthYear).val(),
                      month = $(birthMonth).val(),
                      day = $(birthDay).val();
                    // 誕生日
                    var birthDate = new Date(year, month - 1, day);
                    var today = new Date();
                    new Date(today.getFullYear(), month, day);
                    var age = today.getFullYear() - birthDate.getFullYear();
                    var thisNotation = today.getFullYear() + ('0' + (today.getUTCMonth() + 1)).slice(-2) + ('0' + (today.getUTCDate() + 1)).slice(-2);
                    var yearNotation = birthDate.getFullYear() + ('0' + (birthDate.getUTCMonth() + 1)).slice(-2) + ('0' + (birthDate.getUTCDate() + 1)).slice(-2);
                    Cookies.set(ageBirth, yearNotation, {
                      expires: cookieExp,
                      samesite: 'lax',
                      path: '/'
                    });
                    // 誕生日前処理
                    if (thisNotation.slice(-4) <= yearNotation.slice(-4)) {
                      age--;
                    }
                    // 年齢判定
                    if (year.length === 4 && month.length <= 2 && day.length <= 2 && !$('input[type="tel"]').hasClass('is-error')) {
                      if (age >= targetAge) {
                        $(under).removeClass(active).addClass('is-hide');
                        $(enter).removeClass('is-hide').addClass(active);
                      } else {
                        if (ageUnderCookie) {
                          $(enter).add($(under)).removeClass('is-hide ' + active + '');
                        } else {
                          $(enter).removeClass(active).addClass('is-hide');
                          $(under).removeClass('is-hide').addClass(active);
                        }
                      }
                    } else {
                      $(enter).add($(under)).removeClass('is-hide ' + active + '');
                    }
                  }
                });
                $(doc).on(click, enter, function () {
                  Cookies.set(ageGatePass, true, {
                    expires: cookieExp,
                    samesite: 'lax',
                    path: '/'
                  });
                  $(body).addClass('is-over').find('.age-check').removeClass('age-check age-check-trailer').children('.age-check-modal').remove();
                  $('#images .images-box').find('.img').each(function (i) {
                    $(this).children('a').attr('data-modal', '' + i + ' mfp-fade mfp-loading mfp-images');
                  });
                  $.magnificPopup.close();
                  return ageCheckFlag = true;
                });
                $(doc).on(click, under, function () {
                  Cookies.set(ageGatePass, false, {
                    expires: cookieExp,
                    samesite: 'lax',
                    path: '/'
                  });
                  Cookies.set(ageUnder, true, {
                    expires: cookieExp,
                    samesite: 'lax',
                    path: '/'
                  });
                  $(body).addClass('is-under');
                  $(enter).add($(under)).removeClass('is-hide ' + active + '');
                });
              }, 100);
            }
          }
        });
      }();
      ! function () {
        var handle = '*[data-handle="modalAgeSimple"]';
        $(doc).find(handle).magnificPopup({
          type: 'ajax',
          mainClass: 'mfp-fade',
          removalDelay: 250,
          disableOn: function () {
            return slideMove;
          },
          callbacks: {
            open: function () {
              modalOpen();
            },
            close: function () {
              modalClose();
            },
            beforeOpen: function () {
              this.st.mainClass = this.st.el.attr('data-modal');
            },
            parseAjax: function (mfpResponse) {
              mfpResponse.data = $(mfpResponse.data).find('#modalAgeSimple');
            },
            ajaxContentAdded: function () {
              var enter = '#enter',
                under = '#enterUnder';
              $(doc).on(click, enter, function () {
                Cookies.set(ageVer, 'verZ', {
                  expires: cookieExp,
                  samesite: 'lax',
                  path: '/'
                });
                $(body).addClass('is-over').find('.age-check-simple').removeClass('age-check-simple age-check-trailer').children('.age-check-modal').remove();
                $.magnificPopup.close();
              });
              $(doc).on(click, under, function () {
                Cookies.set(ageVer, 'verD', {
                  expires: cookieExp,
                  samesite: 'lax',
                  path: '/'
                });
                $.magnificPopup.close();
              });
            }
          }
        });
      }();
    }();
    // magnificModal
    ! function () {
      ! function () {
        var handle = '*[data-handle="modalAjax"]';
        $(doc).find(handle).magnificPopup({
          type: 'ajax',
          mainClass: 'mfp-fade',
          removalDelay: 250,
          callbacks: {
            open: function () {
              modalOpen();
              $(body).off('mousewheel');
            },
            close: function () {
              modalClose();
              ieMouseWheel();
            },
            beforeOpen: function () {
              this.st.mainClass = this.st.el.attr('data-modal');
            },
            parseAjax: function (mfpResponse) {
              mfpResponse.data = $(mfpResponse.data).find('#modalAjax');
            }
          }
        });
      }();
      ! function () {
        var handle = '*[data-handle="modalImage"]';
        $(doc).find(handle).magnificPopup({
          type: 'image',
          removalDelay: 400,
          callbacks: {
            open: function () {
              $(body).off('mousewheel');
            },
            close: function () {
              ieMouseWheel();
            },
            beforeOpen: function () {
              this.st.mainClass = this.st.el.attr('data-modal');
            }
          }
        });
      }();
    }();
  });
  function modalOpen() {
    posY = $(window).scrollTop();
    $('html').css({
      position: 'fixed',
      width: '100%',
      top: -1 * posY
    }).addClass('is-modal');
  }

  function modalClose() {
    $('html').removeAttr('style class');
    $('html, body').prop({
      scrollTop: posY
    });
  }
  // IEスクロール制御
  function ieMouseWheel() {
    if ($(body).hasClass('ua-ie') || $(body).hasClass('ua-edge')) {
      $(body).on('mousewheel', function () {
        event.preventDefault();
        var wd = event.wheelDelta;
        var csp = window.pageYOffset;
        window.scrollTo(0, csp - wd);
      });
    }
  }
}

(function ($) {
  /*==========================================================================
  /  グローバル変数
  /==========================================================================*/
  window.doc = document;
  window.win = window;
  window.body = 'body';
  window.click = 'click';
  window.active = 'is-active';
  window.disable = 'is-disable';
  window.show = 'is-show';
  window.slideMove = true;
  window.mql = matchMedia('(min-width: 769px)');
  window.selectLang = 'LANG_residentevil_village';
  window.selectLangCookie = Cookies.get(selectLang);
  window.ageGatePass = 'AGE_residentevil_village';
  window.ageUnder = 'AGE_residentevil_village_village_under';
  window.ageBirth = 'AG_residentevil_village_birth';
  window.ageGatePassCookie = Cookies.get(ageGatePass);
  window.ageUnderCookie = Cookies.get(ageUnder);
  window.ageBirthCookie = Cookies.get(ageBirth);
  window.cookieExp = 365;
  window.targetAge = 18;
  window.sessionStoragefirstVisit = sessionStorage.getItem('firstVisit');
  window.urlJp = 'https://www.capcom.co.jp/biohazard/village';
  /*==========================================================================
  /  処理
  /==========================================================================*/
  $(function () {
    // 更新アイコン
    ! function () {
      var newElem = '';
      $(newElem).addClass('ic ic-new');
      var upElem = '*[data-up="update"]';
      $(upElem).addClass('ic ic-up');
    }();
    smartPhoneVh();
    // IE Polyfill
    if ($(body).hasClass('ua-ie')) {
      iePolyfill();
    }
  });
  configuration();
  common();
  langSelect();
  mfp();
  window.addEventListener('load', smartPhoneVh);
  // IE Polyfill
  function iePolyfill() {
    function canUseArrowFunction() {
      try {
        Function('x=>1');
        return true;
      } catch (e) {
        return false;
      }
    }
    function scriptSynchronousLoader(url) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.send(null);
      if (xhr.status === 200) {
        var script = document.createElement('script');
        script.text = xhr.responseText;
        var sc = document.getElementsByTagName('script')[0];
        sc.parentNode.insertBefore(script, sc);
      }
      xhr = null;
    }
    function main() {
      if (!canUseArrowFunction()) {
        scriptSynchronousLoader('https://polyfill.io/v3/polyfill.min.js?features=es6');
      }
    }
    main();
  }
  // 100vh制御
  function smartPhoneVh() {
    if ($(body).hasClass('ua-sp') || $(body).hasClass('ua-tb')) {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh',`${vh}px`);
    }
  }
})(jQuery);
