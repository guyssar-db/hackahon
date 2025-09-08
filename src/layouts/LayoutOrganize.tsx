import Footer from "@/components/footer";
import OrganizerNavbar from "@/components/OrganizerNabar";

export default  function LayoutOrganize ({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <OrganizerNavbar/>
      <main className="flex-grow">{children}</main>
      <Footer/>
    </div>
  );
};

