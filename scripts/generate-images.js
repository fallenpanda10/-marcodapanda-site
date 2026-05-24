// scripts/generate-images.js
const sharp = require('sharp');
const fs = require('fs');
const sizes = [480, 800, 1200];
const input = 'Public/assets/images/matcha-panda.webp'; // source master (your converted webp)

(async () => {
  if (!fs.existsSync(input)) {
    console.error('Input file not found:', input);
    process.exit(1);
  }

  for (const w of sizes) {
    const base = `Public/assets/images/matcha-panda-${w}`;
    await sharp(input).resize(w).avif({ quality: 60 }).toFile(`${base}.avif`);
    await sharp(input).resize(w).webp({ quality: 80 }).toFile(`${base}.webp`);
    await sharp(input).resize(w).jpeg({ quality: 82 }).toFile(`${base}.jpg`);
    console.log('Generated:', `${base}.{avif,webp,jpg}`);
  }
})();
