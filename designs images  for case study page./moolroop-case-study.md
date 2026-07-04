# MoolRoop

*Buyer-side mobile app · Solo project · Figma*

**In short:** a marketplace for India's GI-certified craft, built around a single idea: proof of authenticity should live at the exact moment someone decides to buy, not in a government database they'd have to go find on their own.

---

### Two products, one shelf

A hand block-printed Rajasthani textile from a certified cluster and a machine-print copy from a few states over can sit on the same page, described in nearly the same words. Nothing at the point of sale tells you which is which. The answer exists. India's Geographical Indication registry has settled the question for thousands of products, going back decades, with registered proprietors and certificate numbers on record. It's just nowhere near where anyone actually shops.

That's the gap this project sits in. Not the supply chain, not who gets paid what, not the reasons a craftsperson three states away struggles to sell online at all. Those are real, and they're not interface problems. What sits inside an app's control is smaller and more specific: whether "authentic" is a claim or a fact at the moment someone taps buy.

### What was actually broken

I spent time in the registry itself before I trusted my own assumption that this was a real gap. It was worse than I expected in one specific way: the lookup isn't hard, exactly, it's just structured for someone who already knows what they're looking for. Four steps, a proprietor search, a certificate cross-reference, none of it built for a buyer standing mid-decision on their phone.

Looking at how existing platforms handle this told me the rest. General marketplaces treat authenticity as seller-written copy, no link to anything checkable, so a good story and a true one read identically. Craft-focused platforms tend to overcorrect the other way, leaning hard on heritage and narrative without tying any of it to something a buyer could actually confirm belongs to *this* product in *this* listing. Neither closes the loop between saying something is real and proving it.

Somewhere in here the shape of the problem got sharp enough to write down: *how might a buyer confirm a craft product's authenticity in context, at the point of decision, without leaving the app to do a government researcher's job themselves?*

### Who I was actually designing for

I resisted building demographic personas for this, mostly because they'd have been fiction. Age and income don't predict who cares about provenance. What differs is what convinces someone.

Some buyers have been burned before, or have simply stopped trusting badges because marketing has hollowed the word "verified" out. They don't want reassurance, they want evidence, and they'll dig for it, but only if it's fast. Others are buying for someone else entirely, a gift, a piece of a specific region, something with a story worth repeating. They're less interested in the mechanics of a certificate and more in who made it and why it matters.

I kept both in mind without splitting the product in two, because it turned out one interaction could serve both. The same tap that shows a skeptic a certificate number shows a gift-buyer a maker's story. That was less a research finding than a relief, since designing two separate paths for two motivations would have doubled the scope for no real gain.

### Weighing how to show proof

I looked at three ways to surface this. A trust badge was the fastest to build and the least convincing, exactly the kind of unearned signal buyers have learned to see through. A dedicated verification page in the navigation was thorough but pulled people out of the shopping flow entirely, turning a moment of decision into an errand. The third option, an expandable trail launched directly from the product page, kept the buyer where they already were while still giving them somewhere real to go if they wanted proof.

I built the third one. I'm calling it the Provenance Trail: a bottom sheet that opens from the product page and shows the actual registry data, certificate number, registered proprietor, region, with a live link out to the government registry itself if someone wants to go further. It costs more than a badge, in both design complexity and screen real estate, and I decided that cost was worth paying, because the whole premise of the project falls apart if the "proof" isn't actually provable.

The visual language went through its own correction. I started in an "earthy modern" direction, bark and leaf textures, before realizing I was designing for nature when the product is actually about people and craftsmanship. I moved to something I'd describe as structured richness: a brick-red core, cream and near-black as the neutral backbone, with each region carrying its own accent (Odisha's Pattachitra paintings sit differently on the page than Tamil Nadu's bronze work, and they should). Photography stayed real throughout, no AI-generated imagery, because a project arguing for authenticity has no business faking its own visuals.

I also cut the seller side entirely, no artisan dashboard, no onboarding flow for craftspeople. That wasn't a limitation I ran out of time for. Designing the seller side would have tripled the scope of the case study without sharpening the actual argument, which is about the buyer's decision, not the artisan's onboarding.

### Walking through it

The flow runs the full distance from app open to purchase intent, not a stitched-together handful of screens. A short welcome sequence sets the tone, then Explore, where you browse by state or category rather than an endless generic feed. From there into a state page, then a category, then a product type with its variants, then the product itself, where the two real decisions of this project live side by side: How It's Made, an illustrated regional map that grounds the product somewhere specific, and the Provenance Trail, doing the verification work described above. Bag, wishlist, and menu round out the rest, deliberately kept simple.

### What this actually does

Stated plainly: a four-step manual lookup that almost no buyer would have done on their own is now one tap from the product they're already looking at. That's the entire design argument, reduced to a number.

### What I didn't get to

The seller side is the obvious next phase, onboarding for artisans, self-serve document upload for GI certification, order management, all excluded here on purpose. The other honest next step is testing the Provenance Trail with real buyers. Right now its usefulness rests on my own judgment about what would make someone stop and tap. That's worth checking against people who aren't me.

### What I'd do differently

The harder discipline in this project wasn't screens, it was refusing to solve the supply chain along with the buyer's decision. Once I accepted this was a trust problem and not an access problem, the scope actually got easier to defend, and the design got more honest about what it does and doesn't fix.

---

## Handling notes (context for whoever builds this page, not part of the public copy)

- The opening leads with the market problem, not personal history. The origin story stays exclusively on the home page detailed mode, where it does a different job (explaining *why you*, not *what's broken*). Do not add any origin-story content to this page.
- Kashmir Pashmina does not appear anywhere in this copy. Product examples used are Rajasthani block print, Odisha's Pattachitra, and Tamil Nadu bronze work, deliberately rotated so no single product carries the whole example load. Do not reintroduce Kashmir Pashmina as a repeated example across sections.
- Section headers are mini-chapter titles doing narrative work ("Two products, one shelf," "What was actually broken") rather than literal template labels like "Problem Statement" — preserve these exact headers, do not revert to generic labels.
- No em dashes anywhere in the copy above, checked line by line, preserve exactly as written.
- This case study follows the standard 12-part structure (Hook → Context & Stakes → My Role → Research → Personas → Problem Statement → Options → Decisions & Tradeoffs → Screens → Outcome → What's Next → Reflection), mapped here to the chapter titles above.
