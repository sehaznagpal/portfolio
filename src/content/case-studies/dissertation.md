# Designing Against Fraud
### (The Dissertation)

*Behavioural research + interface design · Solo, 116-participant experiment · Presented at 3 conferences*

**In short:** a study asking whether the anti-fraud interfaces that work in the UK, Singapore, and China actually work in India, and a working simulated payment app built to test one piece of that question directly.

---

### A number that shouldn't be possible to ignore

Digital fraud losses in India went from roughly 7,488 crore in 2023 to 22,495 crore in 2025, and that's before accounting for the estimated one in five victims who never report it at all. The mechanism behind almost all of it is the same. A user authorises a payment themselves, sitting inside a phishing call, a fake traffic fine, a marketplace listing that looks legitimate enough. Once that authorisation happens, no security architecture can step in after the fact. Fraud, at that point, isn't a technical problem anymore. It's a decision problem, which means it's a design problem.

Countries with more mature digital payment systems have already tested interface-level fixes for this. The UK's banking sector found that making a cancel button visually prominent at the moment of payment cut fraudulent transactions dramatically. Singapore built a whole institutional layer around it. China's Alipay redesigned its warning language and saw real gains. The question this project sits inside is simple to state and much harder to answer honestly: do any of these transfer to India's UPI ecosystem, or are they solving a version of the problem India doesn't actually have?

### What I was actually testing

