"use client";

import { Text, Button, Stack, Modal } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { supabaseClient } from "@/utils/supabaseClient";

export default function CancelRentalModal({ equipment_id }) {
  const handleDeleteEquipment = async (rental_id) => {
    const { data, error } = await supabaseClient
      .from("rentals")
      .delete()
      .eq("rental_id", rental_id);
  };

  return (
    <Stack className="flex justify-center text-center mb-6">
      <Text className="text-lg font-bold">
        Are you sure you want to cancel this rental?
      </Text>
      <div className="flex flex-row gap-10 justify-center">
        <Button
          radius="sm"
          className="bg-lightgray text-darkgray hover:bg-lightgray text-lg font-bold"
        >
          <FontAwesomeIcon icon={faXmark} className="mr-4" />
          Yes
        </Button>
        <Button
          radius="sm"
          className="bg-lightgray text-red hover:bg-lightgray text-lg font-bold"
          // onClick={() => handleDeleteEquipment(equipment_id)}
        >
          <FontAwesomeIcon icon={faBan} className="mr-4" />
          No
        </Button>
      </div>
    </Stack>
  );
}
