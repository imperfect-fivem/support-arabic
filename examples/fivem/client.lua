SupportArabic = exports['support-arabic']

local showing = false

RegisterCommand('SupportArabic', function (_, args)
	SetNuiFocus(true, true)
  SendNUIMessage()
end, false)

RegisterNUICallback('submit', function(data)
	SetNuiFocus(false,false)
  showing = false
  AddTextEntry('SUPPORT_ARABIC_TEXT', SupportArabic:redirect(data.text))
  if data.sticky then
    CreateThread(function()
      showing = true
      while showing do
        Wait(5)
        SetTextScale(0.8, 0.8)
        SetTextColour(200, 50, 60, 250)
        SetTextJustification(0)
        BeginTextCommandDisplayText('SUPPORT_ARABIC_TEXT')
        EndTextCommandDisplayText(0.5, 0.1)
      end
    end)
  else
    BeginTextCommandThefeedPost('SUPPORT_ARABIC_TEXT')
    EndTextCommandThefeedPostTicker(true, true)
  end
end)

