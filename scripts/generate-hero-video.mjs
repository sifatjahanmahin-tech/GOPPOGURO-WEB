/**
 * Transcodes the 74 hero-animation JPEG frames into an optimized,
 * seamlessly looping background video (ping-pong) plus a poster image.
 *
 * Replaces the legacy 19 MB canvas frame sequence (~20 MB of preloading)
 * with a < 1.5 MB video.
 *
 * Run with: node scripts/generate-hero-video.mjs
 * Output: public/media/hero.webm, hero.mp4, hero-poster.webp
 */
import ffmpegPath from 'ffmpeg-static';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const framesDir = path.join(root, 'hero animation');
const outDir = path.join(root, 'public', 'media');
fs.mkdirSync(outDir, { recursive: true });

const WIDTH = 1280;
const FPS = 24;
const input = path.join(framesDir, 'Video Project_%03d.jpg');

const base = ['-hide_banner', '-y', '-framerate', String(FPS), '-start_number', '0', '-i', input];

// Forward pass + reversed pass = seamless ping-pong loop.
const filter =
  `[0:v]fps=${FPS},scale=${WIDTH}:-2:flags=lanczos,split=2[a][b];` +
  `[b]reverse[r];[a][r]concat=n=2:v=1[out]`;

function run(args) {
  execFileSync(ffmpegPath, args, { stdio: 'inherit' });
}

run([
  ...base,
  '-filter_complex', filter,
  '-map', '[out]',
  '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '36', '-row-mt', '1',
  '-an', path.join(outDir, 'hero.webm'),
]);

run([
  ...base,
  '-filter_complex', filter,
  '-map', '[out]',
  '-c:v', 'libx264', '-crf', '25', '-preset', 'slow', '-pix_fmt', 'yuv420p',
  '-movflags', '+faststart', '-an', path.join(outDir, 'hero.mp4'),
]);

run([
  '-hide_banner', '-y',
  '-i', path.join(framesDir, 'Video Project_037.jpg'),
  '-vf', `scale=${WIDTH}:-2:flags=lanczos`,
  '-c:v', 'libwebp', '-quality', '82',
  path.join(outDir, 'hero-poster.webp'),
]);

for (const file of ['hero.webm', 'hero.mp4', 'hero-poster.webp']) {
  const { size } = fs.statSync(path.join(outDir, file));
  console.log(`${file}: ${(size / 1024).toFixed(0)} KB`);
}
