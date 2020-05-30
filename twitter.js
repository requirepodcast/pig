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

  // Title
  ctx.font = '50px FiraCode';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#ff5370';
  ctx.textAlign = 'left';
  const titleLines = wrapText(EPISODE_TITLE, 20);
  titleLines.map((line, i) => {
    ctx.fillText(line, 575, 100 + i * 60);
  });

  // Description
  ctx.font = '25px FiraCode';
  ctx.fillStyle = 'white';
  const titleLinesHeight = titleLines.length * 60;
  const descriptionLines = wrapText(EPISODE_DESCRIPTION, 39);
  descriptionLines.map((line, i) => {
    ctx.fillText(line, 575, 150 + titleLinesHeight + 30 * i);
  });

  // Save to file
  const stream = canvas.createPNGStream();
  const out = fs.createWriteStream('./output/twitter.png');

  stream.pipe(out);
})();
