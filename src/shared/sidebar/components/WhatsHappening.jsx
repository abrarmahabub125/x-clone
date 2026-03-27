import WhatsHappeningCard from "./WhatsHappeningCard";

const WhatsHappening = () => {
  return (
    <div>
      <div className="px-4 py-3">
        <div>
          <span className="text-x-text text-xl font-extrabold">
            What&apos;s happening
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4 py-2">
        <WhatsHappeningCard />
        <WhatsHappeningCard />
        <WhatsHappeningCard />
      </div>
    </div>
  );
};

export default WhatsHappening;
