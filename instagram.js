const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const wrapText = require('./utils/wrapText');

const EPISODE_TITLE = process.argv[2];

registerFont('assets/FiraCode.ttf', { family: 'FiraCode' });

(async function () {
  const canvas = createCanvas(1000, 1000);
  const ctx = canvas.getContext('2d');

  // Background
  const bg = await loadImage('assets/Background.png');
  const bgScale = Math.max(canvas.width / bg.width, canvas.height / bg.height);
  const bgX = canvas.width / 2 - (bg.width / 2) * bgScale;
  const bgY = canvas.height / 2 - (bg.height / 2) * bgScale;
  ctx.drawImage(bg, bgX, bgY, bg.width * bgScale, bg.height * bgScale);

  // Logo
  const logo = await loadImage('assets/RequireLogo.png');
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
  const spotify = await loadImage('assets/SpotifyLogo.png');
  const apple = await loadImage('assets/ApplePodcastsLogo.png');
  const google = await loadImage('assets/GooglePodcastsLogo.png');
  const anchor = await loadImage('assets/AnchorLogo.png');
  const youtube = await loadImage('assets/YouTubeLogo.png');

  ctx.drawImage(spotify, 25, 925, 50, 50);
  ctx.drawImage(apple, 100, 925, 50, 50);
  ctx.drawImage(google, 175, 925, 50, 50);
  ctx.drawImage(anchor, 250, 925, 50, 50);
  ctx.drawImage(youtube, 325, 925, 50, 50);

  const stream = canvas.createPNGStream();
  const out = fs.createWriteStream('./output/instagram.png');

  stream.pipe(out);
})();
