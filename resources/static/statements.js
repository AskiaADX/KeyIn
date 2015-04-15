(function ($) {
	"use strict";

	$.fn.adcStatements = function adcStatements(options) {
		
		(options.responseWidth = options.responseWidth || "auto");
		(options.responseHeight = options.responseHeight || "auto");
		(options.isSingle = Boolean(options.isSingle));
		(options.isMultiple = Boolean(options.isMultiple));
		(options.animate = Boolean(options.animate));
		(options.autoForward = Boolean(options.autoForward));
		(options.useRange = Boolean(options.useRange));
						
		// Delegate .transition() calls to .animate() if the browser can't do CSS transitions.
		if (!$.support.transition) $.fn.transition = $.fn.animate;
		
		$(this).css({'max-width':options.maxWidth,'width':options.controlWidth});
		$(this).parents('.controlContainer').css({'width':'100%','overflow':'hidden'});
		
		if ( options.controlAlign === "center" ) {
			$(this).parents('.controlContainer').css({'text-align':'center'});
			$(this).css({'margin':'0px auto'});
		} else if ( options.controlAlign === "right" ) {
			$(this).css({'margin':'0 0 0 auto'});
		}
		
		if ( options.columns > 1 )  {
			/*$('.column').width( (100/options.columns) + '%' ).css('float','left')*/ 
			$('.column').css({'display':'block','width':'100%'});
			$('.responseItem').css({'display':'block','float':'left'});
		}
		
		// Global variables
		var $container = $(this),
			items = options.items,
            isMultiple = options.isMultiple;
			
		// Convert RGB to hex
		function trim(arg) {
			return arg.replace(/^\s+|\s+$/g, "");
		}
		function isNumeric(arg) {
			return !isNaN(parseFloat(arg)) && isFinite(arg);
		}
		function isRgb(arg) {
			arg = trim(arg);
			return isNumeric(arg) && arg >= 0 && arg <= 255;
		}
		function rgbToHex(arg) {
			arg = parseInt(arg, 10).toString(16);
			return arg.length === 1 ? '0' + arg : arg; 
		}
		function processRgb(arg) {
			arg = arg.split(',');
	
			if ( (arg.length === 3 || arg.length === 4) && isRgb(arg[0]) && isRgb(arg[1]) && isRgb(arg[2]) ) {
				if (arg.length === 4 && !isNumeric(arg[3])) { return null; }
				return '#' + rgbToHex(arg[0]).toUpperCase() + rgbToHex(arg[1]).toUpperCase() + rgbToHex(arg[2]).toUpperCase();
			}
			else {
				return null;
			}
		}
		
		// For multi-coded question
		// Add the @valueToAdd in @currentValue (without duplicate)
		// and return the new value
		function addValue(currentValue, valueToAdd) {
			if (currentValue == '') {
				return valueToAdd;
			}

			var arr = String(currentValue).split(','), i, l, wasFound = false;

			for (i = 0, l = arr.length; i < l; i += 1) {
				if (arr[i] == valueToAdd) {
					wasFound = true;
					break;
				}
			}

			if (!wasFound) {
				currentValue += ',' + valueToAdd;
			}
			return currentValue;
		}

		// For multi-coded question
		// Remove the @valueToRemove from the @currentValue
		// and return the new value
		function removeValue(currentValue, valueToRemove) {
			if (currentValue === '') {
				return currentValue;
			}
			var arr = String(currentValue).split(','),
                        i, l,
                        newArray = [];
			for (i = 0, l = arr.length; i < l; i += 1) {
				if (arr[i] != valueToRemove) {
					newArray.push(arr[i]);
				}
			}
			currentValue = newArray.join(',');
			return currentValue;
		}
		
		// Select a statement
		// @this = target node
		function selectStatementSingle() {

			var $input = items[0].element,
				$target = $(this),
				value = $target.data('value');

			$container.find('.selected').removeClass('selected');
			$target.addClass('selected');
			$input.val(value);
			
			// if auto forward do something
			if ( options.autoForward ) $(':input[name=Next]:last').click();
		}
		
		// Select a statement for multiple
		// @this = target node
		function selectStatementMulitple() {
			
			var $target = $(this),
				value = $target.data('value'),
				$input = items[$target.data('id')].element,
				isExclusive = Boolean(items[$target.data('id')].isExclusive),
				currentValue = $input.val();

			if ($target.hasClass('selected')) {
				// Un-select

				$target.removeClass('selected');
				//$input.prop('checked', false);
				currentValue = removeValue(currentValue, value);
			} else {

				// Select

				if (!isExclusive) {
					
					// Check if any exclusive
					currentValue = addValue(currentValue, value);

					// Un-select all exclusives
					$container.find('.exclusive').each(function forEachExclusives() {
						$(this).removeClass('selected');
						currentValue = removeValue(currentValue, $(this).data('value'));
					});

				} else {

					// When exclusive un-select all others
					$container.find('.selected').removeClass('selected');
					currentValue = value;

				}
				$target.addClass('selected');
			}

			// Update the value
			$input.val(currentValue);
		}
		
		// Check for missing images and resize
		$container.find('.responseItem img').each(function forEachImage() {
			var size = {
				width: $(this).width(),
				height: $(this).height()
			};
			
			if (options.forceImageSize === "height" ) {
				if ( size.height > parseInt(options.maxImageHeight,10) ) {
					var ratio = ( parseInt(options.maxImageHeight,10) / size.height);
					size.height *= ratio,
					size.width  *= ratio;
				}
			} else if (options.forceImageSize === "width" ) {
				if ( size.width > parseInt(options.maxImageWidth,10) ) {
					var ratio = ( parseInt(options.maxImageWidth,10) / size.width);
					size.width  *= ratio,
					size.height *= ratio;
				}
				
			} else if (options.forceImageSize === "both" ) {
				if ( parseInt(options.maxImageHeight,10) > 0 && size.height > parseInt(options.maxImageHeight,10) ) {
					var ratio = ( parseInt(options.maxImageHeight,10) / size.height);
					size.height *= ratio,
					size.width  *= ratio;
				}
	
				if ( parseInt(options.maxImageWidth,10) > 0 && size.width > parseInt(options.maxImageWidth,10) ) {
					var ratio = ( parseInt(options.maxImageWidth,10) / size.width);
					size.width  *= ratio,
					size.height *= ratio;
				}
				
			} 
			$(this).css(size);
		});
		
		// If image align is center
		if (options.imageAlign === "center") {
			$('.responseItem img').css({'margin-left':'auto','margin-right':'auto'});
			$('.responseItem').css({'text-align':'center'});
		}
		
		// add ns to last x items
		if ( options.numberNS > 0 ) $('.responseItem').slice(-options.numberNS).addClass('ns');
		
		// Use range if on
		if ( options.useRange ) {
			var maxNumber = $('.responseItem').size() - options.numberNS;
			var rangeArray = options.range.split(';');
			
			var rainbow1 = new Rainbow();
				rainbow1.setSpectrum(processRgb(rangeArray[0]), processRgb(rangeArray[2]));
				rainbow1.setNumberRange(0, maxNumber);
			var rainbow2 = new Rainbow();
				rainbow2.setSpectrum(processRgb(rangeArray[1]), processRgb(rangeArray[3]));
				rainbow2.setNumberRange(0, maxNumber);
			$('.responseItem').slice(0,(options.numberNS > 0)?0-options.numberNS:$('.responseItem').size()).each(function( index ) {
				$(this).css({ 'background': '#'+rainbow1.colourAt(index) });
				$(this).css({ 'background': '-webkit-gradient(linear, 0 0, 0 100%, from(#'+rainbow1.colourAt(index)+') to(#'+rainbow2.colourAt(index)+'))' });
				$(this).css({ 'background': '-webkit-linear-gradient(#'+rainbow1.colourAt(index)+',#'+rainbow2.colourAt(index)+')' });
				$(this).css({ 'background': '-moz-linear-gradient(#'+rainbow1.colourAt(index)+',#'+rainbow2.colourAt(index)+')' });
				$(this).css({ 'background': '-ms-linear-gradient(#'+rainbow1.colourAt(index)+',#'+rainbow2.colourAt(index)+')' });
				$(this).css({ 'background': '-o-linear-gradient(#'+rainbow1.colourAt(index)+',#'+rainbow2.colourAt(index)+')' });
				$(this).css({ 'background': 'linear-gradient(#'+rainbow1.colourAt(index)+',#'+rainbow2.colourAt(index)+')' });
				$(this).css({ '-pie-background': 'linear-gradient(#'+rainbow1.colourAt(index)+',#'+rainbow2.colourAt(index)+')' });
				$(this).addClass('active').removeClass('active');
			});
		}
		
		// Retrieve previous selection
		if ( !isMultiple ) {
			
			var $input = items[0].element;
			var currentValue = $input.val();
								
			$container.find('.responseItem').each(function () {
				var value = $(this).data('value'),
					isSelected = $(this).data('value') == currentValue ? true : false;
				if (isSelected) {
					$(this).addClass('selected');
				} else {
					$(this).removeClass('selected');
				}
			});
		
		} else if ( isMultiple ) {
			
			var $input = items[0].element;
			var currentValues = String($input.val()).split(","),
				currentValue;
			
			for ( var i=0; i<currentValues.length; i++ ) {
				//currentValue = items[i].element.val();
				currentValue = currentValues[i];
				$container.find('.responseItem').each(function () {
					var value = $(this).data('value'),
						isSelected = $(this).data('value') == currentValue ? true : false;
					if (isSelected) {
						$(this).addClass('selected');
					}
				});
				
			}
		}
		
		// Attach all events
		/*$container
			.delegate('.responseItem', 'click', (!isMultiple) ? selectStatementSingle : selectStatementMulitple);*/
		
		$container.on('click', '.responseItem', (!isMultiple) ? selectStatementSingle : selectStatementMulitple);
		
		if ( options.animate ) {
			var delay = 0,
				easing = (!$.support.transition)?'swing':'snap';
			
			$container.find('.responseItem').each(function forEachItem() {
				$(this).css({ y: 2000, opacity: 0 }).transition({ y: 0, opacity: 1, delay: delay }, options.animationSpeed, easing);
				delay += 30;
			});
		}

		// Returns the container
		return this;
	};

} (jQuery));