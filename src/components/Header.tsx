"use client";

import { Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import classNames from "classnames";

const Header = () => {
  const [walletText, setWalletText] = useState("Mint wallet");

  useEffect(() => {
    const masterWalletAddress = localStorage.getItem("masterWalletAddress");
    if (masterWalletAddress) {
      setWalletText("Manage wallet");
    }
  }, []);

  return (
    <header className={"flex items-center flex-col justify-center p-5 gap-4"}>
      <Heading size={"7"} as={"h3"} className={"font-display mx-6 text-center"}>
        BlockWhisper
      </Heading>
      <Link
        className="flex flex-col items-center bg-accent py-4 px-8 my-5 rounded-md"
        href="/mint"
      >
        <span className="font-display">{walletText}</span>
      </Link>
    </header>
  );
};

export default Header;
