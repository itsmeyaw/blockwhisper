import React from "react";
import { ThickArrowDownIcon, ThickArrowUpIcon } from "@radix-ui/react-icons";

interface CardProps {
  title: string;
  description: string;
  upvote: number;
  downvote: number;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  upvote,
  downvote,
}) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md flex items-start mb-4">
      <div className="flex-1">
        <h2 className="font-bold mb-2 font-display underline">{title}</h2>
        <p className="text-gray-400 font-display text-sm my-2">{description}</p>
      </div>
      <div className="flex flex-col items-center ml-4 self-center">
        <button className="text-purple-500">
          <ThickArrowUpIcon
            style={{
              width: "3rem",
              height: "3rem",
            }}
          />
        </button>
        <span className="font-display">{upvote}</span>
        <span className="font-display">{downvote}</span>
        <button className="text-gray-500">
          <ThickArrowDownIcon style={{ width: "3rem", height: "3rem" }} />
        </button>
      </div>
    </div>
  );
};

export default Card;
