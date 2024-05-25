"use client";

import { Button, Text, TextArea, TextField } from "@radix-ui/themes";
import WalletConnectButton from "@/components/WalletConnectButton";
import { useActiveWallet, useConnectedWallets } from "thirdweb/react";
import classNames from "classnames";
import * as Form from "@radix-ui/react-form";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import toast from "react-hot-toast";

const Home = () => {
  const wallet = useActiveWallet();

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
        }).then((res) => res.json()),
        {
          loading: "Submitting captcha to chain",
          success: "Successfully submitted captcha",
          error: "Error submitting captcha",
        },
      );
    }
  };

  return (
    <main
      className={
        "flex flex-col px-10 h-max justify-center items-center gap-12 self-center"
      }
    >
      <Text
        size={"2"}
        className={classNames(
          { hidden: wallet != null },
          "font-display text-center",
        )}
      >
        Login with your wallet to continue
      </Text>
      <div>
        <WalletConnectButton />
      </div>
      {wallet && (
        <Form.Root className={"w-full flex flex-col gap-4"}>
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
              ></TextArea>
            </Form.Control>
          </Form.Field>
          <Form.Field name={"captcha"}>
            <HCaptcha
              sitekey={"a4da0cb6-48fc-4b96-94e0-6eb2397e04e2"}
              onVerify={(token) => submitCaptchaToContract(token)}
            />
          </Form.Field>
          <Form.Submit>
            <Button className={"w-full font-display py-5"}>Submit</Button>
          </Form.Submit>
        </Form.Root>
      )}
    </main>
  );
};

export default Home;
