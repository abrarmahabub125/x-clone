const FollowSectionHeader = ({ title, subtitle }) => {
  return (
    <div className="border-x-divider border-b px-4 py-3">
      <h2 className="text-x-text text-xl font-extrabold">{title}</h2>
      {subtitle && <p className="text-x-text-sec mt-1 text-sm">{subtitle}</p>}
    </div>
  );
};

export default FollowSectionHeader;
