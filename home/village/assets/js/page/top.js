(function ($) {
  /*==========================================================================
  /  変数 *グローバル変数はconfig.js
  /==========================================================================*/
  var sessionCkeck = sessionStoragefirstVisit;
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
  $(win).on('load resize', function () {
    resizefunc();
  });
  /*==========================================================================
  /  関数
  /==========================================================================*/
  function init() {
    // firstVisit
    ! function () {
      if (sessionCkeck) {
        $('#pageLoading').remove();
        $(body).addClass('is-visit');
      }
    }();
    // magnificModal
    ! function () {
      if (ageGatePassCookie != undefined && ageGatePassCookie === 'true') ;
      // トレーラー
      ! function () {
        var handle = '*[data-handle="modalPlayer"]';
        if ($(body).hasClass('ua-pc')) {
          // iframeApi
          var tag = document.createElement('script');
          tag.src = "https://www.youtube.com/iframe_api";
          var firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          // modal
          $(doc).find(handle).magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade mfp-trailer',
            removalDelay: 250,
            preloader: false,
            disableOn: function () {
              return slideMove;
            },
            iframe: {
              markup: '<div class="mfp-iframe-scaler">'+
                      '<div class="mfp-close"></div>'+
                      '<iframe class="mfp-iframe" id="mfpIframe" frameborder="0" allowfullscreen></iframe>'+
                      '</div>',
              patterns: {
                youtube: {
                  index: 'youtube.com',
                  id: function(url){
                    var url = 'v='+url.split('v=')[1],
                        start= url.split('&'),
                        arg = {},
                        ret = '',
                        origin = location.origin;
                    for(let i=0; start[i]; i++) {
                      var kv = start[i].split('=');
                      arg[kv[0]]=kv[1];
                    }
                    ret = arg['v'] + '?enablejsapi=1&origin='+origin+'';
                    if(typeof arg['start'] !== 'undefined'){
                        ret += '&start='+ arg['start'].replace('s','');
                    }
                    return ret;
                  },
                  src: 'https://www.youtube.com/embed/%id%'
                }
              }
            },
            callbacks: {
              open: function () {
                new YT.Player('mfpIframe', {
                  events: {
                    'onStateChange': onPlayerStateChange
                  }
                });
                modalOpen();
              },
              close: function () {
                modalClose();
              },
              beforeOpen: function () {
                this.st.mainClass = this.st.el.attr('data-modal');
              }
            }
          });

          function onPlayerStateChange(e) {
            if (e.data == YT.PlayerState.ENDED) {
              e.target.seekTo(0);
              e.target.stopVideo(0);
            }
          }
        }
      }();
    }();
    // Swiper
    ! function () {
      var dragSizeVal;
      // トピックス
      ! function () {
        var slider = '*[data-elem="topicsSlider"]',
          elem = '' + slider + ' .slider-list',
          swiperDestroy = true,
          source = new Array(),
          lang = $(body).attr('data-lang');
        if ($(slider).length > 0) {
          function json() {
            return $.ajax({
              type: 'GET',
              url: '' + root + '../../data/' + lang + '/topics.json',
              dataType: 'json',
              async: true
            }).then(function (data) {
              for (var i = 0; i < data.length; i++) {
                source.push(data[i]);
              }
            });
          }
          json().done(function () {
            handle(mql);
            mql.addListener(handle);

            function handle(mq) {
              var lengthVal,
                scrollWitdh;
              if (mq.matches) {
                lengthVal = 5;
                scrollWitdh = 600;
              } else {
                lengthVal = 3;
                scrollWitdh = 300;
              }
              dragSizeVal = scrollWitdh / source.length;
              var swiper = new Swiper(slider, {
                init: false,
                loop: false,
                freeMode: true,
                slidesPerView: 'auto',
                scrollbar: {
                  el: '.swiper-scrollbar-topics',
                  hide: false,
                  draggable: true,
                  snapOnRelease: false,
                  dragSize: dragSizeVal
                }
              });
              swiper.on('init', function () {
                $(elem).html('');
                for (var i in source) {
                  var sourceI = source[i];
                  if (sourceI.topIndex != false) {
                    var html;
                    html = '<li class="swiper-slide slider-list-item" data-anim="image">';
                    if (sourceI.target === '_self' || sourceI.target === '_ge'  || sourceI.target === '_geTop') {
                      html += '<a href="' + root + '../../../' + lang + '/' + sourceI.url + '">';
                    } else if (sourceI.target === 'anchor') {
                      html += '<a class="smooth-scroll" href="' + sourceI.url + '">';
                    } else {
                      html += '<a href="' + sourceI.url + '" target="' + sourceI.target + '">';
                    }
                    html += '<p class="topics-thumb"><img src="' + root + '../../' + sourceI.thumb + '" alt="' + sourceI.text + '"></p>';
                    html += '<div class="topics-text">';
                    html += '<p class="text mh">' + sourceI.text + '</p>';
                    if (sourceI.new === true) {
                      html += '<p class="date ic ic-up"><span>' + sourceI.date + '</span></p>';
                    } else {
                      html += '<p class="date"><span>' + sourceI.date + '</span></p>';
                    }
                    html += '</div>';
                    html += '</a>';
                    html += '</li>';
                    $(elem).append(html);
                  }
                }
                $('' + elem + ' .mh').matchHeight();
              });
              swiper.init();
              swiper.update();
              var slideLength = $('' + slider + ' .slider-list-item').length,
                lengthVal;
              if (mq.matches) {
                lengthVal = 5;
              } else {
                lengthVal = 3;
              }
              if (slideLength >= lengthVal) {
                $(slider).removeClass('not-slider');
                swiper.update();
                if (swiperDestroy === true) {
                  swiperDestroy = false;
                  swiper.init();
                  swiper.update();
                }
              } else {
                $(slider).addClass('not-slider');
                swiper.destroy();
                swiperDestroy = true;
              }
            }
          }).fail(function () {
            // console.log('fail');
          });
        }
      }();
      // 映像
      ! function () {
        var slider = '*[data-elem="trailerSlider"]',
          elem = '' + slider + ' .slider-list',
          source = new Array(),
          lang = $(body).attr('data-lang');
        if ($(slider).length > 0) {
          function json() {
            return $.ajax({
              type: 'GET',
              url: '' + root + '../../data/' + lang + '/trailer.json',
              dataType: 'json',
              async: true
            }).then(function (data) {
              for (var i = 0; i < data.length; i++) {
                source.push(data[i]);
              }
            });
          }
          json().done(function () {
            handle(mql);
            mql.addListener(handle);

            function handle(mq) {
              var scrollWitdh;
              if (mq.matches) {
                scrollWitdh = 600;
              } else {
                scrollWitdh = 300;
              }
              dragSizeVal = scrollWitdh / source.length;
              var swiper = new Swiper(slider, {
                init: false,
                loop: false,
                freeMode: true,
                slidesPerView: 'auto',
                scrollbar: {
                  el: '.swiper-scrollbar-trailer',
                  hide: false,
                  draggable: true,
                  snapOnRelease: false,
                  dragSize: dragSizeVal
                }
              });
              for (var i in source) {
                var sourceI = source[i];
                if (sourceI.ytid != '' || sourceI.videoUrl != '') {
                  var videoSrc,
                    videoThumb;
                  if (sourceI.ytid != '') {
                    if(sourceI.ytstart != '' && sourceI.ytstart != undefined) {
                      videoSrc = 'https://www.youtube.com/watch?v=' + sourceI.ytid + '&' + sourceI.ytstart + '';
                    } else {
                      videoSrc = 'https://www.youtube.com/watch?v=' + sourceI.ytid + '';
                    }
                  } else if (sourceI.videoUrl != '') {
                    videoSrc = sourceI.vUrl;
                  }
                  if (sourceI.thumb != '') {
                    videoThumb = sourceI.thumb;
                  } else {
                    videoThumb = 'https://img.youtube.com/vi/' + sourceI.ytid + '/maxresdefault.jpg';
                  }
                  var html;
                  if (sourceI.agecheck === true) {
                    html = '<li class="swiper-slide slider-list-item age-check age-check-trailer" data-anim="image">';
                  } else {
                    html = '<li class="swiper-slide slider-list-item" data-anim="image">';
                  }
                  if(sourceI.ytmodal === 'none') {
                    html += '<a href="' + videoSrc + '" target="_blank">';
                  } else {
                    html += '<a href="' + videoSrc + '" target="_blank" data-handle="modalPlayer" data-modal="mfp-fade mfp-trailer">';
                  }
                  html += '<p class="video-thumb"><img src="' + videoThumb + '" alt="' + sourceI.text + '"></p>';
                  html += '<div class="video-text">';
                  html += '<p class="ttl">' + sourceI.text + '</p>';
                  if (sourceI.new === true) {
                    html += '<p class="date ic ic-up"><span>' + sourceI.date + '</span></p>';
                  } else {
                    html += '<p class="date">' + sourceI.date + '</p>';
                  }
                  html += '</div>';
                  html += '</a>';
                  html += '</li>';
                  $(elem).append(html);
                }
              }
              swiper.on('init', function () {
                var handle = '' + slider + ' *[data-handle="modalPlayer"]';
                if ($(body).hasClass('ua-pc')) {
                  // iframeApi
                  var tag = document.createElement('script');
                  tag.src = "https://www.youtube.com/iframe_api";
                  var firstScriptTag = document.getElementsByTagName('script')[0];
                  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                  // modal
                  $(doc).find(handle).magnificPopup({
                    type: 'iframe',
                    mainClass: 'mfp-fade mfp-trailer',
                    removalDelay: 250,
                    preloader: false,
                    disableOn: function () {
                      return slideMove;
                    },
                    iframe: {
                      markup: '<div class="mfp-iframe-scaler">' + '<div class="mfp-close"></div>' + '<iframe class="mfp-iframe" id="mfpIframe" frameborder="0" allowfullscreen></iframe>' + '</div>',
                      patterns: {
                        youtube: {
                          index: 'youtube.com',
                          id: function (url) {
                            var url = 'v=' + url.split('v=')[1],
                              start = url.split('&'),
                              arg = {},
                              ret = '';
                            for (var i = 0; start[i]; i++) {
                              var kv = start[i].split('=');
                              arg[kv[0]] = kv[1];
                            }
                            ret = arg['v'] + '?enablejsapi=1';
                            if (typeof arg['start'] !== 'undefined') {
                              ret += '&start=' + arg['start'].replace('s', '');
                            }
                            return ret;
                          },
                          src: 'https://www.youtube.com/embed/%id%'
                        }
                      }
                    },
                    callbacks: {
                      open: function () {
                        new YT.Player('mfpIframe', {
                          events: {
                            'onStateChange': onPlayerStateChange
                          }
                        });
                        modalOpen();
                        $('.modal-movie').addClass('is-modal-effect');
                      },
                      close: function () {
                        setTimeout(function () {
                          modalClose();
                        }, 250);
                      },
                      beforeOpen: function () {
                        this.st.mainClass = this.st.el.attr('data-modal');
                      }
                    }
                  });

                  function onPlayerStateChange(e) {
                    if (e.data == YT.PlayerState.ENDED) {
                      e.target.seekTo(0);
                      e.target.stopVideo(0);
                    }
                  }
                }
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
                }();
              });
              swiper.init();
            }
          }).fail(function () {
            // console.log('fail');
          });
        }
      }();
      // キャラクター
      ! function () {
        var sliderThumb = '*[data-elem="characterThumbSlider"]',
          slider = '*[data-elem="characterSlider"]';
        //サムネイル
        var swiperThumb = new Swiper(sliderThumb, {
          slidesPerColumn: 2,
          slidesPerColumnFill: 'row',
          slideToClickedSlide: true,
          slidesPerView: 7,
          touchRatio: 0,
          watchSlidesVisibility: true,
          watchSlidesProgress: true,
          breakpoints: {
            768: {
              slidesPerColumnFill: 'row',
              slidesPerColumn: 3,
              slidesPerView: 3
            }
          }
        });
        //スライダー
        new Swiper(slider, {
          effect: 'fade',
          fadeEffect: {
            crossFade: true
          },
          loop: true,
          speed: 1200,
          navigation: {
            nextEl: '.swiper-button-next-character',
            prevEl: '.swiper-button-prev-character',
          },
          thumbs: {
            swiper: swiperThumb
          }
        });
      }();
      // ゲームプレイ
      ! function () {
        var sliderThumbCombat = '*[data-elem="gameplayThumbSliderCombat"]',
          sliderCombat = '*[data-elem="gameplaySliderCombat"]',
          sliderThumbResource = '*[data-elem="gameplayThumbSliderResource"]',
          sliderResource = '*[data-elem="gameplaySliderResource"]';
        //スライダー
        var swiperCombat = new Swiper(sliderCombat, {
          slidesPerView: 1,
          allowTouchMove: false,
          effect: 'fade',
          fadeEffect: {
            crossFade: true
          },
          speed: 1200,
          loop: true,
          on: {
            slideChange: function () {
              $('' + sliderCombat + ' .video-player iframe').remove();
              $('' + sliderCombat + ' .video-player').removeClass('is-play');
            },
            slideChangeTransitionEnd: function () {
              if ($('#iframePlayerCombat').length === 0) {
                $('' + sliderCombat + ' .video-player').append('<div class="video-player-item" id="iframePlayerCombat"></div>');
              }
            }
          }
        });
        var swiperThumbCombat = new Swiper(sliderThumbCombat, {
          slidesPerView: 1,
          effect: 'fade',
          fadeEffect: {
            crossFade: true
          },
          speed: 600,
          loop: true,
          navigation: {
            nextEl: '.swiper-button-next-combat',
            prevEl: '.swiper-button-prev-combat'
          },
          pagination: {
            el: '.swiper-pagination-combat',
            type: 'custom',
            renderCustom: function (swiper, current, total) {
              return '<span class="swiper-pagination-current">' + ('0' + current).slice(-2) + '</span>' + '&emsp;/&emsp;' + '' + ('0' + total).slice(-2) + '';
            }
          },
          thumbs: {
            swiper: swiperCombat
          }
        });
        //スライダー
        var swiperResource = new Swiper(sliderResource, {
          slidesPerView: 1,
          allowTouchMove: false,
          effect: 'fade',
          fadeEffect: {
            crossFade: true
          },
          speed: 1200,
          loop: true,
          on: {
            slideChange: function () {
              $('' + sliderResource + ' .video-player iframe').remove();
              $('' + sliderResource + ' .video-player').removeClass('is-play');
            },
            slideChangeTransitionEnd: function () {
              if ($('#iframePlayerResource').length === 0) {
                $('' + sliderResource + ' .video-player').append('<div class="video-player-item" id="iframePlayerResource"></div>');
              }
            }
          }
        });
        //サムネイル
        var swiperThumbResource = new Swiper(sliderThumbResource, {
          slidesPerView: 1,
          effect: 'fade',
          fadeEffect: {
            crossFade: true
          },
          speed: 600,
          loop: true,
          navigation: {
            nextEl: '.swiper-button-next-resource',
            prevEl: '.swiper-button-prev-resource'
          },
          pagination: {
            el: '.swiper-pagination-resource',
            type: 'custom',
            renderCustom: function (swiper, current, total) {
              return '<span class="swiper-pagination-current">' + ('0' + current).slice(-2) + '</span>' + '&emsp;/&emsp;' + '' + ('0' + total).slice(-2) + '';
            }
          },
          thumbs: {
            swiper: swiperResource
          }
        });
        swiperThumbCombat.update();
        swiperCombat.update();
        swiperThumbResource.update();
        swiperResource.update();
        $(doc).on(click, 'a[data-handle="iframePlayer"]', function (e) {
          e.preventDefault();
          var youtubeId = $(this).attr('data-yt'),
            elemId = $(this).parents('.slider-list').next('.video-player').find('.video-player-item').attr('id');
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
              'onStateChange': onPlayerStateChange
            }
          });
          $(this).parents('.slider-list').next('.video-player').addClass('is-play');
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
      }();
    }();
    ! function () {
      var snowflake = '../assets/images/texture_snow.png';
      var count = 3000;
      var wind = {
        current: 0,
        force: 0.1,
        target: 0.1,
        min: 0.1,
        max: 0.3,
        easing: 0.01
      };
      new ShaderProgram(document.querySelector('div[data-elem="effectBg"]'), {
        depthTest: false,
        texture: snowflake,
        uniforms: {
          worldSize: {
            type: 'vec3',
            value: [0, 0, 0]
          },
          gravity: {
            type: 'float',
            value: 100
          },
          wind: {
            type: 'float',
            value: 0
          }
        },
        buffers: {
          size: {
            size: 1,
            data: []
          },
          rotation: {
            size: 3,
            data: []
          },
          speed: {
            size: 3,
            data: []
          }
        },
        vertex: "\n        precision highp float;\n        attribute vec4 a_position;\n        attribute vec4 a_color;\n        attribute vec3 a_rotation;\n        attribute vec3 a_speed;\n        attribute float a_size;\n        uniform float u_time;\n        uniform vec2 u_mousemove;\n        uniform vec2 u_resolution;\n        uniform mat4 u_projection;\n        uniform vec3 u_worldSize;\n        uniform float u_gravity;\n        uniform float u_wind;\n        varying vec4 v_color;\n        varying float v_rotation;\n        void main() {\n          v_color = a_color;\n          v_rotation = a_rotation.x + u_time * a_rotation.y;\n          vec3 pos = a_position.xyz;\n          pos.x = mod(pos.x + u_time + u_wind * a_speed.x, u_worldSize.x * 2.0) - u_worldSize.x;\n          pos.y = mod(pos.y - u_time * a_speed.y * u_gravity, u_worldSize.y * 2.0) - u_worldSize.y;\n          pos.x += sin(u_time * a_speed.z) * a_rotation.z;\n          pos.z += cos(u_time * a_speed.z) * a_rotation.z;\n          gl_Position = u_projection * vec4( pos.xyz, a_position.w );\n          gl_PointSize = ( a_size / gl_Position.w ) * 100.0;\n        }",
        fragment: "\n        precision highp float;\n        uniform sampler2D u_texture;\n        varying vec4 v_color;\n        varying float v_rotation;\n        void main() {\n          vec2 rotated = vec2(\n            cos(v_rotation) * (gl_PointCoord.x - 0.5) + sin(v_rotation) * (gl_PointCoord.y - 0.5) + 0.5,\n            cos(v_rotation) * (gl_PointCoord.y - 0.5) - sin(v_rotation) * (gl_PointCoord.x - 0.5) + 0.5\n          );\n          vec4 snowflake = texture2D(u_texture, rotated);\n          gl_FragColor = vec4(snowflake.rgb, snowflake.a * v_color.a);\n        }",
        onResize: function onResize(w, h, dpi) {
          var position = [],
            color = [],
            size = [],
            rotation = [],
            speed = [],
            sizeW;
          var height = 110;
          var width = w / h * height;
          var depth = 90;
          Array.from({
            length: w / h * count
          }, function (snowflake) {
            position.push(-width + Math.random() * width * 2, -height + Math.random() * height * 2, Math.random() * depth * 2);
            speed.push(0.2 + Math.random(), 0.8 + Math.random(), Math.random() * 3);
            rotation.push(Math.random() * 2 * Math.PI, Math.random() * 20, Math.random() * 10);
            color.push(1, 1, 1, 0.2 + Math.random() * 0.2);
            if (w > 1024) {
              sizeW = 1366;
            } else {
              sizeW = 1080;
            }
            size.push(5 * Math.random() * 5 * (h * dpi / sizeW));
          });
          this.uniforms.worldSize = [width, height, depth];
          this.buffers.position = position;
          this.buffers.color = color;
          this.buffers.rotation = rotation;
          this.buffers.size = size;
          this.buffers.speed = speed;
        },
        onUpdate: function onUpdate(delta) {
          wind.force += (wind.target - wind.force) * wind.easing;
          wind.current += wind.force * (delta * 0.4);
          this.uniforms.wind = wind.current;
          if (Math.random() > 0.995) {
            wind.target = (wind.min + Math.random() * (wind.max - wind.min)) * (Math.random() > 0.5 ? 0.4 : 1);
          }
        }
      });
    }();
    // BgMovie
    ! function () {
      var embed = embed || {};
      var setIdVal = 'player0';
      embed.youtube = {
        opt: {
          stopWaitTime: 6000
        },
        init: function () {
          this.setParameters();
          this.prepare();
        },
        setParameters: function () {
          this.player = null;
          this.done = false;
          this.elem = document.querySelectorAll('*[data-elem="playerBackground"]');
        },
        prepare: function () {
          this.addAPI();
          this.setId();
          this.changePath();
          window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady;
        },
        addAPI: function () {
          var tag = document.createElement('script');
          tag.src = "https://www.youtube.com/iframe_api";
          var firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        },
        setId: function () {
          for (var i = 0; i < this.elem.length; i++) {
            this.elem[i].id = setIdVal + i;
          }
        },
        onYouTubeIframeAPIReady: function () {
          for (var i = 0; i < this.elem.length; i++) {
            var youtubeId = $('#' + setIdVal + i + '').attr('data-movie');
            this.player = new YT.Player(setIdVal + i, {
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
                'onReady': this.onPlayerReady,
                'onStateChange': this.onPlayerStateChange
              }
            });
          }
        },
        onPlayerReady: function (e) {
          e.target.mute();
          e.target.seekTo(0);
          e.target.playVideo();
        },
        onPlayerStateChange: function (e) {
          var duration = e.target.getDuration() * 1000 - 1000;
          if (e.data === YT.PlayerState.PLAYING) {
            setTimeout(function () {
              e.target.mute();
              e.target.seekTo(0);
              e.target.playVideo();
            }, duration);
          }
          if (e.data === YT.PlayerState.ENDED) {
            var youtubeUrl = e.target.getVideoUrl(),
              youtubeId = youtubeUrl.split('v=')[1];
            e.target.mute();
            e.target.seekTo(0);
            e.target.loadVideoById(youtubeId);
          }
        },
        changePath: function () {
          this.onPlayerReady = this.onPlayerReady.bind(this);
          this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
          this.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady.bind(this);
        }
      };
      embed.youtube.init();
      $(doc).on(click, '*[data-handle="modalPlayer"]', function () {
        vc('pauseVideo');
      });
      $(doc).on(click, '.mfp-close,.mfp-container', function () {
        vc('playVideo');
      });
    }();
  }

  function loadfunc() {
    ! function () {
      if (!sessionCkeck) {
        $.when($('#pageLoading').remove()).then($(body).addClass('is-fvFx'));
        sessionStorage.setItem('firstVisit', true);
      } else {
        $('#pageLoading').remove();
        $(body).addClass('is-visit');
      }
    }();
  }

  function scrollfunc() {
    ! function () {
      var elemSec = '*[data-elem="sec"]',
        animText = '*[data-anim="text"]',
        animImage = '*[data-anim="image"]',
        animSec = '*[data-anim="elem"]',
        animFadeIn = '*[data-anim="fadeIn"]';
      $(elemSec).each(function () {
        var position = $(win).scrollTop(),
          winH = $(win).height();
          $(this).offset().top;
          var productOffset = $('#product').offset().top;
        if (position > 10) {
          $(body).addClass('is-scrFixedFx');
        } else {
          if (!$('html').hasClass('is-modal')) {
            $(body).removeClass('is-scrFixedFx');
          }
        }
        if (position > 100) {
          $(body).addClass('is-scrFx');
        } else {
          if (!$('html').hasClass('is-modal')) {
            $(body).removeClass('is-scrFx');
          }
        }
        if (position + winH > productOffset) {
          $('*[data-elem="buyBtn"]').addClass('is-hide');
        } else {
          if (!$('html').hasClass('is-modal')) {
            $('*[data-elem="buyBtn"]').removeClass('is-hide');
          }
        }
      });
      $(animText).each(function () {
        var position = $(win).scrollTop(),
          winH = $(win).height(),
          thisOffset = $(this).offset().top,
          animPos = position + (winH / 1.2) > thisOffset;
        if (animPos) {
          $(this).addClass('is-anim');
        }
      });
      $(animImage).each(function () {
        var position = $(win).scrollTop(),
          winH = $(win).height(),
          thisOffset = $(this).offset().top,
          animPos = position + (winH / 1.2) > thisOffset;
        if (animPos) {
          $(this).addClass('is-anim');
        }
      });
      $(animSec).each(function () {
        var position = $(win).scrollTop(),
          winH = $(win).height(),
          thisOffset = $(this).offset().top,
          animPos = position + (winH / 1.2) > thisOffset;
        if (animPos) {
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

  function resizefunc() {
    backgroundReSize();
  }
  // 背景リサイズ
  function backgroundReSize() {
    var movieW = 1920,
      movieH = (movieW / 16) * 9,
      // ウインドウサイズ
      winW = $(win).width(),
      winH = $(win).height(),
      // 拡大サイズ
      scaleW = winW / movieW,
      scaleH = winH / movieH,
      fixScale = Math.max(scaleW, scaleH),
      // サイズ設定
      setW = movieW * fixScale,
      setH = movieH * fixScale;
    // スタイル設定
    $('*[data-elem="effectBg"]').find('.effect-bg-video, .effect-bg-eye').css({
      'width': setW,
      'height': setH
    });
  }

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

  function vc(action) {
    var elem = '#bgMoviePlayer';
    $(elem).each(function () {
      var pw = $(this)[0].contentWindow;
      pw.postMessage('{"event":"command","func":"' + action + '","args":""}', '*');
    });
  }
  // root
  for (var root, dir = document.getElementsByTagName("script"), i = dir.length; i--;) {
    var match = dir[i].src.match(/(^|.*\/)top\.js$/);
    if (match) {
      root = match[1];
      break
    }
  }
})(jQuery);
