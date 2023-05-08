import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

export async function getStaticProps() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
  );

  const { data } = await supabaseAdmin
    .from("equipments")
    .select("*")
    .order("equipment_id");
  return {
    props: {
      equipments: data,
    },
  };
}

export default function Equipments({ equipments }) {
  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {equipments.map((equipment) => (
          <BlurImage key={equipment.equipment_id} equipment={equipment} />
        ))}
      </div>
    </div>
  );
}

function BlurImage({ equipment }) {
  return (
    <a href={equipment.photo}>
      <div className="rounded-lg bg-gray-200">
        <Image alt="" src={equipment.photo} width={200} height={100} unoptimized />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{equipment.equipment_name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">
        {equipment.equipment_description}
      </p>
    </a>
  );
}
