/**
 * Generates the default Open Graph / Twitter card image.
 * Run with: node scripts/generate-og-image.mjs
 * Output: public/brand/og-default.jpg (1200x630)
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'public', 'brand', 'logo.jpeg');
const output = path.join(root, 'public', 'brand', 'og-default.jpg');

const width = 1200;
const height = 630;
const logoSize = 340;

const logo = await sharp(source).resize(logoSize, logoSize, { fit: 'cover' }).toBuffer();

await sharp({ create: { width, height, channels: 3, background: '#ffffff' } })
  .composite([
    {
      input: logo,
      top: Math.round((height - logoSize) / 2),
      left: Math.round((width - logoSize) / 2),
    },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(output);

console.log(`Generated ${path.relative(root, output)} (${width}x${height})`);
