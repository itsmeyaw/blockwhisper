import { readFileSync } from "fs";
import path from "path";
import snarkjs from "snarkjs";

export default async function handler(req, res) {
  const { proof, publicSignals } = req.body;
  const vkeyPath = path.resolve("public", "verification_key.json");
  const vkey = JSON.parse(readFileSync(vkeyPath, "utf-8"));

  const isValid = await snarkjs.groth16.verify(vkey, publicSignals, proof);
  res.status(200).json({ isValid });
}
