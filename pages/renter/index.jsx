import { supabaseClient } from "@/utils/supabaseClient";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faToolbox,
  faTruckFast,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";

import { Button, Table, Text } from "@mantine/core";
import Image from "next/image";

export async function getServerSideProps({ req }) {
  const { data } = await supabaseClient
    .from("rentals")
    .select("*, equipments(equipment_name, equipment_description)")
    .order("rental_id");
  return {
    props: {
      rentals: data,
    },
  };
}

export default function RentalPage({ rentals }) {
  const links = [
    {
      id: "1",
      href: "/",
      label: "Home",
      icon: <FontAwesomeIcon icon={faHouse} className="mr-2 text-lg" />,
    },
    {
      id: "2",
      href: "/rentals",
      label: "My Rentals",
      icon: <FontAwesomeIcon icon={faTruckFast} className="mr-2 text-lg" />,
    },
    {
      id: "3",
      href: "/equipments",
      label: "Equipments",
      icon: <FontAwesomeIcon icon={faToolbox} className="mr-2 text-lg" />,
    },
  ];
  return (
    <div className="flex flex-row w-full">
      <div className="flex flex-col w-[15%] h-screen text-darkgray bg-lightgray shadow shadow-gray">
        <div className="px-8 py-4 flex flex-row items-center justify-center">
          <Link href="/" className="text-lg font-semibold flex">
            CERS
          </Link>
        </div>
        <nav className="flex-grow px-4 pb-4 text-center justify-center">
          <Image
            src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            alt="Avatar user"
            width={200}
            height={200}
            className="w-2/5 rounded-full mx-auto"
          />
          <Text className="mt-2 font-semibold text-xl">Ernest</Text>
          <Text c="dimmed">Renter</Text>
          <ul className="flex flex-col text-center justify-center mx-auto my-6">
            {links.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  className="mx-4 mb-4 text-xl font-medium flex items-center px-2 py-2 hover:text-orange rounded"
                >
                  {link.icon}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          href="/signup"
          className="mx-6 mb-4 text-xl font-medium flex items-center px-2 py-2 hover:text-orange rounded"
        >
          <FontAwesomeIcon icon={faRightFromBracket} className="mr-2 text-lg" />
          Logout
        </Link>
      </div>

      <div className="text-darkgray text-xl w-full flex  laptop:px-auto">
        <Table verticalSpacing="xs">
          <thead>
            <tr>
              <th>Equipment Name</th>
              <th>Inquiry Status</th>
              <th>Start date</th>
              <th>End date</th>
              <th>Location</th>
            </tr>
          </thead>
          {rentals.map((rental) => (
            <RentalTable key={rental.rental_id} rental={rental} />
          ))}
        </Table>
      </div>
    </div>
  );
}

export function RentalTable({ rental }) {
  return (
    <tbody>
      <tr>
        <td>
          <Link href={`/rentals/${rental.rental_id}`}>
            {rental.equipments.equipment_name}
          </Link>
        </td>
        <td>
          <Link href={`/rentals/${rental.rental_id}`}>
            {rental.inquiry_status}
          </Link>
        </td>
        <td>
          <Link href={`/rentals/${rental.rental_id}`}>{rental.start_date}</Link>
        </td>
        <td>
          <Link href={`/rentals/${rental.rental_id}`}>{rental.end_date}</Link>
        </td>
        <td>
          <Link href={`/rentals/${rental.rental_id}`}>{rental.location}</Link>
        </td>
      </tr>
    </tbody>
  );
}
