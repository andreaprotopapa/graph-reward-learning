// Minimal public release: `docs/index.html` has extra sections commented out — uncomment those
// blocks when content is ready. Keep filling this object in the meantime; hidden sections still
// use these fields once you uncomment the markup.

window.PROJECT = {
  title: "GORDON: Graph-based Object-centric Rewards for Decomposition of Long-Horizon Manipulation",
  subtitle: "",
  venue: "Under review",
  authors: [
    { name: "Andrea Protopapa", url: "https://andreaprotopapa.github.io/", mark: "1" },
    { name: "Davide Buoso", url: "", mark: "1" },
    { name: "Francesca Pistilli", url: "", mark: "1" },
    { name: "Georgia Chalvatzaki", url: "", mark: "2" },
    { name: "Giuseppe Averta", url: "", mark: "1" }
  ],
  affiliations: [
    { mark: "1", text: "Politecnico di Torino, Turin, Italy" },
    { mark: "2", text: "Technische Universität Darmstadt, Darmstadt, Germany" }
  ],
  contact: "andrea.protopapa@polito.it",

  personalPage: {
    label: "← Home",
    footerLabel: "← Back to Andrea Protopapa's homepage",
    url: "https://andreaprotopapa.github.io/"
  },

  links: [
    { label: "Paper", comingSoon: true, primary: true },
    { label: "Code", comingSoon: true, primary: false }
  ],

  hero: {
    type: "image",
    src: "assets/teaser-poster.png",
    alt: "GORDON: object-centric reward learning from demonstrations.",
    caption:
      "GORDON, our object-centric reward learning framework. Raw-image rewards may be distracted by spurious visual cues and transfer poorly to reinforcement learning. Conversely, using object-centric graphs, our method focuses on task-relevant objects and relations, learns a subtask-aware reward that tracks semantic progress, and transfers effectively to policy learning."
  },

  method: {
    title: "Method",
    src: "assets/method_1.png",
    alt: "GORDON pipeline from demo videos to dense reward and subtask discovery.",
    caption:
      "Demo videos are converted into object-centric graphs and encoded with a GNN trained using temporal cycle-consistency and reconstruction losses. The frozen encoder defines a dense reward by measuring latent-space distance to the demonstration goal. This reward supports policy learning directly in short-horizon tasks and can reveal stage-wise structure for subtask discovery in long-horizon tasks."
  },

  results: [
    {
      title: "Short-horizon tasks",
      src: "assets/short_horizon_results.png",
      alt: "Short-horizon reinforcement learning results with GORDON rewards.",
      caption: "Learned rewards transfer directly to RL for short-horizon tasks."
    },
    {
      title: "Long-horizon reward profiles",
      src: "assets/long_horizon_results_reward.png",
      alt: "Full-task reward profiles on long-horizon manipulation tasks.",
      caption:
        "Learned full-task reward profiles on long-horizon tasks. Without subtask labels, the learned reward exhibits stage-wise transitions aligned with semantic progress."
    },
    {
      title: "Long-horizon policy results",
      src: "assets/long_horizon_results_policy.png",
      alt: "Long-horizon policy success rates with automatic subtask discovery.",
      caption:
        "Long-horizon policy results: subtask discovery enables full-task success with a +25.4 p.p. average success-rate gain over the strongest baseline."
    }
  ],

  tldr: "",

  abstract: [
    "Learning long-horizon manipulation skills with reinforcement learning remains challenging due to the complexity of reward design, the limited guidance of sparse rewards, and the high cost of manual subtask annotation. Visual demonstrations can provide supervision for reward learning, but rewards learned from raw pixels can be brittle and sensitive to visual variation, background appearance, and robot motion.",
    "In this work, we propose GORDON, a graph-based object-centric reward learning framework that learns dense rewards from action-free video demonstrations. Each visual scene is represented as a graph of detected objects and spatial relations, and a graph neural network is trained in a self-supervised manner to embed these graphs into a task-aligned latent space. To align the representation with semantic task progress, we introduce an activity-aware weighted pooling mechanism that emphasizes task-relevant objects while masking robot-dominated motion. The dense reward is then computed as distances in the learned latent space of the current state to demonstrated goal configurations, providing a measure of task progress.",
    "In long-horizon tasks, the temporal profile of this reward reveals stage-wise object-state transitions, enabling automatic subtask discovery without manual segmentation. The discovered segments are then used to train subtask-specific rewards and specialized policies that are composed sequentially. Experiments on seven manipulation tasks on MAGICAL and ManiSkill3 benchmarks show that our object-centric reward improves reinforcement learning in short-horizon settings and enables successful policy learning in complex long-horizon tasks through automatic decomposition, achieving an average success rate of 74.4% across the long-horizon tasks (on average approx. +35 p.p. vs. best learned baseline and approx. +25 p.p. vs. oracle). Code and task implementations will be released upon acceptance."
  ],

  bibtex: `@misc{protopapa2026gordon,
  title  = {GORDON: Graph-based Object-centric Rewards for Decomposition of Long-Horizon Manipulation},
  author = {Protopapa, Andrea and Buoso, Davide and Pistilli, Francesca and Chalvatzaki, Georgia and Averta, Giuseppe},
  year   = {2026},
  note   = {Under review}
}`,

  acknowledgements: "Optional acknowledgements, funding, grants, or institutional notes.",

  seo: {
    description: "GORDON learns dense object-centric rewards from action-free video demonstrations and automatically discovers subtasks for long-horizon manipulation.",
    image: "assets/social-preview.png"
  }
};
