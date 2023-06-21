import { supabaseClient } from "../../utils/supabaseClient";

import Link from "next/link";

import { Table } from "@mantine/core";

export async function getServerSideProps({ req }) {
  const { data } = await supabaseClient
    .from("rentals")
    // .select("rentals.*, equipments.equipment_name")
    .select("*, equipments(equipment_name, equipment_description)")
    // .eq("rentals.equipment_id", "equipments.equipment_id")
    .order("rental_id");
  return {
    props: {
      rentals: data,
    },
  };
}

export default function RentalPage({ rentals }) {
//   console.log(rentals);
  return (
    <div className="text-darkgray laptop:px-auto">
      <h1>Your rentals</h1>
      <div>
        <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
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
  const equipment = rental;
//   console.log(equipment);

  return (
    <tbody>
      {/* <Link href={`/rentals/${rental.rental_id}`}> */}
        <tr>
          <td><Link href={`/rentals/${rental.rental_id}`}>{rental.equipments.equipment_name}</Link></td>
          <td><Link href={`/rentals/${rental.rental_id}`}>{rental.inquiry_status}</Link></td>
          <td><Link href={`/rentals/${rental.rental_id}`}>{rental.start_date}</Link></td>
          <td><Link href={`/rentals/${rental.rental_id}`}>{rental.end_date}</Link></td>
          <td><Link href={`/rentals/${rental.rental_id}`}>{rental.location}</Link></td>
        </tr>
      {/* </Link> */}
    </tbody>
  );
}
