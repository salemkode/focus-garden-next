# Focus Garden — BCH BLAZE 2026 links

| What | Link | State on 20 Nov 2026 |
|---|---|---|
| **Deck (Widget Factory copy)**, edit | https://docs.google.com/presentation/d/16sSdxHkranTg2wpwybkcenF869Gxal0JiMUsRLNKylk/edit | Private copy, 13 slides, v2 (after four reviews), 20 Nov. Thumbnails in `deck-renders/v2/`. |
| **Deck link (public, in the banner)** | https://focus.salemkode.com/blaze/focus-garden-blaze-2026.pdf | Live since 20 Nov: the deck exported to PDF (13 pages, clickable links) and hosted on your Cloudflare site, as you asked. The Google deck itself stays private. |
| **BUIDL** | https://dorahacks.io/buidl/51334 | Saved 21 Nov with the `BUIDL-DRAFT.md` text, app-icon logo and pinned links. On the **Mainnet Track** (checked on the public record and the Builds grid). |
| 2025 BUIDL (before) | https://dorahacks.io/buidl/36811 | Public. 3rd place, BitcoinCash Innovation Award, BLAZE 2025 |
| Duplicate 2025 BUIDL | https://dorahacks.io/buidl/36810 | Public, the same content as 36811 (2025). Leave it alone; mention it only if asked. |
| **Demo (after)** | https://focus-app.salemkode.com | Live on mainnet, deployed from `main` at `5f5a52e` (20 Nov, after PR #4 and PR #5 were merged). |
| Judge guide | https://focus.salemkode.com/#blaze | Live, deployed from `main` (20 Nov). |
| **Demo (before)** | https://www.youtube.com/watch?v=R2xhv0Vq_Us&t=4664s | BLAZE 2025 organizer showcase of Crypto Focus Garden. The 2025 dApp itself is no longer hosted. |
| **Source (after)** | https://github.com/salemkode/focus-garden-next/tree/5f5a52ea3c83d9b6df178d53d7eab5c26a32ab56 | Public. The submitted code, pinned: `main` after PR #4 and PR #5 were merged. Use this link in the BUIDL so it never moves. |
| Source (after, main) | https://github.com/salemkode/focus-garden-next | Public, default branch `main` |
| **Source (before)** | https://github.com/salemkode/crypto-focus-garden/tree/de708cd | Public, the last 2025 commit |
| Source diff | https://github.com/salemkode/focus-garden-next/compare/de708cd...5f5a52e | Everything built since 2025 |
| Libauth adapter (pre-existing from 13 Nov 2026) | https://github.com/salemkode/react-native-libauth | Public |
| Mainnet deployment record | https://github.com/salemkode/focus-garden-next/blob/main/packages/contracts/deployments/mainnet.json | Public |
| BCMR registry | https://focus.salemkode.com/.well-known/bitcoin-cash-metadata-registry.json | Live |
| iPhone build | https://appdrop.app/d/prvhsh4gyx | 1.0.0 build 12 from `main` `1283dbb` (Electrum failover, socket guard, public leaderboard), 21 Nov. Not yet opened on a physical iPhone. |
| Android build | https://focus.salemkode.com/android | 1.0.0 (7) from `main` `1283dbb`, release-signed, hosted on R2 (focus-download.salemkode.com), 21 Nov. Installed from the public URL on an emulator. |
| Old "interactive piece" | https://focusgarden.salemkode.com/blaze/ | Redirects (301) since 21 Nov: `/blaze` → focus.salemkode.com/#blaze, `pitch.pdf` → the current deck PDF, everything else → focus.salemkode.com. |

## Banner contents

Source: `packages/mobile/blaze-banner.json`, used by the web app (`scripts/web-phone-frame.mjs`)
and the landing page (`packages/landing/src/main.ts`).

```
🔥 BCH BLAZE 2026 entry  Slides | Source (2026) | 2025 version: source · demo · entry | Judge guide | EMBER2026 votes (CashTokens): <address> [Copy]  [Less ▴]
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
| EMBER2026 address | `bitcoincash:zzzyq9g0n2ywatt0eajwre5h89aju3kk0svl94s4k9`. Chosen by the owner on 21 Nov 2026: the wallet from the 2025 entry (build 36811). Replaces `zzxajy…9wgrd`. Valid mainnet CashTokens-aware (P2PKH with tokens) address. |
