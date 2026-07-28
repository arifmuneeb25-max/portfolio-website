export type Act = {
  /** Two-digit act number, e.g. "01". */
  num: string
  /** Short act name — shown in the sticky index. */
  name: string
  /** Title-card line — reveals word by word when the act enters view. */
  title: string
  /** Body paragraph — fades in just after the title card. */
  body: string
}

/** The intro title-sequence line. `gold` marks the closing phrase's colour. */
export const introLine = {
  lead: 'I direct stories. The AI just helps me',
  gold: 'build them.',
}

/** THE METHOD framing headline. `gold` is the final word's colour. */
export const methodFraming = {
  lead: 'My camera is AI. My craft is everything before I turn it',
  gold: 'on',
}

export type MethodStage = {
  /** Two-digit stage number, e.g. "01". */
  num: string
  /** Short stage name — shown uppercase in the stepper / accordion. */
  label: string
  /** Panel title. */
  title: string
  /** Panel body. */
  body: string
}

/** The four stages of the process, in order. */
export const methodStages: MethodStage[] = [
  {
    num: '01',
    label: 'Audience',
    title: "Understand who it's for.",
    body: 'Before anything, I research who the film is really for. What they feel, what moves them, what they scroll past without a thought. The story has to belong to them, not to me.',
  },
  {
    num: '02',
    label: 'Story',
    title: 'Write it before I make it.',
    body: 'I write the film on the page first. The plot, the emotion, the arc. If it does not work as a story with no visuals attached, no amount of polish will save it later.',
  },
  {
    num: '03',
    label: 'Direction',
    title: 'Direct every scene.',
    body: 'This is where the AI comes in. I treat it like a camera and a crew, and I direct each shot on purpose. The framing, the motion, the mood, the pacing, all pushed until the screen matches what was in my head.',
  },
  {
    num: '04',
    label: 'Finish',
    title: 'Shape and grade.',
    body: 'I refine the look, the rhythm, and the color until the whole thing feels intentional and premium. Like it was made by a person who cared about it, because it was.',
  },
]

/**
 * The five acts of the About film. Single source of truth — copy is authored
 * here (kept exactly as written, dash-free) and the page renders from it.
 */
export const acts: Act[] = [
  {
    num: '01',
    name: 'The storyteller',
    title: 'I was telling stories long before I had the tools to make them.',
    body: 'I grew up in Karachi with a mother who read her novels out loud to me. Somewhere in that I fell for the shape of a good story, so I started writing my own. The storytelling came first. Everything since has been finding better ways to tell it.',
  },
  {
    num: '02',
    name: 'The way I watch',
    title: 'When I watch a film, I am not really watching.',
    body: 'I am studying the camera, how it moves, why it holds on a face a second longer than you expect. I save every frame that stops me and later I build something new from them. Nobody taught me this. It is just how I have always seen the world.',
  },
  {
    num: '03',
    name: 'Why AI',
    title: 'AI did not make me a storyteller. It made my stories possible.',
    body: 'There has always been a film running in my head. The problem was never ideas, it was reach. Filmmaking is expensive and slow, and most of what I imagined would have stayed locked in there forever. AI is the medium that finally let me build it.',
  },
  {
    num: '04',
    name: 'What I do now',
    title: 'Two years of making brands impossible to scroll past.',
    body: 'Two years of ad videos, social content, product films, and full campaigns for brands across beauty, fashion, home, food, and e-commerce. The formats change and the audiences change, but the job never does. Earn the attention, then give people a reason to stay.',
  },
  {
    num: '05',
    name: 'What you get',
    title: 'Content that does not just look premium. It performs.',
    body: 'You are not hiring someone to push buttons. You are hiring a director who understands your audience, builds a story around them, and delivers content that performs. Fast enough for real timelines, sharp enough to compete with brands spending far more.',
  },
]

export type TrustedItem = {
  name: string
  role: string
  blurb: string
}

export const trustedBy: TrustedItem[] = [
  {
    name: 'Utopia Brands',
    role: 'E-COMMERCE',
    blurb:
      'Directed AI ad films across multiple product lines from home to fashion. Built to sell on Amazon and stop the scroll on social.',
  },
  {
    name: 'TheSkinFit',
    role: 'BEAUTY & SKINCARE',
    blurb:
      'Created a launch ad introducing their platform to new customers. Focused on making the brand feel premium and trusted.',
  },
  {
    name: 'Doner Almani',
    role: 'FOOD, UAE',
    blurb:
      'Designed a full set of social media creatives and ad designs for the UAE market. Bold, high-energy visuals built to drive orders.',
  },
]
