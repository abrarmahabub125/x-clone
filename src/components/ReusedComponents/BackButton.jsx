import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="hover:bg-x-surface flex size-9 cursor-pointer items-center justify-center rounded-full outline-none"
      >
        <ArrowLeft className="text-x-text size-5" />
      </button>
    </>
  );
};

export default BackButton;
