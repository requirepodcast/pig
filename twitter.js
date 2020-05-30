const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const wrapText = require('./utils/wrapText');

const EPISODE_TITLE = process.argv[2];
const EPISODE_DESCRIPTION = process.argv[3];

registerFont('assets/FiraCode.ttf', { family: 'FiraCode' });

(async function () {
  const canvas = createCanvas(1200, 675);
  const ctx = canvas.getContext('2d');

  // Background
  const bg = await loadImage('assets/Background.png');
  const bgScale = Math.max(canvas.width / bg.width, canvas.height / bg.height);
  const bgX = canvas.width / 2 - (bg.width / 2) * bgScale;
  const bgY = canvas.height / 2 - (bg.height / 2) * bgScale;
  ctx.drawImage(bg, bgX, bgY, bg.width * bgScale, bg.height * bgScale);

  // Logo
  const logo = await loadImage('assets/RequireLogo.png');
  ctx.drawImage(logo, 50, 100, 475, 475);

  // Title and description
  const titleLines = wrapText(EPISODE_TITLE, 20);
  const titleHeight = titleLines.length * 60;

  const descriptionLines = wrapText(EPISODE_DESCRIPTION, 39);
  const descriptionHeight = descriptionLines.length * 30;

  const textHeight = titleHeight + descriptionHeight + 50;
  const textBase = canvas.height / 2 - textHeight / 2;

  ctx.font = '50px FiraCode';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#ff5370';
  ctx.textAlign = 'left';
  titleLines.map((line, i) => {
    ctx.fillText(line, 575, textBase + i * 60);
  });

  ctx.font = '25px FiraCode';
  ctx.fillStyle = 'white';
  descriptionLines.map((line, i) => {
    ctx.fillText(line, 575, textBase + titleHeight + 50 + i * 30);
  });

  // Save to file
  const stream = canvas.createPNGStream();
  const out = fs.createWriteStream('./output/twitter.png');

  stream.pipe(out);
})();
