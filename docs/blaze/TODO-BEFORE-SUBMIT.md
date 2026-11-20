# Before you submit — Focus Garden, BCH BLAZE 2026

**Hard deadline: Sunday 22 Nov 2026, 14:00 UTC** (17:00 in Aden; DoraHacks shows 2026/11/22 17:00
UTC+3). **Target: everything done by Saturday 21 Nov, 18:00 UTC.** The Final Check-In Stream is
21 Nov at 14:00 UTC.

Legend: 🧑 only you can do or decide this · 🤖 I do it once you say yes · ✅ already done

## In order

1. ✅ **EMBER2026 voting address** (changed 21 Nov by the owner): `bitcoincash:zzzyq9g0n2ywatt0eajwre5h89aju3kk0svl94s4k9`,
   the wallet from the 2025 entry (https://dorahacks.io/build/36811). Plain form
   `bitcoincash:qzzyq9g0n2ywatt0eajwre5h89aju3kk0st4kt7nfk`, hash160 `8440150f…d67c` (checked with libauth).
   It is in the banners, the deck and its PDF, the BUIDL and the README. The earlier address
   `zzxajy…9wgrd` is no longer used for votes. The refund already sent to its plain form `qzxajy…` stays there.

2. ✅ **Judge-path run on mainnet** (20 Nov), funded by you and run from the live site: plant
   `814ded89…d9db` (block 978132), release of the grown tree to the linked test wallet
   `b1cc265d…332a` (block 978179), profile card "BLAZE Demo" `bc279c21…53f8`. Full txids are in
   `SUBMISSION.md` (#12–#14). The evidence, the deck, its PDF and the BUIDL draft are updated.
   ✅ **Leftover funds returned** (21 Nov): 966,539 sats went back in one transaction,
   `1a260eac64d14fe61b044ca5b5571c64048786f3daacde0ba5610e6b1938fd6a`, to
   `bitcoincash:qzxajy7s8h5qk0tajmr2rmus40ypcs9csvmdpmqwu7`. That is the plain-BCH form of your
   voting address, converted with libauth (same hash160 `8dd913d0…b883`). The 500-sat fee was the
   only cost. The fee wallet keeps only the 1,000-sat "BLAZE Demo" profile card.

3. ✅ **Deck link** (20 Nov): as you asked, the Google deck stays private. Its PDF export is hosted on your Cloudflare site at https://focus.salemkode.com/blaze/focus-garden-blaze-2026.pdf and linked from both banners. If the deck changes, ask Codex to export it again, then redeploy the landing page.

4. ✅ **BUIDL #51334 saved and on the Mainnet Track** (21 Nov, on the coordinator's "do it"):
   new logo (the app icon), tagline, three links (pinned source, app, judge guide) and the
   `BUIDL-DRAFT.md` details. The public record and the hackathon Builds grid show the icon and
   "Mainnet Track". The team is unchanged (owner @salemkode, the same account as 2025).

5. 🧑 **Telegram "real project" check-in: do it now.** You weren't sure whether it's done, and no
   record of it is reachable from here. The rules require it unless the organizers waive it. Post
   this (or your own wording) in the BCH BLAZE Telegram group:

   > Hi BLAZE team 👋 Focus Garden (@salemkode on DoraHacks, BUIDL #51334) is a real project for
   > the Mainnet track: focus sessions that time-lock a tree NFT on Bitcoin Cash. Try it at
   > https://focus-app.salemkode.com, with a judge guide at https://focus.salemkode.com/#blaze

   Roll call (attending one of the five preparation streams) is unknown too. The bchblaze.cash
   roll call isn't publicly readable, and nothing in the repository records it. Without it, the
   entry is still eligible but goes into the low-priority judging queue. Rollcall has closed, so
   nothing can change that now. Posting the project in the group also helps "word of mouth", which
   the rules name as the way out of that queue.

6. ✅ **PRs merged and deployed** (20 Nov): PR #4 and PR #5 are merged into `main` (`5f5a52e`),
   and both sites were redeployed from `main`. Until judging ends (27 Nov), avoid redeploying from
   an older branch.

7. ✅ **Old Media page redirected** (21 Nov): focusgarden.salemkode.com (Worker
   `focus-garden-blaze`) now sends `/blaze` to https://focus.salemkode.com/#blaze,
   `/blaze/pitch.pdf` to the current deck PDF, and everything else to https://focus.salemkode.com.
   The old address `zzm8exh8…wlr7s` is no longer public. Cloudflare keeps the old version for rollback.

8. Optional 🧑 + 🤖 **Video.** After step 2, I record about a 2.5-minute walkthrough from the
   `DEMO.md` script. It's not required for the Mainnet track. You decide where it is hosted
   (YouTube or similar). Publishing it is your call.

8b. ✅ **Disclosure questions, settled from the files (20 Nov).**
    (a) PomodoroRewards v3 and the credit policy were written **during** BLAZE. The 9–10 Nov
    prototype (`focus-garden-native`) still holds the 2025 PomodoroRewards contract. The v3
    contract, `FocusDirectory`, `src/sponsorship` and `CreditPolicy.test.ts` were first created on
    15 Nov 2026 (file creation times in the main checkout), after the 14 Nov kickoff. The disclosure
    stays as written.
    (b) 🧑 The live BCMR text says each tree came from "verified focus". Changing it needs a BCMR
    republish, which is a mainnet transaction signed with your metadata key. The suggestion is to
    leave it for now.

9. Not recommended: **Media-track entry** (a separate BUIDL and its own piece) and the **XO bounties**
   (no XO template or invitation, plus your personally written feedback; `XO-FEEDBACK.md` is a
   placeholder). See `ELIGIBILITY.md`.

10. 🧑 **Final check, then Submit/Save** on DoraHacks before 22 Nov 14:00 UTC. In a signed-out
    browser, check that the deck link, demo, judge guide and source commit all open, and that the
    BUIDL shows the Mainnet track.

## 🧑 Telegram leaderboard bot: needs the user's bot token

Built on 21 Nov at the coordinator's request (`packages/telegram-bot`). It's a Cloudflare Worker,
`focus-garden-telegram`, deployed **inactive**: until both secrets exist, its hourly cron only logs
"not configured". It reads the same public leaderboard the app shows (Focus Forest and Focus
Directory on Bitcoin Cash, ranked by `@focus-garden/protocol`). It posts at most once a day, and only
when the top 5 changed. No bot was created and no Telegram message has been sent.

Dry run against live data, 21 Nov (`bun run dry-run` in `packages/telegram-bot`, which sends nothing):

```
🌳 Focus Garden leaderboard (this week)
1. BLAZE Demo: 17 min
https://focus-app.salemkode.com
Built with React Native (Expo) on Bitcoin Cash.
```

To activate:

1. In Telegram, message **@BotFather**, send `/newbot`, and keep the bot token.
2. Add the bot to the target chat (group, or channel as an admin), send a message there, and read
   the chat id from `https://api.telegram.org/bot<token>/getUpdates` (`chat.id`).
3. Set the two secrets on the Worker: `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` (Cloudflare
   dashboard → Workers → focus-garden-telegram → Settings → Variables and secrets). The next hourly
   run posts.

## ✅ React Native line saved on BUIDL #51334 (21 Nov, 06:00 UTC)

DoraHacks was signed in again (the coordinator's Venn thread used "Continue with GitHub"; no
password or passkey). The Details text now has the line "Mobile app: React Native (Expo) for iPhone
and Android. Libauth and the XO engine run on the phone through our native Libauth adapter
(packages/mobile/modules/libauth-native)." and the corrected prior-work lines from `BUIDL-DRAFT.md`.
Nothing else changed: tagline, the three links, logo, Mainnet Track and the 2025-wallet voting
address `zzzyq9g0…4s4k9`.

Checked logged out: the text matches the draft, the old addresses are absent, and every link
answers. That's the app, judge guide, deck PDF, pinned source, compare view, 2025 source, 2025
entry (DoraHacks blocks curl, so it was read in the browser), 2025 showcase video,
react-native-libauth and xo-react-native-wallet. BUIDL #51333 (Venn) was not touched.

## Overnight QA, 20–21 Nov (coordinator request; user asleep)

| Area | Result |
|---|---|
| Voting address | Only `zzzyq9g0…4s4k9` on BUIDL #51334, both sites and the deck PDF (re-checked after every deploy). Note: the original address `zzm8exh8…wlr7s` is address #4 of your Cashonize wallet, labelled "Focus Garden BLAZE vote" there. It was yours after all; nothing needs to change. |
| Downloads | Android was current (1.0.0 (4), same app code as `main`) and opened on the emulator. Rebuilt as **1.0.0 (5)** with tonight's fixes, installed from the public URL, checked, and `/android` now points at it. iPhone build 10 was from `30a3d0d` (same app code); **build 11** with the fixes is uploaded to the same AppDrop link (see LINKS.md). |
| WizardConnect | Works with your Cashonize wallet on the web app and on Android. |
| WalletConnect | **Was broken on the live site and is now fixed.** The Reown project (TestProject, ID `81628b35…71ce`) only allowed `memo-cash.vercel.app`, so the relay closed every connection from focus-app.salemkode.com with code 3000 "Unauthorized: origin not allowed". `https://focus-app.salemkode.com` is now on its domain allowlist, and Cashonize then linked over WalletConnect. If you add another web domain, add it there too. |
| A real focus session for you | Done on Mainnet with BLAZE Demo's fee wallet and your Cashonize wallet: funding `859675aa…49a0`, plant `b4563d02…63ab`, release of the grown tree to Cashonize `ffda7e9b…3025`. The leaderboard shows BLAZE Demo at 17 min on the web and in the Android app. |
| Leaderboard | Works. It used to need the Focus Garden wallet just to *view* it; it is now public (PR #10), and the wallet is only needed to join. |
| Telegram | **Nothing was agreed beyond the check-in.** No Telegram bot, leaderboard posting or automatic messages appear in any Focus Garden thread, doc, memory or code. The only Telegram items are the "real project" check-in text in step 5 (you post it) and, in another session, a draft question to the XO team. |
| App crash risk | Fixed in PR #10: a WebSocket send while the socket is still connecting threw `INVALID_STATE_ERR` inside the Electrum library (seen on the iOS simulator), which closes a release build. Sends now wait for the socket to open. |
| Look and feel | Web at 1440 px and 390–400 px, the landing page, and Android all render correctly. Fixed: the expanded BLAZE banner wrapped onto two lines at 1440 px (PR #11). Status bar: no overlap on Android or iOS; the top buttons sit just below it. |
| Not fixed (seen once) | In one web tab that had been open since the afternoon, the wallet screen stayed disabled (the app's wallet store was stuck in "busy"). A reload fixed it, and it did not come back in fresh tabs. Every chain request already has a 20 s timeout, so the cause is unknown. If a judge sees "Change wallet" greyed out, a reload clears it. |
| Electrum keep-alive | The web app sends a `server.ping` every second. Harmless but chatty; left as is. |

## Already done ✅

- Rules re-verified on 20 Nov from DoraHacks and bchblaze.com (`ELIGIBILITY.md`, `sources/`)
- Web fee wallet; connection-only wallet linking; withered sessions keep their tree locked. All are
  committed, merged into `main` (PR #5) and deployed.
- The BLAZE banner is live on the web app and landing page. The deck link appears after step 3.
- The judge guide is live at https://focus.salemkode.com/#blaze
- WizardConnect pairing was verified on the mainnet web build with a dedicated test wallet.
- Submission text, evidence table, demo script and BUIDL draft are in this folder.
- Deck: a Widget Factory copy (13 slides, private), revised after four reviews (`REVIEW.md`).
