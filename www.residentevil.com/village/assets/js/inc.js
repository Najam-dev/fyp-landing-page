/*==========================================================================
/ ヘッダー
/==========================================================================*/
if(!$('body').hasClass('gatePage')) {
    var lang = document.querySelector('html').lang;
    if(lang === 'en-US') {
        lang = 'us';
    } else if(lang === 'en-GB') {
        lang = 'uk';
    } else if(lang === 'fr') {
        lang = 'fr';
    } else if(lang === 'it') {
        lang = 'it';
    } else if(lang === 'de') {
        lang = 'de';
    } else if(lang === 'es') {
        lang = 'es';
    } else if(lang === 'pt-BR') {
        lang = 'pt-br';
    } else if(lang === 'zh-HK') {
        lang = 'hk';
    } else if(lang === 'zh-CN') {
        lang = 'cn';
    } else if(lang === 'ko') {
        lang = 'kr';
    } else if(lang === 'en') {
        lang = 'en-asia';
    } else if(lang === 'ja') {
        lang = 'jp';
    }
}
var headerHtml = 'assets/inc/'+lang+'/header.html';
var headerHtmlLayer = 'assets/inc/'+lang+'/header-layer.html';
var sitetopHtml = 'assets/inc/'+lang+'/sitetop.html';
function headerInc(dir){
    $.ajax({
        type: 'get',
        url: dir + headerHtml,
        dataType: 'html',
        success: function(data) {
            data = data.replace(/\{\$root\}/g, dir);
            $('.page-top header[data-elem="pageHeader"]').append(data);
        }
    });
}
function headerLayerInc(dir){
    $.ajax({
        type: 'get',
        url: dir + headerHtmlLayer,
        dataType: 'html',
        success: function(data) {
            data = data.replace(/\{\$root\}/g, dir);
            $('.page-layer header[data-elem="pageHeader"]').append(data);
        }
    });
}
function sitetop(dir){
    $.ajax({
        type: 'get',
        url: dir + sitetopHtml,
        dataType: 'html',
        success: function(data) {
            data = data.replace(/\{\$root\}/g, dir);
            $('.sitetop[data-elem="siteTopBtn"]').append(data);
        }
    });
}