const PageHeader = ({ children, className = "" }) => {
  return (
    <div
      className={`border-x-divider bg-x-bg/85 sticky top-0 z-50 border-b backdrop-blur-3xl ${className}`.trim()}
    >
      {children}
    </div>
  );
};

export default PageHeader;
