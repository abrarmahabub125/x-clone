import { X } from "lucide-react";
import TodayNewsCard from "./TodayNewsCard";

const TodaysNews = () => {
  return (
    <div>
      <div className="flex items-center justify-between px-4 py-2.5">
        <div>
          <span className="text-x-text text-lg font-bold">Today's News</span>
        </div>
        <button className="hover:bg-x-surface flex size-6 cursor-pointer items-center justify-center rounded-full outline-0 transition-colors duration-200">
          <X className="text-x-text size-4" />
        </button>
      </div>
      <div className="flex flex-col gap-y-8 px-4 py-3">
        <TodayNewsCard />
        <TodayNewsCard />
        <TodayNewsCard />
      </div>
    </div>
  );
};

export default TodaysNews;
