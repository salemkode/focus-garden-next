# Focus Garden — BCH BLAZE 2026 submission text

Track: **Mainnet** (recommended; see `ELIGIBILITY.md`). BUIDL: https://dorahacks.io/buidl/51334 (existing; edit it, do not create another).

## Name

Focus Garden

## Tagline (DoraHacks "Brief description", ≤ 80 characters)

Keep your word, grow your forest: focus promises locked on Bitcoin Cash.

## Short description (≈ 50 words)

Focus Garden turns a focus session into a promise on Bitcoin Cash. Press Plant and the FocusForest
contract time-locks a tree for the session. Leave the app and it withers; stay and the grown tree is
sent to your own wallet as a CashTokens NFT. Trees merge into bigger ones, and the leaderboard is
read straight from the chain.

## Long description (DoraHacks "Details")

> **🔥 BCH BLAZE 2026 · Mainnet track**
> Try it: **https://focus-app.salemkode.com** (web, with a five-minute judge guide at https://focus.salemkode.com/#blaze)
> Slides: https://focus.salemkode.com/blaze/focus-garden-blaze-2026.pdf · Source: https://github.com/salemkode/focus-garden-next (submitted code: commit `5f5a52e`)
> EMBER2026 votes: `bitcoincash:zzzyq9g0n2ywatt0eajwre5h89aju3kk0svl94s4k9`

**The problem.** Phones win the fight for attention. Focus timers lose because breaking one costs nothing
and keeping one proves nothing.

**What Focus Garden does.** You promise a session, from 9 minutes to over an hour. With *Verify on
Bitcoin Cash* on, pressing **Plant** sends a transaction to the **FocusForest** contract. The contract
mints a tree NFT and locks it with a relative time lock for the whole session. Leave the app for more
than 10 seconds and the tree withers and skips automatic delivery. Stay, and when the lock
matures the app releases the grown tree to the wallet you linked. Longer sessions grow bigger trees (seedling → sapling → grand tree). Three
small trees merge into a bigger one inside the contract, and the score never changes. A second
contract, **FocusDirectory**, lets anyone mint a public profile card. The leaderboard and tips are read
from and sent on chain. There is no backend of our own: the app builds, checks (in the BCH 2026 VM) and signs
every transaction itself and talks to public Electrum servers.

**Try it (judges).**

1. Open https://focus-app.salemkode.com.
2. Connect Selene (WizardConnect) or Paytaca (WalletConnect).
3. Profile → set up the Focus Garden wallet → send it about 15,000 sats.
4. Profile → Public profile → Join to mint your profile card. Or: Next session → 9 min → *Verify on Bitcoin Cash* → Plant.
5. Stay on the tab. The tree reaches your wallet after the lock matures. Bitcoin Cash time locks follow median block time, so this can take an hour or more.

**Why Bitcoin Cash.** Native CashTokens make each tree a real NFT without a token contract. Covenant
time locks (BIP68) let every node enforce "this tree can't move until the session is over". Fees are
small enough to plant one tree per session.

**Status, honestly.**

- **Done on Mainnet:** both contracts deployed on 19 Nov 2026 (block 977999), 100 creator trees and BCMR metadata.
- **Done on Mainnet, from the website (20 Nov 2026):** a 9-minute plant (`814ded89…d9db`, block 978132), its release to the linked wallet (`b1cc265d…332a`, block 978179) and a profile card (`bc279c21…53f8`). Full txids are in the evidence table.
- **Done on Mainnet, read-only:** the web app reads balances, gardens and the leaderboard from mainnet.
- **Tested on the mainnet web build:** WizardConnect pairing (and the tree above went to that WizardConnect-linked wallet).
- **Tested locally:** the plant, merge, claim, profile and tip transactions (the contracts suite of 76 tests, which also covers the earlier PomodoroRewards and CreditPolicy contracts, plus 27 protocol tests).
- **Planned:** pUSD-backed promises and group gardens.

**Built on our 2025 entry.** See "Pre-existing work" below for the links and the full timeline.

## Pre-existing work (disclosure)

