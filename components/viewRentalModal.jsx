// "use client";

import { Text, Stack } from "@mantine/core";
import { supabaseClient } from "@/utils/supabaseClient";

export async function getServerSideProps({ rental_id }) {
  const { data, error } = await supabaseClient
    .from("rentals")
    .select("*")
    .eq("rental_id", rental_id)
    .single();
  if (error || !data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      rental: data,
    },
  };
}

export default function ViewRentalModal({ rental_id, rental }) {
  console.log("Rental Id", rental_id);
  console.log("Rental", rental);
  return (
    <Stack className="flex justify-center text-center mb-6">
      <Text className="text-lg font-bold">Rental details</Text>
      <div className="flex flex-row gap-10 justify-center">
        {/*<Text>{rental.details}</Text>*/}
      </div>
    </Stack>
  );
}
