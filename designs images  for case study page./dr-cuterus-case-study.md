# Dr. Cuterus

*Website design + partial build · Design lead, two-person collaborative team · Astro, live*

**In short:** a personal brand site for a sex educator with 1.9 million followers, built to do three different jobs (patient trust, brand credibility, and question triage) without leaning on a single stereotype of what a women's health site is supposed to look like.

---

### A brand with a following and no home

Dr. Tanaya Narendra had an audience most creators would kill for, close to two million followers, a bestselling book, a podcast, press coverage running from Vogue to the WHO, and none of it lived anywhere that was actually hers. What she had instead was a familiar creator's problem at scale: patients messaging faster than she could individually reply to, brands wanting to book her for workshops with no clear way to do that, and a visual identity that existed only in scattered Instagram posts.

The brief itself was clearer on parts than others. She knew the sections that needed to exist, appointment booking, a corporate workshops offering, a blog she could point people toward instead of retyping the same answer for the thousandth time, brand mentions front and centre. What she hadn't settled was how those pieces should fit together, or what the site needed to feel like to hold all of it without collapsing into either a clinical brochure or something that looked like every other feminine-branded health page.

### Building this as two people, not one

I want to be precise about how this project actually worked, since it wasn't a solo build. I led the design in full and worked alongside a developer collaborator through what we both called vibe coding, styling and building components directly in code myself, writing detailed specifications for anything I didn't build by hand, and coding at least one page close to entirely myself. The split wasn't clean enough for me to hand you an exact percentage per screen, and I don't think that precision is the useful part of this story anyway. What's true is that the design decisions, from information architecture down to the doodle illustrations, were mine, made in conversation with a client who reviewed and approved designs before any of it went into code, and who kept shaping it afterward too.

### Finding the shape of the problem

There wasn't a formal research phase here in the sense of interviews or usability testing. What we had instead was direct, repeated conversation with Tanaya, a read through her existing content and social presence to understand who was actually following her, and a look at how other creators and health platforms handled similar territory. Her patient base skews toward tier two and tier three cities, an audience that's engaged and online but not necessarily comfortable with either heavily clinical language or English-only content. Her brand audience (companies looking to book workshops) needed something else entirely: proof that this wasn't a casual creator side hustle but a credentialed, press-covered professional offering.

Two different audiences, one site, and a client who knew what needed to exist without yet knowing how it should feel. That gap became the actual design problem: *how do you build one site that reads as safe and judgment-free to a patient messaging about a missed period, and as a credible corporate booking to an HR team scheduling a workshop, without either audience feeling like an afterthought?*

### The color constraint that shaped everything

The most interesting limitation on this project wasn't creative, it was almost a brand governance decision. Tanaya didn't want gendered colors anywhere on the site. My first instinct, like most people's would be, was some register of pink, easy to tie to the subject matter but exactly the visual shorthand she was trying to avoid. She'd already been leaning on bright purple and bright yellow across her recent social content and wanted the website to lock that in as a consistent brand system going forward, without a strong opinion on which color should lead.

That left the actual balancing act to me. Two saturated, high-energy colors sitting side by side with no clear dominant is a genuinely harder constraint than it sounds, since without care it reads as chaotic rather than confident. I treated it as a ratio problem rather than a single choice, letting one color anchor structural elements while the other carried accents and energy, adjusting the balance until neither color fought the other for attention. It was a real risk given neither of us had tested it against anything beforehand, and it paid off. She responded to the direction immediately.

I made a similar bet with the doodle illustrations, the stars, arrows, and small hand-drawn marks scattered through the site. Those weren't pulled from her existing brand assets. I created them specifically for this project as a way to keep the tone playful without undercutting the credibility the corporate audience needed to see. Showing her early sketches before committing further was less a formal research step and more just good practice given how much of this project rested on taste rather than data.

### Deciding how the site should be organised

I pushed for four separate pages instead of folding everything into one long homepage: a landing page built purely as a proof-of-work and brand statement, and three functional pages carrying their own distinct job. Appointments needed to get someone from "does this sound like me" straight to booking with as little friction as possible. Blog needed to exist as a place she could point her DMs toward instead of answering the same question individually, over and over, forever. Corporate Workshops needed to stand entirely on its own, since a company evaluating her for a booking shouldn't have to scroll past patient-facing content to find proof she's done this before.

The WhatsApp-first booking flow looks like a stylistic choice but isn't really one. Tanaya already runs her practice through a separate WhatsApp-based patient management system, so the CTA had to route into infrastructure that already existed rather than compete with it by adding a calendar tool nobody would actually use. Once I understood that constraint, it stopped being a limitation and became the obviously correct choice: her patients already live on WhatsApp, so the booking flow should meet them exactly there.

The bilingual toggle between English and Hinglish was mine to propose. Her natural voice, and most of her content, sits in Hinglish, which matches her brand and her core audience perfectly. But her following also includes an international audience and people from India's southern states who don't speak Hindi, and a Hinglish-only site would have quietly excluded both. The toggle solves that without diluting the voice that makes the brand recognisable in the first place.

### Walking through the site

The landing page opens with her bio and the language toggle up front, then moves through a wall of press logos establishing credibility fast, into her book, then a hub pulling together Instagram, YouTube, and podcast content, then a section for her Fursat bra line, closing on contact details. Appointments leads with a symptom-forward hook (a plain-language list of the concerns patients actually message her about) before the WhatsApp CTA and a bilingual FAQ. Blog is intentionally light right now, a query intake option and a growing set of categorised articles, since it's still being filled out. Corporate Workshops reuses the credibility signal of the press wall but pairs it with actual workshop photography, making the case to a completely different kind of visitor than the rest of the site is built for.

Scroll behaviour across all of it was kept deliberately simple: sections snap cleanly into place rather than leaving anyone stranded mid-scroll, and the layout holds up identically across device sizes rather than degrading on smaller screens, since a large share of her audience is mobile-first by default.

### What actually happened

The honest outcome here is qualitative, not metric-based. Tanaya said the design language matched exactly what she wanted, and we kept refining copy and specific elements based on her taste even after the initial build was live. Nobody shared analytics with me, and the site hasn't been live long enough for SEO or the blog to be fully built out yet. The clearest signal of approval I actually have is that she added the site to her Instagram bio, in front of nearly two million followers, which for a creator who could point people anywhere she wants is not a small thing.

### What's left to find out

The blog and its SEO groundwork are still being filled in on her end. The question I'd actually want answered next is whether the Corporate Workshops page is converting inquiries the way it was designed to, since right now that's untested by either of us. That's the honest state of an early-stage live product, not a finished, measured one.

### What this taught me

The hardest part of this project wasn't the visual system, it was making structural calls (four pages instead of one, an original doodle language instead of borrowed assets, a color balance nobody had tested) for a client who was clear on requirements but genuinely open on strategy. There was no research phase to hide behind. A lot of this rested on reading her existing brand correctly and being willing to propose something specific rather than asking her to choose from options. That's a different kind of pressure than working from a validated brief, and I think it's the part of this project I'd point to if someone asked what I actually do well.

---

## Handling notes (context for whoever builds this page, not part of the public copy)

- Role is described precisely (design lead, hands-on in code, working alongside a developer) without naming the agency.
- WhatsApp booking is framed as a real systems constraint worked around intelligently, not an arbitrary stylistic choice.
- The doodles and photo collages are stated as fully original creative decisions.
- No em dashes anywhere in the copy above, checked line by line, preserve exactly as written.
