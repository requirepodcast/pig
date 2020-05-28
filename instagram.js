const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');

const EPISODE_TITLE = 'dupa pieprzyć wiedźma dupa canvas require';

registerFont('FiraCode.ttf', { family: 'FiraCode' });

function wrapText(text, maxLen) {
  const lines = [''];
  const words = text.split(' ');
  let currentLineLength = 0;

  for (let word of words) {
    currentLineLength += word.length + 1;
    if (currentLineLength > maxLen) {
      lines.unshift(word);
      currentLineLength = word.length + 1;
    } else {
      lines[0] += ' ' + word;
    }
  }

  return lines.reverse();
}

(async function () {
  const canvas = createCanvas(1000, 1000);
  const ctx = canvas.getContext('2d');

  // Background
  const bg = await loadImage('Background.png');
  const bgScale = Math.max(1000 / bg.width, 1000 / bg.height);
  const bgX = 1000 / 2 - (bg.width / 2) * bgScale;
  const bgY = 1000 / 2 - (bg.height / 2) * bgScale;
  ctx.drawImage(bg, bgX, bgY, bg.width * bgScale, bg.height * bgScale);

  // Logo
  const logo = await loadImage('RequireLogo.png');
  ctx.drawImage(logo, 100, 100, 350, 350);

  // "New episode" title
  ctx.font = '80px FiraCode';
  ctx.fillStyle = '#ff5370';
  ctx.fillText('Nowy\nodcinek!', 500, 250);

  // Episode title
  ctx.font = '65px FiraCode';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  const textLines = wrapText(EPISODE_TITLE, 21);
  const titleHeight = 70 * textLines.length;
  const titleBase = 700 - titleHeight / 2;
  textLines.map((line, i) => {
    ctx.fillText(line, 500, titleBase + i * 70);
  });

  // Platforms note
  ctx.font = '30px FiraCode';
  ctx.fillStyle = '#ff5370';
  ctx.textAlign = 'left';
  ctx.fillText('Dostępny na dowolnej platformie streamingowej', 25, 900);

  // PLatforms icons
  const spotify = await loadImage('SpotifyLogo.png');
  const apple = await loadImage('ApplePodcastsLogo.png');
  const google = await loadImage('GooglePodcastsLogo.png');
  const anchor = await loadImage('AnchorLogo.png');
  const youtube = await loadImage('YouTubeLogo.png');

  ctx.drawImage(spotify, 25, 925, 50, 50);
  ctx.drawImage(apple, 100, 925, 50, 50);
  ctx.drawImage(google, 175, 925, 50, 50);
  ctx.drawImage(anchor, 250, 925, 50, 50);
  ctx.drawImage(youtube, 325, 925, 50, 50);

  const stream = canvas.createPNGStream();
  const out = fs.createWriteStream('./instagram.png');

  stream.pipe(out);
})();
