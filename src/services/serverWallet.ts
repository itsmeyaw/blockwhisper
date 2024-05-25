import { ethers } from "ethers";

const provider = new ethers.providers.StaticJsonRpcProvider(
  { skipFetchSetup: true, url: "https://sepolia.drpc.org" },
  11155111,
);

export const serverWallet = new ethers.Wallet(
  process.env.SEPOLIA_PRIVATE_KEY!,
  provider,
);
