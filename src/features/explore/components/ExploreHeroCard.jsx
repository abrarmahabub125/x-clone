const ExploreHeroCard = ({ eyebrow, title, description, image, meta }) => {
  return (
    <article className="border-x-divider border-b transition-colors duration-200 hover:bg-x-surface/30">
      <div className="relative h-72 w-full overflow-hidden sm:h-80">
        <img
          className="h-full w-full object-cover object-center"
          src={image}
          alt={title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute right-0 bottom-0 left-0 p-4 sm:p-5">
          <p className="text-xs font-medium tracking-wide text-white/80 uppercase">
            {eyebrow}
          </p>
          <h3 className="mt-1 max-w-2xl text-2xl leading-tight font-extrabold text-white sm:text-3xl">
            {title}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/85 sm:text-base">
            {description}
          </p>
          {meta && <p className="mt-3 text-xs text-white/75 sm:text-sm">{meta}</p>}
        </div>
      </div>
    </article>
  );
};

export default ExploreHeroCard;
