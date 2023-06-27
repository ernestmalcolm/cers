"use client";

import Image from "next/image";
import { supabaseClient } from "@/utils/supabaseClient";
import Link from "next/link";

export async function getServerSideProps() {
  const { data } = await supabaseClient
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
    <div className="mx-auto max-w-2xl py-8 px-10 mobile:py-4 mobile:px-6 tablet:max-w-7xl tablet:px-8">
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 mobile:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 laptop:gap-x-8">
        {equipments.map((equipment) => (
          <EquipmentImage key={equipment.equipment_id} equipment={equipment} />
        ))}
      </div>
    </div>
  );
}

function EquipmentImage({ equipment }) {
  return (
    <div>
      <Link href={`/equipments/${equipment.equipment_id}`}>
        <div className="rounded-lg bg-gray-200">
          <Image
            alt=""
            src={equipment.photo}
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>
        <h3 className="mt-4 font-bold text-gray-900">
          {equipment.equipment_name}
        </h3>
        <p className="mt-1 font-normal text-sm text-gray-700 truncate">
          {equipment.equipment_description}
        </p>
      </Link>
    </div>
  );
}
