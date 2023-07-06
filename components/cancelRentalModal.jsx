"use client";

import { Text, Button, Stack, Modal } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { supabaseClient } from "@/utils/supabaseClient";
import { notifications } from "@mantine/notifications";

export default function CancelRentalModal({ rental_id }) {
  const handleCancelRental = async () => {
    const { data, error } = await supabaseClient
      .from("rentals")
      .update({ inquiry_status: "cancelled" })
      .eq("rental_id", rental_id);
    if (error) {
      notifications.show({
        title: "Error cancelling rental",
        message: "Error cancelling rental",
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.lightgray,
            borderColor: theme.colors.red,

            "&::before": { backgroundColor: theme.colors.red },
          },

          title: { color: theme.colors.red },
          description: { color: theme.colors.red },
          closeButton: {
            color: theme.colors.red,
            "&:hover": { backgroundColor: theme.colors.lightgray },
          },
        }),
      });
    } else {
      notifications.show({
        title: "Successfully cancelled the rental",
        message: "Successful cancelled the rental",
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.lightgray,
            borderColor: theme.colors.green,

            "&::before": { backgroundColor: theme.colors.green },
          },

          title: { color: theme.colors.green },
          description: { color: theme.colors.green },
          closeButton: {
            color: theme.colors.green,
            "&:hover": { backgroundColor: theme.colors.lightgray },
          },
        }),
      });
    }
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
          onClick={handleCancelRental}
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
