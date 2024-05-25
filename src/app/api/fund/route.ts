import { abi } from "@/../out/ReportFaucet.sol/ReportFaucet.json";
import { NextRequest } from "next/server";
import { serverWallet } from "@/services/serverWallet";
import { ethers } from "ethers";

export const POST = async (req: NextRequest) => {
  const data = await req.formData();
  if (data.get("address") == null) {
    return new Response("Missing address", { status: 400 });
  }

  const address = data.get("address") as string;

  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_FAUCET_SMART_CONTRACT_ADDRESS!,
    abi,
    serverWallet,
  );

  const tx = await contract.fund(address);
  console.log("Transaction hash:", tx.hash);

  await tx.wait();

  return Response.json({ tx_hash: tx.hash });
};
