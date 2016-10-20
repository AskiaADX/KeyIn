(function($) {

  $.fn.adcKeyIn = function adcKeyIn(options) {
	var $container = $(this);
    var items = options.items;
    var codeViewerDisplay = options.codeViewerDisplay;
    var maxEntryCodeLength = 1;
    var currentEntryCode = "";

    var nextItemCode = options.nextItemCode;
    var clearItemCode = options.clearItemCode;

    function setupItems() {
      for (var i = 0; i < items.length; i++) {
        var curEntryCode = items[i].entryCode;
        var entryCodeLength = curEntryCode.toString().length;

        if (entryCodeLength > maxEntryCodeLength) {
          maxEntryCodeLength = entryCodeLength;
        }
      }
    }

    setupItems();

    function modifyResponseCodeLength() {
      $container.find(".response_entryCode").each(function() {
        var thisEntryCode = $(this).text();
        if (thisEntryCode.length < maxEntryCodeLength) {
          var newText = '0' + $(this).text();
          $(this).text(newText);
        }
      });
    }

    $(this).bind('keypress', function(e) {
      var keyPressValue = getStringFromKeycode(e);
	  var evt = e || window.event;
      if (evt.target.tagName === "TEXTAREA") return;
      if (!isNaN(keyPressValue)) { //if keyboard entry is number
        if (currentEntryCode.length < maxEntryCodeLength) {
          currentEntryCode += keyPressValue;
        } else {
          currentEntryCode = keyPressValue.toString();
        }

        $(this).find('#background-mask span').text(prependWithDashes(currentEntryCode));

        if (currentEntryCode.length == maxEntryCodeLength) {
          selectByEntryCode(parseInt(currentEntryCode, 10));
        }
      } else { //if keyboard entry is not a number
        if (keyPressValue == nextItemCode) {
          selectByEntryCode(parseInt(currentEntryCode, 10));
          currentEntryCode = "";
          $(this).find('#background-mask span').text(getMaxDashes());
        } else if (keyPressValue == clearItemCode) {
          currentEntryCode = "";
          $(this).find('#background-mask span').text(getMaxDashes());
        }
      }
    });

    function prependWithDashes(givenString) {
      var pattern = '-';
      var count = maxEntryCodeLength - givenString.length;
      if (count < 1) {
        return givenString;
      }
      var result = givenString;
      for (var i = 1; i <= count; i++) {
        result = pattern + result;
      }
      return result;
    }

    function getMaxDashes() {
      var pattern = '-';
      var count = maxEntryCodeLength;
      if (count < 1) {
        return '';
      }
      var result = '';
      while (count > 1) {
        if (count & 1) {
          result += pattern;
        }
        count >>= 1;
        pattern = pattern + pattern;
      }
      return result + pattern;
    }

    function trace(obj) {
      //console.log(obj);
    }

    $(this).prepend('<div id="background-mask" class="background-mask"><span>' + getMaxDashes() + '</span></div>');

    $('.background-mask span').css({
      "display": codeViewerDisplay,
      "vertical-align": "middle",
      "line-height": "normal",
      "color": "white"
    });

    if (document.activeElement.className != 'adc-statements') {
      $(this).focus();
      $(this).find('#background-mask').css('opacity', '0.8');
    } else {
      $(this).find('#background-mask').css('opacity', '0.2');
    }

    $(this).focusout(function() {
      $(this).find('#background-mask').css('opacity', '0.2');
    });
    $(this).focusin(function() {
      $(this).find('#background-mask').css('opacity', '0.8');
    });

    function selectByEntryCode(value) {
      var result = $.grep(items, function(e) {
        return e.entryCode == value;
      });
      if (result.length >= 1) {
        $container.find('.responseItem').filter(function() {
          return $(this).data("value") == result[0].inputValue;
        }).trigger('click');
      }
    }

    function getStringFromKeycode(e) {
      e = e || event;
      return String.fromCharCode(e.keyCode);
    }

    function getNumberFromKeycode(n) {
        switch (n) {
          case 48:
            return 0;
            break;
          case 49:
            return 1;
            break;
          case 50:
            return 2;
            break;
          case 51:
            return 3;
            break;
          case 52:
            return 4;
            break;
          case 53:
            return 5;
            break;
          case 54:
            return 6;
            break;
          case 55:
            return 7;
            break;
          case 56:
            return 8;
            break;
          case 57:
            return 9;
            break;
        }

        return ('!' + n.toString());
      }
      // Returns the container
    return this;
  };

}(jQuery));