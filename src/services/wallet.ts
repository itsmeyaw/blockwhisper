import ethers from "ethers";
const provider = new ethers.providers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
export const serverWallet = new ethers.Wallet(process.env.SEPOLIA_PRIVATE_KEY!, provider);
