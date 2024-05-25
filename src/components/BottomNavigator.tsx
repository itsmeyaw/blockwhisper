import Link from "next/link";
import React from "react";

const BottomNavigator: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 text-white flex justify-evenly">
      <Link
        className="flex flex-col items-center bg-navBtn py-4 px-8 my-5 w-2/5 rounded-md"
        href="/"
      >
        <span className="font-display">Report</span>
      </Link>
      <Link
        className="flex flex-col items-center bg-navBtn py-4 px-8 my-5 w-2/5 rounded-md"
        href="/feed"
      >
        <span className="font-display">Feed</span>
      </Link>
    </div>
  );
};

export default BottomNavigator;
