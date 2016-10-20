/* standard_multiple.js */
{% 
Dim i 
Dim ar = CurrentQuestion.AvailableResponses
Dim inputName = CurrentQuestion.InputName()
Dim inputValue
Dim entryCode
Dim isExclusive

For i = 1 To ar.Count 
    isExclusive = ar[i].IsExclusive
	inputValue = ar[i].InputValue()
	entryCode = ar[i].EntryCodeStr
%}
{entryCode : "{%= entryCode %}", inputValue : "{%= inputValue %}", element : $("input[name='{%= CurrentQuestion.InputName("List")%}']"), isExclusive : {%= isExclusive%}}{%= On(i < ar.Count, ",", "") %}
{% Next %}