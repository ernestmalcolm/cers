import { supabaseClient } from "@/utils/supabaseClient";

export async function RegisterUser(
  email,
  password,
  name,
  address,
  phoneNumber,
  role,
  displayAlertCallback
) {
  const { data, session, user, error } = await supabaseClient.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        name: name,
        role: role,
      },
    },
  });
  if (!error) {
    // window.location.href = "https://cers.vercel.app/signup";
    window.location.href = "http://localhost:3000/signup";
  } else {
    if (error.message.charAt(0) === "T") {
      displayAlertCallback(error.message);
    } else {
      displayAlertCallback(
        "User is not registered, check the email and password"
      );
    }
    console.log(error);
  }
}

export async function LoginUser(email, password) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (!error) {
    // window.location.href = "https://cers.vercel.app/equipments";
    window.location.href = "http://localhost:3000/equipments";
  } else {
    console.log(error);
  }
}

export async function AddRental(
  rental_id,
  start_date,
  end_date,
  location,
  inquiry_status,
  total_price,
  details,
  equipment_id,
  user_id
) {
  const { data, error } = await supabaseClient.from("rentals").insert([
    {
      rental_id,
      start_date,
      end_date,
      location,
      inquiry_status,
      total_price,
      details,
      equipment_id,
      user_id,
    },
  ]);

  if (error) {
    console.error("Error inserting rental:", error.message);
    return;
  } else {
    console.log("Rental inserted successfully:", data);
  }

  window.location.href = "http://localhost:3000/rentals";
}
