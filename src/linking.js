const LINKABLE_ALEF = [1570, 1571, 1573, 1575],
LAMALEF_LINK_MAP = [65269, 65271, 1572, 65273, 1574, 65275],
LINK_MAP = [
  65152, 65153, 65155, 65157, 65159, 65161, 65165,
  65167, 65171, 65173, 65177,
  65181, 65185, 65189,
  65193, 65195,
  65197, 65199,
  65201, 65205,
  65209, 65213,
  65217, 65221,
  65225, 65229,
  1595, 1596,
  1597, 1598, 1599,
  1600,
  65233, 65237,
  65241, 65245, 65249, 65253,
  65257, 65261,
  65263, 65265
],
CHAR_LINK_TYPE = [
  0, 1, 1, 1, 1, 2, 1,
  2, 1, 2, 2,
  2, 2, 2,
  1, 1,
  1, 1,
  2, 2,
  2, 2,
  2, 2,
  2, 2,
  0, 0,
  0, 0, 0,
  3,
  2, 2,
  2, 2, 2, 2,
  2, 1,
  2, 2
];

function isInLimitedRange(value, min, max) {
  return value >= min && value <= max;
}

/**
 * @param {number} charCode 
 * @returns {boolean}
 */
function isInLinkableRange(charCode) {
  return isInLimitedRange(charCode, 1569, 1610);
}

/**
 * @param {number} charCode 
 * @returns {boolean}
 */
function isLinkableBefore(charCode) {
  if (!isInLinkableRange(charCode)) return false;
  let linkType = CHAR_LINK_TYPE[charCode - 1569];
  return linkType == 1 || linkType == 2 || linkType == 3;
}

/**
 * @param {number} charCode 
 * @returns {boolean}
 */
function isLinkableAfter(charCode) {
  if (!isInLinkableRange(charCode)) return false;
  let linkType = CHAR_LINK_TYPE[charCode - 1569];
  return linkType == 2 || linkType == 3;
}

/**
 * @param {number} charCode 
 * @returns {number}
 */
function getCharLinkType(charCode) {
  if (!isInLinkableRange(charCode)) return 0;
  return CHAR_LINK_TYPE[charCode - 1569] ?? 0;
}

/**
 * @param {number} charCode 
 * @param {number} linkType 
 * @returns {number}
 */
function linkChar(charCode, linkType) {
  if (!isInLinkableRange(charCode)) return charCode;
  let linkTypeIndex = charCode - 1569;
  switch (CHAR_LINK_TYPE[linkTypeIndex]) {
    case 0:
      return LINK_MAP[linkTypeIndex];
    case 1:
      return LINK_MAP[linkTypeIndex] + linkType % 2;
    case 2:
      return LINK_MAP[linkTypeIndex] + linkType;
    default:
      return charCode;
  }
}

/**
 * @param {number} charCode 
 * @param {number} linkType 
 * @returns {number}
 */
function linkLamAlef(charCode, linkType) {
  if (!LINKABLE_ALEF.includes(charCode)) return charCode;
  return LAMALEF_LINK_MAP[charCode - 1570] + linkType % 2;
}

/**
 * @param {number[]} charset 
 * @returns {number[]}
 */
function link(charset) {
  let linked = [],
  lastLinkType = 0,
  lastIndex = charset.length - 1;

  for (let index = 0; index <= lastIndex; index++) {
    let charCode = charset[index];
    if (getCharLinkType(charCode) == 3) {
      linked.push(charCode);
      lastLinkType = 3;
      continue;
    }
    
    let nextIndex = index, nextCharCode;
    do nextCharCode = charset[++nextIndex];
    while ((nextIndex < lastIndex) && isInLimitedRange(nextCharCode, 1611, 1630));
    // TODO: support the diacritics between Lam and Alef

    let linkType = (lastLinkType == 2 || lastLinkType == 3) ? 1 : 0;

    if (nextIndex <= lastIndex) {
      if (charCode == 1604 && LINKABLE_ALEF.includes(nextCharCode)) {
        linked.push(linkLamAlef(nextCharCode, linkType));
        lastLinkType = linkType;
        index = nextIndex;
        continue;
      }

      if (isLinkableAfter(charCode) && isLinkableBefore(nextCharCode)) linkType |= 2;
    }

    linked.push(linkChar(charCode, linkType));

    lastLinkType = linkType;
  }
  
  return linked;
}

function repeat(value, times) {
  return Array(times).fill(value)
}

const LAMALEF_UNLINK_MAP = [1570, 1570, 1571, 1571, 1573, 1573, 1575, 1575],
UNLINK_MAP = [
            1569,
  ...repeat(1570, 2),
  ...repeat(1571, 2),
  ...repeat(1572, 2),
  ...repeat(1573, 2),
  ...repeat(1574, 4),
  ...repeat(1575, 2),
  ...repeat(1576, 4),
  ...repeat(1577, 2),
  ...repeat(1578, 4),
  ...repeat(1579, 4),
  ...repeat(1580, 4),
  ...repeat(1581, 4),
  ...repeat(1582, 4),
  ...repeat(1583, 2),
  ...repeat(1584, 2),
  ...repeat(1585, 2),
  ...repeat(1586, 2),
  ...repeat(1587, 4),
  ...repeat(1588, 4),
  ...repeat(1589, 4),
  ...repeat(1590, 4),
  ...repeat(1591, 4),
  ...repeat(1592, 4),
  ...repeat(1593, 4),
  ...repeat(1594, 4),
  ...repeat(1601, 4),
  ...repeat(1602, 4),
  ...repeat(1603, 4),
  ...repeat(1604, 4),
  ...repeat(1605, 4),
  ...repeat(1606, 4),
  ...repeat(1607, 4),
  ...repeat(1608, 2),
  ...repeat(1609, 2),
  ...repeat(1610, 4),
];

/**
 * @param {number} charCode 
 * @returns {boolean}
 */
function isLamAlef(charCode) {
  return isInLimitedRange(charCode, 65269, 65276);
}

/**
 * @param {number} charCode 
 * @returns {number}
 */
function unlinkChar(charCode) {
  if (!(isInLimitedRange(charCode, 65152, 65268) || isLamAlef(charCode))) return charCode;
  return UNLINK_MAP[charCode - 65152];
}

/**
 * @param {number} charCode 
 * @returns {number}
 */
function unlinkLamAlef(charCode) {
  if (!isLamAlef(charCode)) return charCode;
  return LAMALEF_UNLINK_MAP[charCode - 65269];
}

/**
 * @param {number[]} charset 
 * @returns {number[]}
 */
function unlink(charset) {
  let unlinked = [];
  
  for (let charCode of charset) {
    if (isLamAlef(charCode)) {
      unlinked.push(1604);
      unlinked.push(unlinkLamAlef(charCode));
    } else {
      unlinked.push(unlinkChar(charCode));
    }
  }

  return unlinked;
}

/**
 * @param {string} text 
 * @returns {string}
 */
function linkText(text) {
  if (typeof text != 'string' || text?.length == 0) return `${text}`;
  return String.fromCharCode(...link(text.split('').map(char => char.charCodeAt(0))));
}

/**
 * @param {string} text 
 * @returns {string}
 */
function unlinkText(text) {
  if (typeof text != 'string' || text?.length == 0) return `${text}`;
  return String.fromCharCode(...unlink(text.split('').map(char => char.charCodeAt(0))));
}
