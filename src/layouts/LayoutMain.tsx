import Footer from "@/components/footer";
import MainNavbar from "@/components/MainNavbar";

export default  function LayoutMain ({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNavbar />
      <main className="flex-grow">{children}</main>
      <Footer/>
    </div>
  );
};

