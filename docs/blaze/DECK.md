# Focus Garden — Widget Factory deck (BCH BLAZE 2026)

Source of truth for the Google Slides copy of the mandatory Widget Factory template
(https://docs.google.com/presentation/d/1Yfuk9CJkf4U9M_WukcELhumWgj3Ak6345Ewy8hSp-Hk/edit).
Never edit the original. Work only in a copy named **Focus Garden — BCH BLAZE 2026**.

Template order (kept): cover → one-sentence pitch with link → story → benefits → BCH usage →
vision → thank you. Extra slides (walkthrough, evidence, before/after, limitations) sit where the
story needs them; deep detail goes to speaker notes and the appendix.

## Visual identity

- Keep the template's layout, fonts and title positions. Replace its widget imagery with Focus Garden's.
- Colours from the app: moss green `#3F7233` (primary), deep forest `#15241B` (dark panels),
  sun `#FFD27A` (highlights, step numbers), leaf `#9AD86F` (links / "done" chips),
  paper `#EEF3F0` (light background), ink `#1B2A21`.
- Icon: `assets/app-icon.png` (voxel tree). Screens: `assets/screen-*.png` (real captures of the
  mainnet web build, 20 Nov 2026). Walkthrough: `assets/walkthrough.png` (annotated, 1920×1080).
- Every factual claim carries one of five labels, as a small chip or a bracketed tag:
  **Done on Mainnet** · **Done on Chipnet** · **Tested locally** · **Simulated** · **Planned**.

---

## Slide 1 — Cover (template cover)

- Title: **Focus Garden**
- Subtitle: Keep your word. Grow your forest.
- Team line: Team Focus Garden: Salem Mohammed Shamakh (@salemkode) — solo builder
- Links (small): focus-app.salemkode.com · github.com/salemkode/focus-garden-next · focus.salemkode.com
- Image: `assets/screen-valley.png` in a phone shape on the right; `assets/app-icon.png` near the title.
- Notes: Focus Garden is the 2026 upgrade of Crypto Focus Garden (BLAZE 2025: 3rd place, BitcoinCash Innovation Award, the Chipnet track).

## Slide 2 — One-sentence pitch (template "TITLE HERE" slide)

- Big line: **Promise a focus session on Bitcoin Cash: stay, and a tree grows into your wallet as a CashTokens NFT; leave, and it withers.**
- Link under it: **Try it: focus-app.salemkode.com** (also iPhone and Android builds via focus.salemkode.com)
- Notes: Works in any browser. Judges need a BCH wallet (Selene or Paytaca) and ~15,000 sats.

## Slide 3 — The story (template story slide)

Title: The Story of Focus Garden

Body:
> Amina has an exam on Monday. She opens her notes and, four minutes later, she is scrolling.
> Focus timers don't help: nothing happens when she quits, and nobody can see that she kept going.
>
> With Focus Garden she promises 26 minutes. A tree is locked on Bitcoin Cash for exactly that long.
> If she leaves the app for more than 10 seconds, the tree withers. If she stays, the grown tree is
> sent to her own wallet, where anyone can verify it. Three sprouts merge into a tree, two trees into
> a big tree, and her garden shows the focus she actually kept.

Notes: The problem is attention, not time management. Apps like Forest proved people pay for this
loop; Focus Garden adds ownership and public, unforgeable proof.

## Slide 4 — How it works (walkthrough, new slide after the story)

- Full-bleed image: `assets/walkthrough.png` (four annotated steps with status chips).
- Notes: 1 Connect (WizardConnect/WalletConnect; only the address is read). 2 Fund the small fee
  wallet (on the web its key lives in the browser; hold only a little BCH). 3 Plant with
  *Verify on Bitcoin Cash*: the app builds, checks and signs a FocusForest `plantTree` transaction.
  4 Stay; when the CSV lock matures, the app releases the tree to the linked wallet.

## Slide 5 — Benefits (template benefits slide)

Title: Benefits of Focus Garden
- A reason to stay: leave for 10 seconds and the tree withers
- Proof you can show: every verified tree is a CashTokens NFT in your own wallet
- Rewards grow with focus: sprout → tree → big tree → house, and small trees merge into bigger ones
- No account, no server: the app talks to Bitcoin Cash directly through public Electrum servers
- Block distractions: Screen Time on iPhone, usage access on Android [native apps only]
- Social: public profile cards, a leaderboard read from the chain, and tips by name

## Slide 6 — BCH usage (template BCH Usage slide)

Title: BCH Usage
- **FocusForest contract (CashScript, P2SH32):** `plantTree` mints a tree NFT and locks it with a
  relative time lock (BIP68, 512-second steps) for the whole session; `mergeTrees` combines matured
  trees; `claimTree` releases the tree and its deposit to the owner. [Tested locally: 76 contract tests]
- **FocusDirectory contract:** anyone can mint one public profile card (name + optional bio). [Tested locally]
- **Live on mainnet since 19 Nov 2026:** both contracts deployed with their minting batons, 100 creator
  trees minted at genesis, BCMR metadata so wallets show every tree. [Done on Mainnet — txids in the appendix]
- **WizardConnect + WalletConnect** wallet linking; **XO engine** (`@xo-cash/engine`, p2pkh template)
  runs the native fee wallet. [WizardConnect pairing verified 20 Nov on the mainnet web build with a
  dedicated test wallet]
- Why BCH: sub-cent fees per tree, native tokens with no extra contract, and covenant time locks
  enforced by every node.

## Slide 7 — Evidence and honest limits (new slide)

| Claim | Label | Proof |
|---|---|---|
| FocusForest + FocusDirectory deployed, 100 creator trees, BCMR | Done on Mainnet | block 977999; genesis `2d84dd8d…a68f`, `9cd1a61b…29b5` |
| Web app on mainnet reads balances, garden and leaderboard | Done on Mainnet (read-only) | focus-app.salemkode.com |
| WizardConnect pairing returns the wallet's address | Tested on the mainnet web build | 20 Nov, dedicated test wallet |
| Plant / merge / claim / profile / tip transactions | Tested locally | contract + protocol tests in the BCH 2026 VM |
| A judge-run plant on mainnet | Pending — see appendix | requires ~15,000 sats |
| Native app blocking (Screen Time / usage access) | Built into the iPhone and Android apps | not re-verified for this entry |

Limits to say out loud: the chain verifies *time*, not attention. Staying is enforced by the app:
a withered session's tree is not delivered and stays locked, and app blocking helps. The leaderboard
counts trees locked on chain, so it measures promised time; release
waits for median block time, so it can lag the session by an hour or more; on the web the fee
wallet key lives in browser storage.

## Slide 8 — Vision (template Vision slide)

Title: The Vision for Focus Garden
- **Promises with stakes [Planned]:** put pUSD behind a promise; keep it and it comes back, break it and it goes to a cause you chose.
- **Focus together [Planned]:** study groups and classrooms with shared gardens and team leaderboards.
- **A market for proof [Planned]:** tutors, employers and communities reward verified focus with CashTokens.
- **Business [Planned]:** free to use; optional premium tree styles and group plans, paid in BCH/pUSD.
- Target: one million kept promises on Bitcoin Cash.

## Slide 9 — Before and after (new slide, required disclosure)

| | 2025 (Crypto Focus Garden, BLAZE 2025) | 2026 (this entry) |
|---|---|---|
| Platform | Next.js web dApp | One Expo app: iPhone, Android, web |
| Network | Chipnet | Bitcoin Cash mainnet |
| Contract | `PomodoroRewards` (time check relaxed) | `FocusForest` + `FocusDirectory`, time lock enforced |
| Rewards | One NFT per session | Four sizes, six styles, merging |
| Wallets | WalletConnect | WizardConnect, WalletConnect, XO-based fee wallet |

Links: 2025 source github.com/salemkode/crypto-focus-garden/tree/de708cd · 2025 demo (organizer
showcase) youtube.com/watch?v=R2xhv0Vq_Us&t=4664s · 2026 source github.com/salemkode/focus-garden-next

## Slide 10 — Thank you (template closing slide)

- **THANK YOU!**
- Try it: focus-app.salemkode.com · Source: github.com/salemkode/focus-garden-next
- EMBER2026 votes: `<voting address — confirm with the owner before sharing>`

---

## Appendix (after Thank you)

A1. Mainnet transactions (all confirmed in block 977999, 19 Nov 2026 09:35 UTC):

| Step | txid |
|---|---|
| Forest category prep | cb351f415f5cbf974e0f5f661cdccf5b83e1827a9135d9429316e30ca13d4ae1 |
| Directory category prep | b4abb87c910f2489ea6ef1435dbc2e08074ddfc5a8424ec4a09bfa13054e795b |
| Forest genesis (baton + 100 creator trees) | 2d84dd8d230073be1d903d3796a008b1f392a740af1963de403ff5c53abca68f |
| Directory genesis | 9cd1a61b315698a3365965c2e2060694b9b2aaf732e69755b373d75dcf2229b5 |
| Forest BCMR publication | 4e882f3aa5203dedb3031f293079672f092755df1b4b6fc49f06e4b4d0d8a16a |
| Directory BCMR publication | 948ee3d758b8c3c466e76512861e599b7de4156d4d8249ea05aa0497fbecbe72 |

A2. Architecture: Expo SDK 58 / React Native 0.88 app; `packages/protocol` builds, validates and
signs every transaction on the device and re-checks it in the BCH 2026 VM before broadcast; public
Fulcrum servers; no backend. Tree commitment (39 bytes): `05 | owner pkh | planter tag | stamp | units | look`.

A3. What was built during BLAZE (14–22 Nov 2026) vs before — see `SUBMISSION.md`.
