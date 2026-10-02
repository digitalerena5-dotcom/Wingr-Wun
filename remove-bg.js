import sharp from 'sharp';
import path from 'path';

const inputPath = 'C:\\Users\\syeda\\.gemini\\antigravity-ide\\brain\\8c1ce1ae-d80a-496f-a84c-66aff0561a25\\.user_uploaded\\media_1790945911783.jpg';
const outputPath = path.resolve('public/images/wingr_wun_logo.png');

async function processLogo() {
  const image = sharp(inputPath);
  const { data, info } = await image
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const outBuffer = Buffer.alloc(width * height * 4);

  // Find center of circular logo
  const cx = width / 2;
  const cy = height / 2;
  // Maximum radius for circle
  const maxRadius = Math.min(width, height) * 0.495;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const outIdx = (y * width + x) * 4;

      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];

      const distFromCenter = Math.hypot(x - cx, y - cy);

      // Outside the outer circle edge is completely transparent
      if (distFromCenter > maxRadius + 3) {
        outBuffer[outIdx] = 0;
        outBuffer[outIdx + 1] = 0;
        outBuffer[outIdx + 2] = 0;
        outBuffer[outIdx + 3] = 0;
        continue;
      }

      // Calculate brightness / gold intensity
      // Gold has strong red and green, lower blue
      const maxVal = Math.max(r, g, b);
      const isGold = (r > 60 && g > 45 && r >= b);

      let alpha = 0;
      if (maxVal < 26) {
        alpha = 0;
      } else if (maxVal < 60) {
        alpha = Math.round(((maxVal - 26) / 34) * 255);
      } else {
        alpha = 255;
      }

      // Smooth outer circular boundary
      if (distFromCenter > maxRadius - 2) {
        const edgeFactor = Math.max(0, Math.min(1, (maxRadius + 3 - distFromCenter) / 5));
        alpha = Math.round(alpha * edgeFactor);
      }

      // Boost gold hue slightly if needed to keep pure metallic shine
      if (alpha > 0 && isGold) {
        // Boost contrast on gold highlights
        outBuffer[outIdx] = Math.min(255, Math.round(r * 1.05));
        outBuffer[outIdx + 1] = Math.min(255, Math.round(g * 1.05));
        outBuffer[outIdx + 2] = Math.min(255, Math.round(b * 1.02));
        outBuffer[outIdx + 3] = alpha;
      } else if (alpha > 0) {
        outBuffer[outIdx] = r;
        outBuffer[outIdx + 1] = g;
        outBuffer[outIdx + 2] = b;
        outBuffer[outIdx + 3] = alpha;
      } else {
        outBuffer[outIdx] = 0;
        outBuffer[outIdx + 1] = 0;
        outBuffer[outIdx + 2] = 0;
        outBuffer[outIdx + 3] = 0;
      }
    }
  }

  await sharp(outBuffer, {
    raw: {
      width,
      height,
      channels: 4,
    },
  })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  console.log(`Logo saved successfully with transparent background to ${outputPath}`);
}

processLogo().catch(console.error);
