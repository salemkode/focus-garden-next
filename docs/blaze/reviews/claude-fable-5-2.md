# Review — Focus Garden, BCH BLAZE 2026

Reviewer: Claude Fable 5.2 · 20 Nov 2026 · read-only review of branch `docs/blaze-2026-submission` at `c86df43`.

How I checked: read the deck renders, `DECK.md` and the deck build file, the submission docs, both contracts, `packages/protocol`, and the app's plant, release, wallet and leaderboard code. I fetched the two live sites, the BCMR registry and the GitHub API, and queried Blockchair and a public Fulcrum server (`bch.imaginary.cash`) at tip 978117. I did not run the test suites (they write build output), so test counts below are static counts. I did not open the app in a browser or connect a wallet.

Paths are relative to the worktree root.

## Blockers

### B1. No app-made transaction exists on mainnet, so the judged path has never worked end to end
- **Evidence:** the FocusForest script hash has one history entry, the genesis `2d84dd8d…` at height 977999, and one UTXO, the minting baton. FocusDirectory is the same with `9cd1a61b…`. There are zero plants, zero profile cards and zero tips.
- **Evidence:** the browser fee wallet was written on 20 Nov (`560acb6`) and has never signed a mainnet transaction. `SUBMISSION.md:95` says its balance read was checked on a local build.
- **Where it shows in the deck:** slide 2 prints "[Tested locally · Mainnet plant pending]" directly under the pitch. Slide 4 is titled "From promise to tree, on Bitcoin Cash mainnet" while steps 3 and 4 carry "mainnet pending" chips. Slide 7 has a "Pending" row.
- **Fix:** do the funded run today on the deployed site, not a local build. Mint a profile card, plant a 9-minute verified tree, let it release, and send one tip. Use real Selene and real Paytaca. Then replace the chips, add the txids to slide 11, and record the measured release delay (see m3).

### B2. The required banner is incomplete
- **Rule:** `sources/dorahacks-detail-2026-11-20.txt:138` requires a deck link, a source link and a CashTokens voting address.
- **Deck link:** `packages/mobile/blaze-banner.json:4` has `"deck": null`, and the live banner HTML on focus-app.salemkode.com has no Slides link.
- **Voting address:** `bitcoincash:zzm8exh8…wlr7s` has no on-chain history and no recorded owner. Slide 10 literally reads "EMBER2026 votes: address to be confirmed".
- **Fix:** share the deck as view-only, set `deck`, confirm or replace the address, redeploy both sites, and check from a signed-out browser. Update slide 10 and the `SUBMISSION.md` / `BUIDL-DRAFT.md` placeholders in the same pass.

### B3. The BUIDL is not in the Mainnet track
- **Evidence:** `ELIGIBILITY.md:40` records BUIDL 51334 on the Media track with old text. Its linked page, focusgarden.salemkode.com/blaze, still returns 200 and, per `LINKS.md:22`, describes a test network.
- **Fix:** switch the track and paste `BUIDL-DRAFT.md` (owner action). Do it on 21 Nov, not in the last hour.

## Major

### M1. The judge journey will almost never deliver the payoff
- **Evidence:** the default leave rule is strict, 10 seconds (`packages/mobile/src/features/focus/session.ts:42`, `catalog.ts:47`). Leaving is detected from tab visibility (`FocusProvider.tsx:81-87`).
- **Evidence:** the rules say judges give "a couple of minutes" (`sources/…txt:190`). The shortest session is 9 minutes, and the docs then ask for "an hour or more".
- **Evidence:** `DEMO.md:55` has the presenter open an explorer tab mid-session, which withers the tree.
- **Result:** a judge connects, creates a second wallet, funds it, plants, switches tab, and nothing ever arrives.
- **Evidence:** the Leaders tab is empty on mainnet (`assets/screen-leaders.png`: "Nobody is on the board this week"), so there is nobody to tip either.
- **Fix:**
  1. Make the profile card step 1 of the judge guide. It confirms in one block and has a visible result.
  2. Seed mainnet from the owner's own wallets with one profile and a few trees, so Leaders and tips are not empty.
  3. For the plant path, tell judges to set Focus rules to "Allow leaving", or ship the BLAZE build with the relaxed rule.
  4. Tell judges where a withered tree can be recovered (see M2).

