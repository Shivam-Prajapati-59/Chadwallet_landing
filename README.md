# ChadWallet Landing & Trading Dashboard

A modern, high-performance web application featuring a sleek landing page and a fully functional cryptocurrency trading dashboard interface. Built for the Solana ecosystem, it seamlessly integrates real-time token data and advanced charting capabilities.

## 🚀 Key Features

- **Dynamic Trading Dashboard**: A fully responsive, 3-column CSS grid layout providing a professional, dark-themed trading experience locked to the viewport.
- **Real-Time Token Explorer**: Sidebar powered by the [Birdeye V3 API](https://docs.birdeye.so/) featuring infinite scrolling pagination, market cap formatting, and real-time price change indicators.
- **Embedded TradingView Charts**: Direct integration with Birdeye's TradingView iframe embed, allowing accurate, on-chain charting for *any* Solana token via its exact contract address.
- **Interactive Order Panel**: A sleek UI component for Buy/Sell mock interactions, complete with quick-select amounts, dynamic token symbol updates, and unverified token warnings.
- **Modern Architecture**: Built with the Next.js App Router, styled with Tailwind CSS & Shadcn UI, and utilizing `@tanstack/react-query` for robust API state management and caching.

## 🛠 Tech Stack

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS + Shadcn UI + Lucide Icons
- **State Management**: React Query (`@tanstack/react-query`)
- **Data Provider**: Birdeye API V3
- **Package Manager**: Bun

## 🏁 Getting Started

### Prerequisites

Ensure you have [Bun](https://bun.sh/) installed on your machine.

### Installation

1. Clone the repository and navigate into the directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Copy the example environment file:
     ```bash
     cp .env.example .env.local
     ```
   - Open `.env.local` and add your actual API keys for Privy and Birdeye.

4. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to explore the landing page and navigate to `/trade` to view the dashboard.

## 📁 Project Structure

- `/app` - Next.js App Router pages and API routes
- `/components` - Reusable UI components and specific dashboard panels (`TokenSidebar`, `TradingViewWidget`, `TradingOrderPanel`)
- `/hooks` - Custom React Query hooks (e.g., `useTokenList` for infinite scrolling)
- `/utils` - Helper functions for formatting prices, market caps, and percentages
- `/types` - TypeScript interfaces for Birdeye API responses
