import { useLocation } from "react-router";
import SearchBar from "../../ui/SearchBar";
import TodaysNews from "./TodaysNews";
import WhatsHappening from "./WhatsHappening";
import WhoToFollow from "./WhoToFollow";

const SecondSidebar = () => {
  const location = useLocation();

  return (
    <div className="flex h-full max-h-screen w-fit flex-col">
      {!location.pathname.startsWith("/explore") && (
        <div className="py-2">
          <SearchBar />
        </div>
      )}

      <div className="scrollbar-hide mt-4 flex w-fit flex-col gap-y-4 overflow-y-scroll">
        <div className="border-x-divider rounded-2xl border">
          <TodaysNews />
        </div>
        <div className="border-x-divider rounded-2xl border">
          {!location.pathname.startsWith("/explore") && (
            <div className="py-2">
              <WhatsHappening />
            </div>
          )}
        </div>
        <div className="border-x-divider rounded-2xl border">
          <WhoToFollow />
        </div>
        <div>
          <div className="mt-8 flex flex-wrap gap-2 pb-12">
            <a
              href="https://x.com/en/tos"
              target="_blank"
              rel="noreferrer"
              className="text-x-text-sec text-[11px] font-light hover:underline sm:text-xs lg:text-sm"
            >
              Terms of Service
            </a>
            <span className="text-x-text-sec text-[11px] sm:text-xs lg:text-sm">
              |
            </span>
            <a
              href="https://x.com/en/privacy"
              target="_blank"
              rel="noreferrer"
              className="text-x-text-sec text-[11px] font-light hover:underline sm:text-xs lg:text-sm"
            >
              Privacy Policy
            </a>
            <span className="text-x-text-sec text-[11px] sm:text-xs lg:text-sm">
              |
            </span>
            <a
              href="https://help.x.com/en/rules-and-policies/x-cookies"
              target="_blank"
              rel="noreferrer"
              className="text-x-text-sec text-[11px] font-light hover:underline sm:text-xs lg:text-sm"
            >
              Cookie Policy
            </a>
            <span className="text-x-text-sec text-[11px] sm:text-xs lg:text-sm">
              |
            </span>
            <a
              href="https://help.x.com/en/resources/accessibility"
              target="_blank"
              rel="noreferrer"
              className="text-x-text-sec text-[11px] font-light hover:underline sm:text-xs lg:text-sm"
            >
              Accessibility
            </a>
            <span className="text-x-text-sec text-[11px] sm:text-xs lg:text-sm">
              |
            </span>
            <a
              href="https://business.x.com/en/help/troubleshooting/ads-policies.html"
              target="_blank"
              rel="noreferrer"
              className="text-x-text-sec text-[11px] font-light hover:underline sm:text-xs lg:text-sm"
            >
              Ads info
            </a>
            <span className="text-x-text-sec text-[11px] sm:text-xs lg:text-sm">
              |
            </span>
            <span className="text-x-text-sec text-[11px] font-light sm:text-xs lg:text-sm">
              (c) 2026 X Copyright
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondSidebar;