| When | What | Where | Public |
|---|---|---|---|
| 1–23 Nov 2025 | **Crypto Focus Garden**, our BCH BLAZE 2025 entry (3rd place, BitcoinCash Innovation Award — the Chipnet track; verified on https://dorahacks.io/hackathon/bchblaze2025/winner). Next.js web dApp, one `PomodoroRewards` CashScript contract on Chipnet with the time check relaxed for the demo, WalletConnect, Three.js scene. | https://github.com/salemkode/crypto-focus-garden/tree/de708cd · https://dorahacks.io/buidl/36811 · demo in the organizer showcase: https://www.youtube.com/watch?v=R2xhv0Vq_Us&t=4664s | Yes. The 2025 dApp is no longer hosted. |
| 9–10 Nov 2026 | A local Expo (React Native) prototype (`focus-garden-native`) that reused the 2025 contract on Chipnet. It already had our native Libauth adapter (`libauth-native`: C secp256k1 and hashes, so Libauth and the XO engine run on the phone), which the app still uses (`packages/mobile/modules/libauth-native`). The prototype was folded into this repository (`docs/history/expo-rebuild-2026-11-17/`). | not published | No |
| 13–14 Nov 2026 | Related open source by the same author, published separately and not installed by this app: a packaged React Native Libauth adapter and an XO React Native wallet template. | https://github.com/salemkode/react-native-libauth · https://github.com/salemkode/xo-react-native-wallet | Yes |

## What was built during BLAZE (14–22 Nov 2026)

All of the 2026 commits in `salemkode/focus-garden-next` after `de708cd` (17–20 Nov) are event work:

- **Contracts:** `FocusForest` (plant with an enforced time lock, merge, claim) and `FocusDirectory` (profile cards), with review hardening, tested in the 76-test contracts suite. Deployed to **mainnet** on 19 Nov with BCMR metadata (a picture for every tree style).
- **App:** one Expo SDK 58 / React Native 0.88 app for iPhone, Android and the web. Onboarding demos, a voxel valley (native Filament renderer, three.js on the web), focus sessions that wither when you leave, merging, stats, a leaderboard, profile cards, tips, and app blocking (Screen Time / usage access).
- **On-device chain code** (`packages/protocol`): transaction building, policy checks, VM verification, the garden reader and the leaderboard over public Electrum. The old "garden service" backend was removed.
- **Wallets:** WizardConnect and WalletConnect linking, plus an XO-engine fee wallet on native.
- **For this entry (20 Nov):** linking only through a wallet connection (the typed-address option was removed), a browser fee wallet so web visitors can transact, a clear error when a plant fails, withered sessions no longer releasing their tree, the BLAZE banner on the app and the landing page, and the judge guide.
- **Landing page:** https://focus.salemkode.com (before/after section, contracts, live leaderboard).

## Evidence table

| # | Claim | Network | Transaction / test | How to verify |
|---|---|---|---|---|
| 1 | FocusForest category prepared | Mainnet | `cb351f415f5cbf974e0f5f661cdccf5b83e1827a9135d9429316e30ca13d4ae1` | Any BCH explorer; confirmed in block 977999 |
| 2 | FocusDirectory category prepared | Mainnet | `b4abb87c910f2489ea6ef1435dbc2e08074ddfc5a8424ec4a09bfa13054e795b` | block 977999 |
| 3 | FocusForest genesis: minting baton to the contract plus 100 creator tree NFTs (101 token outputs) | Mainnet | `2d84dd8d230073be1d903d3796a008b1f392a740af1963de403ff5c53abca68f` | block 977999; 104 outputs, 101 with tokens |
| 4 | FocusDirectory genesis: baton to the contract | Mainnet | `9cd1a61b315698a3365965c2e2060694b9b2aaf732e69755b373d75dcf2229b5` | block 977999 |
| 5 | BCMR metadata published (forest, directory) | Mainnet | `4e882f3aa5203dedb3031f293079672f092755df1b4b6fc49f06e4b4d0d8a16a`, `948ee3d758b8c3c466e76512861e599b7de4156d4d8249ea05aa0497fbecbe72` | registry at https://focus.salemkode.com/.well-known/bitcoin-cash-metadata-registry.json |
| 6 | The contracts in the record match the source | — | `packages/contracts/deployments/mainnet.json` (artifact hashes, locking bytecode) | `deploymentFromRecord` checks the address against the bytecode at app start |
| 7 | Contract rules (tier minimums, time locks, merge, claim authorization, profile cards) | Local VM | 76 tests (`bun run test:contracts`), run 20 Nov | `bun run check` |
| 8 | On-device building, policy checks, garden reader, leaderboard | Local | 27 protocol tests + 71 app tests, run 20 Nov on the submission branch | `bun run check` |
| 9 | WizardConnect linking works on the mainnet web build and the Android app | Mainnet relay (no transaction) | 20 Nov: the owner's Cashonize wallet paired with the web app and with Android 1.0.0 (4); earlier a dedicated test wallet paired over `relay.riften.net` / `relay.cauldron.quest`; the app linked `bitcoincash:zp0ldgxx7k4j8xh98j588levmlqf5rfmg5v49vs0ws` | Repeat with Selene: Connect wallet → Selene |
| 10 | The browser fee wallet is created, funded and pays fees | Mainnet | Funded by `f7046d3e5c69eda66c75d1920ca1e9a52cc7a9fa6f9ef71a1c27c545f9d85ae6`; it paid #12–#14 | Profile → Focus Garden wallet |
| 11a | A withered session forfeits its automatic release | Local | `tests/auto-release.test.ts` (one of the 71 app tests) | `bun run test:mobile` |
| 11 | A plant with an empty fee wallet refuses before signing | Mainnet build | "Your Focus Garden wallet needs one coin of at least 8,000 sats" | Plant with Verify on and no funds |
| 12 | **Plant from the website**: FocusForest mints a time-locked Seedling oak (1,000-sat deposit) and returns its minting baton; 9-minute session kept with the tab in front | **Mainnet** | `814ded899f98264f7fdb58c4ada15b48eb45588414ebc3bc106e828143abd9db` (block 978132, 20 Nov 07:03 UTC; 2,000-sat fee) | Explorer: output 1 is the tree NFT at the contract, category `cb351f41…4ae1` |
| 13 | **Release from the website**: when the lock matured, the app sent the grown tree (same commitment, now immutable) to the WizardConnect-linked test wallet `bitcoincash:zp0ldgxx7k4j8xh98j588levmlqf5rfmg5v49vs0ws` | **Mainnet** | `b1cc265d64ef49728fc5b65e638025a871430b27499c6ccd3367f3bbf866332a` (block 978179, 20 Nov 14:44 UTC; 2,000-sat fee) | Explorer: output 0 carries the NFT to `qp0ldgxx…`. The release went out late because a browser confirm dialog left open in the same tab paused the page's scripts; it was sent within minutes of the dialog closing. |
| 14 | **Profile card from the website**: FocusDirectory mints the immutable card "BLAZE Demo" (About text in an OP_RETURN) and returns its baton | **Mainnet** | `bc279c21a41bf4e8b4170419a3c0c71e7f4a6003f244eb04b504c48240c153f8` (20 Nov; 2,000-sat fee + 1,000-sat card) | Explorer; Leaders tab in the app |
| 15 | **A real user's focus session, end to end** (20 Nov, overnight QA): the owner's Cashonize wallet linked over WizardConnect (`qpdt42cy…x70qsg`), the fee wallet funded from Cashonize, a 9-minute verified session kept, and the grown tree released to Cashonize | **Mainnet** | Funding `859675aa4c756aee96e918beb3f5c74ff0360b72b3c814bfc7b6126b217b49a0` · plant `b4563d02730123cea7554d8730847a6fb564ca18de5f8dde09eec1b27f2263ab` (block 978206) · release `ffda7e9b90626f68f90c11266adfe4b53af3f9552a790ce1b9f5624bfa153025` | Explorer; the leaderboard shows BLAZE Demo at 17 min (web, and the Android app) |
| 16 | WalletConnect linking with a real wallet on the live site | Mainnet relay (no transaction) | 20 Nov: Cashonize linked `qq57pxa2…auep7` over WalletConnect after `https://focus-app.salemkode.com` was added to the Reown project's domain allowlist | Profile → Your wallet → Change wallet → WalletConnect |
