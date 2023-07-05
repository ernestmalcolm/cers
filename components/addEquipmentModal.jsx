// "use client";

import { AddEquipment, AddRental } from "@/utils/supabase";
import { v4 as uuidv4 } from "uuid";

import { FileInput, NumberInput, Select, TextInput } from "@mantine/core";
import { Text, Group, Button, Stack, Textarea } from "@mantine/core";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddEquipmentModal() {
  const router = useRouter();

  const equipment_id = uuidv4();

  // const equipment_id = 20;
  const [equipmentName, setEquipmentName] = useState("");
  const handleEquipmentName = (e) => setEquipmentName(e.target.value);

  const [equipmentDescription, setEquipmentDescription] = useState("");
  const handleEquipmentDescription = (e) =>
    setEquipmentDescription(e.target.value);

  const [timeUsed, setTimeUsed] = useState();
  const handleTimeUsed = (value) => setTimeUsed(value);

  const [equipmentType, setEquipmentType] = useState("");
  const handleEquipmentType = (value) => setEquipmentType(value);

  const [equipmentLocation, setEquipmentLocation] = useState("");
  const handleEquipmentLocation = (value) => setEquipmentLocation(value);

  const [equipmentPrice, setEquipmentPrice] = useState();
  const handleEquipmentPrice = (value) => setEquipmentPrice(value);

  const [equipmentPhoto, setEquipmentPhoto] = useState();

  let photo;
  let photoname;

  const handleEquipmentPhoto = (e) => {
    photo = e.target.files[0];
    // console.log(photo);
    // console.log(photoname);
  };

  const usageStatus = "available";

  // const photo =
  //   "https://drive.google.com/uc?export=view&id=1StUEuP0OdY4htBrx2t6EQ_0Hmwl1is8-";

  const user_id = "1";

  const handleAddEquipment = async (e) => {
    e.preventDefault();

    await AddEquipment(
      equipment_id,
      equipmentName,
      equipmentDescription,
      timeUsed,
      equipmentType,
      equipmentLocation,
      usageStatus,
      equipmentPrice,
      photo,
      user_id,
      router
    );
    // e.preventDefault();
  };

  return (
    <div className="px-4 pb-6">
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
            onChange={handleEquipmentName}
            radius="md"
          />
          <Textarea
            required
            label="Equipment Description"
            placeholder="Description of your equipment"
            onChange={handleEquipmentDescription}
            radius="md"
            description="Please give a brief of your equipment"
            minRows={4}
          />
          <div className="flex flex-row justify-between">
            <NumberInput
              // defaultValue={24}
              placeholder="Time used"
              label="Usage"
              description="Time the equipment has been used in hours"
              withAsterisk
              className="w-[45%]"
              onChange={handleTimeUsed}
            />
            <Select
              required
              label="Type of the equipment"
              onChange={handleEquipmentType}
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
              onChange={handleEquipmentLocation}
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
              // defaultValue={20000}
              placeholder="Price"
              label="Price"
              description="Price rate per hour"
              withAsterisk
              className="w-[45%]"
              onChange={handleEquipmentPrice}
            />
          </div>
          <input
            type="file"
            // label="Upload photos"
            placeholder="Photos"
            // description="Upload photo(s) of the equipment"
            onChange={handleEquipmentPhoto}
            // multiple
          />
        </Stack>
        <Group position="apart" mt="xl">
          <Button
            type="submit"
            radius="sm"
            className="bg-orange text-darkgray hover:bg-lightgray w-full"
            onClick={handleAddEquipment}
          >
            Update equipment
          </Button>
        </Group>
      </form>
    </div>
  );
}
