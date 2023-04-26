import "@/styles/globals.css";
import { DataProvider } from "@/context/provider";

export default function App({ Component, pageProps }) {
  return (
    <div className="mainComp">
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </div>
  );
}
