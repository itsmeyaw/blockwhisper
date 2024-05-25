"use client";

import { Button, Text, TextArea, TextField } from "@radix-ui/themes";
import WalletConnectButton from "@/components/WalletConnectButton";
import { useConnectedWallets } from "thirdweb/react";
import classNames from "classnames";
import * as Form from "@radix-ui/react-form";
import { FormField } from "@radix-ui/react-form";

const Home = () => {
  const wallets = useConnectedWallets();

  return (
    <main
      className={
        "flex flex-col px-10 h-max justify-center items-center gap-12 self-center"
      }
    >
      <Text className={classNames({ hidden: wallets != null })}>
        Login with your wallet to continue
      </Text>
      <div>
        <WalletConnectButton />
      </div>
      {wallets && (
        <Form.Root className={"w-full flex flex-col gap-4"}>
          <Form.Field name={"title"} className={"flex flex-col gap-2"}>
            <div className={"flex flex-col"}>
              <Form.Label>Title</Form.Label>
              <Form.Message match="valueMissing" className={"text-red-600"}>
                Please enter a title
              </Form.Message>
            </div>
            <Form.Control asChild>
              <TextField.Root
                placeholder="Title of the report"
                size={"3"}
                required={true}
              ></TextField.Root>
            </Form.Control>
          </Form.Field>
          <Form.Field name={"description"} className={"flex flex-col gap-2"}>
            <div className={"flex flex-col"}>
              <Form.Label>Description</Form.Label>
              <Form.Message match="valueMissing" className={"text-red-600"}>
                Please enter a description
              </Form.Message>
              <Form.Message match="tooShort" className={"text-red-600"}>
                Description is too short
              </Form.Message>
            </div>
            <Form.Control asChild>
              <TextArea
                placeholder="Description of your report (min 20 characters)"
                size={"3"}
                minLength={20}
                required={true}
              ></TextArea>
            </Form.Control>
          </Form.Field>
          <Form.Submit>
            <Button className={"w-full"}>Submit</Button>
          </Form.Submit>
        </Form.Root>
      )}
    </main>
  );
};

export default Home;