I didn't want to answer that with pure theory, and a purely quantitative field study wasn't feasible within a dissertation timeline. So the project split into two halves that needed each other. The first was a structured case study analysis of six international interventions (the UK's banking experiments, Alipay, a five-country protection motivation study, a Nigerian training programme, Singapore's ScamShield, and Australia's Scamwatch campaigns), each pulled apart to ask not just whether it worked, but what it assumed about the user it was built for. I ended up naming four dimensions that kept surfacing: whether a user can actually read and act on interface text under pressure, whether the fraud type matches what the intervention was designed to counter, whether the user is psychologically free to defy an authority figure, and whether the intervention reaches people outside one dominant language.

None of the six cases were built on a population that fails these four dimensions the way large parts of India's UPI user base does. That's not a vague cultural difference. It's specific and checkable, which is exactly what the second half of the project set out to test.

### Building something I could actually run an experiment on

To test whether this mismatch had measurable consequences, I built a simulated UPI-style payment interface from scratch (HTML, CSS, and vanilla JavaScript, with a Google Apps Script backend writing responses to Google Sheets in real time), rather than relying on hypothetical scenarios or self-report surveys. It needed to feel like a real payment app without borrowing any actual platform's branding, so people would respond to the interaction itself rather than to brand recognition.

116 participants went through it, split roughly evenly across three conditions: a control group with no intervention, a group shown a text warning before entering their PIN, and a group shown a CTA redesign with a visually prominent cancel option. Each participant then faced three fraud scenarios in randomised order, each one built around a different psychological lever rather than a different topic. An authority scenario staged a fake Delhi Traffic Police fine demanding immediate payment. An urgency scenario simulated an unknown number, later revealed as a friend whose phone had been stolen, asking for an urgent transfer. A social proof scenario presented an Instagram marketplace listing for wireless earbuds, complete with positive comments and a countdown offer. None of it was disclosed as fraudulent until the study ended.

*How might a single intervention design perform across fraud types that don't share a psychological mechanism, even within the most digitally comfortable slice of India's user base?* That became the sharper version of the original question, and the one the data could actually answer.

### Deciding what counted as a fair test

A few decisions here mattered more than they might look like on the surface. I chose a mixed factorial design, intervention type between participants and fraud scenario within participants, specifically so that scenario order and individual variation wouldn't quietly inflate the results. I used a sample of university students rather than attempting a broader demographic sweep, and I want to be direct about why: it wasn't a shortcut, it was a deliberate choice to test the intervention on the most favourable population possible. If a CTA redesign can't perform uniformly even here, where digital literacy, English fluency, and institutional trust are all closer to the Western baseline than India's average user, that's a stronger signal than testing it on a population where failure could be blamed on unfamiliarity with the interface itself.

I also chose mixed-effects logistic regression over a simpler chi-squared comparison alone, because participants faced three repeated scenarios each, and treating those as fully independent observations would have overstated how much data I actually had. And where the results came back marginal rather than clean, particularly the interaction between CTA and social proof fraud, I reported it as marginal (p = 0.073) rather than rounding it up into a confident claim, because the honest version of this finding is more useful than an overstated one.

### What the screens actually had to do

The base payment flow needed to feel unremarkable: money transfer, select bank account, enter PIN, transfer, success, exactly the rhythm anyone using a UPI app already knows by muscle memory. The three treatment conditions sat on top of that same flow rather than replacing it. Control ran straight through with no interruption. The warning condition added a caution banner directly above the PIN entry field, language deliberately kept short enough to read under pressure. The CTA condition replaced the plain PIN-entry moment with two clearly weighted buttons, a red "Cancel Payment" and a lighter "Continue anyway," so the safer action was also the visually louder one. None of this needed to be elaborate. It needed to be exactly as fast and unremarkable as a real fraud attempt would demand, since a study measuring split-second decisions has to be built at the same speed it's measuring.

### What actually happened

The CTA condition nearly doubled the cancellation rate over control, 68.5% against 36.4%, a difference far too large to attribute to chance. The warning condition moved the number up modestly and inconsistently, not a strong enough shift to call reliable on its own. On the surface, that's a clean result in line with what the UK research already suggested: visual choice architecture beats a text warning.

The part that mattered more didn't show up until I split the results by fraud type. The CTA roughly doubled cancellation for both the authority scenario and the urgency scenario. For the social proof scenario, its effect shrank to a fraction of that, and the warning condition did essentially nothing at all against it. Response times stayed flat across every condition, which matters here: the CTA wasn't working by making people stop and think harder, it was working by making the safe option require less effort than the risky one, exactly the mechanism choice architecture is supposed to produce. It just didn't have that effect available to it once the fraud stopped looking like an authority figure or a ticking clock and started looking like a friend's recommendation.

That gap is the most important finding in the whole project, and it's one none of the six international cases could have predicted, because peer-validated social commerce fraud barely exists as a category in the Western evidence base. In India, e-commerce and social-selling fraud is the single largest category by victim report. The tool that works well against an impersonated police officer has comparatively little to say against a fake five-star review.

One more result sat quietly underneath all of this. Self-rated fraud detection confidence had no measurable relationship with actual cancellation performance, and both intervention groups reported higher confidence than control regardless of whether they'd actually made the safer choice. People can walk away from an awareness-based intervention feeling more capable without being any more capable, a pattern that shows up in Nigerian anti-fraud research too, and one that has an uncomfortable implication for any programme built mainly on public awareness campaigns.

### Where this leaves things

Behavioural interventions can work in India. That's a real, defensible conclusion. But whether a specific one works depends on the fraud typology it's up against far more than it depends on demographics or geography, and the existing toolkit has a real, specific blind spot around fraud that spreads through social proof rather than authority or urgency. That's not a call for vague cultural sensitivity. It's a testable, addressable gap.

### What I'd want to test next

The honest next step is a field experiment with a representative sample, older users, rural users, people operating in a second or third language, ideally through a partnership with an actual UPI operator rather than a simulated interface, since real financial stakes change behaviour in ways a study environment can't fully replicate. The social proof gap specifically needs its own line of work, since the compliance mechanism there is built earlier than the payment screen, at the point the fake review or comment section is first seen, which means the intervention probably needs to live there too, not at checkout.

I also don't pretend to have resolved the ethical question sitting underneath all of it. A counter-authority nudge and a piece of manipulation use the same psychological mechanism to change someone's decision. Good intent doesn't automatically settle which one you've built, and I think that tension deserves to stay visible rather than get smoothed over in the conclusion.

### What surprised me, looking back

I expected the CTA to win. I didn't expect it to fail so specifically, and I didn't expect the failure to line up so exactly with the one fraud category the entire international literature had no reason to anticipate. If I ran this again with more resources, I'd want a sample that actually includes the users the case study analysis says are most exposed, not just a best-case stand-in for them. The best-case sample was the right call for what this study could prove, but it also means the real test is still ahead of it.

---

## Handling notes (context for whoever builds this page, not part of the public copy)

- This case study deliberately deviates from the standard 12-part structure: **"Personas" is replaced with "What I was actually testing,"** since this project had real participants and a real experimental design, not a constructed archetype.
- The **Screens** section should draw on the appendix material (Control flow, Warning intervention, CTA intervention screens) and frame them as design decisions in their own right, not just research instruments illustrating a method.
- Keep the false-confidence finding and the ethics tension in the copy as written, both are intentional, they read as intellectually honest rather than just competent, and should not be cut for brevity.
- No em dashes anywhere in the copy above, checked line by line, preserve exactly as written.
- The 68.5% vs 36.4% CTA-vs-control figure and the marginal p = 0.073 social-proof interaction are the two numbers explicitly cleared for inclusion in this full case study page (unlike the hero/index card, which deliberately avoids numbers, see prior discussion in the portfolio UI thread). Do not add any other statistics beyond what's written here without checking back against the dissertation source.
