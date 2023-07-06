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
    .select("*, equipments(equipment_name)")
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

  const handleViewRental = (selectedRentalId) => {
    setSelectedRentalId(rental.rental_id);
    openModal({
      title: "",
      children: <ViewRentalModal rental_id={selectedRentalId} />,
      size: "lg",
    });
  };

  const handleCancelClick = (selectedRentalId) => {
    setSelectedRentalId(rental.rental_id);
    openModal({
      title: "",
      children: <CancelRentalModal rental_id={selectedRentalId} />,
      size: "lg",
    });
  };

  const handleConfirmClick = (selectedRentalId) => {
    setSelectedRentalId(rental.rental_id);
    openModal({
      title: "",
      children: <ConfirmRentalModal rental_id={selectedRentalId} />,
      size: "lg",
    });
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
            className="flex cursor-pointer"
            onClick={() => {
              handleViewRental(rental.rental_id);
            }}
          >
            <Text className="text-lg font-bold my-2 mx-6 flex flex-col text-darkgray">
              {rental.equipments.equipment_name}
              <Badge
                variant="light"
                className="text-xs font-bold w-fit text-darkgray bg-orange bg-opacity-50 mt-2 normal-case"
              >
                Total Rental Price: Tsh.{rental.total_price}/=
              </Badge>
              <Text c="dimmed" className="text-md font-normal mt-2">
                Start date: {rental.start_date} hours
              </Text>
              <Text c="dimmed" className="text-md font-normal mt-2">
                End date: {rental.end_date} hours
              </Text>
              {rental.details}
            </Text>
          </div>
          <div className="flex flex-col laptop:flex-row laptop:justify-between gap-4">
            <Button
              mt="md"
              radius="sm"
              className="bg-orange text-darkgray hover:bg-lightgray my-4 text-lg font-bold"
              onClick={() => handleConfirmClick(rental.rental_id)}
            >
              <FontAwesomeIcon icon={faCheck} className="mr-4" />
              Confirm
            </Button>
            <Button
              radius="sm"
              className="bg-orange text-darkgray hover:bg-lightgray my-4 text-lg font-bold"
              onClick={() => {
                handleCancelClick(rental.rental_id);
              }}
            >
              <FontAwesomeIcon icon={faBan} className="mr-4" />
              Cancel
            </Button>
          </div>
        </Group>
      </Card>
    </div>
  );
}
