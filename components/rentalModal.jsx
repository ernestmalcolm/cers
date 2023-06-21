import { AddRental } from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { Select } from "@mantine/core";
import { Text, Group, Button, Stack, Textarea } from "@mantine/core";
import { useState } from "react";
import { DateInput } from "@mantine/dates";

export default function RentalModal({onClose}) {
  const currentDate = new Date();
  const [startDate, setStartDate] = useState(currentDate);

  const [endDate, setEndDate] = useState(currentDate);

  const [locationValue, setLocation] = useState("");

  const [detailsValue, setDetails] = useState("");

  const [inquiryStatus, setInquiryStatus] = useState("pending");

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
      user_id
    );

    // Clear form fields
    // setStartDate(new Date());
    // setEndDate(new Date());
  };

  return (
    <div className="z-50 absolute top-24 laptop:top-32 left-16 laptop:left-1/4 p-10 w-4/5 laptop:w-2/5 bg-lightgray rounded shadow-lg border-black">
      <FontAwesomeIcon
        icon={faXmark}
        className="absolute right-6 top-3 font-semibold text-xl text-darkgray"
        onClick={onClose}
      />
      <form className="w-full">
        <Text size="lg" weight={500} className="flex justify-center mb-5">
          Please fill inquiry details
        </Text>
        <Stack>
          <div className="flex flex-col laptop:flex-row laptop:justify-between">
            <DateInput
              required
              //   value={startDate}
              minDate={new Date()}
              onChange={handleStartDate}
              label="Start date"
              placeholder="Start date"
              className="laptop:w-[45%]"
            />
            <DateInput
              required
              //   value={endDate}
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
