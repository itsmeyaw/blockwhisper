"use client";

import { Button, Text, TextArea, TextField } from "@radix-ui/themes";
import WalletConnectButton from "@/components/WalletConnectButton";
import { useActiveWallet, useSendAndConfirmTransaction, useSendTransaction } from "thirdweb/react";
import classNames from "classnames";
import * as Form from "@radix-ui/react-form";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import toast from "react-hot-toast";
import { useState } from "react";
import { FormEvent, useRef, useState } from "react";
import { prepareContractCall, getContract } from "thirdweb";
import { client } from "@/services/ThirdWeb";
import { sepolia } from "thirdweb/chains";
import { requestFaucet } from "@/services/RequestFaucet";

const contract = getContract({
  client,
  chain: sepolia,
  address: process.env.NEXT_PUBLIC_REPORT_SMART_CONTRACT_ADDRESS!,
});

const Home = () => {
  const [input, setInput] = useState({ totalSubmissions: "25" });
  const [proof, setProof] = useState(null);
  const wallet = useActiveWallet();
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const captchaRef = useRef<HCaptcha>(null);
  const [captchaSubmitted, setCaptchaSubmitted] = useState(false);
  const { mutate: sendTransaction, isPending } = useSendAndConfirmTransaction();

  // const submitCaptchaToContract = (captchaCode: string) => {
  //   if (wallet && wallet.getAccount()) {
  //     console.log("Submitting captcha");
  //     const formData = new FormData();
  //     formData.set("address", wallet.getAccount()?.address!);
  //     formData.set("captcha", captchaCode);
  const submitCaptchaToContract = (captchaCode: string) => {
    if (wallet && wallet.getAccount()) {
      console.log("Submitting captcha");
      const formData = new FormData();
      formData.set("address", wallet.getAccount()?.address!);
      formData.set("captcha", captchaCode);

      toast.promise(
        fetch("/api/verify", {
          method: "POST",
          body: formData,
        }).then((res) => res.json())
          .then((res) => setCaptchaSubmitted(true)),
        {
          loading: "Submitting captcha to chain",
          success: "Successfully submitted captcha",
          error: "Error submitting captcha",
        },
      );
    }
  };

  const generateProof = async () => {
    try {
      const res = await fetch("/api/zkp/generate-witness", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      console.log("logged data:", data);
      setProof(data.proof);
    } catch (error) {
      console.error("Error generating proof:", error);
    }
  };

  const submitFunction = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!wallet || !titleRef.current || !descRef.current || !captchaRef.current) {
      console.error("Title or desc ref is null")
    } else {
      await toast.promise(requestFaucet(wallet.getAccount()?.address!), {
        loading: "Requesting fund for your wallet",
        success: "Successfully funded your wallet",
        error: (err) => `Error funding your wallet: ${err.message}`,
      })

      const title = titleRef.current.value;
      const desc = descRef.current.value;
      const captcha = captchaRef.current.getResponse();

      const transaction = prepareContractCall({
        contract,
        method: "function createReport(string memory title, string memory description, string memory proof) public returns (uint256)",
        params: [title, desc, captcha],
      });
      const transactionPromise = new Promise<void>((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: () => resolve(), // Resolve on success
          onError: (error) => reject(error), // Reject with the error
        });
      });

      toast.promise(transactionPromise, {
        loading: "Submitting report to the blockchain...",
        success: "Report successfully submitted!",
        error: (err) => `Error submitting report: ${err.message}`,
      });
    }
  }

  return (
    <main
      className={
        "flex flex-col px-10 h-max justify-center items-center gap-12 self-center pb-24"
      }
    >
      {/* {wallet && ( */}
      <Form.Root className={"w-full flex flex-col gap-4"} onSubmit={event => submitFunction(event)}>
        <Form.Field name={"title"} className={"flex flex-col gap-2"}>
          <div className={"flex flex-col"}>
            <Form.Label className="font-display">Title</Form.Label>
            <Form.Message
              match="valueMissing"
              className={"text-red-600 font-display"}
            >
              Please enter a title
            </Form.Message>
          </div>
          <Form.Control asChild>
            <TextField.Root
              placeholder="Title of the report"
              size={"3"}
              required={true}
              className="font-display"
              ref={titleRef}
            ></TextField.Root>
          </Form.Control>
        </Form.Field>
        <Form.Field name={"description"} className={"flex flex-col gap-2"}>
          <div className={"flex flex-col"}>
            <Form.Label className="font-display">Description</Form.Label>
            <Form.Message
              match="valueMissing"
              className={"text-red-600 font-display"}
            >
              Please enter a description
            </Form.Message>
            <Form.Message
              match="tooShort"
              className={"text-red-600 font-display"}
            >
              Description is too short
            </Form.Message>
          </div>
          <Form.Control asChild>
            <TextArea
              placeholder="Description of your report (min 20 characters)"
              size={"3"}
              minLength={20}
              required={true}
              className="font-display h-40"
              ref={descRef}
            ></TextArea>
          </Form.Control>
        </Form.Field>
        <Form.Field name={"captcha"}>
          <HCaptcha
            sitekey={"a4da0cb6-48fc-4b96-94e0-6eb2397e04e2"}
            onVerify={(token) => submitCaptchaToContract(token)}
            ref={captchaRef}
          />
        </Form.Field>
        <Form.Submit>
          <Button
            className={"w-full font-display py-5"}
            onClick={generateProof}
          >
            Submit
          </Button>
        </Form.Submit>
      </Form.Root>
      {/* )} */}
    </main>
  );
};

export default Home;
