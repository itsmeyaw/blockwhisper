import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { AbiConstructor } from "abitype/zod";

export default defineConfig({
  out: "src/contract_abis_generated.ts",
  contracts: [],
  plugins: [react()],
});
