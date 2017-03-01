'use strict';

/* Make jQuery available in global */
console.log(`jQuery ${$.fn.jquery} is loaded`);
window.$ = $;
window.jQuery = $;

/* Import project styles and components */
import '../sass/css.scss';
import OnResize from './modules/resize';
import scrollup from './modules/scrollup';
import 'script!picturefill/dist/picturefill.min';

/* Define project components and variables */
var	isMap = $('#map').is('#map'),
		isSlider = $('.slider').is('.slider'),
		mobileView = window.matchMedia("(max-width: 992px)").matches,
		scrollTiming = 0;

/**********************
********* MAP *********
***********************/

if ( isMap ) {

	require.ensure([], (require) => {
		require('./modules/ymap');
	});

}

/***********************
******** SLIDER ********
************************/


if ( isSlider ) {

	require.ensure([], (require) => {
		require('script!slick-carousel/slick/slick.js');
		$('.slider').slick({
			prevArrow: $('.left'),
			nextArrow: $('.right'),
			dots: true,
			appendDots: $('.slider-dots')
		});
	});

}

/************************
******* Scroll Up *******
*************************/

$(document).scroll(function(){

	if ( !scrollTiming ) {

		scrollTiming = setTimeout(function(){

			var scroll = $('body').scrollTop() ? $('body').scrollTop() : $('html').scrollTop();
			scroll >= 300 ? $('.scrollup').addClass('act') : $('.scrollup').removeClass('act');
			scrollTiming = 0;

		},300);

	}

});

$('.scrollup').scrollUp();

/************************
********* Ravno *********
*************************/

require('./modules/ravno');

setTimeout(function(){
	var cases = document.querySelectorAll('.case');

	Array.prototype.forEach.call(cases, function(i){
		console.log(i.clientHeight);
	});
}, 1000);

//$('.feedback__block').ravno();
