import BackButton from "../components/ReusedComponents/BackButton";
import CreateTweet from "../components/HomeFeedComponents/CreateTweet";

const CreatePostModal = () => {
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
