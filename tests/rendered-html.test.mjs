import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the planetary calculator", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Planetary Frame — Planet FOV Calculator<\/title>/i);
  assert.match(html, /Frame the planet you’ll actually see\./);
  assert.match(html, /Camera model/);
  assert.match(html, /Planned capture/);
  assert.match(html, /Location &amp; mount/);
  assert.match(html, /Preparing your sky/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("keeps the core astronomy and responsive behavior in the product source", async () => {
  const [page, css, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /from "astronomy-engine"/);
  assert.match(page, /LIGHT_SECONDS_PER_AU/);
  assert.match(page, /angularDiameterArcsec/);
  assert.match(page, /rotationRateDegPerMin/);
  assert.match(page, /Use my location/);
  assert.match(page, /Manual \/ custom camera/);
  assert.match(css, /@media \(max-width: 560px\)/);
  assert.match(css, /min-height: 44px/);
  assert.match(layout, /Planetary Frame — Planet FOV Calculator/);
  assert.match(packageJson, /"astronomy-engine"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