### M2. "Proof of focus" is claimed more strongly than anything enforces, and the app contains the bypass
- **Contract:** `plantTree` is permissionless and checks only lock units against tier (`packages/contracts/contracts/FocusForest.cash:16-64`). Nothing ties a tree to a session.
- **App, no session needed:** Profile → Verified trees has "Plant a verified tree" with a tier picker that includes House, and a "Lock … for a …" button (`packages/mobile/src/components/RewardActions.tsx:46-51,82-87`).
- **App, withered trees are sendable:** "Ready to send" lists every claimable tree (`packages/mobile/src/services/garden.ts:17-19`, `RewardActions.tsx:92-100`), and the contract lets the owner or planter claim (`FocusForest.cash:156`).
- **Docs that are false as written:** "the app will not deliver it" and "stays locked in the contract" in `SUBMISSION.md:33`, `DEMO.md:35` and `DECK.md:99-100`. Only the automatic release is skipped (`auto-release.ts:70-75` says so itself).
- **Overstated copy:**
  - slide 3 speaker notes say "public, unforgeable proof";
  - the live BCMR registry describes each tree as "grown from at least 8.5 minutes of verified focus";
  - slide 5 says "Proof you can show".
- **Fix:** say "a time-locked promise" and "verified time lock", and drop "unforgeable". In the BLAZE build, relabel the direct-lock group ("Lock a tree without a session") or hide it. Label withered trees in Ready to send as "Withered: recover deposit".

### M3. Slide 7 is titled "Evidence and honest limits" and shows no limits
- **Evidence:** the render has only the table. The limits text went into speaker notes (`deck-renders/batchupdate-requests.json`, the text starting "The chain verifies time, not attention").
- **Evidence:** the notes version drops the leaderboard and withering sentences that `DECK.md:99-103` has.
- **Fix:** put three one-line limits under the table. Judges read slides, not notes.
  - The chain verifies time, not attention.
  - The leaderboard counts time locked.
  - The web fee wallet key lives in the browser.

### M4. The leaderboard can be gamed from the chain
Judges score "security or specification flaws" (`sources/…txt:176`).
- **Spoofable week filter:** "This week" filters on the caller-supplied `stamp` (`packages/protocol/src/leaderboard.ts:126,133`). The contract accepts any value up to 2^32−1 (`FocusForest.cash:26-27`), so a planting stamped in the future stays in the weekly board forever. The contract comment says "indexers rank by block time" (`FocusForest.cash:11`), but the code does not.
- **Points without focus:** points are awarded at planting, whether the tree later withers or never matures (`leaderboard.ts:91-102`). A House is 12 points for a 94-minute lock of 1,000 recoverable sats (`packages/protocol/src/forest.ts:16`).
- **Fix (client only, no redeploy):** filter by the confirming block's height or time, which `scanForest` already has in `entry.height`. Say on the slide that the board measures time locked.

### M5. One minting baton serialises every plant in the world
- **Evidence:** each plant spends and recreates the single baton (`FocusForest.cash:28-36`, `packages/protocol/src/build.ts:129-130`). On chain there is exactly one baton UTXO per contract.
- **Effect:** two people planting in the same few seconds conflict in the mempool, and one fails. Withered trees also accumulate in the contract's UTXO set, which every garden read lists in full (`packages/protocol/src/garden.ts:62`).
- **Why it matters:** slide 8 targets "one million kept promises", and judges ask whether the design scales.
- **Fix:** state it as a limit with the plan (several batons, or per-user threads). In the funded run, plant from two browsers at once to confirm the app recovers with a clear retry.

### M6. Three vocabularies for tree sizes, with thresholds that disagree
- **Session sheet and valley:** Seedling (1–2 units), Sapling (3–4), Grand tree (5–7), then Grove up to Sky Citadel (`packages/garden/src/ladder.ts:26-37`). This is what the screenshots on slides 1, 4 and 6 show.
- **Contract, BCMR, Verified trees, Leaders:** Sprout (≥1), Tree (≥3), Big Tree (≥6), House (≥11) (`packages/protocol/src/forest.ts:12-17`).
- **Deck text:** slide 3 says "sprouts → tree → big tree" and slide 5 says "sprout → tree → big tree → house", next to screenshots saying "Grows a sapling". `SUBMISSION.md:34` uses "seedling → sapling → grand tree".
- **Concrete mismatch:** "43 min · Grand tree" is 5 units, which the contract mints as tier 2. The wallet will show "… · Tree" (`packages/mobile/src/app/(tabs)/index.tsx:113`).
- **Fix:** when Verify is on, label the session chips with the on-chain tier names, re-capture the screenshots, and use those names everywhere. If there is no time for the app change, use one naming in the deck and add a line that the valley has its own level names.

