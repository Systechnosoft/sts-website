import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ConsentProvider } from "./consent/ConsentProvider";
import { CookieBanner } from "./consent/CookieBanner";
import { CookiePanel } from "./consent/CookiePanel";
import { TopContactRibbon } from "./layout/TopContactRibbon";
import { LetsTalkDialogHost } from "./contact/LetsTalkDialogHost";

export default function Layout() {
  return (
    <ConsentProvider>
      <div className="min-h-screen flex flex-col w-full">
        <TopContactRibbon />
        <Header />
        <main id="main-content" className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <CookieBanner />
        <CookiePanel />
        <LetsTalkDialogHost />
      </div>
    </ConsentProvider>
  );
}
