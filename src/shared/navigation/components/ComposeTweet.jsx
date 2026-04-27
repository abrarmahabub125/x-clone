import { Link } from "react-router";
const ComposeTweet = ({ composeHref, tweetIcon }) => {
  return (
    <Link
      to={composeHref}
      className="bg-x-bgOpposite size-12 rounded-full lg:hidden"
    >
      <div className="bg-x-bgOpposite mt-0 flex size-12 w-full items-center justify-center rounded-full transition-opacity duration-200 hover:opacity-95 md:mt-8">
        <img className="size-7 object-cover" src={tweetIcon} alt="icon" />
      </div>
    </Link>
  );
};

export default ComposeTweet;
