/*jshint esversion: 6 */

var req = require.context("./img", true, /\.(jpg?g|png|gif|svg)$/i);
req.keys().forEach(function(key){
    req(key);
});
import css from './main.css';

import './scroll.scss';

let Thumbslider = (() => {
  let totalWidth = 0;
	let positions = [];
  var timeouts = [];

  function getNumberOfSlides() {
    let numberOfSlides = 0;
    $('#slides .slide').each(function() {
      numberOfSlides++;
    })
    return numberOfSlides;
  }

  function getSlidersWidth(sliderDiv) {
    $(sliderDiv).each(function(i) {
      positions[i] = totalWidth;
      totalWidth += $(sliderDiv).width();
    })
    if(!$(sliderDiv).width()){
			alert('Please add a width to your images');
			return false;
		}
    return totalWidth;
  }

  function makeFirstImageActive() {
    $('#menu ul li.product:first').addClass('active').siblings().addClass('inactive');
  }

  function setSlidersWidth(slidesContainer) {
    $(slidesContainer).width(getSlidersWidth('#slides .slide'));
  }

  function menuClickHandler(evt) {
    $('li.product').removeClass('active').addClass('inactive');
		// Add active class to parent
		$(this).parent().addClass('active');

		var position  = $(this).parent().prevAll('.product').length;

		$('#slides').stop().animate({marginLeft:-positions[position]+'px'}, 450);
		// Prevent default
		evt.preventDefault();
  }

  function autoScrollHandler(evt) {

    var timeout = function(index, link) {
          var timeoutId = setTimeout(function() {
          $(link).trigger('click', [true]);
        },1000*index);
        return timeoutId;
      };

    if ($(evt.target).is(':checked')) {
      $('#menu ul li a').each(function(index, link) {
            timeout(index, link);
            timeouts.push(timeout(index, link))
          });

    } else {
      for (let i = 0; i < timeouts.length; i++) {
            clearTimeout(timeouts[i])
        }

      $('li.product').each(function(index, div) {
        $(div).removeClass('active').addClass('inactive');
      })
      $('li.product').first().removeClass('inactive').addClass('active').children().trigger('click', [true]);

    }
  }

  function init() {
    makeFirstImageActive();
    setSlidersWidth('#slides');
    $('#menu ul li a').on('click', menuClickHandler);
    $('input[type=checkbox]').on('click', autoScrollHandler);
  }

  return {
    init: init
  }
})();

$(document).ready(function(){
	Thumbslider.init();
});
