"use client";

import { AddRental } from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";

import { FileInput, NumberInput, Select, TextInput } from "@mantine/core";
import { Text, Group, Button, Stack, Textarea } from "@mantine/core";
import { useState } from "react";
import { DateInput } from "@mantine/dates";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function EditEquipmentModal() {
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

  const { data: session } = useSession();

  console.log(session);

  return (
    <div className="px-4 pb-4">
      <form className="w-full">
        <Text
          size="lg"
          weight={600}
          className="flex text-xl justify-center mb-5"
        >
          Please fill the equipments details
        </Text>
        <Stack>
          <TextInput
            required
            label="Equipment Name"
            placeholder="Name of the equipment"
            // onChange={handleEquipmentName}
            radius="md"
          />
          <Textarea
            required
            label="Equipment Description"
            placeholder="Description of your equipment"
            // onChange={handleEquipmentDescription}
            radius="md"
            description="Please give a brief of your equipment"
            minRows={4}
          />
          <div className="flex flex-row justify-between">
            <NumberInput
              defaultValue={24}
              placeholder="Your age"
              label="Usage"
              description="Time the equipment has been used in hours"
              withAsterisk
              className="w-[45%]"
            />
            <Select
              required
              label="Type of the equipment"
              // onChange={handleType}
              placeholder="Type"
              data={[
                "Excavator",
                "Truck",
                "Loader",
                "Drum",
                "Compactor",
                "Grader",
              ]}
              radius="md"
              className="w-[45%]"
            />
          </div>
          <div className="flex flex-row justify-between">
            <Select
              required
              label="Location"
              // onChange={handleEquipmentLocation}
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
              className="w-[45%]"
            />
            <NumberInput
              defaultValue={20000}
              placeholder="Price"
              label="Price"
              description="Price rate per hour"
              withAsterisk
              className="w-[45%]"
            />
          </div>
          <FileInput
            label="Upload photos"
            placeholder="Photos"
            description="Upload photo(s) of the equipment"
            multiple
          />
        </Stack>
      </form>
    </div>
  );
}
