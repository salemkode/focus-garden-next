# Focus Garden — Widget Factory deck (BCH BLAZE 2026), v2

Deck: https://docs.google.com/presentation/d/16sSdxHkranTg2wpwybkcenF869Gxal0JiMUsRLNKylk/edit
(a copy of the mandatory template; never edit the original). v1 was built on 20 Nov. v2 applies the
lead, Sol, Astra and Fable reviews (`reviews/`, summary in `REVIEW.md`).

Template order (kept): cover → one-sentence pitch with link → story → benefits → BCH usage →
vision → thank you. The walkthrough, evidence and before/after slides sit where the story needs
them. Deep detail goes in the speaker notes and the appendix.

## Wording rules (from the reviews)

- The **chain enforces a time lock**, not attention. The **app** tracks whether you stay. Say:
  "The app tracks whether you stay. Bitcoin Cash time-locks your tree. Finish the session and the
  app delivers it to your wallet."
- Never say "exactly that long", "unforgeable proof of focus" or "on-chain forfeiture". Tree locks
  count in 512-second steps from confirmation and mature by median block time.
- Use the app's size names: **Seedling · Sapling · Grand tree** (sessions up to 1 hour). Merging
  in the valley continues to Grove, Cabin … Sky Citadel. The on-chain tiers (Sprout, Tree, Big
  tree, House) appear only in the appendix.
- The leaderboard ranks **pledged focus**: points for confirmed planted trees.
- Fees in sats: plant = 2,000-sat fee + 1,000-sat deposit that travels with the tree; release =
  2,000-sat fee.
- WizardConnect: "pairing tested with a dedicated WizardConnect test wallet". Selene and Paytaca
  were not re-tested for this entry.
- "No server we run": the app uses public Electrum servers and the public pairing relays.
- Labels: **Done on Mainnet** · **Done on Mainnet (read-only)** · **Tested locally** ·
  **Tested (test wallet)** · **Simulated** · **Planned** · **Pending**.

## Visual identity

The template's layouts, fonts and title positions stay. Colours: moss `#3F7233`, deep forest
`#15241B`, sun `#FFD27A`, leaf `#9AD86F`, paper `#EEF3F0`. Assets in `assets/`: `app-icon.png`,
`walkthrough.png` (v2, 1920×1080), `story-stay-leave.png` (new, 1200×900), `screen-*.png`.
Aim for one idea per slide and big type: judges give each entry about two minutes.

---

## 1 — Cover

- **Focus Garden**
- Keep your word. Grow your forest.
- One short team line: **Salem Mohammed Shamakh (@salemkode)**
- ONE large link: **focus-app.salemkode.com**. Move the other URLs to the closing slide.
- Image: `screen-valley.png` (current). Icon: `app-icon.png`.
- Notes: The 2026 upgrade of Crypto Focus Garden (BLAZE 2025: 3rd place, BitcoinCash Innovation Award).

## 2 — One-sentence pitch

- **A focus timer with stakes: while you focus, Bitcoin Cash time-locks a tree; stay, and the app
  delivers it to your wallet as a CashTokens NFT. Leave, and it withers.**
- Large link right below: **Try it → focus-app.salemkode.com** (any modern browser plus a BCH wallet; about 15,000 sats)
- Status next to the link, not at the bottom: `[Contracts live on Mainnet · first app plant: Pending]`
- Notes: The website is the app's web build in a phone frame. The judge guide is at focus.salemkode.com/#blaze.

## 3 — Story

Title: The Story of Focus Garden

- One sentence: **Amina sits down to study. Four minutes later she's scrolling, because quitting
  a timer costs nothing.**
- One sentence: **With Focus Garden she pledges a session. Stay, and her tree grows and comes to
  her wallet. Leave for 10 seconds, and it withers.**
- Image: `story-stay-leave.png` ("Stay: it grows" / "Leave for 10 s: it withers").
- Label: `[Illustrative story · real app screens]`
- Notes: The problem is attention. Timers fail because breaking them is free and keeping them
  proves nothing anyone else can see.

## 4 — How it works (walkthrough)

- Full-bleed `walkthrough.png` v2: four steps with honest chips (1 Tested: WizardConnect test
  wallet · 2 Tested: created, balance read · 3 Pending: first mainnet plant · 4 Pending: first
  mainnet release). The QR code is blurred.
- Notes: 1 Connect: WizardConnect shares a receive key branch, and the app uses the first receive
  address; it never asks the wallet to sign. 2 Fund the fee wallet with one coin of ≥8,000 sats
  (≈15,000 covers a plant and a release). 3 Plant with Verify on: the app builds the FocusForest
  `plantTree` transaction, checks it in the BCH 2026 VM, signs and broadcasts. 4 Stay. When the
  lock matures, the app sends the tree to the linked wallet. A withered session doesn't get the
  automatic delivery.

## 5 — Benefits (three rows, one status each)

