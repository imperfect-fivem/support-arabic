SupAr = exports['support-arabic'] -- some kind of shortcut

local texts = {
  test = "مرحبا بك في مجتمعنا، إستمتع بوقتك",
  menu = "القائمة الرئيسية",
  players = "لاعب متصل %s يوجد",
  item = "لإتمام العملية %s من %s تحتاج إلى",
}

for name, content in pairs(texts) do
  texts[name] = SupAr:escape(content)
end

local showing = false
RegisterCommand('SupArText', function (_, args)
  showing = false
  local text = texts[table.remove(args, 1)]
  if text then
    AddTextEntry('SHOW_TEXT', string.format(text, table.unpack(args)))
    CreateThread(function()
      showing = true
      while showing do
        Wait(5)
        SetTextScale(0.8, 0.8)
        SetTextColour(200, 50, 60, 250)
        SetTextJustification(0)
        BeginTextCommandDisplayText('SHOW_TEXT')
        AddTextComponentSubstringPlayerName(text)
        EndTextCommandDisplayText(0.5, 0.1)
      end
    end)
  end
end, false)

RegisterCommand('SupArNotify', function (_, args)
  local content = texts[table.remove(args, 1)]
  if not content then return end
  AddTextEntry('NOTIFY_TEXT', string.format(content, table.unpack(args)))
  BeginTextCommandThefeedPost('NOTIFY_TEXT')
  EndTextCommandThefeedPostTicker(true, true)
end, false)
