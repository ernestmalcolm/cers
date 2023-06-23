import { supabaseClient } from "@/utils/supabaseClient";

export async function RegisterUser(
  email,
  password,
  name,
  address,
  phoneNumber,
  role,
  displayAlertCallback,
  router
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
    router.push("/signup");
  } else {
    if (error.message.charAt(0) === "T") {
      displayAlertCallback(error.message);
      window.alert(error.message);
    } else {
      displayAlertCallback(
        "User is not registered, check the email and password"
      );
      window.alert("User is not registered, check the email and password");
    }
    console.log(error);
  }
}

export async function LoginUser(email, password, router) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (!error) {
    console.log("User logged in");
    await router.push("/renter");
  } else {
    console.log(error.message);
    window.alert(error.message);
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
  user_id,
  router
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
    window.alert("Error inserting rental:", error.message);
    return;
  } else {
    console.log("Rental inserted successfully:", data);
    window.alert("Rental inserted successfully:", data);
  }

  router.push("/rentals");
}
