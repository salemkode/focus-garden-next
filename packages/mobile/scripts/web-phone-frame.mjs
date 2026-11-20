#!/usr/bin/env node
/**
 * The web build simulates the phone app; it is not a desktop site. After `expo export --platform web`,
 * this adds a small script to the top of dist-web/index.html: on a wide screen (desktop), the page
 * stops loading the app and instead shows it inside a phone-sized frame of the same URL. Inside that
 * frame the app sees a phone-sized window, so layout, sheets and pagers behave exactly like on a
 * phone. On phones and narrow windows the app runs full-screen as before.
 *
 * It also adds the BCH BLAZE 2026 banner (blaze-banner.json) to the top of the page: above the phone
 * on desktop, and above the app on phones. Inside the frame the banner is hidden, so it shows once.
 *
 * Usage: node scripts/web-phone-frame.mjs [dist-web]
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = process.argv[2] ?? "dist-web";
const file = join(dir, "index.html");
const html = readFileSync(file, "utf8");
const MARK = "<!-- focus-garden-phone-frame -->";
if (html.includes(MARK)) {
	console.log("Phone frame already present.");
	process.exit(0);
}

const config = JSON.parse(readFileSync(join(dirname(fileURLToPath(import.meta.url)), "..", "blaze-banner.json"), "utf8"));
const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const link = (href, label) => (href ? `<a href="${esc(href)}" target="_blank" rel="noopener">${esc(label)}</a>` : "");
const parts = [
	link(config.deck, "Slides"),
	link(config.source, "Source (2026)"),
	`2025 version: ${[link(config.before.source, "source"), link(config.before.demo, "demo"), link(config.before.entry, "entry")].filter(Boolean).join(" · ")}`,
	link(config.guide, "Judge guide"),
].filter(Boolean);
const vote = config.votingAddress
	? `<span class="vote">EMBER2026 votes (Mainnet CashTokens): <code>${esc(config.votingAddress)}</code> <button type="button" onclick="navigator.clipboard&&navigator.clipboard.writeText(this.dataset.a);this.textContent='Copied'" data-a="${esc(config.votingAddress)}">Copy</button></span>`
	: "";
const BANNER_CSS =
	"#blaze-banner{box-sizing:border-box;width:100%;padding:8px 14px;background:#15241b;color:#e8efe9;font:500 12.5px/1.45 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;text-align:center}" +
	"#blaze-banner strong{color:#ffd27a;margin-right:6px}#blaze-banner a{color:#9ad86f;font-weight:700;text-decoration:none;margin:0 2px}#blaze-banner a:hover{text-decoration:underline}" +
	"#blaze-banner .sep{opacity:.5;margin:0 6px}#blaze-banner .vote{display:inline-block;margin-left:4px}#blaze-banner code{font:600 11.5px ui-monospace,Menlo,monospace;overflow-wrap:anywhere;color:#fff}" +
	"#blaze-banner button{margin-left:6px;padding:1px 8px;border:1px solid #9ad86f;border-radius:999px;background:transparent;color:#9ad86f;font:600 11px inherit;cursor:pointer}" +
	"@media (max-width:600px){#blaze-banner{padding:6px 10px;font-size:11px;line-height:1.4}#blaze-banner code{font-size:10px}#blaze-banner .sep{margin:0 3px}}";
const BANNER = `<div id="blaze-banner" role="region" aria-label="BCH BLAZE 2026 entry"><strong>🔥 ${esc(config.event)}</strong>${parts.join('<span class="sep">|</span>')}${vote ? '<span class="sep">|</span>' + vote : ""}</div>`;

// Kept dependency-free and small: it runs before anything else on the page.
const frame = `${MARK}
<script>
(function () {
  if (window.self !== window.top) return;            // already inside the phone frame
  if (Math.min(window.innerWidth, screen.width) < 700) return; // phones and narrow windows: full app
  window.stop();                                      // don't load the app twice
  var src = location.pathname + location.search + location.hash;
  document.documentElement.innerHTML =
    '<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<title>Focus Garden</title>' +
    '<style>' +
    'html,body{margin:0;height:100%}' +
    'body{display:grid;place-items:center;gap:16px;min-height:100vh;background:radial-gradient(900px 500px at 80% 0%,#ffe2c2,transparent 70%),radial-gradient(800px 500px at 0% 20%,#cfe8ee,transparent 70%),#eef3f0;font:500 14px/1.4 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;color:#4f5e55}' +
    '.phone{--h:min(932px,calc(100vh - 96px));height:var(--h);aspect-ratio:430/932;padding:12px;border-radius:64px;background:#15241b;box-shadow:0 2px 6px rgba(21,36,27,.25),0 40px 90px -30px rgba(21,36,27,.55)}' +
    '.phone iframe{display:block;width:100%;height:100%;border:0;border-radius:52px;background:#eef3f0}' +
    'a{color:#2a6e27;font-weight:700;text-decoration:none}a:hover{text-decoration:underline}' +
    '@media (prefers-color-scheme:dark){body{background:#0e1611;color:#a9b8ae}a{color:#9ad86f}.phone{background:#2c3d33;box-shadow:0 0 0 1px #3a4d41,0 40px 90px -30px rgba(0,0,0,.8)}}' +
    '</style></head>' +
    '<style>' + ${JSON.stringify(BANNER_CSS)} + 'body{display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:14px}.phone{--h:min(932px,calc(100vh - 150px))}</style>' +
    '<body>' + ${JSON.stringify(BANNER)} + '<div class="phone"><iframe title="Focus Garden" allow="clipboard-write" src="' + src.replace(/"/g, '&quot;') + '"></iframe></div>' +
    '<p>Focus Garden on the web, shown as on a phone. <a href="https://focus.salemkode.com/#download">Get the iPhone or Android app</a></p></body>';
})();
</script>`;

// Phones and narrow windows: the banner sits above the app, which keeps the rest of the height.
// Inside the desktop phone frame it is hidden (the outer page already shows it).
const inline = `<style>${BANNER_CSS}body{display:flex;flex-direction:column}#root{height:auto;min-height:0}html.in-frame #blaze-banner{display:none}</style>`;
const marker = `<script>if (window.self !== window.top) document.documentElement.classList.add('in-frame');</script>`;
writeFileSync(
	file,
	// The page's own head and root first; the frame script (which contains its own head) goes last.
	html
		.replace(/<\/head>/i, `${inline}\n${marker}\n</head>`)
		.replace(/<div id="root">/i, `${BANNER}\n<div id="root">`)
		.replace(/<head>/i, `<head>\n${frame}`),
);
console.log(`Phone frame added to ${file}`);
