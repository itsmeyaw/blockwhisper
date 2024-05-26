"use client";

import { Button, Text, TextArea, TextField } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { getMasterWallet } from "@/services/wallet.service";

const MintWallet = () => {
  const [mintID, setMintID] = useState("");
  const [masterWalletMemonic, setMasterWalletMemonic] = useState("");
  const [masterWalletAddress, setMasterWalletAddress] = useState("");

  useEffect(() => {
    setMasterWalletMemonic(
      localStorage.getItem("masterWalletMnemonic") ?? "No Master Wallet",
    );
    setMasterWalletAddress(localStorage.getItem("masterWalletAddress") ?? "");
  }, []);

  const onChangeAddress = (e: React.FormEvent<HTMLInputElement>): void => {
    setMasterWalletAddress(e.currentTarget.value);
  };

  const onChangeMemonic = (e: React.FormEvent<HTMLTextAreaElement>): void => {
    setMasterWalletMemonic(e.currentTarget.value);
  };

  return (
    <main
      className={"flex flex-col px-10 h-max justify-center items-center gap-12"}
    >
      <Text
        size={"2"}
        className={classNames({ hidden: "" }, "font-display text-center")}
      >
        Create single use wallets to post privately
      </Text>
      <div></div>
      <Form.Root className={"w-full flex flex-col gap-4"}>
        <Form.Field name={"title"} className={"flex flex-col gap-2"}>
          <div className={"flex flex-col"}>
            <Form.Label className="font-display">
              Master Wallet Address
            </Form.Label>
            <Form.Message
              match="valueMissing"
              className={"text-red-600 font-display"}
            >
              Value missing!
            </Form.Message>
          </div>
          <Form.Control asChild>
            <TextField.Root
              placeholder="Your master wallet address"
              size={"3"}
              required={true}
              className="font-display"
              onChange={onChangeAddress}
              value={masterWalletAddress}
              disabled
            />
          </Form.Control>
        </Form.Field>
        <Form.Field name={"description"} className={"flex flex-col gap-2"}>
          <div className={"flex flex-col"}>
            <Form.Label className="font-display">
              Memonic Master Wallet
            </Form.Label>
            <Form.Message
              match="valueMissing"
              className={"text-red-600 font-display"}
            >
              Please enter a mneumonic
            </Form.Message>
            <Form.Message
              match="tooShort"
              className={"text-red-600 font-display"}
            >
              Mneumonic is too short
            </Form.Message>
          </div>
          <Form.Control asChild>
            <TextArea
              placeholder="Please enter a mneumonic "
              size={"3"}
              minLength={20}
              required={true}
              className="font-display h-40 text-gray-400"
              value={masterWalletMemonic}
              onChange={onChangeMemonic}
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit>
          <Button
            className={"w-full font-display py-5"}
            onClick={getMasterWallet}
          >
            Initialize new base wallet
          </Button>
        </Form.Submit>
      </Form.Root>
    </main>
  );
};

export default MintWallet;
