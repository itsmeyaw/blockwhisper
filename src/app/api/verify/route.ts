import { NextRequest } from "next/server";
import axios from "axios";
import { abi } from "@/../out/HCaptchaProveChecker.sol/HCaptchaProveChecker.json";
import { serverWallet } from "@/services/serverWallet";
import ethers from "ethers";

interface VerifyResponse {
  success: true | false; // is the passcode valid, and does it meet security criteria you specified, e.g. sitekey?
  challenge_ts: string; // timestamp of the challenge (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
  hostname: string; // the hostname of the site where the challenge was passed
  credit?: true | false; // optional: deprecated field
  "error-codes"?: [string]; // optional: any error codes
}

const RPC_URL: string = process.env.SEPOLIA_RPC_URL!;
const CONTACT_ADDRESS = process.env.HCAPTCHA_CONTACT_ADDRESS!;

export const POST = async (req: NextRequest) => {
  const data = await req.formData();

  const address = data.get("address");
  if (!address) {
    return new Response("Missing address", {
      status: 400,
    });
  }

  const captchaCode = data.get("captcha");
  if (!captchaCode) {
    return new Response("Missing captcha code", {
      status: 400,
    });
  }

  const hcaptchaRes = await axios.post<VerifyResponse>(
    "https://api.hcaptcha.com/siteverify",
    null,
    {
      params: {
        response: captchaCode,
        secret: process.env.HCAPTCHA_SECRET_KEY,
      },
    },
  );

  if (hcaptchaRes.data.success) {
    // TODO submit the proof on chain
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_PROVE_CHECKER_SMART_CONTRACT_ADDRESS!,
      abi,
      serverWallet,
    );

    const tx = await contract.fund(address);
    await tx.wait();

    return Response.json({ tx_hash: tx.hash });
  } else {
    return new Response("Verification failed", {
      status: 400,
    });
  }
};