### M7. WizardConnect is address-only and untested against real Selene
- **Evidence:** the session closes as soon as the first receive key arrives (`packages/mobile/src/features/wallet-link/wizardconnect.ts:39-45`). Nothing is ever signed over WizardConnect.
- **Evidence:** the judge must then create and fund a second wallet whose key sits in `localStorage` (`packages/mobile/web-shims/secure-store.ts:16-24`).
- **Evidence:** pairing was verified only against a test wallet built on `@wizardconnect/wallet` (`ELIGIBILITY.md:35`). Selene's lead developer is a judge (`sources/…txt:171`).
- **Verdict:** this meets the letter of the rule, but it does not deliver "ease of wallet connection".
- **Fix:**
  1. Pair real Selene and real Paytaca during the funded run.
  2. Confirm the released tree is visible in that wallet at receive index 0.
  3. On slide 6, give the reason for the second wallet in one line: no wallet prompt interrupts the session, and the contract requires planter ≠ owner (`FocusForest.cash:49`).
  4. List "sign the plant over WizardConnect" as Planned.

### M8. The deck never shows the payoff
- **Evidence:** no slide shows a grown forest, a tree NFT in a wallet, or a populated leaderboard.
- **Evidence:** slides 3 and 4 show a dirt mound at 0 %. Slide 4 step 2 shows "0 min verified · 0 rewards · 0 sats". Slide 4 step 3 and slide 6 are the same Next session screen.
- **Fix (after the funded run):** make slide 4 step 4 the tree in Selene or Paytaca with its BCMR picture. Put a populated valley on slide 3. Replace the slide 6 screenshot with the explorer view of the plant transaction.

### M9. Status labels drown the pitch and go beyond the agreed set
- **Evidence:** slide 5 has six bracketed tags, three of them amber "Tested locally". Slide 3 labels a persona story "[Simulated story · Tested locally]".
- **Evidence:** labels outside the six in the brief: "Done on Mainnet (read-only)", "Tested on the mainnet web build", "native apps only", "Built into the iPhone and Android apps", "Verified 20 Nov · mainnet read".
- **Evidence:** "Done on Mainnet (read-only)" for the leaderboard means it read an empty set.
- **Fix:** keep labels on slide 7 only, plus at most one status line on slide 4. After the funded run most of them become "Done on Mainnet" anyway.

### M10. Pre-existing work disclosure has soft spots
- **Unprovable "all event work" claim:** `SUBMISSION.md:73` says all 2026 commits are event work. The first 2026 commit (`4461291`, 17 Nov) is a wholesale "Rebuild … with current contracts", so history cannot separate the unpublished 9–10 Nov prototype from event work.
- **Interim contract not mentioned:** the repo holds `PomodoroRewards.cash` "v3" with an enforced lock (`packages/contracts/contracts/PomodoroRewards.cash:1-7`). The disclosure says the prototype "reused the 2025 contract". State when v3 and the credit policy were written, and disclose them if that was before 14 Nov.
- **XO overstated on slide 9:** "XO-based fee wallet" does not apply to the judged web build (`packages/mobile/src/features/wallet/appWallet.web.ts:4-11`, `XO-FEEDBACK.md:16-17`). Write "XO-engine fee wallet (native apps)".
- **Weak "before" demo:** it is a timestamp in an organiser stream. The 2025 app URL still set on the 2025 repo (dapp-starter-dapp.vercel.app) returns 404. Redeploying `de708cd` as a static "before" site would give judges something to click.
- **Unpinned 2025 link:** the landing page button "See the 2025 version" points to the repo root, whose `master` now has merges dated 20 Nov 2026. Pin it to `/tree/de708cd` like the banner.

### M11. The live sites run an unmerged branch
- **Evidence:** PR #5 is open (head `c86df43`). `TODO-BEFORE-SUBMIT.md:45-49` notes that any deploy from `main` removes the fee wallet and banner during judging.
- **Evidence:** the banner's Source link goes to `main`, which does not contain the code judges are using.
- **Fix:** merge PR #5 before submitting, and pin the BUIDL source link to that commit.

## Minor

