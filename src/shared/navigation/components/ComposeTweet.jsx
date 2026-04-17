import { Link } from "react-router";
const ComposeTweet = ({ composeHref, tweetIcon }) => {
  return (
    <Link to={composeHref} className="bg-x-bgOpposite rounded-full lg:hidden">
      <div className="bg-x-bgOpposite mt-8 flex size-12 w-full items-center justify-center overflow-hidden rounded-full transition-opacity duration-200 hover:opacity-95">
        <img className="size-7 object-cover" src={tweetIcon} alt="icon" />
      </div>
    </Link>
  );
};

export default ComposeTweet;
