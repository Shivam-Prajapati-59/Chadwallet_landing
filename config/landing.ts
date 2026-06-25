export const NAV_ITEMS = [
  { link: "/", label: "Home" },
  { link: "#hero", label: "About" },
  { link: "#features", label: "Workflow" },
  { link: "#protocols", label: "Protocols" },
  { link: "#faq", label: "FAQ" },
];

export const HERO_DATA = {
  heading1: "Hunt Every Memecoin.",
  heading2: "Every Chain. One Wallet",
  description: "Discover, track, and trade the hottest memecoins across every blockchain from a single powerful wallet.",
  primaryCta: "Get Started",
  secondaryCta: "Start Trading",
};

export const FEATURES_DATA = {
  heading1: "Whoever you are",
  heading2: "Grow with Chadwallet",
  cards: [
    {
      title1: "Access all assets",
      title2: "across the crypto space.",
      bullets: [
        "Unified portfolio tracking across every blockchain",
        "Discover and trade the hottest memecoins seamlessly",
        "Real-time market data and insights in one powerful dashboard"
      ],
      imageAlt: "Access all assets",
      image: "/assets/cards/card1.png"
    },
    {
      title1: "Launch any coin",
      title2: "instantly and securely.",
      bullets: [
        "Create and deploy memecoins with zero coding required",
        "Built-in fair launch mechanics and anti-rug protections",
        "Instant liquidity provision and automated market making"
      ],
      imageAlt: "Launch any coin",
      image: "/assets/cards/LaunchCard.png"
    },
    {
      title1: "Enable KOLs",
      title2: "to drive massive adoption.",
      bullets: [
        "Empower Key Opinion Leaders with built-in social sharing",
        "Transparently track and reward top community drivers",
        "Monitor viral metrics and engagement in real-time"
      ],
      imageAlt: "Enable KOLs",
      image: "/assets/cards/AsatCard.png"
    }
  ]
};

export const BENTO_GRID_DATA = {
  heading: "Everything you need to dominate",
  description: "ChadWallet gives you the ultimate edge with powerful features designed for speed, security, and tracking the next 100x gem.",
  discoverCard: {
    title: "Find the next 100x Memecoins here",
    bullet1: "Get ChadWallet Today",
    bullet2: "Never miss the next breakout!"
  },
  leaderboardCard: {
    title: "Leaderboard",
    description: "Get to the top to boost your rewards",
    youRow: {
      rank: "42",
      name: "Alex (You)",
      image: "https://i.pravatar.cc/150?u=alex",
      boost: "1.0x",
      dailyPoints: "120",
      totalPoints: "1,450"
    },
    rows: [
      { rank: "🥇", name: "jijo", boost: "2.5x", dailyPoints: "22,987", totalPoints: "118,264", image: "https://i.pravatar.cc/150?u=jijo" },
      { rank: "🥈", name: "decu", boost: "2.5x", dailyPoints: "5,842", totalPoints: "112,728", image: "https://i.pravatar.cc/150?u=decu" },
      { rank: "🥉", name: "gr3g", boost: "2.5x", dailyPoints: "15,632", totalPoints: "105,306", image: "https://i.pravatar.cc/150?u=gr3g" },
      { rank: "4", name: "Ashtoshii", boost: "2.5x", dailyPoints: "0", totalPoints: "77,215", image: "https://i.pravatar.cc/150?u=Ashtoshii" },
      { rank: "5", name: "Ily", boost: "2.5x", dailyPoints: "480", totalPoints: "56,024", image: "https://i.pravatar.cc/150?u=Ily" },
      { rank: "6", name: "radiance", boost: "2.5x", dailyPoints: "2,717", totalPoints: "49,989", image: "https://i.pravatar.cc/150?u=radiance" },
      { rank: "7", name: "Esee", boost: "2.5x", dailyPoints: "1,573", totalPoints: "46,778", image: "https://i.pravatar.cc/150?u=Esee" },
      { rank: "8", name: "Nach", boost: "2.5x", dailyPoints: "14,304", totalPoints: "42,613", image: "https://i.pravatar.cc/150?u=Nach" },
      { rank: "9", name: "mercy", boost: "2.5x", dailyPoints: "85", totalPoints: "39,480", image: "https://i.pravatar.cc/150?u=mercy" },
      { rank: "10", name: "Cupsey", boost: "2.5x", dailyPoints: "2,463", totalPoints: "37,187", image: "https://i.pravatar.cc/150?u=Cupsey" },
    ]
  },
  questsCard: {
    title: "Quests",
    description: "Complete tasks to earn points.",
    quests: [
      {
        title: "Download ChadWallet",
        description: "Deposit $100 and trade $500",
        reward: "+200",
        completed: true
      },
      {
        title: "Refer a friend",
        description: "Earn 40% in referral fees",
        reward: "+100",
        completed: false
      },
      {
        title: "Follow us on X",
        description: "Turn notifications on",
        reward: "+50",
        completed: false
      },
      {
        title: "Tag 4 friends",
        description: "In one post (max 2 per follower)",
        reward: "+50",
        completed: false
      },
      {
        title: "Use code CHAD",
        description: "For an extra $10 reward",
        reward: "+$10",
        completed: false
      }
    ]
  },
  rewardsCard: {
    title: "Rewards",
    endDate: "Ends June 30, 2026",
    description: "Lucky Weekly Winners",
    rewardAmount: "$10 each"
  }
};

export const FOOTER_DATA = {
  brandDescription: "Discover, track, and trade the hottest memecoins across every blockchain from a single powerful wallet.",
  sections: [
    {
      title: "Resources",
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/#hero" },
        { label: "Workflow", href: "/#features" },
        { label: "Protocols", href: "/#protocols" },
        { label: "FAQ", href: "/#faq" },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "X / Twitter", href: "https://x.com/getchadwallet" },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/company/chadwallet/posts/?feedView=all",
        },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", href: "https://www.chadwallet.xyz/terms" },
        { label: "Privacy Policy", href: "https://www.chadwallet.xyz/privacy" },
      ],
    },
  ],
  appStoreLink: "https://apps.apple.com/us/app/chadwallet/id6757367474",
  googlePlayLink: "https://play.google.com/store/apps/details?id=xyz.chadwallet.www",
  copyright: `© ${new Date().getFullYear()} ChadWallet. All rights reserved.`
};

export const TOKEN_DATA = [
  { symbol: "CHAD", price: "$1.42", change: "12.5%", isPositive: true },
  { symbol: "PEPE", price: "$0.0000084", change: "5.2%", isPositive: true },
  { symbol: "DOGE", price: "$0.18", change: "1.4%", isPositive: false },
  { symbol: "WIF", price: "$3.24", change: "24.1%", isPositive: true },
  { symbol: "SHIB", price: "$0.000023", change: "2.1%", isPositive: true },
  { symbol: "BONK", price: "$0.000021", change: "4.2%", isPositive: false },
  { symbol: "FLOKI", price: "$0.0002", change: "8.7%", isPositive: true },
  { symbol: "BOME", price: "$0.015", change: "15.3%", isPositive: true },
];

export const CLAIM_SECTION_DATA = {
  heading1: "It's officially",
  heading2: "$CHAD",
  heading3: "Season!",
  paragraphs: [
    "Turn every move into a shot at a big win.",
    "Deposit, transfer, or trade — you’re instantly in.",
    "Don’t fade the next breakout."
  ],
  buttonText: "Claim my $CHAD",
  termsText: "*Terms apply."
};
