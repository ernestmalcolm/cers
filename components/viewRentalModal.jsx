// "use client";

import { Text, Stack } from "@mantine/core";
import { supabaseClient } from "@/utils/supabaseClient";

export async function getServerSideProps() {
  const { data, error } = await supabaseClient
    .from("rentals")
    .select("*")
    // .eq("rental_id", rentalId);
    .order("rental_id");
  console.log("Data", data);
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

export default function ViewRentalModal({ rentalId, rental }) {
  // console.log(rentalId);
  // console.log(rental);
  return (
    <Stack className="flex justify-center text-center mb-6">
      <Text className="text-lg font-bold">Rental details</Text>
      <div className="flex flex-row gap-10 justify-center">
        {/*<Text>{rental.details}</Text>*/}
      </div>
    </Stack>
  );
}