- **m1. Slide 13 is a dead reference.** Its whole body is "see SUBMISSION.md". Put the five bullets from `SUBMISSION.md:75-80` on it or delete it.
- **m2. Test counts.** Slide 6 attributes "76 contract tests" to FocusForest. The suite also runs PomodoroRewards (8), CreditPolicy (6) and Deploy (9) (`packages/contracts/package.json:26`). `SUBMISSION.md` says 70 app tests in row 8 and 71 in row 11a. Say "76 tests in the contracts suite" and use one app number.
- **m3. Release delay.** The copy says "an hour or more" (slide notes, landing, `SUBMISSION.md:46`), "about an hour" (`DEMO.md:37`) and "1–1.5 h" (TODO). The lock is measured from median time to median time (`packages/protocol/src/garden.ts:82-88`), so the lag should mostly cancel. Measure it in the funded run and print that number.
- **m4. "Exactly that long."** Slides 3 and 6 and `SUBMISSION.md:16` say this, but the lock is a minimum, in 512-second units. Say "at least".
- **m5. "No account, no server."** The app depends on WizardConnect and WalletConnect relays, public Fulcrum servers and Cloudflare. Say "no backend of our own".
- **m6. "Anyone can mint one profile card."** The contract sets no limit, and name uniqueness is first-come on the client (`packages/contracts/contracts/FocusDirectory.cash:11-45`, `leaderboard.ts:110-116`). Say "a profile card".
- **m7. Flat 2,000-sat fee.** It is charged on roughly 500-byte transactions (`packages/protocol/src/policy.ts:20,43`), while the project's own genesis paid about 1.1 sat/byte. "Sub-cent" still holds at about $205/BCH. Lower it or state it.
- **m8. Creator trees.** The 100 genesis trees include Houses whose BCMR text says they came from verified focus. They read as a premine. Give their purpose in one line or drop them from slide 6.
- **m9. Native builds.** Slide 2 advertises iPhone and Android builds, but they are built from `main` and "not re-verified" (`LINKS.md:20-21`, slide 7). Rebuild them or remove the line.
- **m10. Collapsed banner on phones.** It omits the 2025 demo link and shows no address text. Add both to the one-line form.
- **m11. Business slide.** "Free; optional premium styles and group plans" is thin for the fourth criterion. Name one revenue line with a number, such as a share of forfeited pUSD stakes, marked Planned.
- **m12. Internal drift.** `ELIGIBILITY.md:32,36` say the branch is not deployed and the deck is in progress. `TODO-BEFORE-SUBMIT.md:76` cites a `REVIEW.md` that does not exist. `LINKS.md:5` has no deck link.
- **m13. Storage key names.** Keys still say "chipnet" on mainnet (`RewardProvider.tsx:26`). Leave them, because renaming would orphan wallets.
- **m14. Slide 1.** The app icon sits in a white box on a dark cover.

## Story: cut and reorder

1. Keep slides 1–2. Remove the chip from slide 2.
2. Cut slide 3 to about 60 words and move the merge sentence to Benefits.
3. Reduce Benefits to four bullets: a reason to stay, a tree in your wallet, trees merge, no backend.
4. Put Before/after straight after BCH Usage, since judges must score "significantly improved".
5. Move the evidence table to the appendix, and put the three limits in a strip on BCH Usage.

## Checked and holds

- All six deployment txids are in block 977999, timestamped 19 Nov 2026 09:35:42 UTC. The genesis has 104 outputs.
- The live BCMR registry's SHA-256 equals `contentHash` in `packages/contracts/deployments/mainnet.json`.
- The live web banner has the source, 2025 source, 2025 demo, 2025 entry and judge guide links.
- The judge guide is live at focus.salemkode.com/#blaze.

## Verdict

The engineering is real: two covenants on mainnet, on-device building with VM re-checking, and a careful policy layer. The disclosure is unusually candid. But the entry is currently a deployed contract plus an untested web path. Its headline claim, that a tree proves kept focus, is contradicted by a button in its own app. The route judges are sent down will usually end in a withered tree and an empty leaderboard.

In order, the remaining time should go to:

1. the funded run with real Selene and Paytaca (B1);
2. the deck link, voting address and track switch (B2, B3);
3. reworking the judge path around the profile card and a seeded board (M1);
4. correcting the proof and withering wording, and putting the limits on the slide (M2, M3);
5. merging PR #5 (M11).

**Track recommendation: Mainnet only**, with Community Choice coming automatically. Skip Media: it needs a separate new piece, and the existing one describes a test network. Skip both XO bounties: there is no template or invitation, the feedback must be personally written, and the terms include an IP waiver. If the funded run cannot be made to work by the evening of 21 Nov, the Mainnet entry is not eligible in substance, and the track decision should be revisited then rather than at the deadline.
