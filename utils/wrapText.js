module.exports = function wrapText(text, maxLen) {
  const lines = [''];
  const words = text.split(' ');
  let currentLineLength = 0;

  for (let word of words) {
    currentLineLength += word.length + 1;
    if (currentLineLength > maxLen) {
      lines.unshift(word);
      currentLineLength = word.length + 1;
    } else {
      lines[0] += lines[0] ? ' ' + word : word;
    }
  }

  return lines.reverse();
};
