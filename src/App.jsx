import { Outlet } from "react-router";
import { Suspense, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import InitialLoading from "./components/loaders/InitialLoading";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="flex min-h-screen w-full justify-center">
      <Suspense fallback={<InitialLoading />}>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default App;
