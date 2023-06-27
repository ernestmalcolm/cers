import Link from "next/link";
import { Button } from "@mantine/core";
import HomeCarousel from "@/components/homeCarousel";

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
          <Link href="/signup">
            <Button
              type="submit"
              radius="sm"
              className="bg-orange text-darkgray hover:bg-lightgray w-96 h-12 my-10 text-xl font-bold"
            >
              Get Started
            </Button>
          </Link>
        </div>
        <div className="w-full">
          <HomeCarousel className="w-4/5" />
        </div>
      </div>
    </div>
  );
}
