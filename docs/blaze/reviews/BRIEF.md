# Review brief — Focus Garden, BCH BLAZE 2026 (20 Nov 2026)

You are one of several independent reviewers. Review the same near-final material as the others and challenge it hard. Deadline for the real submission: 22 Nov 2026 14:00 UTC.

## Material
- Deck (Google Slides copy of the mandatory Widget Factory template): https://docs.google.com/presentation/d/16sSdxHkranTg2wpwybkcenF869Gxal0JiMUsRLNKylk/edit — rendered thumbnails of all 13 slides: `docs/blaze/deck-renders/slide-01.png` … `slide-13.png`; the intended content and speaker notes: `docs/blaze/DECK.md`.
- Live demo (Bitcoin Cash mainnet): https://focus-app.salemkode.com (web app, BLAZE banner at the top) and the landing/judge guide https://focus.salemkode.com/#blaze. Screens: `docs/blaze/assets/`.
- DoraHacks BUIDL draft: `docs/blaze/BUIDL-DRAFT.md` (the live BUIDL https://dorahacks.io/buidl/51334 still has older text and is on the Media track).
- Submission text and evidence table: `docs/blaze/SUBMISSION.md`; per-track verdicts: `docs/blaze/ELIGIBILITY.md`; demo script: `docs/blaze/DEMO.md`; links and banner: `docs/blaze/LINKS.md`; remaining steps: `docs/blaze/TODO-BEFORE-SUBMIT.md`.
- Official rules snapshot (read 20 Nov): `docs/blaze/sources/dorahacks-detail-2026-11-20.txt`. Bounty pages: https://bchblaze.com/bounties/ (Build with XO, Migrate to XO).
- Source: this repository (branch `docs/blaze-2026-submission`, PR https://github.com/salemkode/focus-garden-next/pull/5). App: `packages/mobile`; contracts: `packages/contracts`; on-device chain code: `packages/protocol`; mainnet record: `packages/contracts/deployments/mainnet.json`.

All paths are relative to /Users/salmshmakh/.t3/worktrees/focus-garden/blaze-submission.

## Challenge
1. **Story** — is the problem/user/solution compelling in the couple of minutes judges give? What would you cut or reorder?
2. **Visuals** — slide by slide: legibility, density, overflow, consistency (e.g. tree-size names vs the app), whether the walkthrough sells the product.
3. **Factual claims and evidence** — check claims against code, tests and the chain record. Flag anything overstated, unverified, or labelled wrongly (labels: Done on Mainnet / Done on Chipnet / Tested locally / Simulated / Planned / Pending). Verify txids/heights where you can (read-only).
4. **Compliance with the rules** — Mainnet track: judge-runnable mainnet transaction from a website, live demo, Widget Factory deck, banner (deck link, source, CashTokens voting address, old+new repo and "before" demo for pre-existing projects), WizardConnect or XO Template integration, pre-existing work disclosure.
5. **Track choice** — Mainnet only vs. also Media vs. XO bounties.

## Rules for you
- Read-only. Do NOT edit any file except your own review file, do NOT touch git, Google Drive, DoraHacks or Cloudflare, do NOT connect wallets, create wallets, or send any transaction, do NOT change sharing. Opening public URLs (HTTP or browser) is fine.
- Write your findings to `docs/blaze/reviews/<your-model-name>.md`: a ranked list (Blocker / Major / Minor), each with the evidence (file:line, URL, slide number) and a concrete fix. End with a one-paragraph verdict and your track recommendation.
- Be specific and adversarial; don't restate what is fine.
