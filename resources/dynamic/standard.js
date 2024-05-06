/* standard.js */
$(window).on('load', function() {

	{%
		Dim i
		
		Dim strOtherRID = ""
		Dim strOtherQID = ""
		
		Dim ar = CurrentQuestion.AvailableResponses
		For i = 1 to ar.Count
			If ar[i].isOpen = True Then
				If strOtherRID <> "" Then
					strOtherRID = strOtherRID + ","
					strOtherQID = strOtherQID + ","
				Endif
				strOtherRID = strOtherRID + ar[i].Index
				strOtherQID = strOtherQID + ar[i].OpenQuestion.InputName()
			Endif
		Next i	
	%}

	$('#adc_{%= CurrentADC.InstanceId %}').adcStatements({
		target : 'jsObj{%= CurrentADC.InstanceId %}',
		width : 400,
		imageAlign : '{%= CurrentADC.PropValue("imageAlign") %}',
		imageWidth : 100,
		imageHeight : 100,
		isMultiple: {%= (CurrentQuestion.Type = "multiple" OR CurrentQuestion.Type = "multiple-loop") %},
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
        otherRID : '{%= strOtherRID %}',
		otherQID : '{%= strOtherQID %}',
		deselectionEnabled : {%= (CurrentADC.PropValue("deselectionEnabled") = "1") %},
      	currentQuestion: '{%:= CurrentQuestion.Shortcut %}',
		{% IF CurrentADC.PropValue("useRange") = "1" Then %}
			range: '{%= CurrentADC.PropValue("responseColourPrimary") %};{%= CurrentADC.PropValue("responseColourPrimary") %};{%= CurrentADC.PropValue("responseColourRangePrimary") %};{%= CurrentADC.PropValue("responseColourRangePrimary") %}',
		{% EndIF %}
		items : [
			{% IF (CurrentQuestion.Type = "single" OR CurrentQuestion.Type = "single-loop") Then %}
				{%:= CurrentADC.GetContent("dynamic/standard_single.js").ToText() %}
			{% ElseIf (CurrentQuestion.Type = "multiple" OR CurrentQuestion.Type = "multiple-loop") Then %}
				{%:= CurrentADC.GetContent("dynamic/standard_multiple.js").ToText() %}
			{% EndIF %}
		]
	});
	$('#adc_{%= CurrentADC.InstanceId  %}').adcKeyIn({
		instanceId : {%= CurrentADC.InstanceId %},
        target : 'jsObj{%= CurrentADC.InstanceId %}',
		nextItemCode : '{%= CurrentADC.PropValue("nextItemCode") %}',
		clearItemCode : '{%= CurrentADC.PropValue("clearItemCode") %}',
		deselectionEnabled : {%= (CurrentADC.PropValue("deselectionEnabled") = "1") %},
		codeViewerDisplay : '{%= CurrentADC.PropValue("codeViewerDisplay") %}',
		items : [
			{% IF (CurrentQuestion.Type = "single" OR CurrentQuestion.Type = "single-loop") Then %}
				{%:= CurrentADC.GetContent("dynamic/standard_single.js").ToText()%}
			{% ElseIf (CurrentQuestion.Type = "multiple" OR CurrentQuestion.Type = "multiple-loop") Then %}
				{%:= CurrentADC.GetContent("dynamic/standard_multiple.js").ToText()%}
			{% EndIF %}
		]
	});
});
