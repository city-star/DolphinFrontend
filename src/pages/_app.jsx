import { SidebarProvider } from "@/Context/SidebarContext";
import "../../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <SidebarProvider>
      <Component {...pageProps} />
    </SidebarProvider>
  );
}
