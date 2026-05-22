// ─────────────────────────────────────────────────────────────────
// Case study content — written in Andy Cho's style:
//   • Roman-numeral section headers
//   • Short, declarative sentences
//   • Collaborative "we" framing
//   • No buzzwords — focus on decisions and tradeoffs
// ─────────────────────────────────────────────────────────────────

export interface SubSection {
  title: string
  body: string
  feedback?: string       // "Feedback:" callout shown below body (or beside media)
  image?: string          // path to image, '' = placeholder
  video?: string          // path to video (autoplay, loop, muted)
  mediaPosition?: 'left' | 'right'  // if set, media and text sit side-by-side
  mediaShadow?: string              // CSS box-shadow applied to the media wrapper
}

export interface CaseVideo {
  label: string           // e.g. "Mobile Prototype", "Desktop Prototype"
  src?: string            // video URL or path; omit = placeholder
  width?: number | string // custom width (px or CSS string)
  height?: number | string // custom height (px or CSS string)
}

export interface CaseSection {
  label: string           // "I. Context"
  title?: string          // optional sub-title shown below the label
  body: string            // main paragraph
  image?: string          // single image below body, '' = placeholder
  imageStyle?: React.CSSProperties  // custom style for the single image wrapper
  images?: string[]       // multiple images below body, '' items = placeholders
  imageWidths?: (string | undefined)[]  // per-image max-width overrides, parallel to images[]
  imageStyles?: (React.CSSProperties | undefined)[]  // per-image inline style overrides
  videos?: CaseVideo[]    // video embeds/placeholders shown after images
  videosGrid?: boolean    // if true, renders videos side-by-side instead of stacked
  videosGridCols?: string // CSS grid-template-columns when videosGrid=true
  subsections?: SubSection[]
  subsectionsGrid?: boolean // if true, renders subsections in a 2-col grid
  cta?: { label: string; href: string }  // optional live-site / external link button
  ctaNote?: string                       // short line rendered directly above the cta button
}

export interface CaseMetric {
  value: string           // e.g. "220,000+"
  label: string           // e.g. "groups managed"
}

export interface ContextVideo {
  src: string             // video file path
  label?: string          // small-caps section label, e.g. "SecureIT Platform"
  title?: string          // section title
  body?: string           // 2–3 sentence paragraph
  timestamp?: string      // e.g. "1:24" — where MyID Groups appears in the video
  credit?: string         // production credit shown below video
}

export interface CaseAward {
  level: string           // e.g. "Gold Stevie® Award"
  category: string        // e.g. "Identity & Access Security Solution"
  href?: string           // link to award page
}

export interface CaseStudy {
  slug: string
  overview: string        // longer overview shown in the OVERVIEW section body
  metrics?: CaseMetric[]  // impact stats shown between overview and sections
  award?: CaseAward       // industry recognition shown below metrics
  contextVideo?: ContextVideo  // ecosystem/context video shown after metrics
  sections: CaseSection[]
}

