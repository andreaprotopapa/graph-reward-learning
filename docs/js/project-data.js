// Minimal public release: `docs/index.html` has extra sections commented out — uncomment those
// blocks when content is ready. Keep filling this object in the meantime; hidden sections still
// use these fields once you uncomment the markup.

window.PROJECT = {
  title: "Graph-Based Reward Learning and Automatic Subtask Discovery for Long-Horizon Manipulation",
  subtitle: "Project page — more content coming soon.",
  venue: "",
  authors: [],
  affiliation: "",
  contact: "",

  links: [
    { label: "Paper", url: "https://arxiv.org/", primary: true },
    { label: "Code", url: "https://github.com/", primary: false },
    { label: "Data", url: "", primary: false },
    { label: "Poster", url: "", primary: false },
    { label: "Video", url: "", primary: false }
  ],

  hero: {
    type: "image",
    src: "assets/teaser-poster.png",
    alt: "Project teaser showing the main idea."
  },

  tldr: "",

  abstract: [
    "Write the abstract here. You can split it into multiple paragraphs by adding more strings to this array.",
    "Keep the website abstract readable: avoid walls of text, define acronyms once, and emphasize the main contribution and results."
  ],

  highlights: [
    { title: "Problem", text: "What limitation, bottleneck, or gap does the paper address?" },
    { title: "Method", text: "What is the core technical idea, architecture, algorithm, dataset, or experiment?" },
    { title: "Result", text: "What improves compared to prior work? Add numbers when possible." }
  ],

  gallery: [
    {
      title: "Overview",
      src: "assets/overview.png",
      caption: "Replace with a pipeline/overview figure and a short caption."
    },
    {
      title: "Main result",
      src: "assets/result.png",
      caption: "Replace with your key quantitative or qualitative result."
    }
  ],

  findings: [
    "Finding 1: summarize a core experimental result.",
    "Finding 2: mention an ablation, robustness result, or limitation.",
    "Finding 3: explain where the method works best and what remains open."
  ],

  bibtex: `@inproceedings{yourkey2026paper,
  title     = {Your Paper Title Goes Here},
  author    = {Author One and Protopapa, Andrea and Author Three},
  booktitle = {Conference / Journal / Workshop},
  year      = {2026}
}`,

  acknowledgements: "Optional acknowledgements, funding, grants, or institutional notes.",

  seo: {
    description: "Graph-Based reward learning — project page.",
    image: "assets/social-preview.png"
  }
};