Title: Benefits of Focus Garden
- **A reason to stay.** Leave for 10 seconds and your tree withers. `[Tested locally]`
- **A reward you own.** Kept sessions become CashTokens NFTs in your own wallet, with pictures from our BCMR registry. `[Contracts and metadata: Done on Mainnet · first delivery: Pending]`
- **No account, no server we run.** The app talks to Bitcoin Cash through public Electrum servers. `[Done on Mainnet (read-only)]`
- Notes (moved off the slide): app blocking (Screen Time / usage access) in the native apps, not
  re-verified for this entry; profile cards, a leaderboard of pledged focus, and tips.

## 6 — BCH Usage

Title: BCH Usage
- A simple diagram made of native shapes: **Plant** (mint tree NFT, 2,000-sat fee + 1,000-sat deposit) →
  **Time lock** (BIP68, 512-second steps, matures by median block time) → **Release** (NFT and deposit to
  your wallet, 2,000-sat fee). Below it: **Merge** (matured trees combine inside the contract).
- Three short lines:
  - **FocusForest + FocusDirectory** (CashScript, P2SH32), live on mainnet since 19 Nov 2026 (block 977999). `[Done on Mainnet]`
  - **WizardConnect** wallet linking (WalletConnect too). `[Tested (test wallet)]`
  - Every transaction is built, VM-checked and signed in the app; contract + protocol tests. `[Tested locally]`
- Remove the small repeated screenshot.
- Notes: Why BCH: native tokens without a token contract, covenant time locks that every node
  enforces, and fees of a few thousand sats. The XO engine (`@xo-cash/engine`, stock p2pkh
  template) runs the native fee wallet only; the web uses a single-key wallet.

## 7 — Evidence and honest limits

Title: Evidence and honest limits
- Compact table (four rows):

| Claim | Status |
|---|---|
| Contracts, 100 creator trees, BCMR metadata | Done on Mainnet — block 977999 |
| App reads gardens, balances and leaderboard from mainnet | Done on Mainnet (read-only) |
| WizardConnect pairing | Tested with a dedicated test wallet, 20 Nov |
| Plant → release from the website | Pending — first mainnet run |

- Visible box: **Limits:** the chain checks time, not attention; the app checks that you stay.
  The leaderboard counts pledged time. Delivery waits for the lock to mature (up to about an hour
  after the session) and for the app to be open. On the web, the fee wallet's key lives in the browser.
- Notes: test counts and per-claim details are in the appendix and `SUBMISSION.md`.

## 8 — Vision

Title: The Vision for Focus Garden
- **First buyer: study groups.** A shared garden for a class or study circle, paid per group in BCH or pUSD. `[Planned]`
- **Promises with stakes.** Put pUSD behind a pledge: keep it and it comes back; break it and it goes to a cause you chose. `[Planned]`
- **Success measure:** groups that come back for a second week.
- Remove the "million promises" target and the employer market.

## 9 — Before and after

Same table as v1, with these changes:
- Labelled links, no raw URLs: "2025 source", "2025 demo (organizer showcase)", "2026 source".
- Network row, 2026 column: "Mainnet: contract deployment and reads; first web plant pending".
- Wallets row, 2026 column: "WizardConnect, WalletConnect; XO-engine fee wallet (native)".

## 10 — Thank you

- **THANK YOU!**
- The largest line: **Plant a 9-minute tree → focus-app.salemkode.com**
- Small: Judge guide focus.salemkode.com/#blaze · Source github.com/salemkode/focus-garden-next
- `EMBER2026 votes: address to be confirmed` (unchanged until the owner confirms)

## A1 — Mainnet transactions

Short txids (first 8 … last 4), each linked to `https://blockchair.com/bitcoin-cash/transaction/<txid>`.
Heading: "Deployment (operator) — Done on Mainnet". An empty second heading,
"Judge path (app) — Pending", gets the plant and release txids later.

## A2 — Architecture

One line: **public Electrum → `packages/protocol` builder → app policy check, signing and BCH VM
check → broadcast.** Signers: XO-engine wallet on iPhone and Android, single-key wallet in the
browser. Commitment (39 bytes): `05 | owner pkh (where the tree goes) | planter tag (who planted)
| stamp | units (lock length) | look (tier × 16 + species)`. On-chain tiers: Sprout (≥1 unit,
8.5 min) · Tree (≥3) · Big tree (≥6) · House (≥11); 3 sprouts → tree, 2 trees → big tree, 2 big
trees → house.

## A3 — What was built during BLAZE

Three dated rows:
- **Nov 2025 (BLAZE 2025):** Crypto Focus Garden: Next.js web dApp, one Chipnet contract with a relaxed time check. Public.
- **9–13 Nov 2026 (before kickoff):** a private Expo prototype reusing the 2025 contract on Chipnet (9–10 Nov); the React Native Libauth adapter started (13 Nov, public repo).
- **14–22 Nov 2026 (BLAZE):** the FocusForest and FocusDirectory contracts and their mainnet deployment with BCMR; the Expo app for iPhone, Android and the web; on-device transaction building; WizardConnect and WalletConnect linking; leaderboard, profiles and tips; the web fee wallet and the banner.

Link: "Everything since 2025" → https://github.com/salemkode/focus-garden-next/compare/de708cd...docs/blaze-2026-submission
