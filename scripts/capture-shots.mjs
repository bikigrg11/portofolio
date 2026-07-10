#!/usr/bin/env node
/**
 * capture-shots.mjs
 *
 * Screenshot-capture pipeline for the portfolio's case-study / more-work
 * sections. Takes a list of { id, url } targets that are ALREADY running
 * on localhost (see scripts/README.md for how to start each app) and
 * screenshots each one into public/shots/<id>.png at 1440x900.
 *
 * This script never starts any dev servers itself — starting apps is a
 * fragile, per-project process (env vars, DBs, brokers, etc.), so that
 * part is a documented manual step. This script only drives the browser.
 *
 * Usage:
 *   node scripts/capture-shots.mjs                # capture every target below
 *   node scripts/capture-shots.mjs side-quests     # capture only these ids
 *   node scripts/capture-shots.mjs side-quests trading-bot
 *
 * Each target is independent and wrapped in try/catch — one failing/slow
 * target is logged and skipped, it never aborts the rest of the run.
 */

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '..', 'public', 'shots');

// ---------------------------------------------------------------------
// EDIT ME: targets to capture. `id` becomes public/shots/<id>.png and
// should match the `shot: '/shots/<id>.png'` path referenced in
// src/data/content.tsx for anything meant to show up in the UI.
// `url` must already be serving (see scripts/README.md).
// ---------------------------------------------------------------------
const TARGETS = [
  { id: 'side-quests', url: 'http://localhost:4173/arcade' }, // io-game-lab
  { id: 'trading-bot', url: 'http://localhost:8010/' }, // trading/trading-bot dashboard
  // Extra apps not currently referenced by content.tsx `shot` paths —
  // still useful to have in public/shots/ for future sections.
  { id: 'job-hunt-tracker', url: 'http://localhost:3101/' },
  { id: 'kept-web', url: 'http://localhost:3102/' },
  { id: 'pokeinvest', url: 'http://localhost:3103/' }, // currently 500s (localStorage used server-side) — see README
];

const VIEWPORT = { width: 1440, height: 900 };
const NAV_TIMEOUT_MS = 20_000;
const SETTLE_MS = 800; // small extra wait after networkidle for late CSS/fonts/animations

async function captureOne(browser, { id, url }) {
  const page = await browser.newPage({ viewport: VIEWPORT });
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: NAV_TIMEOUT_MS });
    await page.waitForTimeout(SETTLE_MS);
    const outPath = path.join(OUT_DIR, `${id}.png`);
    await page.screenshot({ path: outPath });
    console.log(`[capture-shots] CAPTURED ${id} -> ${path.relative(process.cwd(), outPath)} (${url})`);
    return { id, status: 'captured' };
  } catch (err) {
    console.warn(`[capture-shots] SKIPPED ${id} (${url}): ${err.message}`);
    return { id, status: 'skipped', reason: err.message };
  } finally {
    await page.close().catch(() => {});
  }
}

async function main() {
  const argvIds = process.argv.slice(2);
  const targets = argvIds.length
    ? TARGETS.filter((t) => argvIds.includes(t.id))
    : TARGETS;

  if (targets.length === 0) {
    console.error('[capture-shots] No matching targets. Known ids:', TARGETS.map((t) => t.id).join(', '));
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const results = [];
  try {
    for (const target of targets) {
      // Sequential on purpose: keeps console output readable and avoids
      // hammering multiple local dev servers at once.
      // eslint-disable-next-line no-await-in-loop
      results.push(await captureOne(browser, target));
    }
  } finally {
    await browser.close();
  }

  const captured = results.filter((r) => r.status === 'captured').length;
  console.log(`\n[capture-shots] Done: ${captured}/${results.length} captured.`);
  for (const r of results) {
    console.log(`  - ${r.id}: ${r.status}${r.reason ? ` (${r.reason})` : ''}`);
  }
}

main().catch((err) => {
  // Even a totally unexpected error here should not look like a build
  // failure to callers that just want best-effort screenshots.
  console.error('[capture-shots] Unexpected error, exiting without throwing:', err);
  process.exitCode = 0;
});
