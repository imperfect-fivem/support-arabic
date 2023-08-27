/**
 * @param {string} string 
 * @returns {string}
 */
function reverseString(string) {
    return string.split('').reverse().join('');
}

/**
 * @param {string} sentence 
 * @returns {string}
 */
function internalReverseLink(sentence) {
    if (typeof sentence != 'string') return `${sentence}`;
    return reverseString(linkText(sentence));
}

/**
 * @param {string} sentence 
 * @returns {string}
 */
function internalIrreverseUnlink(sentence) {
    if (typeof sentence != 'string') return `${sentence}`;
    return unlinkText(reverseString(sentence));
}

let fontFace = GetResourceMetadata(GetCurrentResourceName(), 'font_face', 0);

const arabicSentenceRegex = /[\u0600-\u06ff\ufb50-\ufefc(\s?)]+/g;

/**
 * @param {string} input 
 * @param {string?} tags 
 * @returns {string}
 */
function escapeContent(input, tags = !IsDuplicityVersion()) {
    if (typeof input != 'string') return `${input}`;
    return input.replace(
        arabicSentenceRegex,
        function escapingReplacer(content) {
            let originalContent = content; content = content.trim();
            if (content.length == 0) return originalContent;
            let prefix = originalContent.substring(0, originalContent.indexOf(content.charAt(0)));
            let suffix = originalContent.substring(originalContent.lastIndexOf(content.charAt(content.length - 1)) + 1, originalContent.length);
            content = internalReverseLink(content);
            if (tags) content = `<FONT FACE="${fontFace}">${content}</FONT>`;
            return prefix + content + suffix;
        }
    );
}

const taggedArabicSentenceRegex = /<FONT(.*?)>[\u0600-\u06ff\ufb50-\ufefc(\s?)]+<\/FONT>/g;

/**
 * @param {string} input 
 * @param {boolean} tags  
 * @returns {string}
 */
function parseContent(input, tags = !IsDuplicityVersion()) {
    if (typeof input != 'string') return `${input}`;
    return input.replace(
        tags ? taggedArabicSentenceRegex : arabicSentenceRegex,
        function parsingReplacer(matching) {
            let content, prefix = '', suffix = '';
            if (tags) {
                content = []; let match;
                while ((match = arabicSentenceRegex.exec(matching)) != null) content.push(...match.map(m => m.trim()));
                content = content.join('').trim();
                if (content.length < 1) return matching;
            } else {
                let originalContent = matching; content = matching.trim();
                if (content.length == 0) return originalContent;
                prefix = originalContent.substring(0, originalContent.indexOf(content.charAt(0)));
                suffix = originalContent.substring(originalContent.lastIndexOf(content.charAt(content.length - 1)) + 1, originalContent.length);
            }
            content = internalIrreverseUnlink(content);
            return prefix + content + suffix;
        }
    );
}
