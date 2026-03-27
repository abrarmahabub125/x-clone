import BackButton from "../../../shared/ui/BackButton";
import CreateTweet from "../../home/components/CreateTweet";

const CreatePostModal = ({ isModal = false, onClose }) => {
  if (isModal) {
    return (
      <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/55 px-4 py-6 backdrop-blur-[2px] sm:py-10">
        <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

        <div className="bg-x-bg border-x-divider relative z-[101] w-full max-w-2xl overflow-hidden rounded-2xl border shadow-2xl">
          <div className="border-x-divider flex items-center gap-2 border-b px-3 py-2 backdrop-blur-3xl">
            <BackButton />
            <span className="text-x-text text-lg font-semibold sm:text-xl">
              Compose post
            </span>
          </div>
          <CreateTweet />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="border-x-divider sticky top-0 z-50 border-b px-3 py-2 backdrop-blur-3xl">
        <div className="flex items-center gap-2">
          <BackButton />
          <span className="text-x-text text-lg font-semibold sm:text-xl">
            Compose post
          </span>
        </div>
      </div>
      <CreateTweet />
    </div>
  );
};

export default CreatePostModal;
