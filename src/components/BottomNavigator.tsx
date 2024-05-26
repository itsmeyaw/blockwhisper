import Link from "next/link";
import React from "react";
import { Button, Text } from "@radix-ui/themes";

const BottomNavigator: React.FC = () => {
  return (
    <div className="bg-background fixed py-5 bottom-0 left-0 right-0 text-white flex items-center justify-center gap-4">
      <Button
        size={"3"}
        type={"button"}
        variant={"surface"}
        className={"w-2/5"}
        asChild
      >
        <Link href="/">
          <Text size={"1"} className="font-display">
            Report
          </Text>
        </Link>
      </Button>
      <Button
        size={"3"}
        type={"button"}
        variant={"surface"}
        className={"w-2/5"}
        asChild
      >
        <Link href="/feed">
          <Text size={"1"} className="font-display">
            Feed
          </Text>
        </Link>
      </Button>
    </div>
  );
};

export default BottomNavigator;
