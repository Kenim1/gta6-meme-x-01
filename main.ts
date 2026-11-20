// GTA 6 meme on X entry (gta6-meme-x-01, Node 22, standard library only).
// The entry is the X post itself: the meme was posted from @Johnporkmfeo
// with the make.fun ghost in the picture, @makefunai, a make.fun link and
// the play code in its text. This program just hands in the post's address:
// it copies POST.json from the repository root to /output/POST.json, where
// the house reads it and then reads the post from X.
// Outside the grader: mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });

// Validate the post address before handing it in: it must name an X post,
// so a placeholder or a mistyped address fails loudly here instead of at
// the site's entry-link check.
const post = JSON.parse(readFileSync(join(BOT_DIR, 'POST.json'), 'utf8')) as { url: string };
if (typeof post.url !== 'string' || !/^https:\/\/(x\.com|twitter\.com)\/[^/]+\/status\/\d+$/.test(post.url)) {
  console.error(`POST.json does not name an X post: ${JSON.stringify(post)}`);
  process.exit(1);
}
try {
  copyFileSync(join(BOT_DIR, 'POST.json'), join(OUTPUT_DIR, 'POST.json'));
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
