"use client";

import Card from "@/components/Card";
import { Text } from "@radix-ui/themes";
import { useReadContract } from "thirdweb/react";
import { getContract } from "thirdweb";
import { client } from "@/services/ThirdWeb";
import { sepolia } from "thirdweb/chains";
import { useState } from "react";

const posts = [
  {
    title: "This happened to me",
    description:
      "This is a description about a report. This is a description about a report.",
    upvote: 10,
    downvote: 2,
  },
  {
    title: "This happened to me",
    description:
      "This is a description about a report. This is a description about a report.",
    upvote: 10,
    downvote: 2,
  },
  {
    title: "This happened to me",
    description:
      "This is a description about a report. This is a description about a report.",
    upvote: 10,
    downvote: 2,
  },
];

const contract = getContract({
  client,
  chain: sepolia,
  address: process.env.NEXT_PUBLIC_REPORT_SMART_CONTRACT_ADDRESS!,
});

type ReportData = {
  title: string;
  description: string;
  proofOfHumanWork: string;
  upVote: number;
  downVote: number;
};

const Feed = () => {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [tokenIds, setTokenIds] = useState<bigint[]>([]);

  console.log("Try reading reports from sc");
  const { data, isLoading } = useReadContract({
    contract,
    method: "function getReports(uint8 amount, uint8 skip) public view returns (ReportData[] memory, uint256[] memory)",
    params: [10, 0],
  });

  console.log("Done reading reports from sc", data, isLoading);

  // Update state when data is available
  if (data) {
    const [fetchedReports, fetchedTokenIds] = data;
    setReports(fetchedReports as ReportData[]);
    setTokenIds(fetchedTokenIds as bigint[]);

    console.log("Reading reports", data);
  }

  return (
    <main
      className={
        "flex flex-col px-4 h-max justify-center items-center gap-12 self-center pb-20"
      }
    >
      <Text className="font-display">Most Recent</Text>
      <div className="min-h-scren p-2 overflow-y-auto">
        {isLoading ? (
          <Text className="font-display">Loading data</Text>
        ) : (
          reports.map((report, index) => (
            <Card
              key={tokenIds[index]}
              title={report.title}
              description={report.description}
              upvote={report.upVote}
              downvote={report.downVote}
            />
          ))
        )}
      </div>
    </main>
  );
};

export default Feed;
