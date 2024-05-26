import axios, { AxiosRequestConfig } from "axios";
import { ethers } from "ethers";

export function InitWallet() {
  let masterWallet = ethers.Wallet.createRandom();
  console.log("wallet", masterWallet);
  localStorage.setItem("masterWalletAddress", masterWallet.address);
  localStorage.setItem(
    "masterWalletMnemonic",
    String(masterWallet.mnemonic.phrase),
  );
}

export function getMasterWallet(): ethers.Wallet {
  let walletString = localStorage.getItem("masterWalletAddress");
  if (walletString === null || walletString === "") {
    InitWallet();
    walletString = localStorage.getItem("masterWalletAddress");
  }
  console.log(walletString);
  return JSON.parse(JSON.stringify(walletString!));
}

export async function parseSubwallet() {
  try {
    let mnemonic_phrase = localStorage.getItem("masterWalletMnemonic");
    if (!mnemonic_phrase) {
      throw new Error("Master wallet mnemonic not found in local storage.");
    }

    let masterWallet = ethers.utils.HDNode.fromMnemonic(mnemonic_phrase);

    let index = parseInt(localStorage.getItem("subWalletIndex") || "0", 10);

    let subWallet = masterWallet.derivePath(`m/44'/60'/${index}'/0/0`);

    localStorage.setItem("subWalletIndex", (index + 1).toString());
    return subWallet;
  } catch (error) {
    console.error("Error deriving sub-wallet:", error);
    return null;
  }
}
