# Lead review (Claude Opus 5.5) — 20 Nov 2026

## Blockers
1. **No app-made mainnet transaction exists.** The FocusForest contract's history shows only its
   genesis (2d84dd8d…, block 977999). The Mainnet track needs judges to be able to make a useful
   mainnet transaction. The code path is tested locally and a plant with an empty wallet refuses
   cleanly, but nobody has run it end to end on mainnet. Fix: one funded judge-path run (owner
   approval), then update the chips and evidence.
2. **The voting address has no recorded owner.** `bitcoincash:zzm8exh8…wlr7s` was added on 19 Nov
   with no note of who controls it. Fix: the owner confirms or replaces it before anything else
   shows it.
3. **The BUIDL is on the Media track and has stale content.** Fix: approved edit (`BUIDL-DRAFT.md`).

## Major
4. **The deck's A3 slide is an empty placeholder** ("see SUBMISSION.md"). Fix: put the pre-existing
   timeline and the in-event work list on the slide.
5. **Size names are inconsistent.** The deck says sprout → tree → big tree → house (the on-chain
   tiers). The app shows Seedling / Sapling / Grand tree locally, with merges up to Grove … Sky
   Citadel. Judges will see the app's names. Fix: use the app's words and keep the on-chain tier
   names in the notes.
6. **The "Evidence and honest limits" slide has no limits visible**: only the table. Fix: add one
   line: "Chain verifies time, not attention; staying is enforced by the app; release can lag by
   an hour."
7. **The deck has no read-only link yet**, so the banner's "Slides" link is hidden. Fix: owner approval, then redeploy.

## Minor
8. The cover's team line wraps over two lines.
9. Benefits: "[Tested locally]" on "Proof you can show" is weaker than it needs to be once the
   mainnet run exists. Update it after step 2.
10. On the web, "Restore from recovery phrase" for an XO phrase can't work (the XO engine fails on
    the web). Low impact for judges.
