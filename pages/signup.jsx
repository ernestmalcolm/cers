"use client";

import { useState } from "react";
import { useToggle, upperFirst } from "@mantine/hooks";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Anchor,
  Stack,
  Select,
} from "@mantine/core";
import { LoginUser, RegisterUser } from "@/utils/supabase";
import { useRouter } from "next/navigation";

export default function Signup() {
  //Handles Register or Login
  const [type, toggle] = useToggle(["login", "register"]);

  //Handles Login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  //Handles Register
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [role, setRole] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("");

  const router = useRouter();

  //Login methods
  const handleLoginEmail = (event) => {
    // form.setFieldValue("password", event.currentTarget.value);
    setLoginEmail(event.target.value);
  };
  const handleLoginPassword = (event) => {
    // form.setFieldValue("password", event.currentTarget.value);
    setLoginPassword(event.target.value);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    await LoginUser(loginEmail, loginPassword, router);
  };

  //Register methods

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleRegisterEmail = (e) => {
    setRegisterEmail(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleRegisterPassword = (e) => {
    setRegisterPassword(e.target.value);
  };
  const handleRole = (value) => {
    setRole(value);
  };

  const displayAlert = (message) => {
    setAlertMessage(message);
    setAlertClassName(
      message.charAt(0) === "U" || message.charAt(0) === "S"
        ? "text-red-500 border-red-500 bg-red-50"
        : "text-green-500 border-green-500 bg-green-50"
    );
  };

  const handleRegisterSubmit = async (e) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/;
    const isValidPassword =
      registerPassword.length > 6 && passwordRegex.test(registerPassword);

    if (!isValidPassword) {
      displayAlert(
        "Signup requires a valid password, should be longer than 6 characters, has a special character, upper case letters and a number"
      );
    } else {
      e.preventDefault();

      await RegisterUser(
        registerEmail,
        registerPassword,
        name,
        address,
        phoneNumber,
        role,
        displayAlert,
        router
      );
    }
  };

  return (
    <div className="bg-registerbg bg-cover min-h-screen flex justify-center items-center rounded ">
      <Paper
        shadow="sm"
        p="md"
        radius="md"
        withBorder
        className="flex justify-center w-full mx-6 py-8 px-4 tablet:w-1/2 laptop:w-1/2"
      >
        <form
          onSubmit={
            type === "register" ? handleRegisterSubmit : handleLoginSubmit
          }
          className="w-full"
        >
          <Text size="lg" weight={500} className="flex justify-center">
            {upperFirst(type)} into CERS
          </Text>
          <Stack>
            {type === "register" ? (
              <Stack>
                <TextInput
                  required
                  label="Name"
                  placeholder="Your name"
                  onChange={handleName}
                  radius="md"
                />
                <TextInput
                  required
                  label="Email"
                  placeholder="hello@example.com"
                  id="email"
                  name="email"
                  onChange={handleRegisterEmail}
                  radius="md"
                />
                <TextInput
                  required
                  label="Address"
                  placeholder="Dar-es-salaam"
                  onChange={handleAddress}
                  radius="md"
                />
                <div className="flex flex-col gap-2 tablet:flex-row tablet:gap-5 laptop:flex-row laptop:gap-10">
                  <TextInput
                    required
                    label="Phonenumber"
                    placeholder="0742200105"
                    onChange={handlePhoneNumber}
                    radius="md"
                    className="w-full tablet:w-1/2"
                  />
                  <Select
                    label="Role"
                    placeholder="Owner/Renter"
                    data={["Owner", "Renter"]}
                    onChange={handleRole}
                    transitionProps={{
                      transition: "pop-top-left",
                      duration: 80,
                      timingFunction: "ease",
                    }}
                    radius="md"
                    withinPortal
                    className="w-full tablet:w-1/2"
                  />
                </div>
                <PasswordInput
                  required
                  label="Password"
                  placeholder="Your password"
                  id="password"
                  name="password"
                  onChange={handleRegisterPassword}
                  radius="md"
                />
              </Stack>
            ) : (
              <Stack>
                <TextInput
                  required
                  label="Email"
                  placeholder="hello@example.com"
                  id="email"
                  name="email"
                  onChange={handleLoginEmail}
                  radius="md"
                />
                <PasswordInput
                  required
                  label="Password"
                  placeholder="Your password"
                  id="password"
                  name="password"
                  onChange={handleLoginPassword}
                  radius="md"
                />
              </Stack>
            )}
          </Stack>

          <Group position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              className="text-darkgray"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button
              type="submit"
              radius="sm"
              className="bg-orange text-darkgray hover:bg-lightgray w-full"
              onChange={() => {
                if (type === "register") {
                  return handleRegisterSubmit();
                } else {
                  return handleLoginSubmit();
                }
              }}
            >
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}
