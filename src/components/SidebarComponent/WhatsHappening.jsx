import WhatsHappeningCard from "./WhatsHappeningCard";

const WhatsHappening = () => {
  return (
    <div>
      <div className="px-4 py-2.5">
        <div>
          <span className="text-x-text text-lg font-bold">
            What's happening
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4 py-4">
        <WhatsHappeningCard />
        <WhatsHappeningCard />
        <WhatsHappeningCard />
      </div>
    </div>
  );
};

export default WhatsHappening;
