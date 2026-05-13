import { ChevronRight } from "lucide-react";

const SettingsItem = ({ icon: Icon, title, description, onClick, danger }) => (
  <button
    onClick={onClick}
    className="group flex w-full items-center justify-between gap-4 rounded-lg p-4 transition-all"
  >
    <div className="flex items-center gap-4 text-left">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${danger ? " text-x-red bg-red-500/10" : " bg-blue-500/10 text-blue-500"}`}
      >
        <Icon className="size-5" />
      </div>
      <div>
        <h4 className="text-x-text font-semibold">{title}</h4>
        <p className="text-x-text-sec text-sm">{description}</p>
      </div>
    </div>
    <ChevronRight className="size-5 text-zinc-300 transition-transform group-hover:translate-x-1" />
  </button>
);

export default SettingsItem;
