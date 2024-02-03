SupportArabic = exports['support-arabic']

local message = ""
local function addLogLine(...)
  local args = {...}
  for k,v in pairs(args) do args[k] = tostring(v) end
  message = message .. table.concat(args, ' ') .. '\n'
end

addLogLine("Redirect Arabic beginning with Non-Arabic ending Text:") --------------------------------------------------

local rtl = "احمد العربي: is online"
addLogLine("(+) right-to-left:", rtl)

local redirectRTL = SupportArabic:redirect(rtl)
addLogLine("(~) redirect(right-to-left):", redirectRTL)

local ltr = "is online :احمد العربي"
addLogLine("(-) left-to-right:", ltr)

local redirectLTR = SupportArabic:redirect(ltr)
addLogLine("(~) redirect(left-to-right):", redirectLTR)

addLogLine('(?) redirect(right-to-left) = left-to-right:', redirectRTL == ltr)
addLogLine('(?) redirect(left-to-right) = right-to-left:', redirectLTR == rtl, '\n')

addLogLine("Redirect Non-Arabic beginning with Arabic ending Text:") --------------------------------------------------

rtl = "-Ahmad Alarabi =+ متصل الآن"
addLogLine("(+) right-to-left:", rtl)

local redirectRTL = SupportArabic:redirect(rtl)
addLogLine("(~) redirect(right-to-left):", redirectRTL)

ltr = "متصل الآن += Ahmad Alarabi-"
addLogLine("(-) left-to-right:", ltr)

local redirectLTR = SupportArabic:redirect(ltr)
addLogLine("(~) redirect(left-to-right):", redirectLTR)

addLogLine('(?) redirect(right-to-left) = left-to-right:', redirectRTL == ltr)
addLogLine('(?) redirect(left-to-right) = right-to-left:', redirectLTR == rtl, '\n')

addLogLine("Redirect Arabic beginning and Non-Arabic middle with Arabic ending Text:") --------------------------------

rtl = "توجه اللاعب: Ahmad Alarabi إلى منطقة Los Santos في الجنوب"
addLogLine("(+) right-to-left:", rtl)

local redirectRTL = SupportArabic:redirect(rtl)
addLogLine("(~) redirect(right-to-left):", redirectRTL)

ltr = "في الجنوب Los Santos إلى منطقة Ahmad Alarabi :توجه اللاعب"
addLogLine("(-) left-to-right:", ltr)

local redirectLTR = SupportArabic:redirect(ltr)
addLogLine("(~) redirect(left-to-right):", redirectLTR)

addLogLine('(?) redirect(right-to-left) = left-to-right:', redirectRTL == ltr)
addLogLine('(?) redirect(left-to-right) = right-to-left:', redirectLTR == rtl, '\n')

addLogLine("Redirect Non-Arabic beginning and Arabic middle with Non-Arabic ending Text:") ----------------------------

rtl = "Bill $500 دفعها اللاعب Ahmad Alarabi"
addLogLine("(+) right-to-left:", rtl)

local redirectRTL = SupportArabic:redirect(rtl)
addLogLine("(~) redirect(right-to-left):", redirectRTL)

ltr = "Ahmad Alarabi دفعها اللاعب Bill $500"
addLogLine("(-) left-to-right:", ltr)

local redirectLTR = SupportArabic:redirect(ltr)
addLogLine("(~) redirect(left-to-right):", redirectLTR)

addLogLine('(?) redirect(right-to-left) = left-to-right:', redirectRTL == ltr)
addLogLine('(?) redirect(left-to-right) = right-to-left:', redirectLTR == rtl, '\n')

addLogLine('Escape/Parse With Tags:') ---------------------------------------------------------------------------------

local text = "تحتاج إلى رزمة من الـCopper لإتمام العملية"
addLogLine("(+) text:", text)

local reversed = SupportArabic:escape(text, true)
addLogLine("(~) reversed:", reversed)

local irreversed = SupportArabic:parse(reversed, true)
addLogLine("(-) irreversed:", irreversed)

addLogLine("(?) text = irreversed:", text == irreversed, '\n')

addLogLine('Escape/Parse Without Tags:') ------------------------------------------------------------------------------

addLogLine("(+) text:", text)

reversed = SupportArabic:escape(text, false)
addLogLine("(~) reversed:", reversed)

irreversed = SupportArabic:parse(reversed, false)
addLogLine("(-) irreversed:", irreversed)

addLogLine("(?) text = irreversed:", text == irreversed, '\n')

addLogLine('TODO: support the diacritics between Lam and Alef, e.g.') -------------------------------------------------

local nonDiacritics = "لِئَلا"
addLogLine("(+) nonDiacritics:", nonDiacritics)

local diacritics = "لِئَلَّا"
addLogLine("(+) diacritics:", diacritics)

local reversedNonDiacritics = SupportArabic:reverseLink(nonDiacritics)
addLogLine("(~) reversedNonDiacritics:", reversedNonDiacritics)

local reversedDiacritics = SupportArabic:reverseLink(diacritics)
addLogLine("(~) reversedDiacritics:", reversedDiacritics)

local irreversedNonDiacritics = SupportArabic:irreverseUnlink(reversedNonDiacritics)
addLogLine("(-) irreversedNonDiacritics:", irreversedNonDiacritics)

local irreversedDiacritics = SupportArabic:irreverseUnlink(reversedDiacritics)
addLogLine("(-) irreversedDiacritics:", irreversedDiacritics)

addLogLine("(?) irreversedNonDiacritics = nonDiacritics:", irreversedNonDiacritics == nonDiacritics)
addLogLine("(?) irreversedDiacritics = irreversedNonDiacritics:", irreversedDiacritics == irreversedNonDiacritics, "should be false") -- output: true
addLogLine("(?) irreversedDiacritics = diacritics:", irreversedDiacritics == diacritics, "should be true") -- output: false

SaveResourceFile(GetCurrentResourceName(), 'examples/test-result.log', message, -1)
