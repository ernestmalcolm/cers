import Image from "next/image";
import { Inter } from "next/font/google";
import HomeCarousel from "@/components/carousel";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex mt-10 flex-col justify-center w-full px-6 gap-0">
      <div className="w-full flex flex-col mt-1 gap-10 laptop:flex-row mobile:px-10">
        <div className="flex items-center justify-center flex-col text-center">
          <h1 className="font-extrabold text-darkgray text-2xl w-full mb-4 laptop:text-4xl">
            Search and rent construction equipments with a few clicks!!
          </h1>
          <p className="font-light text-gray text-lg laptop:text-2xl">
            CERS provides easy and reliable access to construction equipments
            available for rent in the marketplace at any time
          </p>
        </div>
        <div className="w-full">
          <HomeCarousel className="w-full" />
        </div>
      </div>
    </div>
  );
}
