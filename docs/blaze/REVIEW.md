# Review — Focus Garden, BCH BLAZE 2026 (20 Nov 2026)

## Reviewers

All four reviewed the same material: deck v1 (13 slides), the live demo, the BUIDL draft and the
`docs/blaze/` package, using one brief (`reviews/BRIEF.md`). Each was read-only.

| Reviewer | Model actually used | Full findings |
|---|---|---|
| Lead | Claude Opus 5.5 (`claude-opus-5-5`) | [`reviews/lead-claude-opus-5-5.md`](reviews/lead-claude-opus-5-5.md) |
| Sol | GPT-6.2 Sol (`gpt-6.2-sol`, high), via Codex | [`reviews/gpt-6.2-sol.md`](reviews/gpt-6.2-sol.md) |
| Astra | GPT-6.2 Astra (`gpt-6.2-astra`, high), via Codex | [`reviews/gpt-6.2-astra.md`](reviews/gpt-6.2-astra.md) |
| Fable | Claude Fable 5.2 (`claude-fable-5-2`, high) | [`reviews/claude-fable-5-2.md`](reviews/claude-fable-5-2.md) |

Every requested reviewer was available. The deck itself was built and revised by GPT-6.2 Sol,
because only GPT models have the Google Drive connector.

## Where all four agree

- **Track:** enter **Mainnet only**. Community Choice comes with it. Skip Media: the existing Media
  piece describes the old product, and a new one would need a separate BUIDL. Skip both XO
  bounties: there is no novel or migrated XO template and no invitation, and the feedback must be
  personally written.
- **Verified:** all six deployment txids are confirmed in block 977999 (19 Nov 2026 09:35:42 UTC).
  The genesis has 104 outputs, 101 of them with tokens. The live BCMR registry matches the recorded
  `contentHash`. Sol and Astra recomputed the txids from the raw bytes and checked Merkle proofs on
  two Fulcrum servers.
- **Blockers:** (1) no transaction made from the app exists on mainnet; (2) the banner has no deck
  link and the voting address is unconfirmed; (3) the BUIDL is on the Media track with old text.
  Telegram confirmation and roll call are unknown.

## Main findings and what was done

| # | Finding (who) | Severity | Action |
|---|---|---|---|
| 1 | No app-made mainnet transaction; the judge path is unproven (all) | Blocker | **Fixed 20 Nov:** plant `814ded89…d9db`, release `b1cc265d…332a` and profile card `bc279c21…53f8` made from the website on mainnet; labels changed to **Done on Mainnet**. |
| 2 | No deck link in the banner; voting address unconfirmed (all) | Blocker | The banner and deck are ready. **Owner approval** needed to share the deck and confirm the address (steps 1, 3). |
| 3 | BUIDL on Media with stale text (all) | Blocker | `BUIDL-DRAFT.md` updated. **Owner approval** needed to save and switch the track (step 4). |
| 4 | The pitch overstates what the chain proves: "exactly", "unforgeable proof", "garden shows the focus she kept" (Sol, Astra, Fable) | Major | Rewritten as "the app tracks whether you stay, Bitcoin Cash time-locks the tree, finish and the app delivers it" in deck v2, the BUIDL draft, the submission text and the landing page. "Proof" and "no servers" were removed from the landing page. |
| 5 | Withered trees can still be sent by hand ("Ready to send"); "will not deliver" was false (Sol, Fable) | Major | The docs now say "skips automatic delivery". Code: withering forfeits the auto-release consent (`7283fd7`). Manual sending stays, because the contract lets the owner claim anyway. |
| 6 | A no-session "Plant a verified tree" lock in Profile contradicts the story (Fable) | Major | Relabelled "Lock a tree without a session", with a footer saying it's a plain time lock (`dfa6757`). |
| 7 | The weekly leaderboard trusts a caller-supplied stamp, so a future stamp stays on the board forever (Fable) | Major | Future stamps (beyond 2 h of clock skew) are excluded from the weekly board, with a new protocol test (`dfa6757`). The leaderboard is described as "pledged focus". |
| 8 | Joining alone doesn't put you on the leaderboard (Astra, Sol) | Major | The judge guide and DEMO now say a planted tree is needed. The profile card is the first, quickest result. |
| 9 | The judge path withers easily: the script opens an explorer tab mid-session (Fable, Sol, Astra) | Major | The guide and script say to keep the tab in front and use a second device for the explorer. The wither clip is recorded separately as a practice session. |
| 10 | Three vocabularies for tree sizes (all) | Major | Deck v2 uses the app's names (Seedling / Sapling / Grand tree). The on-chain tiers appear only in the appendix. |
| 11 | Slide 7 promises limits and shows none; slide 13 is empty (all) | Major | Deck v2 adds a visible limits box and a dated A3 timeline. |
| 12 | The walkthrough's chips claim more than the screens show; the QR looks actionable (Astra, Sol) | Major | `walkthrough.png` v2: honest chips (Tested / Pending), the QR blurred, the Verify switch visible. |
| 13 | WizardConnect was tested only with a test wallet, not real Selene or Paytaca (Fable, Sol) | Major | Wording made exact everywhere. Real Selene and Paytaca are part of the funded run (owner). |
| 14 | Pre-kickoff work (9–10 Nov prototype, 13 Nov adapter) belongs on a slide (Astra) | Major | Deck v2 A3 and `SUBMISSION.md`. **Open:** Fable asks when the PomodoroRewards "v3" and CreditPolicy were written. Git can't tell, because all 2026 code first landed on 17 Nov. **The owner should confirm.** |
| 15 | One minting baton serializes every plant (Fable) | Major | Not changed. Listed as a known limit; the plan is several batons. Deck v2 dropped the "million promises" target. |
| 16 | The live sites run unmerged PR #5 (Fable, Sol) | Major | **Fixed 20 Nov:** PR #5 (and #4) merged; both sites deployed from `main`. |
| 17 | The vision is too broad (Sol, Astra) | Minor | Deck v2: one first buyer (study groups) and one success measure, marked Planned. |
| 18 | Test counts were inconsistent; the 76-test suite includes legacy contracts (Sol, Fable) | Minor | Fixed to "76-test contracts suite (also covers PomodoroRewards/CreditPolicy), 27 protocol, 71 app". |
| 19 | The collapsed banner omits the 2025 demo; the landing page's 2025 link isn't pinned (Fable) | Minor | Both fixed and deployed. |
| 20 | The BCMR text says each tree came from "verified focus" (Fable) | Minor | Not changed: republishing BCMR is a mainnet transaction signed with the owner's metadata key. Listed for the owner. |
| 21 | The 100 creator trees look like a premine (Fable) | Minor | Not changed; the owner decides how to present them. |
| 22 | The flat 2,000-sat fee is high for ~500-byte transactions (Fable) | Minor | Not changed. The fee is stated in sats on the slide. |

## Re-verification after the fixes

- `tsc` and `eslint` clean. 71 app tests pass, and 27 protocol tests pass, including the new weekly-board test.
- Web app and landing page rebuilt and redeployed (20 Nov). The BCMR registry hash is unchanged (`279f1f4a…`).
- Deck v2 applied in place by GPT-6.2 Sol (13 slides, 15 links checked). I inspected all 13 renders in `deck-renders/v2/`: no overflow or overlaps, every claim labelled, and slide 10 still has no voting address. Codex hit one 400 error on its first batch (missing field mask on a table update) and resubmitted successfully.
