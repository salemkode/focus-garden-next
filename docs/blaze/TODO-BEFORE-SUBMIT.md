# Before you submit — Focus Garden, BCH BLAZE 2026

**Hard deadline: Sunday 22 Nov 2026, 14:00 UTC** (17:00 in Aden; DoraHacks shows 2026/11/22 17:00
UTC+3). **Target: everything done by Saturday 21 Nov, 18:00 UTC.** The Final Check-In Stream is
21 Nov at 14:00 UTC.

Legend: 🧑 only you can do or decide this · 🤖 I do it once you say yes · ✅ already done

## In order

1. 🧑 **Confirm the EMBER2026 voting address.** The banner and landing page show
   `bitcoincash:zzm8exh8lcxre37pduausrqgpns57acsmc0fswlr7s`. It was added on 19 Nov (commit
   5a7ab57), but nothing records who controls it, and it has never been used on chain. Reply either
   "confirmed, it's mine" or with another **mainnet** CashTokens-capable (`z…`) address you control.
   🤖 I then update `blaze-banner.json`, the deck and the BUIDL text, and redeploy.

2. 🧑 **Approve and fund one judge-path run on mainnet.** This is the core Mainnet-track proof. No
   app-made transaction exists on mainnet yet (the FocusForest contract has only its genesis). My
   rules exclude your existing wallets and funds, so a funding source has to come from you. Two options:
   - **(a) You run it** (about 15 minutes of attention plus waiting). Follow `DEMO.md` → "Judge
     instructions" on https://focus-app.salemkode.com with your own wallet and about 15,000 sats, then
     send me the txids.
   - **(b) I run it.** Send about 20,000 sats to a dedicated browser fee wallet I create for this. I
     mint a profile card, plant a 9-minute verified tree, wait for the release (about 1–1.5 h) and
     record every txid.

   🤖 Either way, I then update the evidence (`SUBMISSION.md` #12), the deck chips ("mainnet
   pending" → "Done on Mainnet") and the BUIDL text.

3. 🧑 **Approve sharing the deck** as "Anyone with the link → Viewer". 🤖 I set the share link, add
   it to the banner (`deck` in `blaze-banner.json`), redeploy both sites, and check the link from a
   signed-out browser.

4. 🧑 **Approve the DoraHacks changes** to BUIDL #51334:
   - switch the track **Media → Mainnet** (hackathon page → Manage Submission)
   - replace the fields with `BUIDL-DRAFT.md`: logo, tagline, links and details

   The BUIDL is already public, so Save publishes immediately. 🤖 I fill and save it in your browser
   once you approve.

5. 🧑 **Roll call and Telegram.** Did someone on the team attend one of the five preparation streams?
   That decides the priority queue. Have you confirmed the project is real in the BCH BLAZE Telegram
   channel? Both are owner-only and not visible to me.

6. 🧑 **Keep the deployed build until judging ends (27 Nov).** focus-app.salemkode.com and
   focus.salemkode.com now run branch `docs/blaze-2026-submission`. A deploy from `main` drops the
   fee wallet and banner until PR #5 is merged. Two ways to avoid it:
   - merge https://github.com/salemkode/focus-garden-next/pull/5 (I won't merge it), or
   - tell other threads not to redeploy the web app or landing page from `main`.

7. 🧑 **The old Media "interactive piece"** at focusgarden.salemkode.com/blaze (and its pitch.pdf)
   still says "test network" and "garden service". Option: 🤖 I point it to
   focus.salemkode.com/#blaze. Otherwise it stays as it is, but it is removed from the BUIDL in step 4.

8. Optional 🧑 + 🤖 **Video.** After step 2, I record about a 2.5-minute walkthrough from the
   `DEMO.md` script. It's not required for the Mainnet track. You decide where it is hosted
   (YouTube or similar). Publishing it is your call.

9. Not recommended: **Media-track entry** (a separate BUIDL and its own piece) and the **XO bounties**
   (no XO template or invitation, plus your personally written feedback; `XO-FEEDBACK.md` is a
   placeholder). See `ELIGIBILITY.md`.

10. 🧑 **Final check, then Submit/Save** on DoraHacks before 22 Nov 14:00 UTC. In a signed-out
    browser, check that the deck link, demo, judge guide and source commit all open, and that the
    BUIDL shows the Mainnet track.

## Already done ✅

- Rules re-verified on 20 Nov from DoraHacks and bchblaze.com (`ELIGIBILITY.md`, `sources/`)
- Web fee wallet; connection-only wallet linking; withered sessions keep their tree locked. All are
  committed, pushed, deployed, and in PR #5.
- The BLAZE banner is live on the web app and landing page. The deck link appears after step 3.
- The judge guide is live at https://focus.salemkode.com/#blaze
- WizardConnect pairing was verified on the mainnet web build with a dedicated test wallet.
- Submission text, evidence table, demo script and BUIDL draft are in this folder.
- Deck: a Widget Factory copy is being built by Codex (see `LINKS.md` and `REVIEW.md`).
