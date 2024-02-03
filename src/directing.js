/**
 * @param {string} input lft | rtl
 * @returns {string} rtl | lft
 */
function redirectContent(input) {
  if (typeof input != 'string') return `${input}`;
  let inverses = [], redirects = input.split(REDIRECT_POINT_REGEX).map(redirect => {
    if (REDIRECT_POINT_REGEX.test(redirect)) return redirect;
    let parts = redirect.split(NON_LETTERS_REGEX).filter(part => part != '');
    if (parts.length < 2) return redirect;
    let reversedPrefix = '', reversedSuffix = '';
    while (isNonLetter(parts.at(0))) reversedPrefix = parts.shift() + reversedPrefix;
    while (isNonLetter(parts.at(-1))) reversedSuffix += parts.pop();
    parts.push(reversedPrefix);
    parts.unshift(reversedSuffix);
    return parts.join('');
  }).filter(redirect => redirect != '');
  while(redirects.length) inverses.push(redirects.splice(0,2));
  inverses.forEach(inverse => inverse.reverse());
  return [].concat(...inverses.reverse()).join('');
}
