"use client";

import Image from "next/image";
import { supabaseClient } from "@/utils/supabaseClient";
import Link from "next/link";
import { Badge, Button, Card, Group, Text } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { openModal } from "@mantine/modals";
import RentalModal from "@/components/rentalModal";
import AddEquipmentModal from "@/components/addEquipmentModal";
import EditEquipmentModal from "@/components/editEquipmentModal";
import DeleteEquipmentModal from "@/components/deleteEquipmentModal";
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
    <div className="mx-auto max-w-2xl py-8 w-3/4 mobile:py-4 mobile:px-6 tablet:max-w-7xl tablet:px-8">
      <Button
        type="submit"
        radius="sm"
        className="bg-orange text-darkgray hover:bg-lightgray mb-4 text-lg font-bold"
        onClick={() =>
          openModal({
            title: "",
            children: <AddEquipmentModal />,
            size: "xl",
          })
        }
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Add Equipment
      </Button>
      <div className="grid grid-cols-1">
        {equipments.map((equipment) => (
          <OwnerEquipment key={equipment.equipment_id} equipment={equipment} />
        ))}
      </div>
    </div>
  );
}

function OwnerEquipment({ equipment }) {
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);

  const handleDeleteClick = (selectedEquipmentId) => {
    setSelectedEquipmentId(equipment.equipment_id);
  };

  return (
    <div>
      <Card shadow="sm" radius="sm" withBorder className="laptop:h-fit">
        <Group
          position="left"
          mt="md"
          mb="xs"
          className="flex laptop:flex-row laptop:justify-between"
        >
          <div className="flex">
            <Image
              src={equipment.photo}
              height={80}
              width={160}
              className="rounded-lg"
              alt={equipment.equipment_name}
            />
            <Text className="text-lg font-bold my-2 mx-6 flex flex-col text-darkgray">
              {equipment.equipment_name}
              <Badge
                variant="light"
                className="text-xs font-bold w-fit text-darkgray bg-orange bg-opacity-50 mt-2 normal-case"
              >
                Tsh.{equipment.price}/day
              </Badge>
              <Text c="dimmed" className="text-md font-normal mt-2">
                Time used: {equipment.time_used} hours
              </Text>
            </Text>
          </div>
          <div className="flex flex-col laptop:flex-row laptop:justify-between gap-4">
            <Button
              mt="md"
              radius="sm"
              className="bg-orange text-darkgray hover:bg-lightgray my-4 text-lg font-bold"
              onClick={() =>
                openModal({
                  title: "",
                  children: <EditEquipmentModal />,
                  size: "lg",
                })
              }
            >
              <FontAwesomeIcon icon={faPenToSquare} className="mr-4" />
              Edit
            </Button>
            <Button
              radius="sm"
              className="bg-orange text-darkgray hover:bg-lightgray my-4 text-lg font-bold"
              onClick={() => {
                handleDeleteClick(selectedEquipmentId);
                console.log(selectedEquipmentId);
                openModal({
                  title: "",
                  children: (
                    <DeleteEquipmentModal equipment_id={selectedEquipmentId} />
                  ),
                  size: "lg",
                });
              }}
            >
              <FontAwesomeIcon icon={faTrash} className="mr-4" />
              Delete
            </Button>
          </div>
        </Group>
      </Card>
    </div>
  );
}
