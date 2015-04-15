﻿/* standard.js */
$(window).load(function() {
	$('#adc_{%= CurrentQuestion.Id %}').adcStatements({
		target : 'jsObj{%= CurrentQuestion.Id%}',
		width : 400,
		imageAlign : '{%= CurrentADC.PropValue("imageAlign") %}',
		imageWidth : 100,
		imageHeight : 100,
		isMultiple: {%= (CurrentQuestion.Type = "multiple") %},
		controlWidth : '{%= CurrentADC.PropValue("controlWidth") %}',
		columns: {%= CurrentADC.PropValue("columns") %},
		maxWidth : '{%= CurrentADC.PropValue("maxWidth") %}',
		maxImageWidth : '{%= CurrentADC.PropValue("maxImageWidth") %}',
		maxImageHeight : '{%= CurrentADC.PropValue("maxImageHeight") %}',
		forceImageSize : '{%= CurrentADC.PropValue("forceImageSize") %}',
		autoForward: {%= (CurrentADC.PropValue("autoForward") = "1") %},
		animate: {%= (CurrentADC.PropValue("animateResponses") = "1") %},
		animationSpeed: '{%= CurrentADC.PropValue("animationSpeed") %}',
		numberNS: {%= CurrentADC.PropValue("numberNS") %},
		useRange: {%= (CurrentADC.PropValue("useRange") = "1") %},
		responseTextPadding : '{%= CurrentADC.PropValue("responseTextPadding") %}',
		responseTextLineHeight : '{%= CurrentADC.PropValue("responseTextLineHeight") %}',
		showResponseHoverColour: {%= (CurrentADC.PropValue("showResponseHoverColour") = "1") %},
		showResponseHoverFontColour: {%= (CurrentADC.PropValue("showResponseHoverFontColour") = "1") %},
		showResponseHoverBorder: {%= (CurrentADC.PropValue("showResponseHoverBorder") = "1") %},
		controlAlign : '{%= CurrentADC.PropValue("controlAlign") %}',
		{% IF CurrentADC.PropValue("useRange") = "1" Then %}
			range: '{%= CurrentADC.PropValue("responseColourPrimary") %};{%= CurrentADC.PropValue("responseColourSecondary") %};{%= CurrentADC.PropValue("responseColourRangePrimary") %};{%= CurrentADC.PropValue("responseColourRangeSecondary") %}',
		{% EndIF %}
		items : [
			{% IF CurrentQuestion.Type = "single" Then %}
				{%:= CurrentADC.GetContent("dynamic/standard_single.js").ToText()%}
			{% ElseIf CurrentQuestion.Type = "multiple" Then %}
				{%:= CurrentADC.GetContent("dynamic/standard_multiple.js").ToText()%}
			{% EndIF %}
		]
	});
	$('#adc_{%= CurrentQuestion.Id %}').adcKeyIn({
		target : 'jsObj{%= CurrentQuestion.Id%}',
		nextItemCode : '{%= CurrentADC.PropValue("nextItemCode") %}',
		clearItemCode : '{%= CurrentADC.PropValue("clearItemCode") %}',
		codeViewerDisplay : '{%= CurrentADC.PropValue("codeViewerDisplay") %}',
		items : [
			{% IF CurrentQuestion.Type = "single" Then %}
				{%:= CurrentADC.GetContent("dynamic/standard_single.js").ToText()%}
			{% ElseIf CurrentQuestion.Type = "multiple" Then %}
				{%:= CurrentADC.GetContent("dynamic/standard_multiple.js").ToText()%}
			{% EndIF %}
		]
	});
});