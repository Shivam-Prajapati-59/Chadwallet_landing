"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";
import { createSolanaRpc, createSolanaRpcSubscriptions } from "@solana/kit";

export default function PrivyProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const privy_app_id = process.env.NEXT_PUBLIC_PRIVY_APP_ID || "";
  const privy_client_id = process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID || "";

  return (
    <PrivyProvider
      appId={privy_app_id}
      clientId={privy_client_id}
      config={{
        appearance: { walletChainType: "solana-only" },
        externalWallets: { solana: { connectors: toSolanaWalletConnectors() } },
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          solana: {
            createOnLogin: "users-without-wallets",
          },
        },

        // Solana RPC configuration for devnet and mainnet
        solana: {
          rpcs: {
            "solana:mainnet": {
              rpc: createSolanaRpc("https://api.mainnet-beta.solana.com"),
              rpcSubscriptions: createSolanaRpcSubscriptions(
                "wss://api.mainnet-beta.solana.com",
              ),
            },
            "solana:devnet": {
              rpc: createSolanaRpc("https://api.devnet.solana.com"),
              rpcSubscriptions: createSolanaRpcSubscriptions(
                "wss://api.devnet.solana.com",
              ),
            },
          },
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
