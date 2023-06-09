import { supabase } from "@/utils/supabaseClient";

export async function setNewUser(
  email,
  password,
  name,
  address,
  phoneNumber,
  displayAlertCallback
) {
  const { data, session, user, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        name: name,
      },
    },
  });
  if (!error) {
    window.location.href = "https://cers.vercel.app/signup";
    // window.location.href = "localhost:3000/signup";
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
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (!error) {
    window.location.href = "https://cers.vercel.app/equipments";
    // window.location.href = "http://localhost:3000/equipments";
  }

  console.log(error);
}
