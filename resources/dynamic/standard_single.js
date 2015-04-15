/* standard_single.js */
{% 
Dim i 
Dim ar = CurrentQuestion.AvailableResponses
Dim inputName
Dim inputValue
Dim caption
Dim entryCode

For i = 1 To ar.Count 
	inputName = ar[i].InputName()
	inputValue = ar[i].InputValue()
	caption   = ar[i].Caption
	entryCode   = ar[i].EntryCodeStr
%}
{caption : "{%= caption %}", entryCode : "{%= entryCode %}", inputValue : "{%= inputValue %}", element : $('#{%= inputName%}')}{%= On(i < ar.Count, ",", "") %}
{% Next %}