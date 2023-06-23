import { supabaseClient } from "@/utils/supabaseClient";

import Link from "next/link";

import { Table } from "@mantine/core";

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
  return (
    <div className="text-darkgray laptop:px-auto">
      <div>
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

function RentalTable({ rental }) {
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
