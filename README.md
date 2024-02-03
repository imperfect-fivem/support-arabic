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

## Does that work in all cases ?
There is another problem. It happens when it comes to what I like to call a "hybrid string".  
A hybrid string is basically an array of characters, some of them are Arabic while some others are not.  
Is that even an issue ? YES. Why is it an issue ? To answer that let's see a life example.  
A sentence (Arabic or Non-AR in direction) that [player will be notified with](https://github.com/imperfect-fivem/support-arabic/blob/65024cfcb705b68d311dd85c74ac71d6e48ce376/examples/fivem/client.lua):  
![test-sentence](https://raw.githubusercontent.com/imperfect-fivem/support-arabic/65024cfcb705b68d311dd85c74ac71d6e48ce376/images/test-sentence.png)  
First notification direction is LTR while the second one direction is RTL:  
![direction-difference](https://raw.githubusercontent.com/imperfect-fivem/support-arabic/65024cfcb705b68d311dd85c74ac71d6e48ce376/images/direction-difference.png)  
As you can see, the Arabic it self hasn't affected, but the order of the sentences has reversed.  
This could be fixed by typing `سيرفر` instead of `Server` and so on... which is taking the English vocal and type the parallel to it in Arabic (it's not accepted linguistically but let's say it is), however, there are some cases that you are forced to put a Non-Arabic word in a random position in a string, for example, the player name which is not always written in Arabic.  
To fix that the string shall be redirected to suit LTR text direction system, which [`SupportArabic:redirect`](TOFILL) function does.

## Functionality
The script works with [exports](https://docs.fivem.net/docs/scripting-reference/runtimes/javascript/functions/exports/) so you can use it wherever you like.  
Check the exported functions [here](TOFILL) if you want to use it in a specific way.  
If you want to generally support Arabic in your resource, just add this line to its manifest:  
```lua
client_script '@support-arabic/escaping.lua'
```
_Note:_ support-arabic resource should be started before your resource.

## Issues
There is some hanging issues that need to be looked at.

### Word Wrap 
When ever there is a [word-wrap](https://en.wikipedia.org/wiki/Line_wrap_and_word_wrap), it won't function properly.  
For example, let's notify the player with this sentence: `مرحبا بك في مجتمعنا، إستمتع بوقتك` (Welcome to our community, enjoy your time)  
![Wrap Arabic](https://raw.githubusercontent.com/imperfect-fivem/support-arabic/85096cd1b45bc54d9a190a86cdf4f2bcb8921a65/images/wrap-arabic.png)  
Seems wrong right? Why is that? Well, word-wrap takes the last word (or two, or what suits the length) and put them in the start of the next line.  
Remember that we just reversed the words, means that we made the first to be the last and vice-versa, That's why it takes the first word instead of the last one.  
The only solution is to find a replacement solution to remove the current "crack" solution, for now... test the sentences and type the line breaks manually, I'll figure something out in the future, lmk if you have any ideas.

### Multiline
Technically this is a subproblem of [Word Wrap](#word-wrap).  
Since it LTR text direction system takes the last word, many words will eventually form a whole new line.  
Which causes the first line to be the last and vice-versa.  
TODO: provide example.

## TODO
- Make a release with the latest features.
- Support the [diacritics](https://en.wikipedia.org/wiki/Arabic_diacritics) between `ل` and `ا` to [solve](https://github.com/imperfect-fivem/support-arabic/blob/85096cd1b45bc54d9a190a86cdf4f2bcb8921a65/src/linking.js#L131) cases like [this](https://github.com/imperfect-fivem/support-arabic/blob/85096cd1b45bc54d9a190a86cdf4f2bcb8921a65/examples/test-result.log#L45).
- Test in [RedM](https://redm.net/).
