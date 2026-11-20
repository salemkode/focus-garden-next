# Focus Garden — BCH BLAZE 2026 links

| What | Link | State on 20 Nov 2026 |
|---|---|---|
| **Deck (Widget Factory copy)**, edit | https://docs.google.com/presentation/d/16sSdxHkranTg2wpwybkcenF869Gxal0JiMUsRLNKylk/edit | Private copy, 13 slides, v2 (after four reviews), 20 Nov. Thumbnails in `deck-renders/v2/`. |
| **Deck link (public, in the banner)** | https://focus.salemkode.com/blaze/focus-garden-blaze-2026.pdf | Live since 20 Nov: the deck exported to PDF (13 pages, clickable links) and hosted on your Cloudflare site, as you asked. The Google deck itself stays private. |
| **BUIDL** | https://dorahacks.io/buidl/51334 | Exists. Linked to BCH BLAZE 2026 on the **Media** track; switch to Mainnet. Its text points to old links. The replacement text is in `SUBMISSION.md`. |
| 2025 BUIDL (before) | https://dorahacks.io/buidl/36811 | Public. 3rd place, BitcoinCash Innovation Award, BLAZE 2025 |
| Duplicate 2025 BUIDL | https://dorahacks.io/buidl/36810 | Public, the same content as 36811 (2025). Leave it alone; mention it only if asked. |
| **Demo (after)** | https://focus-app.salemkode.com | Live on mainnet from `main`. Redeploy from this branch for the fee wallet and banner. |
| Judge guide | https://focus.salemkode.com/#blaze | The section exists on this branch. Deploy the landing page to publish it. |
| **Demo (before)** | https://www.youtube.com/watch?v=R2xhv0Vq_Us&t=4664s | BLAZE 2025 organizer showcase of Crypto Focus Garden. The 2025 dApp itself is no longer hosted. |
| **Source (after)** | https://github.com/salemkode/focus-garden-next/tree/docs/blaze-2026-submission | Public repo. The branch is pushed when the PR is opened. Use a commit link (`/tree/<sha>`) in the BUIDL so it never moves. |
| Source (after, main) | https://github.com/salemkode/focus-garden-next | Public, default branch `main` (b6c5533) |
| **Source (before)** | https://github.com/salemkode/crypto-focus-garden/tree/de708cd | Public, the last 2025 commit |
| Source diff | https://github.com/salemkode/focus-garden-next/compare/de708cd...docs/blaze-2026-submission | Everything built since 2025 |
| Libauth adapter (pre-existing from 13 Nov 2026) | https://github.com/salemkode/react-native-libauth | Public |
| Mainnet deployment record | https://github.com/salemkode/focus-garden-next/blob/main/packages/contracts/deployments/mainnet.json | Public |
| BCMR registry | https://focus.salemkode.com/.well-known/bitcoin-cash-metadata-registry.json | Live |
| iPhone build | https://appdrop.app/d/prvhsh4gyx | Build 9 from `main` (mainnet), per the "Switch App to Mainnet" thread |
| Android build | https://appdrop.app/d/njfetdhs4s | Updated from `main` on 20 Nov (same thread) |
| Old "interactive piece" | https://focusgarden.salemkode.com/blaze/ | Stale: it says "test network" and "garden service". Remove it from the BUIDL. |

## Banner contents

Source: `packages/mobile/blaze-banner.json`, used by the web app (`scripts/web-phone-frame.mjs`)
and the landing page (`packages/landing/src/main.ts`).

```
🔥 BCH BLAZE 2026 entry  Slides | Source (2026) | 2025 version: source · demo · entry | Judge guide | EMBER2026 votes (Mainnet CashTokens): <address> [Copy]  [Less ▴]
```

The **Less / More** toggle collapses the banner to one line:

```
🔥 BCH BLAZE 2026  Slides · Source · 2025 · Judge guide   [Copy vote address] [More ▾]
```

The choice is remembered in the browser. Phones and narrow windows start collapsed, so the app keeps its height.

| Field | Value |
|---|---|
| Slides | https://focus.salemkode.com/blaze/focus-garden-blaze-2026.pdf |
| Source (2026) | https://github.com/salemkode/focus-garden-next. After the PR is merged, or for a pinned revision, point it at the submission commit. |
| 2025 source | https://github.com/salemkode/crypto-focus-garden/tree/de708cd |
| 2025 demo | https://www.youtube.com/watch?v=R2xhv0Vq_Us&t=4664s |
| 2025 entry | https://dorahacks.io/buidl/36811 |
| Judge guide | https://focus.salemkode.com/#blaze |
| EMBER2026 address | `bitcoincash:zzxajy7s8h5qk0tajmr2rmus40ypcs9csvu8j9wgrd`. Confirmed by the owner on 20 Nov 2026 for both Focus Garden and Venn. Valid mainnet CashTokens-aware (P2PKH with tokens) address. |
