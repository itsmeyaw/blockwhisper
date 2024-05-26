import { readFileSync } from "fs";
import path from "path";
import snarkjs from "snarkjs";

export default async function handler(req, res) {
  console.log("reached");
  const input = req.body;

  // Paths to the necessary files
  const wasmPath = path.resolve("public", "reputation.wasm");
  const zkeyPath = path.resolve("public", "reputation_0001.zkey");

  // Generate the witness
  const witnessCalculator = await snarkjs.wtns.calculate(input, wasmPath);

  // Generate the proof
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    input,
    wasmPath,
    zkeyPath,
  );

  res.status(200).json({ proof, publicSignals });
}
