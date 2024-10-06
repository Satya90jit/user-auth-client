import useAuth from "@/hooks/useAuth";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  const { getUser } = useAuth();
  const { asPath } = useRouter(); // This will track the current route path

  // Rehydrate user when the app loads or the route changes
  useEffect(() => {
    (async () => {
      await getUser(); // Load user data from localStorage/sessionStorage
    })();
  }, [getUser, asPath]); // Dependency array listens to `getUser` and `asPath` changes

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Component {...pageProps} />
    </>
  );
}
