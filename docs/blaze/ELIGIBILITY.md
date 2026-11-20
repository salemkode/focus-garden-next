# Focus Garden — BCH BLAZE 2026 eligibility

Checked 20 November 2026 against the live rules:

- DoraHacks details page, read through the signed-in browser on 20 Nov 02:27 UTC. A snapshot is in
  [`sources/dorahacks-detail-2026-11-20.txt`](sources/dorahacks-detail-2026-11-20.txt).
- The bounties page and the Build with XO and Migrate to XO pages on bchblaze.com, read the same day.
- The schedule on bchblaze.com.

**Deadline:** Sunday 22 November 2026, **14:00 UTC**. DoraHacks shows this as 17:00 UTC+3. Judging
runs 23–27 November, and results are announced on 28 November.

## Summary

| Track | Verdict | One-line reason |
|---|---|---|
| **Mainnet** | **Reachable before the deadline.** Recommended. | Most requirements are met. Two things remain: deploy the branch, and do one funded mainnet run that proves the judge journey. |
| Media | Eligible as an entry type, but not recommended | It would need its own media piece. The existing BUIDL is on the Media track, and its content is out of date. |
| Community Choice | Eligible automatically once the Mainnet entry is valid and shows a confirmed voting address | Needs only the owner-confirmed EMBER2026 address |
| Build with XO | Not realistic | No new XO template or invitation exists, and the feedback must be personally written |
| Migrate to XO | Not realistic by 22 Nov | It would mean porting FocusForest to an XO template and running an invitation on Chipnet or Mainnet. There are no Chipnet coins, and a faucet needs a CAPTCHA. |

**Recommendation: enter the Mainnet track only, using the existing BUIDL #51334 switched from the
Media track. Community Choice comes with it.** Spend the remaining time making the judge journey
reliable, not adding features. Skip the XO bounties this round.

## Mainnet track: requirement by requirement

| Requirement (official wording, shortened) | Status | Evidence / what is left |
|---|---|---|
| A feature that sends BCH **mainnet** transactions that anyone, judges included, can make with the app | **Code ready; needs deploy and one funded proof run** | The web app could not send any transaction before today. The browser build refused to store keys, so the fee wallet could not be created. Branch `docs/blaze-2026-submission` (commit `560acb6`) adds a browser fee wallet. On the mainnet web build, wallet creation and the mainnet balance read are verified. A plant with an empty wallet stops cleanly at "needs one coin of at least 8,000 sats". The planting, profile, tip and claim transactions pass the contract and protocol tests in the BCH 2026 VM (tested locally). **No app-made transaction exists on mainnet yet.** The FocusForest contract's history shows only its genesis. |
| A live, usable website demo judges can click | **Live, but the deployed build is behind** | https://focus-app.salemkode.com is the mainnet build from `main` (redeployed 20 Nov by the "Switch App to Mainnet" thread). It still has the typed-address option and no web fee wallet. Deploy this branch so judges get the fee wallet and the banner. |
| Original or significantly improved during the hackathon | **Yes** | The 2025 dApp (one Chipnet contract with a relaxed time check) became a three-platform Expo app with two new mainnet contracts, merging, a leaderboard and BCMR. See `SUBMISSION.md` → "What was built during BLAZE". |
| Top-of-page banner on the home page: deck link, GitHub source, EMBER2026 CashTokens address. Pre-existing projects also need old and new repo links and a "before" demo link. | **Built; two values are pending** | `packages/mobile/blaze-banner.json` feeds the web app (above the phone frame on desktop and above the app on phones) and the landing page. **Pending:** the deck link, which has to be shared first, and the owner's confirmation of the voting address. The "before" demo is the organizers' 2025 showcase video. The 2025 dApp is no longer hosted. |
| **WizardConnect or XO Template integration** | **Met (WizardConnect)** | `packages/mobile/src/features/wallet-link/wizardconnect.ts` uses `@wizardconnect/dapp` 0.2.7. On 20 Nov, on the mainnet web build, a dedicated test wallet built on `@wizardconnect/wallet` 0.2.5 completed the relay pairing. The app received the receive key and linked the address ("Linked to Focus Garden."). Selene is the wallet the UI recommends. The native fee wallet uses the XO engine with XO's stock `p2pkh` template. That is an XO *library* integration, not a custom XO Template, so it is not claimed as one. |
| Widget Factory presentation | **In progress** | Codex (GPT-6.2 Sol) is building a copy of the template from `DECK.md`. It then needs a read-only share link, which is an approval point. |
| Attended a preparation stream (roll call), or else the low-priority queue | **Unknown — owner only** | Not visible in the repository or on the BUIDL. Without it the entry still counts, but judges review it later. |
| Confirmed "real" in the BCH BLAZE Telegram channel | **Unknown — owner only** | Owner action |
| Team of 1–4, registered on DoraHacks | **Yes** | BUIDL #51334 lists 1 member, @salemkode. The account is registered (the hackathon page shows "Manage Submission / Unregister"). |
| BUIDL linked to BCH BLAZE 2026 and to its track | **Linked, but to the Media track** | Manage Submission shows Focus Garden → **Media Track**. Switch it to **Mainnet Track** (owner approval). |

