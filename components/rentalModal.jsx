import { AddRental } from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";

import { Select } from "@mantine/core";
import { Text, Group, Button, Stack, Textarea } from "@mantine/core";
import { useState } from "react";
import { DateInput } from "@mantine/dates";
import { useRouter } from "next/navigation";

export default function RentalModal() {
  const currentDate = new Date();
  const [startDate, setStartDate] = useState(currentDate);

  const [endDate, setEndDate] = useState(currentDate);

  const [locationValue, setLocation] = useState("");

  const [detailsValue, setDetails] = useState("");

  const [inquiryStatus, setInquiryStatus] = useState("pending");

  const router = useRouter();

  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  //Handling rental details
  const rental_id = uuidv4();

  const handleStartDate = (value) => {
    setStartDate(value);
  };
  const start_date =
    startDate.getFullYear() +
    "-" +
    (startDate.getMonth() + 1) +
    "-" +
    startDate.getDate();

  const handleEndDate = (value) => {
    setEndDate(value);
  };

  const end_date =
    endDate.getFullYear() +
    "-" +
    (endDate.getMonth() + 1) +
    "-" +
    endDate.getDate();

  const dayInMilliseconds = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

  const timeDiff = endDate - startDate; // Difference in days
  const rentalDuration = Math.round(timeDiff / dayInMilliseconds); // Difference in milliseconds
  const total_price = rentalDuration * 2000;

  const handleLocation = (value) => setLocation(value);

  const handleDetails = (e) => setDetails(e.target.value);

  const inquiry_status = inquiryStatus;

  const equipment_id = "1";
  const user_id = "1";

  const handleRental = async (e) => {
    e.preventDefault();

    await AddRental(
      rental_id,
      start_date,
      end_date,
      locationValue,
      inquiry_status,
      total_price,
      detailsValue,
      equipment_id,
      user_id,
      router
    );
  };

  return (
    <div className="px-4 pb-4">
      <form className="w-full">
        <Text
          size="lg"
          weight={600}
          className="flex text-xl justify-center mb-5"
        >
          Please fill inquiry details
        </Text>
        <Stack>
          <div className="flex flex-col laptop:flex-row laptop:justify-between">
            <DateInput
              required
              minDate={new Date()}
              onChange={handleStartDate}
              label="Start date"
              placeholder="Start date"
              className="laptop:w-[45%]"
            />
            <DateInput
              required
              minDate={new Date()}
              onChange={handleEndDate}
              label="End date"
              placeholder="End date"
              className="laptop:w-[45%]"
            />
          </div>
          <Select
            required
            label="Location equipment will be used"
            onChange={handleLocation}
            placeholder="Location"
            data={[
              "Dar-es-salaam",
              "Tanga",
              "Arusha",
              "Mwanza",
              "Dodoma",
              "Morogoro",
            ]}
            radius="md"
          />
          <Textarea
            placeholder="Additional details"
            onChange={handleDetails}
            label="Additional details"
            description="Please give any other details that the owner should be concerned"
            minRows={4}
          />
        </Stack>

        <Group position="apart" mt="xl">
          <Button
            type="submit"
            radius="sm"
            className="bg-orange text-darkgray hover:bg-lightgray w-full"
            onClick={handleRental}
          >
            Send inquiry
          </Button>
        </Group>
      </form>
    </div>
  );
}
