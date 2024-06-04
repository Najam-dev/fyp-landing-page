/*---------------------
  Var
---------------------*/
// 共通ID
const gtmId = 'GTM-WMXS5R4';
// 言語判定
const targetlang = document.querySelector('html').lang,
			usCond = targetlang === 'en-US' || targetlang === 'pt-BR',
			productCond = targetlang === 'en-US' || targetlang === 'en-GB' || targetlang === 'fr' || targetlang === 'it' || targetlang === 'de' || targetlang === 'es';
// ページ判定
const url = location.href,
			productDir = '/product/';
/*---------------------
	共通GTM
---------------------*/
// 共通
let gtmScr = document.createElement('script');
let gtmAdd = document.getElementsByTagName('script')[0];
gtmAdd.parentNode.appendChild(gtmScr, gtmAdd);
gtmScr.innerHTML = "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','"+gtmId+"');";
/*---------------------
	各言語用GTM
---------------------*/
// US/pt-BR
if(usCond) {
	const gtmIdCusa = 'GTM-K4Q43TB';
	let gtmScr = document.createElement('script');
	let gtmAdd = document.getElementsByTagName('script')[0];
	gtmAdd.parentNode.appendChild(gtmScr, gtmAdd);
	gtmScr.innerHTML = "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','"+gtmIdCusa+"');";
}
// US/EU
if(productCond) {
	// 製品ページ
	if(url.indexOf(productDir) > -1){
		// GTM
		const gtmIdProduct = "GTM-5ZTHV8P";
		let gtmScr = document.createElement('script');
		let gtmAdd = document.getElementsByTagName('script')[0];
		gtmAdd.parentNode.appendChild(gtmScr, gtmAdd);
		gtmScr.innerHTML = "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','"+gtmIdProduct+"');";
	}
}
