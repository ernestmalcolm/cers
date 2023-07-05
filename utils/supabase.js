import { supabaseClient } from "@/utils/supabaseClient";

import { notifications } from "@mantine/notifications";

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
    notifications.show({
      title: "Registered successfully",
      message: "User registered successfully",

      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.darkgray,
          borderColor: theme.colors.green,

          "&::before": { backgroundColor: theme.colors.darkgray },
        },

        title: { color: theme.colors.green },
        description: { color: theme.colors.green },
        closeButton: {
          color: theme.colors.green,
          "&:hover": { backgroundColor: theme.colors.darkgray },
        },
      }),
    });
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
    notifications.show({
      title: "Successful login",
      message: "You have logged in successfully",
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.darkgray,
          borderColor: theme.colors.green,

          "&::before": { backgroundColor: theme.colors.darkgray },
        },

        title: { color: theme.colors.green },
        description: { color: theme.colors.green },
        closeButton: {
          color: theme.colors.green,
          "&:hover": { backgroundColor: theme.colors.darkgray },
        },
      }),
    });

    await router.push("/equipments");
  } else {
    notifications.show({
      title: "Login failed",
      message: "Please try again",
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.orange,
          borderColor: theme.colors.darkgray,

          "&::before": { backgroundColor: theme.colors.darkgray },
        },

        title: { color: theme.colors.darkgray },
        description: { color: theme.colors.darkgray },
        closeButton: {
          color: theme.colors.darkgray,
          "&:hover": { backgroundColor: theme.colors.gray },
        },
      }),
    });

    await router.push("/signup");
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
    console.error("Error adding equipment:", error.message);
    notifications.show({
      title: "Error adding rental",
      message: "Error adding rental",
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.lightgray,
          borderColor: theme.colors.red,

          "&::before": { backgroundColor: theme.colors.red },
        },

        title: { color: theme.colors.red },
        description: { color: theme.colors.red },
        closeButton: {
          color: theme.colors.darkgray,
          "&:hover": { backgroundColor: theme.colors.darkgray },
        },
      }),
    });
  } else {
    notifications.show({
      title: "Rental added successfully",
      message: "Rental added successfully",
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.darkgray,
          borderColor: theme.colors.green,

          "&::before": { backgroundColor: theme.colors.darkgray },
        },

        title: { color: theme.colors.green },
        description: { color: theme.colors.green },
        closeButton: {
          color: theme.colors.green,
          "&:hover": { backgroundColor: theme.colors.darkgray },
        },
      }),
    });
    await router.push("/equipments");
  }
}

export async function AddEquipment(
  equipment_id,
  equipment_name,
  equipment_description,
  time_used,
  type,
  location,
  usage_status,
  price,
  photo,
  user_id,
  router
) {
  const { data, error } = await supabaseClient.from("equipments_copy").insert([
    {
      equipment_id,
      equipment_name,
      equipment_description,
      time_used,
      type,
      location,
      usage_status,
      price,
      photo,
      user_id,
    },
  ]);

  if (error) {
    console.log(error);
    notifications.show({
      title: "Error adding equipment",
      message: "Error adding equipment",
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.darkgray,
          borderColor: theme.colors.red,

          "&::before": { backgroundColor: theme.colors.darkgray },
        },

        title: { color: theme.colors.red },
        description: { color: theme.colors.red },
        closeButton: {
          color: theme.colors.red,
          "&:hover": { backgroundColor: theme.colors.darkgray },
        },
      }),
    });
  } else {
    // await router.push("/owner/equipments");
    const { data, error } = await supabaseClient.storage
      .from("cers_fyp")
      .upload(equipment_id + "/", photo);
    if (data) {
      // console.log("success");
      await router.push("/owner/equipments");
      notifications.show({
        title: "Successful added the equipment",
        message: "Successful added the equipment",
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.darkgray,
            borderColor: theme.colors.green,

            "&::before": { backgroundColor: theme.colors.darkgray },
          },

          title: { color: theme.colors.green },
          description: { color: theme.colors.green },
          closeButton: {
            color: theme.colors.green,
            "&:hover": { backgroundColor: theme.colors.darkgray },
          },
        }),
      });
    } else {
      console.log(error);
      notifications.show({
        title: "Error adding the equipment",
        message: "Please clarify and try again",
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.orange,
            borderColor: theme.colors.darkgray,

            "&::before": { backgroundColor: theme.colors.darkgray },
          },

          title: { color: theme.colors.darkgray },
          description: { color: theme.colors.darkgray },
          closeButton: {
            color: theme.colors.darkgray,
            "&:hover": { backgroundColor: theme.colors.gray },
          },
        }),
      });
    }
  }
}
