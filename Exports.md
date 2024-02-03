# Exported Functions
Here you can find all the functions that are provided in the script.  
Not be confused, in the following examples this variable would be used:  
```lua
SupportArabic = exports['support-arabic']
```

## [`SupportArabic:redirect`](https://github.com/imperfect-fivem/support-arabic/blob/65024cfcb705b68d311dd85c74ac71d6e48ce376/src/directing.js#L5)
Convert LTR string to be RTL and vice-versa.
### I/O
- `input`: string.
- return: string.
### Example
```lua
local rtl = "اللاعب Yaser متصل اللآن"
print(SupportArabic:redirect(rtl)) -- "متصل اللآن Yaser اللاعب"
```

## [`SupportArabic:reverseLink`](https://github.com/imperfect-fivem/support-arabic/blob/65024cfcb705b68d311dd85c74ac71d6e48ce376/src/relating.js#L5)
Raw linking & reversing.
### I/O
- `sentence`: string.
- return: string.
### Example
```lua
local aFullArabicText = "أهلا بك" -- (hello there)
AddTextEntry('AR_NOTIFICATION', SupAr:reverse(aFullArabicText)) -- ﻚﺑ ﻼﻫﺃ
```

## [`SupportArabic:irreverseUnlink`](https://github.com/imperfect-fivem/support-arabic/blob/65024cfcb705b68d311dd85c74ac71d6e48ce376/src/relating.js#L14)
Raw unlinking & irreversing.
### I/O
- `sentence`: string.
- return: string.
### Example
```lua
SendNUIMessage({
	action = "notify",
	text = SupAr:irreverseUnlink(GetLabelText('AR_NOTIFICATION')) -- أهلا بك
})
```

## [`SupportArabic:escape`](https://github.com/imperfect-fivem/support-arabic/blob/65024cfcb705b68d311dd85c74ac71d6e48ce376/src/relating.js#L25)
Linking & reversing a [hybrid string](TOFILL) (only link & reverse Arabic).  
This function assumes that the input string is [redirected](#supportarabicredirect).
### I/O
- `input`: string.
- `tags`: string (optional).
- `font`: string (optional).
- return: string.
### Example
```lua
local playerName = GetPlayerName(whoever) -- say it's Yaser
local hybridText = "يريد منازلتك " .. playerName .. "اللاعب الملقب بـ" -- (The player Yaser wants to compete you)
AddTextEntry('AR_NOTIFICATION', SupAr:escape(hybridText)) -- ـﺑ ﺐﻘﻠﻤﻟﺍ ﺐﻋﻼﻟﺍYaser ﻚﺘﻟﺯﺎﻨﻣ ﺪﻳﺮﻳ
```

## [`SupportArabic:parse`](https://github.com/imperfect-fivem/support-arabic/blob/65024cfcb705b68d311dd85c74ac71d6e48ce376/src/relating.js#L46)
Unlinking & irreversing a [hybrid string](TOFILL) (only unlink & irreverse Arabic).  
This function assumes that the input string is [redirected](#supportarabicredirect).
### I/O
- `input`: string`.
- `tags`: boolean.
- return: string.
### Example
```lua
local escapedHybridText = GetLabelText('AR_NOTIFICATION') -- ـﺑ ﺐﻘﻠﻤﻟﺍ ﺐﻋﻼﻟﺍYaser ﻚﺘﻟﺯﺎﻨﻣ ﺪﻳﺮﻳ
local parsedHybridText = SupAr:parse(escapedHybridText) -- اللاعب الملقب بـYaser يريد منازلتك
print(parsedHybridText) -- this is still LTR, you can't use it in UI (HTML) notifications, we'll talk about this
```
