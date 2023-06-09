"use client";

import { Text, Button, Stack, Modal } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { supabaseClient } from "@/utils/supabaseClient";
import { notifications } from "@mantine/notifications";

export default function DeleteEquipmentModal({ equipment_id }) {
  const handleDeleteEquipment = async () => {
    // Check if the equipment is used in any rentals
    const { data: relatedRentals, error: relatedRentalsError } =
      await supabaseClient
        .from("rentals")
        .select("rental_id")
        .eq("equipment_id", equipment_id);

    if (relatedRentalsError) {
      console.log("Error deleting linked rentals", relatedRentalsError.message);
    } else {
      for (const rental of relatedRentals) {
        await supabaseClient
          .from("rentals")
          .delete()
          .eq("rental_id", rental.rental_id);
      }

      // Once related rentals are deleted or if there are no related rentals, proceed to delete the equipment
      const { error: deleteError } = await supabaseClient
        .from("equipments")
        .delete()
        .eq("equipment_id", equipment_id);

      if (deleteError) {
        console.log("Error to delete equipment", deleteError.message);
        notifications.show({
          title: "Error deleting equipment",
          message: "The equipment and related rentals have not been deleted.",
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
        console.log("Equipment deleted successfully");
        notifications.show({
          title: "Equipment Deleted",
          message:
            "The equipment and related rentals have been successfully deleted.",
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
    }
  };

  return (
    <Stack className="flex justify-center text-center mb-6">
      <Text className="text-lg font-bold">
        Are you sure you want to delete this equipment?
      </Text>
      <div className="flex flex-row gap-10 justify-center">
        <Button
          radius="sm"
          className="bg-lightgray text-darkgray hover:bg-lightgray text-lg font-bold"
        >
          <FontAwesomeIcon icon={faXmark} className="mr-4" />
          Cancel
        </Button>
        <Button
          radius="sm"
          className="bg-lightgray text-red hover:bg-lightgray text-lg font-bold"
          onClick={() => handleDeleteEquipment(equipment_id)}
        >
          <FontAwesomeIcon icon={faTrash} className="mr-4" />
          Delete
        </Button>
      </div>
    </Stack>
  );
}
