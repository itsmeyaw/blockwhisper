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
