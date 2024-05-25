"use client";

import { ConnectButton } from "thirdweb/react";
import { createWallet, walletConnect } from "thirdweb/wallets";
import { createThirdwebClient } from "thirdweb";
import React from "react";
import { sepolia } from "thirdweb/chains";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  walletConnect(),
  createWallet("me.rainbow"),
  createWallet("app.phantom"),
];

const WalletConnectButton = () => {
  return (
    <ConnectButton
      chain={sepolia}
      client={client}
      wallets={wallets}
      theme={"dark"}
      connectModal={{
        size: "wide",
        showThirdwebBranding: false,
      }}
    />
  );
};

export default WalletConnectButton;
