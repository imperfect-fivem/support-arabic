SupAr = exports['support-arabic'] -- some kind of shortcut

local message = ""
local function addLogLine(...)
  local args = {...}
  for k,v in pairs(args) do args[k] = tostring(v) end
  message = message .. table.concat(args, ' ') .. '\n'
end

addLogLine('With Tags:')

local text = "تحتاج إلى رزمة من الـCopper لإتمام العملية"
addLogLine("(+) text:", text)

local reversed = SupAr:escape(text, true)
addLogLine("(~) reversed:", reversed)

local irreversed = SupAr:parse(reversed, true)
addLogLine("(-) irreversed:", irreversed)

addLogLine("(?) text = irreversed:", text == irreversed, '\n')

addLogLine('Without Tags:')

addLogLine("(+) text:", text)

reversed = SupAr:escape(text, false)
addLogLine("(~) reversed:", reversed)

irreversed = SupAr:parse(reversed, false)
addLogLine("(-) irreversed:", irreversed)

addLogLine("(?) text = irreversed:", text == irreversed, '\n')

addLogLine('TODO: support the diacritics between Lam and Alef, e.g.')

local nonDiacritics = "لِئَلا"
addLogLine("(+) nonDiacritics:", nonDiacritics)

local diacritics = "لِئَلَّا"
addLogLine("(+) diacritics:", diacritics)

local reversedNonDiacritics = SupAr:reverseLink(nonDiacritics)
addLogLine("(~) reversedNonDiacritics:", reversedNonDiacritics)

local reversedDiacritics = SupAr:reverseLink(diacritics)
addLogLine("(~) reversedDiacritics:", reversedDiacritics)

local irreversedNonDiacritics = SupAr:irreverseUnlink(reversedNonDiacritics)
addLogLine("(-) irreversedNonDiacritics:", irreversedNonDiacritics)

local irreversedDiacritics = SupAr:irreverseUnlink(reversedDiacritics)
addLogLine("(-) irreversedDiacritics:", irreversedDiacritics)

addLogLine("(?) irreversedNonDiacritics = nonDiacritics:", irreversedNonDiacritics == nonDiacritics)
addLogLine("(?) irreversedDiacritics = irreversedNonDiacritics:", irreversedDiacritics == irreversedNonDiacritics, "should be false") -- output: true
addLogLine("(?) irreversedDiacritics = diacritics:", irreversedDiacritics == diacritics, "should be true") -- output: false

SaveResourceFile(GetCurrentResourceName(), 'test/analysis-result.log', message, -1)
