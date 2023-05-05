import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="flex min-h-fit flex-row justify-between p-10">
      <div className="w-1/2 flex flex-col">
        <h1>Search and rent construction equipments with a few clicks!!</h1>
        <p>
          CERS provides easy and reliable access to construction equipments
          available for rent in the marketplace at any time
        </p>
        <div>
          <button>Get started</button>
          <button>Login as guest</button>
        </div>
      </div>
      <div className="w-1/2 flex flex-col">
        <div>
          <button>Get started</button>
          <button>Login as guest</button>
        </div>
      </div>
    </div>
  );
}
