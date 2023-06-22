import { supabaseClient } from "@/utils/supabaseClient";
import {
  Card,
  Text,
  Group,
} from "@mantine/core";

export async function getServerSideProps(context) {
  const { id } = context.params;

  const { data, error } = await supabaseClient
    .from("rentals")
    .select("*")
    .eq("rental_id", id)
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

export default function EquipmentPage({ rental }) {
  return (
    <>
      <Card
        withBorder
        radius="md"
        className="laptop:w-3/5 laptop:flex-row laptop:justify-center laptop:items-center laptop:mx-auto laptop:mt-10 laptop:mb-10 laptop:shadow-lg"
      >
        <Group mt="md" className="flex laptop:flex-row">
          <div className="mr-80">
            <Text fz="xl" className="laptop:font-semibold">
              {rental.start_date}
            </Text>
            <Text fz="sm" c="dimmed" className="">
              {rental.location}
            </Text>
          </div>
          <div className="flex laptop:gap-2 laptop:flex-col laptop:w-40">
            <div className="flex laptop:justify-center laptop:w-full">
              <Text fz="xl" fw={700}>
                {rental.totalprice}
              </Text>
            </div>
          </div>
        </Group>
      </Card>
    </>
  );
}
