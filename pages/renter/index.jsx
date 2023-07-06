"use client";

import Image from "next/image";
import { supabaseClient } from "@/utils/supabaseClient";
import { Badge, Button, Card, Group, Text } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faCheck,
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
import CancelRentalModal from "@/components/cancelRentalModal";
import ConfirmRentalModal from "@/components/confirmRentalModal";
import Link from "next/link";
import ViewRentalModal from "@/components/viewRentalModal";

export async function getServerSideProps({ req }) {
  const { data } = await supabaseClient
    .from("rentals")
    .select("*, equipments(equipment_name,photo)")
    .order("rental_id");
  return {
    props: {
      rentals: data,
    },
  };
}

export default function OwnerRentals({ rentals }) {
  return (
    <div className="mx-auto max-w-2xl py-8 w-3/4 mobile:py-4 mobile:px-6 tablet:max-w-7xl tablet:px-8">
      <div className="grid grid-cols-1">
        {rentals.map((rental) => (
          <RentalRow key={rental.rental_id} rental={rental} />
        ))}
      </div>
    </div>
  );
}

function RentalRow({ rental }) {
  const [selectedRentalId, setSelectedRentalId] = useState(null);

  const handleRentalClick = () => {
    setSelectedRentalId(rental.rental_id);
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
          <div
            className="flex flex-row gap-32 cursor-pointer"
            onClick={() => {
              handleRentalClick();
              openModal({
                title: "",
                children: <ViewRentalModal rentalId={selectedRentalId} />,
                size: "lg",
              });
            }}
          >
            <div>
              <Text className="text-lg font-bold my-2 mx-0 flex text-darkgray">
                {rental.equipments.equipment_name}
              </Text>
              <Badge
                variant="light"
                className="text-xs font-bold w-fit text-darkgray bg-orange bg-opacity-50 mt-2 normal-case"
              >
                Total Rental Price: Tsh.{rental.total_price}/=
              </Badge>
              <Text className="text-lg font-bold my-2 mx-0 flex text-darkgray">
                {rental.details}
              </Text>
            </div>
            <div>
              <Text c="dimmed" className="text-md font-normal mt-2">
                Start date: {rental.start_date}
              </Text>
              <Text c="dimmed" className="text-md font-normal mt-2">
                End date: {rental.end_date}
              </Text>
            </div>
            <div>
              <Text c="dimmed" className="text-md font-normal mt-2 normal-case">
                Status:{" "}
                {rental.inquiry_status === "pending" ? (
                  <Badge
                    variant="light"
                    radius="sm"
                    className="text-xs font-bold w-fit text-orange bg-gray bg-opacity-50 mt-2 uppercase"
                  >
                    {rental.inquiry_status}
                  </Badge>
                ) : rental.inquiry_status === "rented" ? (
                  <Badge
                    variant="light"
                    radius="sm"
                    className="text-xs font-bold w-fit text-green bg-gray bg-opacity-50 mt-2 uppercase"
                  >
                    {rental.inquiry_status}
                  </Badge>
                ) : rental.inquiry_status === "cancelled" ? (
                  <Badge
                    variant="light"
                    radius="sm"
                    className="text-xs font-bold w-fit text-red bg-gray bg-opacity-50 mt-2 uppercase"
                  >
                    {rental.inquiry_status}
                  </Badge>
                ) : (
                  // Handle other status values here
                  <Badge
                    variant="light"
                    radius="sm"
                    className="text-xs font-bold w-fit text-orange bg-gray bg-opacity-50 mt-2 uppercase"
                  >
                    {rental.inquiry_status}
                  </Badge>
                )}
              </Text>
            </div>
          </div>
        </Group>
      </Card>
    </div>
  );
}
