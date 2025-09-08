
import BannerHome from "@/components/ui/bannerHome";
import LayoutMain from "@/layouts/LayoutMain";


export default function Home() {


  return (
    <LayoutMain>
      <div className="min-h-[calc(100vh-65px)] flex flex-col items-center mt-[65px] bg-gray-100">

        {/* Banner */}
        <section className="flex flex-col items-center bg-gray-400 w-full p-5">
          <div className="w-[90%] lg:w-[60%]">
            <BannerHome />
          </div>
        </section>


        {/* popular */}
        <section>

        </section>



      </div>
    </LayoutMain>
  );
}
