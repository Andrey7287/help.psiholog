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
		mobileView = window.matchMedia("(max-width: 768px)").matches,
		resizeAlign = new OnResize,
		scrollTiming = 0,
		scrollTimingH = 0;

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
******* Smooth scroll *******
*************************/

$('a[href^="#"]').click(function(e){

	e.preventDefault();

	var target = $(this).attr('href'),
			headerHeight = $('header').outerHeight(),
			scrollTo = $(''+target).offset().top - headerHeight;

	$('html, body').animate({scrollTop: scrollTo}, 800);

});

/************************
********* Ravno *********
*************************/

require('./modules/ravno');

function AlignAll(){

	var mobileView = window.matchMedia("(max-width: 768px)").matches;

	if(mobileView) {
		$('.case').add('.feedback__block').add('.price__subj').outerHeight('auto');
		return;
	};

	setTimeout(function(){
		$('.case').ravno();
	}, 1000);

	$('.feedback__block').ravno();
	$('.price__subj').ravno();
}

resizeAlign.bind(AlignAll);


/************************
****** Mobile menu ******
*************************/

$('.c-hamburger').on('click', function(){
	$(this).toggleClass('is-active');
	$('header').toggleClass('scroll');
	$('.site-nav').slideToggle();
});


/*************************
********* HEADER *********
**************************/

$(document).scroll(function(){

	if ( !scrollTimingH ) {

		scrollTiming = setTimeout(function(){

			var scroll = $('body').scrollTop() ? $('body').scrollTop() : $('html').scrollTop();
			scroll >= 60 ? $('header').addClass('scroll') : $('header').removeClass('scroll');
			scrollTiming = 0;

		},300);

	}

});
