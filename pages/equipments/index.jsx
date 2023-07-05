"use client";

import Image from "next/image";
import { supabaseClient } from "@/utils/supabaseClient";
import Link from "next/link";
import { Badge, Button, Card, Group, Text } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

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

export default function OwnerEquipments({ equipments }) {
  return (
    <div className="mx-auto max-w-2xl py-8 px-10 mobile:py-4 mobile:px-6 tablet:max-w-7xl tablet:px-8">
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 mobile:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-3 laptop:gap-x-8">
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
      <Card shadow="sm" padding="lg" radius="sm" withBorder>
        <Card.Section>
          <Image
            src={`https://gjghraakekbiiwvlmout.supabase.co/storage/v1/object/public/cers_fyp/${equipment.equipment_id}`}
            height={300}
            width={300}
            // fill
            alt={equipment.equipment_name}
          />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text className="text-lg font-bold">{equipment.equipment_name}</Text>
          <div className="flex flex-row gap-32">
            <Badge
              variant="light"
              radius="sm"
              className="text-xs font-bold w-fit text-darkgray bg-orange bg-opacity-50 mt-2 normal-case"
            >
              Tsh.{equipment.price}/day
            </Badge>
            {equipment.usage_status === "available" ? (
              <Badge
                variant="light"
                radius="sm"
                className="text-xs font-bold w-fit text-gray bg-green bg-opacity-50 mt-2 normal-case"
              >
                {equipment.usage_status}
              </Badge>
            ) : (
              <Badge
                variant="light"
                radius="sm"
                className="text-xs font-bold w-fit text-gray bg-red bg-opacity-50 mt-2 normal-case"
              >
                {equipment.usage_status}
              </Badge>
            )}
          </div>
        </Group>

        <Text size="sm" color="dimmed" truncate>
          {equipment.equipment_description}
        </Text>

        <Button
          variant="light"
          fullWidth
          mt="md"
          radius="md"
          className="bg-orange text-darkgray hover:bg-lightgray mt-4 text-lg font-bold"
        >
          <Link href={`/equipments/${equipment.equipment_id}`}>View more</Link>
        </Button>
      </Card>
    </div>
  );
}
