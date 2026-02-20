const MorePopUp = ({ children }) => {
  return (
    <div
      data-aos="zoom-in"
      className="border-x-divider bg-x-bg absolute bottom-4 rounded-xl border p-4 shadow-2xs"
    >
      {children}
    </div>
  );
};

export default MorePopUp;
