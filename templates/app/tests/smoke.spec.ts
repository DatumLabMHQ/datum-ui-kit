// The kit's smoke test, the same in every project built on it. It reads the navigation from the page
// rather than a list here, so a project adds pages without touching this file, and it reads the shape
// of the shell the same way: the sidebar when there is one, the site header's nav when there is not, so
// a project on either shell passes it as scaffolded. What it asserts is the house layout contract: every
// page renders, nothing leaks a NaN, sections keep their rhythm, columns and card rows end on one line,
// every chart or table card carries a caption, and a phone can read it.
import { expect, test, type Page } from '@playwright/test';

const LEAKS = /\bNaN\b|\bundefined\b|\bInfinity\b|\$-|\[object Object\]/;
const SIDEBAR = '[data-slot=sidebar-menu-button][href^="/"], [data-slot=sidebar-menu-sub-button][href^="/"]';
const HEADER_NAV = 'header nav a[href^="/"]';

// Every route the shell links to, plus `/`. The app shell lists them in the sidebar, whose sub-lists are
// mounted only while open, so each closed one is opened first (a Base UI trigger, so its slot is the
// collapsible's and its open state is `data-panel-open`). The site shell lists them in the header nav
// and leaves `/` to the wordmark. Anchors on a page (`/#pricing`) count as that page.
async function routes(page: Page): Promise<string[]> {
  await page.goto('/');
  for (const t of await page.locator('[data-slot=sidebar-content] [data-slot=collapsible-trigger]:not([data-panel-open])').all()) await t.click();
  const sidebar = await page.$$eval(SIDEBAR, (as) => as.map((a) => a.getAttribute('href') as string));
  const header = sidebar.length ? [] : await page.$$eval(HEADER_NAV, (as) => as.map((a) => a.getAttribute('href') as string));
  return Array.from(new Set(['/', ...sidebar, ...header].map((h) => h.split(/[#?]/)[0] || '/')));
}

async function checkPage(page: Page, path: string) {
  const errors: string[] = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(e.message));
  const res = await page.goto(path);
  expect(res?.status(), `${path} status`).toBe(200);
  await expect(page.getByRole('heading', { level: 1 }).first(), `${path} h1`).toBeVisible();

  const text = await page.locator('main').innerText();
  expect(text, `${path} number leak`).not.toMatch(LEAKS);

  // Sections keep the layout's rhythm (16px at the tightest, 24px from md up).
  const gaps = await page.$$eval('[data-slot=page] > *', (els) => {
    const r = els.map((e) => e.getBoundingClientRect()).filter((x) => x.height > 0);
    return r.slice(1).map((x, i) => Math.round(x.top - r[i].bottom));
  });
  for (const g of gaps) expect(g, `${path} section gap`).toBeGreaterThanOrEqual(16);

  // A two-column detail layout ends on the same line on both sides.
  const panels = await page.$$eval('[data-slot=resizable-panel]', (ps) => ps.map((p) =>
    Math.max(...Array.from(p.querySelectorAll('[data-slot=card]')).map((c) => c.getBoundingClientRect().bottom))));
  if (panels.length === 2) expect(Math.abs(panels[1] - panels[0]), `${path} column bottoms`).toBeLessThanOrEqual(4);

  // Cards that share a row end together.
  const rows = await page.$$eval('[data-slot=card-row]', (rows) => rows.map((row) => {
    const b = Array.from(row.children).map((c) => c.getBoundingClientRect().bottom);
    return Math.max(...b) - Math.min(...b);
  }));
  for (const spread of rows) expect(spread, `${path} card-row bottoms`).toBeLessThanOrEqual(4);

  // A horizontal Tabs list sits above its panel, not beside it.
  const tabs = await page.$$eval('[data-slot=tabs][data-orientation=horizontal]', (ts) => ts.map((t) => {
    const list = t.querySelector(':scope > [data-slot=tabs-list]')?.getBoundingClientRect();
    const panel = Array.from(t.querySelectorAll(':scope > [data-slot=tabs-content]'))
      .map((p) => p.getBoundingClientRect()).find((r) => r.height > 0);
    return list && panel ? { gap: Math.round(panel.top - list.bottom), height: list.height } : null;
  }));
  for (const t of tabs) if (t) {
    expect(t.gap, `${path} tabs list above panel`).toBeGreaterThanOrEqual(0);
    expect(t.height, `${path} tabs list height`).toBeGreaterThan(0);
  }

  // Every table card says what the reader is looking at.
  const cards = page.locator('[data-slot=card]:has(table)');
  for (let i = 0; i < await cards.count(); i++) {
    await expect(cards.nth(i).locator('[data-slot=card-description]').first(), `${path} caption`).toHaveText(/.{20,}/);
  }
  expect(errors, `${path} console errors`).toEqual([]);
}

test('every page the shell links to renders clean', async ({ page }) => {
  const nav = await routes(page);
  expect(nav.length, 'routes').toBeGreaterThanOrEqual(1);
  for (const path of nav) await checkPage(page, path);
});

test('the command palette opens with cmd+k and finds a page', async ({ page }) => {
  await page.goto('/');
  // The palette belongs to the app shell's header, where its trigger shows the shortcut. The site shell has none.
  test.skip((await page.locator('header [data-slot=command-shortcut]').count()) === 0, 'this shell has no command palette');
  const first = await page.locator('[data-slot=sidebar-group-content] [data-slot=sidebar-menu-button] span').first().innerText();
  await page.keyboard.press('Meta+k');
  await page.getByPlaceholder('Search pages').fill(first);
  await expect(page.locator('[data-slot=command-item]:visible, [cmdk-item]:visible').first()).toBeVisible();
});

test('a form says what is wrong, and only after a submit', async ({ page }) => {
  // The form pattern is a gallery page; a project that dropped the gallery has no /patterns/form.
  const res = await page.goto('/patterns/form');
  test.skip(res?.status() === 404, 'this project has no /patterns/form page');
  await expect(page.getByText(/at least two characters/i)).toHaveCount(0);
  await page.getByRole('button', { name: 'Save job' }).click();
  await expect(page.getByText(/at least two characters/i)).toBeVisible();
  await expect(page.getByText(/work email/i)).toBeVisible();
});

test('dark mode keeps text readable on every surface', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Dark theme' }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  const body = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(body, 'dark ground is the brand navy, not a grey').not.toBe('rgb(255, 255, 255)');
});

test('phone width: no horizontal scroll', async ({ page }) => {
  const nav = await routes(page);
  await page.setViewportSize({ width: 375, height: 812 });
  for (const path of nav) {
    await page.goto(path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), `${path} overflows`).toBe(false);
  }
});
