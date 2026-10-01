const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const toIco = require('to-ico');

async function generateFavicons() {
  const srcImage = path.join(__dirname, '..', 'assets', 'images', 'logo.png');
  const outDir = path.join(__dirname, '..', 'assets', 'favicon');
  const rootDir = path.join(__dirname, '..');

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Crop precisely around the iconic Golden Hypermarket 'G' emblem
  // and add balanced brand-orange padding (rgb(255, 76, 2)) so it stays crisp and readable at 16px
  const baseCrop = sharp(srcImage)
    .extract({ left: 52, top: 19, width: 44, height: 44 })
    .extend({ top: 5, bottom: 5, left: 5, right: 5, background: { r: 255, g: 76, b: 2 } });

  // 1. favicon-16x16.png
  console.log('Generating favicon-16x16.png...');
  const buf16 = await baseCrop
    .clone()
    .resize(16, 16, { kernel: 'lanczos3' })
    .sharpen({ sigma: 0.5, m1: 1, m2: 2 })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(outDir, 'favicon-16x16.png'), buf16);

  // 2. favicon-32x32.png
  console.log('Generating favicon-32x32.png...');
  const buf32 = await baseCrop
    .clone()
    .resize(32, 32, { kernel: 'lanczos3' })
    .sharpen({ sigma: 0.5, m1: 0.8, m2: 1.5 })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(outDir, 'favicon-32x32.png'), buf32);

  // 3. apple-touch-icon.png (180x180)
  console.log('Generating apple-touch-icon.png (180x180)...');
  await baseCrop
    .clone()
    .resize(180, 180, { kernel: 'lanczos3' })
    .png()
    .toFile(path.join(outDir, 'apple-touch-icon.png'));

  // 4. icon-192.png (192x192)
  console.log('Generating icon-192.png (192x192)...');
  await baseCrop
    .clone()
    .resize(192, 192, { kernel: 'lanczos3' })
    .png()
    .toFile(path.join(outDir, 'icon-192.png'));

  // 5. icon-512.png (512x512)
  console.log('Generating icon-512.png (512x512)...');
  await baseCrop
    .clone()
    .resize(512, 512, { kernel: 'lanczos3' })
    .png()
    .toFile(path.join(outDir, 'icon-512.png'));

  // 6. favicon.ico (multi-resolution 16x16, 32x32, 48x48)
  console.log('Generating favicon.ico...');
  const buf48 = await baseCrop
    .clone()
    .resize(48, 48, { kernel: 'lanczos3' })
    .png()
    .toBuffer();
  const icoBuf = await toIco([buf16, buf32, buf48]);
  fs.writeFileSync(path.join(outDir, 'favicon.ico'), icoBuf);
  // Also place in root directory for browser default /favicon.ico requests
  fs.writeFileSync(path.join(rootDir, 'favicon.ico'), icoBuf);

  // 7. site.webmanifest
  console.log('Generating site.webmanifest...');
  const manifest = {
    name: "Golden Hypermarket Pala",
    short_name: "Golden Hypermarket",
    description: "Kerala's trusted destination for fresh groceries, farm produce, fish, meat, household essentials, and electronics since 1964.",
    icons: [
      {
        src: "icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable"
      },
      {
        src: "icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      }
    ],
    theme_color: "#0b4d2c",
    background_color: "#0b4d2c",
    display: "standalone",
    start_url: "./index.html"
  };

  fs.writeFileSync(
    path.join(outDir, 'site.webmanifest'),
    JSON.stringify(manifest, null, 2) + '\n',
    'utf-8'
  );

  console.log('All favicon files successfully generated!');
}

generateFavicons().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