export const caseStudies: CaseStudy[] = [

  // ── Cisco ────────────────────────────────────────────────────────
  {
    slug: `cisco`,
    overview:
      `MyID Groups is Cisco's enterprise platform for group management and governance — the system employees use to create access groups, manage membership, and handle approvals for security, mailing lists, collaboration spaces, and application provisioning. When I joined the project, this work was spread across multiple legacy systems. The goal was to bring it into one place.`,
    metrics: [
      { value: `220,000+`, label: `groups managed` },
      { value: `7M+`,      label: `memberships supported` },
      { value: `7,000+`,   label: `employees actively using` },
      { value: `1,400+`,   label: `access automations` },
      { value: `5 → 1`,    label: `legacy systems consolidated` },
    ],
    award: {
      level: `Gold Stevie® Award`,
      category: `Identity & Access Security Solution`,
      href: `https://stevieawards.com/aba/cisco-san-jose-california-united-states-myid-groups-cisco-it-unified-group-management-platform`,
    },
    contextVideo: {
      src: `/cisco/SecureIT.mov`,
      label: `SecureIT Platform`,
      title: `The ecosystem MyID Groups operates within`,
      body: `MyID Groups is one component of SecureIT — Cisco's enterprise identity and security platform serving the company's global workforce. This overview shows how the platform's systems interconnect: identity, access management, provisioning, approvals, and governance. Understanding how these pieces relate — and where they create friction — was foundational to the design decisions behind MyID Groups.`,
      timestamp: ``,
      credit: `Motion design and video editing · Adobe After Effects`,
    },
    sections: [
      {
        label: `I. Context`,
        title: `The cost of fragmentation`,
        body:
          `Managing access at a company of 85,000+ people is inherently complex. Before MyID Groups, employees navigated several disconnected tools to accomplish what was functionally the same task — creating a group, adding members, requesting approvals. The fragmentation created friction everywhere: employees who couldn't find the right tool, group owners who lacked visibility into who had access, and administrators managing governance across systems that didn't communicate with each other.`,
        image: `/cisco/section-01.jpg`,
      },
      {
        label: `II. The platform`,
        title: `One surface for everything group-related`,
        body:
          `MyID Groups consolidates four distinct use cases into a single experience: security access groups, mailing lists, collaboration spaces, and application provisioning. Each had its own legacy system, its own terminology, and its own set of user expectations. Designing across all of them required a shared language — a consistent mental model that could accommodate different workflows without forcing them into the same shape.`,
        subsections: [
          {
            title: `A. Group creation`,
            body:
              `Redesigned the group creation flow to guide users through type selection, membership configuration, and governance settings in a single, progressive experience — reducing the steps required to get a new group up and running.`,
            feedback:
              `Users wanted clearer guidance on which group type to select. We added contextual descriptions at the type-selection step and surfaced help links inline — reducing misclassification and support tickets.`,
            video: `/cisco/creategroup.mov`,
            mediaPosition: `left`,
            mediaShadow: `0px 8px 6px 0px rgba(9, 17, 33, 0.08)`,
          },
          {
            title: `B. Membership management`,
            body:
              `Built views for group owners to understand who has access, when they joined, and what approvals are pending. Clear, at-a-glance membership visibility was one of the most consistent asks from research.`,
            feedback:
              `Group owners needed to understand not just who had access, but why — especially for compliance-sensitive groups. We added access reason and approval history columns to address this directly.`,
            image: `/cisco/accessdetails.png`,
            mediaPosition: `right`,
          },
          {
            title: `C. Approvals and governance`,
            body:
              `Designed the approval workflows for access requests — balancing transparency for requestors with the right controls for administrators. Enterprise security requirements shaped a significant portion of these decisions.`,
            feedback:
              `Early testing revealed that requestors lost confidence when they couldn't see where their request stood. We introduced a persistent status timeline so both parties had visibility into the approval state at all times.`,
            image: `/cisco/approval.png`,
            mediaPosition: `left`,
          },
          {
            title: `D. Admin tooling`,
            body:
              `Supported governance-level features for administrators managing groups at scale — including lifecycle settings, audit visibility, and tools for handling groups that would otherwise go dormant and unmanaged.`,
            feedback:
              `Admins managing hundreds of groups needed bulk actions and filtering by activity state. We prioritized dormancy alerts and batch lifecycle controls as the highest-impact additions based on admin interviews.`,
            image: `/cisco/activitylog.png`,
            mediaPosition: `right`,
          },
        ],
      },
      {
        label: `III. What the work required`,
        title: `Systems thinking in a constrained environment`,
        body:
          `Enterprise design at this scale was less about individual screens and more about understanding how decisions cascaded across interconnected workflows and governance systems. A change to the group creation flow had implications for approvals. A change to how membership was displayed affected how governance was enforced. The work required staying closely aligned with engineering and product — not just for handoff, but to understand technical constraints, operational realities, and where simplification was realistically possible.`,
        image: `/cisco/section-03.jpg`,
      },
      {
        label: `IV. Reflections`,
        title: `Designing for invisible infrastructure`,
        body:
          `Most users won't think about MyID Groups unless something goes wrong. That's the success condition for this kind of work — not delight, but reliability. Enterprise design taught me that clarity is a form of trust. When a system is transparent about what it's doing and why, users can operate with confidence. When it isn't, they build workarounds — and those workarounds become the real UX problem.`,
      },
    ],
  },

  // ── J.P. Morgan Chase ────────────────────────────────────────────
  {
    slug: `jpmorgan-chase`,
    overview:
      `Chase's mortgage application ran on a third-party platform shared across financial institutions — fragmented, costly, and increasingly difficult to scale. At an estimated ~$12M in annual operational cost and consistent customer abandonment, the case for building in-house was clear. We consolidated and rebuilt the full application and fulfillment experience within Chase MyHome, balancing regulatory requirements, accessibility standards, responsive design, and phased delivery across active mortgage operations.`,
    sections: [
      {
        label: `I. Context`,
        title: `The cost of the legacy platform`,
        body:
          `The existing experience accumulated fragmented workflows, inconsistent navigation, and technical dependencies that made modernization difficult. Customers moved through disconnected flows with no visibility into progress and frequently abandoned before completion.

The platform also needed to support multiple scenarios in parallel: first-time homebuyers, returning customers, rate explorers, active applicants, and customers managing documents and disclosures. Whatever we built had to simplify an inherently complex financial process without compromising compliance or accessibility.

My role spanned platform strategy, MVP definition, phased rollout planning, responsive interaction design, accessibility, and alignment across 30+ engineering partners.`,
      },
      {
        label: `II. Vision Story`,
        title: `Aligning around the future experience before delivery`,
        body:
          `Before defining MVP scope or delivery sequencing, we developed a customer-centered vision story to align product, design, and engineering around the future mortgage experience. The work combined journey mapping, storyboard concepts, and workflow exploration to visualize how customers would move through the application across devices and stages of the lending process.

The artifact became a shared planning tool across teams — helping stakeholders align on rollout priorities, identify technical dependencies, and estimate implementation scope before delivery began.`,
        image: `/jpmorgan-chase/section-02.jpg`,
      },
      {
        label: `III. Scope`,
        title: `Four design workstreams`,
        body:
          `Before delivery, we aligned on customer pain points, technical constraints, and rollout sequencing through journey mapping, affinity workshops, competitive analysis, and MVP prioritization.`,
        subsections: [
          {
            title: `A. Mortgage application workflows`,
            body:
              `Core flows covering employment & income, property information, disclosures, document upload, identity verification, and loan fulfillment.`,
            image: `/jpmorgan-chase/section-03-a.jpg`,
          },
          {
            title: `B. Responsive platform`,
            body:
              `Mobile-first design across mobile, tablet, and web — rethinking information hierarchy, layout density, and navigation behavior across complex financial workflows.`,
            image: `/jpmorgan-chase/section-03-b.jpg`,
          },
          {
            title: `C. Accessibility`,
            body:
              `Accessibility was a core product requirement, not a post-launch validation step. Work included screen reader support, keyboard navigation, semantic hierarchy, and ongoing ADA collaboration.`,
            image: `/jpmorgan-chase/section-03-c.jpg`,
          },
          {
            title: `D. Phased delivery`,
            body:
              `The platform launched incrementally. We worked with product and engineering to define MVP scope, sequence high-impact workflows, and build foundational experiences designed to scale across future phases.`,
            image: `/jpmorgan-chase/section-03-d.jpg`,
          },
        ],
      },
      {
        label: `IV. Employment & Income`,
        title: `The most complex workflow in the application`,
        body:
          `The Employment & Income flow introduced the most friction. Customers navigated dense financial inputs, disclosure-heavy requirements, complex terminology, and repeated verification — across multiple devices. Changing TRID disclosure requirements and engineering constraints required continuous iteration throughout.

We explored multiple concepts across workflow sequencing, progressive disclosure, responsive layouts, and accessibility behavior. Several patterns that improved usability had to be redesigned to align with accessibility standards or available system capabilities.

The final experience focused on guided step progression, simplified form grouping, clearer disclosure visibility, and inline contextual guidance — progressively introducing information while maintaining overall progress visibility.`,
        image: `/jpmorgan-chase/section-04.jpg`,
      },
      {
        label: `V. Research & Iteration`,
        title: `Testing with real mortgage applicants`,
        body:
          `We tested with participants who had previously applied for mortgages through Chase or competing lenders. Research focused on abandonment behavior, terminology confusion, disclosure comprehension, and cross-device experience.

One clear lesson: portions of testing occurred later than ideal due to delivery timelines, creating downstream iteration during later phases. Validating foundational workflow assumptions earlier is critical in large-scale enterprise work.`,
        image: `/jpmorgan-chase/section-05.jpg`,
      },
      {
        label: `VI. Reflections`,
        title: ``,
        body: ``,
        subsections: [
          {
            title: `01 — Designing for systems, not screens`,
            body:
              `The most important decisions were rarely visual. The challenge was designing systems that could evolve across multiple phases, support regulated workflows, and remain scalable as requirements changed.`,
          },
          {
            title: `02 — Constraints shape the product`,
            body:
              `Accessibility requirements, responsive limitations, disclosure regulations, technical dependencies, phased sequencing — rather than treating these as blockers, the work required continuously balancing ideal experience design with operational realities. That balancing act shaped the foundation of the platform itself.`,
          },
        ],
      },
    ],
  },

  // ── OxeFit ───────────────────────────────────────────────────────
  {
    slug: `oxefit`,
    overview:
      `OxeLife is a mobile fitness platform designed to extend the OxeFit ecosystem beyond hardware. Rather than functioning solely as a workout companion, the platform explored how creator content, workout programming, and personalized recommendations could evolve fitness into a more immersive lifestyle experience.

Working within a lean team, I focused heavily on UI design, visual systems, and scalable component frameworks — shaping an experience capable of supporting diverse content types while maintaining a cohesive and emotionally engaging product language.`,
    sections: [
      {
        label: `I. Context`,
        title: `Beyond the machine`,
        body:
          `Most connected fitness apps focused on utility — tracking workouts, displaying metrics, and delivering instructional classes. Functional, but lacking the emotional engagement needed to keep users returning between sessions.

The opportunity for OxeLife was different. The question wasn't how to make workouts better — it was how to make users want to come back even when they weren't exercising.

That meant designing a platform capable of surfacing large amounts of content intuitively, building stronger emotional connection with the brand, and supporting multiple forms of media without overwhelming the experience.`,
      },
      {
        label: `II. Approach`,
        title: `Defining the platform ecosystem`,
        body:
          `We quickly moved into experience mapping and visual exploration, defining flows across onboarding, content discovery, creator pages, workout programs, and video playback.

The core challenge was building a flexible system capable of supporting diverse content types — editorial content, creator-driven programming, recommendations, and subscription surfaces — without the experience feeling fragmented as the platform expanded.`,
        images: [`/oxefit/section-02-01.jpg`, `/oxefit/section-02-02.jpg`],
      },
      {
        label: `III. Design`,
        title: `A content-first fitness experience`,
        body:
          `Rather than adopting the utility-first interfaces common in fitness products, we leaned into visual storytelling, editorial layouts, and layered imagery — positioning OxeLife closer to a modern media platform while still supporting workout functionality.

Before moving into high-fidelity design, we explored core journeys through wireframes and interactive prototypes: browsing content, discovering creators, navigating workouts, and transitioning between fitness and lifestyle content.

The platform ultimately spanned onboarding, subscription plans, content discovery, creator pages, social feeds, and video playback — all while needing to feel cohesive across radically different content surfaces.

A major focus of my work was designing systems flexible enough to scale across editorial content, fitness programming, and creator-driven experiences without the UI feeling fragmented.`,
        subsections: [
          {
            title: `A. Design system`,
            body:
              `As the product matured, establishing a scalable design foundation became one of my largest contributions. This included typography systems, color frameworks, iconography, reusable UI components, and layout principles designed to create consistency across the broader OxeLife ecosystem.

The system balanced structure and flexibility — allowing content to feel varied and expressive while maintaining a unified visual language.`,
            image: `/oxefit/section-03-a.jpg`,
          },
          {
            title: `B. Layered visual language`,
            body:
              `One of the defining aspects of the UI was how color evolved throughout the experience. At the system level, darker themes reduced visual noise and allowed imagery to become the focal point. As users moved deeper into content, the interface adapted through contextual gradients, overlays, and artwork-driven color treatments.

These layered transitions helped make individual pieces of content feel visually distinct while reinforcing a more immersive and premium product experience.`,
            image: `/oxefit/section-03-b.jpg`,
          },
          {
            title: `C. Flexible content tile system`,
            body:
              `Because the platform supported multiple forms of media, flexibility became central to the component system.

We designed modular tile frameworks that adapted across editorial content, video cards, featured athlete layouts, hero banners, recommendation modules, and browsing grids. Varying scale, hierarchy, and layout patterns reduced repetition and created a more dynamic browsing experience.`,
            image: `/oxefit/section-03-c.jpg`,
          },
        ],
      },
      {
        label: `IV. Reflections`,
        title: ``,
        body: ``,
        ctaNote: `Launched in 2020.`,
        cta: { label: `Go to site`, href: `https://www.oxefit.com/oxelife` },
        subsections: [
          {
            title: `01 — Fitness products are emotional products`,
            body:
              `One of the biggest takeaways from this project was realizing how deeply emotional fitness experiences are. Users are not only looking for functionality — they are seeking motivation, aspiration, identity, and momentum.

Designing for those emotional layers is what transforms a fitness tool into a product users build habits around.`,
          },
          {
            title: `02 — Systems create flexibility`,
            body:
              `Building a design system before fully understanding a product's scope is a balancing act. Some early decisions inevitably needed revisiting, but establishing the system early made iteration significantly faster as the platform evolved.

In a product spanning this many content surfaces and interaction patterns, consistency isn't simply aesthetic — it's what makes the experience feel like a unified product.`,
            image: `/oxefit/section-04-02.jpg`,
          },
        ],
      },
    ],
  },

  // ── Travel.U ─────────────────────────────────────────────────────
  {
    slug: `travelu`,
    overview:
      `Travel.U started from a simple observation: the stress of group travel isn't the adventure — it's everything that comes before and after. Who paid for the Airbnb? What did everyone spend at dinner? This was a solo research and design project exploring how a mobile app could take that friction away.`,
    sections: [
      {
        label: `I. Context`,
        title: `What travelers actually struggle with`,
        body:
          `I interviewed 12 travelers between 24 and 30 about how they managed trips. Three things came up consistently: tracking expenses across a group was a constant source of tension, splitting costs felt awkward to bring up, and by the end of a trip, nobody could agree on who owed what.`,
        image: `/travelu/section-01.jpg`,
      },
      {
        label: `II. Design process`,
        title: `From insight to interface`,
        body:
          `I mapped the full travel experience across three phases — before, during, and after — to find where design could have the most impact. The expense-tracking problem was the clearest opportunity: high-friction, universal, and without a clean solution in existing travel apps.`,
        image: `/travelu/beforeduringafter.png`,
        imageStyle: { maxWidth: '50%', margin: '0 auto' },
        subsections: [
          {
            title: `A. User flow`,
            body:
              `Before jumping into screens, I mapped out the full user flow to define how someone would move through the app — from creating a trip to settling up at the end. This gave the design a clear skeleton: every screen had a job, and no step was left undefined. The flow also exposed edge cases early, like what happens when someone joins a trip mid-way or when a payment gets disputed.`,
            image: `/travelu/userflow.png`,
          },
          {
            title: `B. Focus`,
            body:
              `Kept the app centered on the core task: add an expense, assign it to people, see what everyone owes. Every feature decision was filtered through that loop.`,
          },
          {
            title: `C. Usability testing`,
            body:
              `Ran iterative tests throughout prototyping. Most of the big improvements came from watching people get confused — especially around the assignment flow and how totals were displayed.`,
          },
        ],
      },
      {
        label: `III. What I designed`,
        title: `A financial coordination tool with a travel skin`,
        body:
          `Designed the full mobile experience: expense tracking, payment assignment, automatic calculations, group-sharing features, and a bold, modern visual identity that reflected the energy of travel without sacrificing clarity.`,
        image: `/travelu/section-03.jpg`,
        videos: [
          { label: `Mobile Prototype`,  src: `/travelu/mobileprototype.mp4`,  width: 200, height: 400 },
          { label: `Desktop Prototype`, src: `/travelu/desktopprototype.mp4` },
        ],
        videosGrid: true,
        videosGridCols: `200px 1fr`,
      },
      {
        label: `IV. Final Design`,
        title: `Hi-fi wireframes`,
        body:
          `The final screens bring together the user flow, visual identity, and usability findings into a cohesive product. Key flows include the onboarding and trip creation, expense entry with automatic splitting, and the end-of-trip settlement summary.`,
        images: [
          `/travelu/userinflow.png`,
          `/travelu/travelexpense.png`,
          `/travelu/calculation.png`,
        ],
        imageStyles: [
          { width: '65%', marginLeft: 'auto', marginRight: 'auto', display: 'block' },
          undefined,
          undefined,
        ],
      },
      {
        label: `V. Reflections`,
        title: `The frame matters as much as the solution`,
        body:
          `This was one of my early projects. The biggest lesson: I started with the wrong frame. I thought I was designing a travel app. What I was actually designing was a financial coordination tool that happened to live in a travel context. Getting that distinction right earlier would have made every decision cleaner.`,
      },
    ],
  },

  // ── 2Checkout ────────────────────────────────────────────────────
  {
    slug: `2checkout`,
    overview:
      `2Checkout helps businesses sell across 180+ countries. The homepage wasn't communicating that — too many CTAs, too much content competing for attention, and a visual tone that didn't match the scale of what the platform offered.`,
    sections: [
      {
        label: `I. Context`,
        title: `One job, done poorly`,
        body:
          `A SaaS homepage has one job: make it obvious what the product does, and give visitors one clear reason to act.

The previous 2Checkout homepage was working against that. Multiple CTAs pulled attention in different directions, the hero didn't explain the product clearly, and the messaging felt generic.`,
        image: `/2checkout/section-01.jpg`,
      },
      {
        label: `II. What I changed`,
        title: `Simplify, clarify, convert`,
        body: `Four areas shaped the redesign:`,
        subsections: [
          {
            title: `A. One primary CTA`,
            body:
              `Reduced the conversion path to a single prominent call to action. Secondary CTAs were deprioritized or moved lower in the page hierarchy.`,
          },
          {
            title: `B. Hero clarity`,
            body:
              `Redesigned the hero illustration to communicate the platform's core value — global payments — at a glance. The messaging shifted from feature-heavy language to outcome-focused positioning.`,
          },
          {
            title: `C. Copy tone`,
            body:
              `Reworked the microcopy to feel direct and confident. A platform that makes global commerce simpler should sound like it.`,
            image: `/2checkout/section-02-c.jpg`,
          },
          {
            title: `D. Accessibility`,
            body:
              `Applied ADA accessibility fundamentals including keyboard navigation support, stronger color contrast, and hierarchy that didn't rely solely on color.`,
            image: `/2checkout/section-02-d.jpg`,
          },
        ],
      },
      {
        label: `III. Reflections`,
        title: `Copy is design`,
        body:
          `This project reinforced how much language shapes behavior. Visual design matters — but the hierarchy of information, and the confidence of the language, is usually what drives action.`,
        videos: [{ label: `Prototype`, src: `/2checkout/prototype.mp4` }],
      },
    ],
  },

  // ── American Party Animals ───────────────────────────────────────
  {
    slug: `apa`,
    overview:
      `American Party Animals is a politically-themed NFT collection built around civic engagement. The landing page wasn't selling it — the visual identity didn't match the artwork, the value proposition was buried, and there was no clear path to action. I rebuilt it.`,
    sections: [
      {
        label: `I. Context`,
        title: `A brand without a story`,
        body:
          `APA had distinctive product assets — the NFT artwork itself stood out. But the site didn't feel like it came from the same place. Navigation was cluttered, the page was long with overlapping ideas, and the primary CTA — connect a wallet, buy an NFT — was easy to scroll past.`,
        image: `/apa/section-01.jpg`,
      },
      {
        label: `II. Design approach`,
        title: `Four principles`,
        body: `The redesign was shaped by four ideas:`,
        subsections: [
          {
            title: `A. Clarity first`,
            body:
              `The hero had to answer two questions immediately: what is this, and why does it matter? I redesigned above-the-fold to lead with the product's premise — NFTs for civic influence — before anything else.`,
          },
          {
            title: `B. Visual alignment`,
            body:
              `Drew the color palette, texture, and energy directly from the NFT artwork. The site and the product needed to feel like they came from the same world.`,
          },
          {
            title: `C. Simplified navigation`,
            body:
              `Removed redundant links and reduced the nav to only what mattered for the primary user journey.`,
          },
          {
            title: `D. Conversion triggers`,
            body:
              `Added clear, well-placed CTAs throughout the page to guide visitors toward connecting their wallet — the one action that mattered most.`,
            image: `/apa/section-02-d.jpg`,
          },
        ],
      },
      {
        label: `III. Reflections`,
        title: `Trust is earned in seconds`,
        body:
          `If a brand feels inconsistent, users leave before reading anything. The biggest impact here came from something simple: making the design feel coherent. Not clever — coherent.`,
        ctaNote: `Launched in 2022.`,
        cta: { label: `Go to site`, href: `https://www.americanpartyanimals.com/` },
      },
    ],
  },

  // ── YouTube (removed) ──────────────────────────────────────────── //
  // ── KakaoTalk (removed) ─────────────────────────────────────────── //
  // ── Dermatology (removed) ───────────────────────────────────────── //
  // ── Pollie Pollie (removed) ─────────────────────────────────────── //
  /*
  {
    slug: `youtube`,
    overview:
      `YouTube has scale problems that no single redesign can fully solve. This project focused on three specific friction points: how content gets organized, how viewers navigate once they're watching, and how to make long viewing sessions more sustainable.`,
    sections: [
      {
        label: `I. Context`,
        title: `Finding the real problems`,
        body:
          `I recruited six research participants based on age, platform proficiency, and usage frequency — then observed them completing real tasks on YouTube. The findings were consistent: people struggled to find content they'd watched before, got lost navigating long video series, and found the comment and product-listing sections overwhelming.`,
      },
      {
        label: `II. What I designed`,
        title: `Three prototype concepts`,
        body: `Each concept targeted a distinct friction point:`,
        subsections: [
          {
            title: `A. Video series organization`,
            body:
              `A linking system for related videos in proper sequence — making binge-watching a series feel intentional rather than accidental.`,
          },
          {
            title: `B. Navigation improvements`,
            body:
              `Redesigned in-session content browsing — better comment access, cleaner product recommendations, a quieter sidebar.`,
          },
          {
            title: `C. Viewing sustainability`,
            body:
              `A sleep timer and extended playlist management feature to reduce the anxiety of losing track of a long session.`,
          },
        ],
      },
      {
        label: `III. Reflections`,
        title: `Designing for everyone means designing for no one`,
        body:
          `YouTube's users are fundamentally different from each other. A power user and a casual viewer use the same surface in completely different ways. Research across those personas reminded me that the best design decisions find the overlap — not the average.`,
      },
    ],
  },

  // ── KakaoTalk ────────────────────────────────────────────────────
  {
    slug: `kakaotalk`,
    overview:
      `KakaoTalk is how most of Korea communicates. This project explored a specific tension: younger users wanted the low-stakes, ambient connection that stories provide, while older users weren't sure what to do with them. The design challenge was adding a feature that served both groups without making either feel like an afterthought.`,
    sections: [
      {
        label: `I. Context`,
        title: `A connection problem`,
        body:
          `Interviews revealed something interesting: users didn't always initiate conversations because they needed something. They wanted to stay in touch — but messaging felt like it required a reason. Stories offered a different dynamic. A way to say "I'm here" without composing a message and waiting for a reply.`,
      },
      {
        label: `II. Design process`,
        title: `Research to prototype`,
        body:
          `I created three personas representing distinct usage patterns, then designed and A/B tested two story feature variations. Users consistently preferred the version with clearer visual feedback when transitioning between stories — a small interaction detail with meaningful UX impact.`,
        subsections: [
          {
            title: `A. 24-Hour Story integration`,
            body:
              `Added story indicators across the Friends List and Chat List views — keeping the feature visible without overwhelming the existing interface.`,
          },
          {
            title: `B. Quick photo sharing`,
            body:
              `Reduced the steps required to send photos with a quick-access button and a left-swipe gesture from the Friends List. A secondary improvement that came directly from user feedback.`,
          },
        ],
      },
      {
        label: `III. Reflections`,
        title: `What users say vs. what they need`,
        body:
          `Nobody asked for a stories feature. They said they felt disconnected. Understanding that gap — and designing to close it rather than respond to the literal request — shaped the whole project. One of my first real lessons in reading between the lines of user research.`,
      },
    ],
  },

  // ── Dermatology ──────────────────────────────────────────────────
  {
    slug: `dermatology`,
    overview:
      `A dermatology clinic's website often serves as a patient's first real impression of the practice. It needs to communicate expertise, build trust, answer questions, and make booking easy. World's Famous Dermatology had a single-page site that wasn't doing any of those things well.`,
    sections: [
      {
        label: `I. Context`,
        title: `A site that wasn't serving its patients`,
        body:
          `The original site was a single outdated page with minimal content — no patient reviews, no service breakdowns, no clear path to booking. For a clinic seeing both medical and cosmetic patients, it wasn't giving either group a reason to stay.`,
      },
      {
        label: `II. What I redesigned`,
        title: `Building around what patients actually need`,
        body: `I ran competitive analysis across similar clinic websites, then rebuilt the information architecture from scratch:`,
        subsections: [
          {
            title: `A. Trust-building content`,
            body:
              `Added patient reviews, before/after treatment galleries, and detailed service pages — the content that turns a first-time visitor into a booked appointment.`,
          },
          {
            title: `B. Brand identity`,
            body:
              `Developed a color palette combining blue and green — clinical reliability balanced with approachability. Typography used Luxia for headers and Roboto for body copy.`,
          },
          {
            title: `C. Appointment access`,
            body:
              `Made scheduling visible at every stage of the page — in the header, on service pages, and in a dedicated contact section.`,
          },
        ],
      },
      {
        label: `III. Reflections`,
        title: `Healthcare design is trust design`,
        body:
          `Visual hierarchy and copy choices signal whether a practice is competent and approachable — not through decoration, but through clarity and completeness. This project made me more deliberate about designing for credibility in high-stakes contexts.`,
      },
    ],
  },

  // ── Pollie Pollie ────────────────────────────────────────────────
  {
    slug: `pollie-pollie`,
    overview:
      `Pollie Pollie is a social polling app designed to make civic and community debate feel more like a conversation. The core idea: a poll shouldn't just be a data point — it should be a starting point for dialogue. I designed this from concept to prototype, working directly with a developer throughout.`,
    sections: [
      {
        label: `I. Context`,
        title: `The polling gap`,
        body:
          `Existing polling apps were mostly passive — you voted, you saw results, you moved on. There was no reason to engage with the people behind the data. For a civic product targeting Gen Z, that felt like a fundamental missed opportunity.`,
      },
      {
        label: `II. Design process`,
        title: `Research, personas, testing`,
        body:
          `I developed two user personas representing different motivations — one civic-minded user tracking issues, one social user debating with friends — and used them as a constant check on design decisions throughout the project.`,
        subsections: [
          {
            title: `A. Competitive research`,
            body:
              `Analyzed existing polling apps based on user interviews — identifying what worked, what felt gimmicky, and what the market was missing.`,
          },
          {
            title: `B. Usability testing`,
            body:
              `Ran unguided tests on the prototype to find where users got stuck — particularly around poll creation and results visualization. Iterated until both flows felt intuitive.`,
          },
        ],
      },
      {
        label: `III. Working with a developer`,
        title: `Design is better when it ships`,
        body:
          `Building alongside a developer throughout the process changed how I think about design. Understanding technical constraints early meant fewer decisions that couldn't ship. The developer's input shaped some of the best design calls in the project.`,
      },
      {
        label: `IV. Reflections`,
        title: `Commit to an audience`,
        body:
          `Civic engagement is a hard brief because the audience could theoretically be everyone. The most important decision I made was committing to a specific user: Gen Z, social-first. Designing for a defined person is always more useful than designing for the widest possible audience.`,
      },
    ],
  },
  */

]

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug)
}
