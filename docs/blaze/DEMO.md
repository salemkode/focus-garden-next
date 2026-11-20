# Focus Garden — judge demo

## Demo URL

**https://focus-app.salemkode.com** — the web build of the app, on Bitcoin Cash **mainnet**. On a
desktop it opens inside a phone frame, and the BLAZE banner sits at the top of the page.

Supporting pages:

- Landing and judge guide: https://focus.salemkode.com/#blaze
- iPhone (AppDrop): https://appdrop.app/d/prvhsh4gyx
- Android APK (AppDrop): https://appdrop.app/d/njfetdhs4s

> Deploy state: both sites run `main` at `5f5a52e` (PR #4 and PR #5 merged and deployed on 20 Nov):
> the browser fee wallet, the collapsible banner, connection-only linking, working confirm dialogs,
> and withered sessions keeping their tree locked.

## Verified run on mainnet (20 Nov 2026)

These steps were run on the live site with a dedicated test wallet linked over WizardConnect and a
browser fee wallet:

| Step | Transaction | Result |
|---|---|---|
| Fund the fee wallet | `f7046d3e5c69eda66c75d1920ca1e9a52cc7a9fa6f9ef71a1c27c545f9d85ae6` | Balance read by the app |
| Plant, 9 min, Verify on | `814ded899f98264f7fdb58c4ada15b48eb45588414ebc3bc106e828143abd9db` (block 978132) | "Your seedling joined your valley. 9 min focused. On its way to your wallet." |
| Release | `b1cc265d64ef49728fc5b65e638025a871430b27499c6ccd3367f3bbf866332a` (block 978179) | The grown tree NFT arrived at the linked wallet `zp0ldgxx…0ws` |
| Join | `bc279c21a41bf4e8b4170419a3c0c71e7f4a6003f244eb04b504c48240c153f8` | Profile card "BLAZE Demo" |

Lesson from the run: a browser confirm dialog left open pauses the page's scripts, including the
automatic release. Answer dialogs promptly and keep the tab in front.

## Judge instructions (short)

You need a BCH wallet (Selene or Paytaca) holding about **15,000 sats**. Everything below uses real BCH on mainnet.

1. **Open** https://focus-app.salemkode.com and press **Skip** (or read the four short intro pages).
2. **Connect wallet** → **Selene** (WizardConnect), **Paytaca** (WalletConnect), or one of the
   protocol rows. Approve in the wallet, or scan the QR code with your phone. With WizardConnect the
   wallet shares its receive key branch, and the app uses its first receive address. Your trees are
   sent there; the app never asks the wallet to sign. (Verified on 20 Nov with a dedicated
   WizardConnect test wallet. Selene and Paytaca themselves weren't re-tested for this entry.)
3. **Profile → Focus Garden wallet → Set up.** Copy its address and send it **~15,000 sats**. This
   small wallet pays the network fees. On the web its key stays in your browser, so keep only a
   little BCH in it.
4. **Make a mainnet transaction.** Pick one or both:
   - **Profile → Public profile → Join.** Choose a name to mint your profile card on FocusDirectory.
     The card transaction is the result. Your name appears on the leaderboard only after you also
     have a confirmed verified plant, because the board ranks points from planted trees.
   - **Focus tab → Next session → 9 min → Verify on Bitcoin Cash → Plant.** This locks a tree in the
     FocusForest contract. The transaction id appears under the timer and on Profile.
5. **Stay on the tab.** If you leave for more than 10 seconds, the tree withers. A withered session's
   tree skips automatic delivery: it stays in the contract unless the owner sends it by hand. If you stay, the app sends the
   grown tree to your wallet as a CashTokens NFT once the time lock matures. Bitcoin Cash time locks
   use median block time, so this can take about an hour after the session ends. Keep the tab open,
   or reopen it later; the release happens while the app is open.

What it costs:

- **Plant:** a 2,000-sat fee and a 1,000-sat deposit that travels with the tree. It needs one coin of at least 8,000 sats.
- **Profile card:** a 2,000-sat fee and a 1,000-sat card output. It needs a coin of at least 4,000 sats.
- **Release:** a 2,000-sat fee.

## Demo script (2 min 30 s)

| Time | Screen | Say |
|---|---|---|
| 0:00 | Landing hero, valley turning | "Phones win the fight for our attention. Focus timers lose because quitting costs nothing and finishing proves nothing. Focus Garden makes a focus session a promise on Bitcoin Cash." |
| 0:15 | focus-app.salemkode.com, banner visible | "This is the live web app on BCH mainnet. The banner links our slides, source and the 2025 version we started from." |
| 0:25 | Connect wallet → Selene / WizardConnect QR | "I connect my wallet with WizardConnect. Focus Garden takes my receive address and never asks the wallet to sign. That's where my trees go." |
| 0:40 | Profile → Focus Garden wallet, copy address, pay from wallet | "A small Focus Garden wallet pays the fees. I send it a few cents of BCH." |
| 0:55 | Next session: 9 min, Verify on Bitcoin Cash, Plant | "I promise nine minutes and press Plant. The app builds the transaction, checks it in the BCH virtual machine, signs it and broadcasts it. The FocusForest contract mints my tree and locks it for the session." |
| 1:15 | Timer running; the txid shown on a second device (keep the app tab in front) | "Here's the transaction on mainnet: a tree NFT held by the contract. Nobody can move it early, not even us." |
| 1:30 | Recorded separately: a practice session (Verify off) left for 10 s → withered | "If I leave, my tree withers. That's the deal." |
| 1:45 | Valley with grown trees; Leaders tab | "Stay, and the tree grows. Three small trees merge into a bigger one, and the leaderboard is read straight from the chain." |
| 2:00 | Wallet (Cashonize/Paytaca) showing a Focus Garden tree with its BCMR picture | "When the lock matures the tree arrives in my own wallet, with its picture from our BCMR registry." |
| 2:15 | Slide: vision | "Next: promises backed by pUSD, and gardens for study groups. Focus Garden: keep your word, grow your forest." |

Recording notes: record on mainnet only after the funded run is approved (`TODO-BEFORE-SUBMIT.md`).
Until then, scenes 0:55–2:00 can only show the read-only state, so don't publish a video that
implies a transaction happened if it didn't. Pre-plant a tree about 90 minutes before recording so
scene 2:00 has a released tree to show.

## Video

Not recorded yet, and not required by the Mainnet rules. A video would help the "couple of minutes
of judge attention" problem. Record it after the funded run and add the link to `LINKS.md` and the BUIDL.
