/**
 * @param {string} string 
 * @returns {string}
 */
function reverseString(string) {
  return string.split('').reverse().join('');
}

const NON_LETTERS = '(\\P{L}|\\s)';
const NON_LETTERS_EXCEPTIONS = '[\\d\\(\\)<>\\[\\]\\{\\}]'; // TODO: add more if needed
const NON_LETTERS_REGEX = new RegExp(`(?!${NON_LETTERS_EXCEPTIONS})${NON_LETTERS}(?<!${NON_LETTERS_EXCEPTIONS})`, 'gu');

/**
 * @param {string} string 
 * @returns {boolean}
 */
function isNonLetter(string) {
  let is = NON_LETTERS_REGEX.test(string);
  NON_LETTERS_REGEX.lastIndex = 0;
  return is;
}

const ARABIAN_CHARACTERS = '\\u0600-\\u06ff\\ufb50-\\ufdfb\\ufe70-\\ufefc';
const REDIRECT_POINT_REGEX = new RegExp(`((?!\\s)[${ARABIAN_CHARACTERS}(\\s?)]+(?<!\\s))`, 'g');

const ARABIAN_SENTENCE_REGEX = new RegExp(`[${ARABIAN_CHARACTERS}(\\s?)]+`, 'g');
const TAGGED_ARABIAN_SENTENCE_REGEX = new RegExp(`<FONT(.*?)>[${ARABIAN_CHARACTERS}(\\s?)]+</FONT>`, 'g');

const DEFAULT_FONT_FACE = GetResourceMetadata(GetCurrentResourceName(), 'font_face', 0) || 'Arabic';
