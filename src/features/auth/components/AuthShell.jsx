import XLogo from "../../../shared/assets/logo/x-logo.svg";

const AuthShell = ({ title, children, footer, bottomContent }) => {
  return (
    <div className="bg-x-bg flex min-h-screen w-full justify-center px-6 py-10">
      <div className="grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-20">
        <section className="hidden items-start justify-center lg:flex">
          <img className="size-48 xl:size-56" src={XLogo} alt="X logo" />
        </section>

        <section className="mx-auto flex w-full max-w-md flex-col lg:max-w-none">
          <div className="mb-10 flex justify-center lg:hidden">
            <img className="size-12" src={XLogo} alt="X logo" />
          </div>

          <div>
            <h1 className="text-x-text text-3xl leading-tight font-extrabold sm:text-5xl">
              {title}
            </h1>
          </div>

          <div className="mt-8">{children}</div>

          {footer && <div className="mt-8">{footer}</div>}
          {bottomContent && <div className="mt-12">{bottomContent}</div>}
        </section>
      </div>
    </div>
  );
};

export default AuthShell;
