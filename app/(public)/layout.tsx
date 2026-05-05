import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Toaster } from "react-hot-toast";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { borderRadius: "8px", background: "#1A202C", color: "#fff", fontSize: "14px" },
          success: { style: { background: "#3563E9" } },
          error:   { style: { background: "#ED3F3F" } },
        }}
      />
    </>
  );
}
