import { ethers } from "ethers";

const provider = ethers.getDefaultProvider("sepolia");

export const serverWallet = new ethers.Wallet(
  process.env.SEPOLIA_PRIVATE_KEY!,
  provider,
);