### Mainnet-track scoring (judges' four criteria)

- **Innovation:** promises enforced by a covenant time lock, with the reward owned as a CashTokens NFT. Few BCH apps show non-financial use of covenants.
- **Design and usability:** a polished app (onboarding demos, valley, sheets). The weak point is the extra step of funding a second "fee" wallet. The judge guide covers it, but it costs judges time.
- **Technical strength:** two CashScript contracts on mainnet, transactions built and VM-checked on the device, no server, BCMR metadata, WizardConnect.
- **Business potential:** the vision slide argues for pUSD-backed promises and group plans, marked as **Planned**.

## Media track

Any form of BCH media qualifies. It needs a live hosted link, a voting address, and links to the
pre-existing material. BUIDL #51334 is on this track today, and its description points to an older
"interactive piece" (focusgarden.salemkode.com/blaze). That page and its PDF still describe a test-network
preview and a "garden service" that no longer exists. A Media entry would need a new piece, such as
a short film of the valley, as a **separate** BUIDL. DoraHacks takes one track per BUIDL, and the
Mainnet entry should keep #51334. That doubles the upkeep for a 1,000 PUSD prize. It is not recommended
unless the owner wants to make a video anyway.

## Community Choice

It is automatic for every eligible Mainnet or Media entry that lists a CashTokens address able to
receive EMBER2026. The winner is the entry with the most EMBER2026 tokens. The only blocker is the
voting address, which the owner must confirm.

## Build with XO / Migrate to XO (General Protocols)

Requirements on both pages:

- a **novel (or migrated), working XO template**
- a transaction on Chipnet or Mainnet from an invitation that can be inspected in the debug tool,
  plus the invitation itself and reproduction steps
- **personally written feedback of about 500 words** ("AI written submissions will be rejected")
- for Migrate: links to the original project and to the XO version

General bounty terms: **"Submissions waive IP rights for bounty consideration"**. Payment is at the
sponsor's discretion.

What exists today:

- `@xo-cash/engine` 0.1.1-next and `@xo-cash/templates` 0.0.12 (stock `p2pkhTemplate`) power the native fee wallet.
- No Focus Garden XO template, invitation or debug-tool transaction exists.
- There are no Chipnet coins. The chipnet deployer has 0 sats, and faucets need a CAPTCHA.

Verdict: **not realistic** for 22 Nov. Writing a FocusForest XO template (plant, claim), running an
invitation and writing the feedback is roughly a day of work plus the owner's own ~500-word essay,
and it would take attention from the Mainnet journey. Before trying it later, read the IP waiver.
