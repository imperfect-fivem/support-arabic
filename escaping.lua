-- TODO: Test the performance
local SupportArabic = exports['support-arabic']
CreateThread(function ()
  local addTextEntry = AddTextEntry
  AddTextEntry = function(entryKey, entryText)
    addTextEntry(entryKey, SupportArabic:escape(entryText))
  end

  local addTextComponentSubstringPlayerName = AddTextComponentSubstringPlayerName
  AddTextComponentSubstringPlayerName = function (text)
    addTextComponentSubstringPlayerName(SupportArabic:escape(text))
  end

  local addTextComponentSubstringKeyboardDisplay = AddTextComponentSubstringKeyboardDisplay
  AddTextComponentSubstringKeyboardDisplay = function (substring)
    addTextComponentSubstringKeyboardDisplay(SupportArabic:escape(substring))
  end

  local addTextComponentSubstringWebsite = AddTextComponentSubstringWebsite
  AddTextComponentSubstringWebsite = function (website)
    addTextComponentSubstringWebsite(SupportArabic:escape(website))
  end

  local getLabelText = GetLabelText
  GetLabelText = function (labelName)
    return SupportArabic:parse(getLabelText(labelName))
  end
end)
