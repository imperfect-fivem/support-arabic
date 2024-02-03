# Support Arabic
CFX standalone script supports in-game Arabic entries.

## What is the issue in the first place ?
The game (or we could say [RAGE](https://en.wikipedia.org/wiki/Rockstar_Advanced_Game_Engine)) only supports the latin characters.  
Which is used in English, Italian, etc... (there could be Japanese and Chinese letters supported, I haven't searched enough tbh).  
In case of Arabic characters "letters", they are simply not supported, when you try to write in it, you just get that empty square which means unknown character, example:  
![Unknown Characters](https://raw.githubusercontent.com/imperfect-fivem/support-arabic/c536a401e7de5301f335f67287694f6e6855c7b6/images/unknown-characters.png)  

## Arabic Font
The "definer" of the Arabic characters which gives them the shape so you can read them.  
You can use a font in your own (edit the [manifest](https://github.com/imperfect-fivem/support-arabic/blob/85096cd1b45bc54d9a190a86cdf4f2bcb8921a65/fxmanifest.lua#L9)) but in case you don't have an Arabic one...  
There is an attached Arabic font in a streamable gfx format, credits: *A9eelsh* (there was no contact info to reach the provider, just found it in a public repository, so... it's probably fine to use it).

## Just adding the font fixes the problem ?
Unfortunately, no... Arabic characters are like any other language characters, except that writing in Arabic doesn't mean to put the characters beside each other to form a word, there is a missing step to form a word.

## What is missing ?
The characters must be linked to each other in a certain way, depending on their position in the word.  
For example the character (ب) can be written in three different way depending on its position, which are:  
- At the beginning: (بـ)
- At the middle: (ـبـ)
- At the end: (ـب)  

And of course... it's not supported as well, so when you add an Arabic font and then you try to write in it, you will be able to, the characters will be there and you can still read the words, but it's just uncomfortable for the players or any Arabic reader, which is the thing we try to avoid.  
For example, notice how the sentence "مرحبا بك في مجتمعنا" (Welcome to our community) is written in-game:  
![Unlinked Arabic](https://raw.githubusercontent.com/imperfect-fivem/support-arabic/85096cd1b45bc54d9a190a86cdf4f2bcb8921a65/images/unlinked-arabic.png)  

## So... that's it ?
Well, Arabic language it self wasn't that easy, right? There is another problem that needs to be mentioned. Which is that Arabic text direction is Right To Left aka RTL unlike most other languages that use the Left To Right direction aka LTR.
So even if you have the font and you decided somehow to ignore the linking between the characters, it would be still hard for the readers to read at their normal reading speed, as the characters will be reversed (the starting becomes the ending and vice-versa).  
For example, to explain the above, try to read this: "e l b a t r o f m o c", it doesn't seem an English word at all, now... try to read it from right to left, you will notice that it's just the word "comfortable" reversed, so if you know about the problem you can still read, but it's missy and not that easy.

## So far, what is the solution ?
With this script you can link and reverse the Arabic sentences to be readable, Notice the difference between the above and this:  
![Linked Arabic](https://raw.githubusercontent.com/imperfect-fivem/support-arabic/85096cd1b45bc54d9a190a86cdf4f2bcb8921a65/images/linked-arabic.png)  
_Note:_ it's obvious but anyway, this problem is with [RAGE](https://en.wikipedia.org/wiki/Rockstar_Advanced_Game_Engine) so there no need to use it with UI that involves HTML which supports Arabic.

## Functionality
The script works with [exports](https://docs.fivem.net/docs/scripting-reference/runtimes/javascript/functions/exports/) so you can use it wherever you like.  
The exported functions:  
- `reverseLink`: raw linking & reversing.
- `irreverseUnlink`: raw unlinking & irreversing.
- `escape`: linking & reversing a hybrid string of Arabic and any other language (only link & reverse Arabic).
- `parse`: unlinking & irreversing a hybrid string of Arabic and any other language (only unlink & irreverse the Arabic).

## Usage
First of all, in the few following examples I will use this (kind of) shortcut:  
```lua
SupAr = exports['support-arabic']
```  
So... here is some examples to use the script:  
- Raw linking & reversing:  
```lua
local aFullArabicText = "أهلا بك" -- (hello there)
AddTextEntry('AR_NOTIFICATION', SupAr:reverse(aFullArabicText)) -- ﻚﺑ ﻼﻫﺃ
```
- Raw unlinking & irreversing:  
```lua
SendNUIMessage({
	action = "notify",
	text = SupAr:irreverseUnlink(GetLabelText('AR_NOTIFICATION')) -- أهلا بك
})
```
- Hybrid linking & reversing:  
```lua
local playerName = GetPlayerName(whoever) -- say it's Yaser
local hybridText = "يريد منازلتك " .. playerName .. "اللاعب الملقب بـ" -- (The player Yaser wants to compete you)
AddTextEntry('AR_NOTIFICATION', SupAr:escape(hybridText)) -- ـﺑ ﺐﻘﻠﻤﻟﺍ ﺐﻋﻼﻟﺍYaser ﻚﺘﻟﺯﺎﻨﻣ ﺪﻳﺮﻳ
```
- Hybrid unlinking & irreversing:  
```lua
local escapedHybridText = GetLabelText('AR_NOTIFICATION') -- ـﺑ ﺐﻘﻠﻤﻟﺍ ﺐﻋﻼﻟﺍYaser ﻚﺘﻟﺯﺎﻨﻣ ﺪﻳﺮﻳ
local parsedHybridText = SupAr:parse(escapedHybridText) -- اللاعب الملقب بـYaser يريد منازلتك
print(parsedHybridText) -- this is still LTR, you can't use it in UI (HTML) notifications, we'll talk about this
```

## Finally
Linking an reversing the characters could easily fix the problem without even changing the text direction of the game, which seems good, but (there is always a but :/) the text direction LTR (left to right) won't function properly in some cases, for example:  
- Hybrid Text  
The text direction doesn't affect Arabic it self, the problem starts when it comes to the hybrid.
First of all, hybrid sentence is a mixture of Arabic and any other language (e.g. English), check this one:  
<span dir="rtl">`انت في الـServer الخاص بالمجتمع`</span> (You are in the community's Server)  
seems fine as the text direction is RTL (right to left), let's see what does it looks like when the text direction is LTR (left to right):  
<span dir="ltr">`انت في الـServer الخاص بالمجتمع`</span>  
As you can see, the Arabic it self hasn't affected, but the order of the sentences has reversed.  
This could easily be fixed by typing `سيرفر` instead of `Server` which is taking the English vocal and type the parallel to it in Arabic (it's not accepted linguistically but let's say it is) but (another but :/) there are some cases that you are forced to put a Non-Arabic word in the middle of the text, like the example above, the player name which is rarely written in Arabic.
That's why there are ``escape``/``parse`` functions at the first place (the ones that deals with hybrid text, you could say a "crack" solution).  
Those functions reverse the Arabic sentences only, leaving the other languages texts and order as it is.  
- Word Wrap  
This is another huge weakness case (unfortunately, unlike the above, there is no "crack" solution).  
When ever there is a [word-wrap](https://en.wikipedia.org/wiki/Line_wrap_and_word_wrap), it won't function properly.  
For example, let's notify the player with this sentence: `مرحبا بك في مجتمعنا، إستمتع بوقتك` (Welcome to our community, enjoy your time)  
![Wrap Arabic](https://raw.githubusercontent.com/imperfect-fivem/support-arabic/85096cd1b45bc54d9a190a86cdf4f2bcb8921a65/images/wrap-arabic.png)  
Seems wrong right? Why is that? Well, word-wrap takes the last word (or two, or what suits the length) and put them in the start of the next line.  
Remember that we just reversed the words, means that we made the first to be the last and vice-versa, That's why it takes the first word instead of the last one.  
The only solution is to find a replacement solution to remove the current "crack" solution, for now... test the sentences and type the line breaks manually, I'll figure something out in the future, lmk if you have any ideas.

## TODO
- Find a solution to the text direction.
- Support the [diacritics](https://en.wikipedia.org/wiki/Arabic_diacritics) between `ل` and `ا` to [solve](https://github.com/imperfect-fivem/support-arabic/blob/85096cd1b45bc54d9a190a86cdf4f2bcb8921a65/src/linking.js#L131) cases like [this](https://github.com/imperfect-fivem/support-arabic/blob/85096cd1b45bc54d9a190a86cdf4f2bcb8921a65/examples/test-result.log#L45).
- Test in [RedM](https://redm.net/).
- Add use-case examples.
