# DoraHacks BUIDL #51334 — field-by-field draft

Existing BUIDL: https://dorahacks.io/buidl/51334 (owner @salemkode, 1 member). **Edit this one. Do
not create a new BUIDL.** Its current text and links describe the older Media-track "interactive
piece" and point to `crypto-focus-garden/tree/release/blaze-web-preview`. Both are out of date.

The BUIDL is already public and linked to the hackathon, so pressing **Save** publishes the changes
immediately. Saving is treated as the final-submit approval point. Nothing below has been saved yet.

| Field (DoraHacks label) | Current | New value |
|---|---|---|
| Logo | Letter "F" on #059669 | Upload `assets/app-icon.png` (Upload Logo) |
| Name of your Build | Focus Garden | Focus Garden |
| Brief description | Stay focused. Grow a forest. | Keep your word, grow your forest: focus promises locked on Bitcoin Cash. |
| Tags | Crypto / Web3, Bitcoin Cash | Crypto / Web3, Bitcoin Cash (add: Productivity, NFT, if offered) |
| Link 1 (GitHub Repo) | github.com/salemkode/crypto-focus-garden/tree/release/blaze-web-preview | `https://github.com/salemkode/focus-garden-next/tree/<submission commit>` |
| Link 2 (Website) | focusgarden.salemkode.com/blaze/ | https://focus-app.salemkode.com |
| Link 3 (Website) | — | https://focus.salemkode.com/#blaze (judge guide) |
| Link 4 (Video) | — | `<video link, if recorded>` |
| Details (rich text) | old Media-track text | The "Long description" in `SUBMISSION.md`, followed by its "Pre-existing work" table as plain lines. Paste the deck link and the voting address into the placeholders first. |
| Contact info (private to organizers) | Telegram and WhatsApp already set | leave as is |
| **Hackathon track** (Manage Submission dialog on the hackathon page) | **Media Track** | **Mainnet Track** |
| Bounties | none | none (XO bounties not entered; see ELIGIBILITY.md) |
| Looking for teammates | — | No |

## Details text, ready to paste

Replace the `<…>` placeholders before pasting.

```
🔥 BCH BLAZE 2026 · Mainnet track

Try it: https://focus-app.salemkode.com (Bitcoin Cash mainnet, web app in a phone frame; needs a BCH wallet and about 15,000 sats)
Judge guide (5 minutes): https://focus.salemkode.com/#blaze
Slides: <deck read-only link>
Source (2026): https://github.com/salemkode/focus-garden-next/tree/<submission commit>
EMBER2026 votes: <owner-confirmed voting address>

Focus Garden turns a focus session into a promise on Bitcoin Cash. Press Plant and the FocusForest contract mints a tree NFT and time-locks it for the session. The app tracks whether you stay: leave for more than 10 seconds and the tree withers and skips automatic delivery. Stay, and when the lock matures the grown tree is sent to your own wallet as a CashTokens NFT. Longer sessions grow bigger trees, small trees merge into bigger ones, and a second contract, FocusDirectory, gives everyone a public profile card for the on-chain leaderboard and tips. There is no backend of our own: the app builds, checks (in the BCH 2026 VM) and signs every transaction itself and talks to public Electrum servers.

How to try it (about 15,000 sats):
1. Open the web app and connect Selene (WizardConnect) or Paytaca (WalletConnect).
2. Profile → set up the Focus Garden wallet → send it about 15,000 sats in one payment (it pays the fees).
3. Quickest result: Profile → Public profile → Join mints your profile card.
4. Plant: Next session → 9 min → Verify on Bitcoin Cash → Plant. Keep the tab in front (leaving for 10 seconds withers the tree); use another device for the explorer.
5. When the lock matures, the app sends the tree to your wallet. Allow up to about an hour, with the app open.

Why Bitcoin Cash: native CashTokens make each tree a real NFT, covenant time locks (BIP68) make every node enforce the session, and fees are small enough for one tree per session.

Status: both contracts are live on mainnet since 19 Nov 2026 (block 977999), with 100 creator trees and BCMR metadata. The app reads gardens and the leaderboard from mainnet, and WizardConnect pairing is verified on the mainnet build. Plant, merge, claim, profile and tip transactions pass the 76-test contracts suite and 27 protocol tests in the BCH VM. <Add the judge-path mainnet txid here once it is made.> Planned: pUSD-backed promises and group gardens.

Pre-existing work: this upgrades our BCH BLAZE 2025 entry, Crypto Focus Garden (3rd place, BitcoinCash Innovation Award): a Next.js web dApp with one Chipnet contract.
2025 entry: https://dorahacks.io/buidl/36811
2025 source: https://github.com/salemkode/crypto-focus-garden/tree/de708cd
2025 demo (organizer showcase): https://www.youtube.com/watch?v=R2xhv0Vq_Us&t=4664s
Before the 14 Nov kickoff we also had a private Expo prototype (9–10 Nov 2026, reusing the 2025 Chipnet contract) and started the React Native Libauth adapter (13 Nov 2026, https://github.com/salemkode/react-native-libauth). Everything else was built during BLAZE (17–20 Nov 2026 commits): the FocusForest and FocusDirectory contracts and their mainnet deployment, the Expo app for iPhone, Android and the web, on-device transaction building, WizardConnect and WalletConnect linking, the leaderboard, profiles and tips, and BCMR metadata.
Everything since 2025: https://github.com/salemkode/focus-garden-next/compare/de708cd...<submission commit>
```
