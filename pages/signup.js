import { useState } from "react";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Anchor,
  Stack,
} from "@mantine/core";
import { LoginUser, setNewUser } from "@/utils/supabase";

export default function SignUp() {
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
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassName, setAlertClassName] = useState("");

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
    await LoginUser(loginEmail, loginPassword);
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

  const displayAlert = (message) => {
    setAlertMessage(message);
    setAlertClassName(
      message.charAt(0) === "U" || message.charAt(0) === "S"
        ? "text-red-500 border-red-500 bg-red-50"
        : "text-green-500 border-green-500 bg-green-50"
    );
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    console.log(registerEmail);

    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/;
    const isValidPassword =
      registerPassword.length > 6 && passwordRegex.test(registerPassword);

    if (!isValidPassword) {
      displayAlert(
        "Signup requires a valid password, should be longer than 6 characters, has a special character, upper case letters and a number"
      );
    } else {
      await setNewUser(
        registerEmail,
        registerPassword,
        name,
        address,
        phoneNumber,
        displayAlert
      );
    }
  };

  return (
    <div className="bg-registerbg bg-cover min-h-screen flex justify-center items-center ">
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
                  label="Email"
                  placeholder="hello@example.com"
                  // value={form.values.email}
                  id="email"
                  name="email"
                  onChange={handleRegisterEmail}
                  // error={form.errors.email && "Invalid email"}
                  radius="md"
                />
                <TextInput
                  required
                  label="Name"
                  placeholder="Your name"
                  // value={form.values.name}
                  onChange={handleName}
                  radius="md"
                />
                <TextInput
                  required
                  label="Address"
                  placeholder="Dar-es-salaam"
                  // value={form.values.address}
                  onChange={handleAddress}
                  radius="md"
                />
                <TextInput
                  required
                  label="Phonenumber"
                  placeholder="0742200105"
                  // value={form.values.phonenumber}
                  onChange={handlePhoneNumber}
                  radius="md"
                />
                <PasswordInput
                  required
                  label="Password"
                  placeholder="Your password"
                  id="password"
                  name="password"
                  // value={form.values.password}
                  onChange={handleRegisterPassword}
                  // error={
                  //   form.errors.password &&
                  //   "Password should include at least 6 characters"
                  // }
                  radius="md"
                />
              </Stack>
            ) : (
              <Stack>
                <TextInput
                  required
                  label="Email"
                  placeholder="hello@example.com"
                  // value={form.values.email}
                  id="email"
                  name="email"
                  onChange={handleLoginEmail}
                  // error={form.errors.email && "Invalid email"}
                  radius="md"
                />
                <PasswordInput
                  required
                  label="Password"
                  placeholder="Your password"
                  id="password"
                  name="password"
                  // value={form.values.password}
                  onChange={handleLoginPassword}
                  // error={
                  //   form.errors.password &&
                  //   "Password should include at least 6 characters"
                  // }
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

// import AuthForm from './auth-form'
//
// export default function Home() {
//   return (
//     <div className="row">
//       <div className="col-6">
//         <h1 className="header">Supabase Auth + Storage</h1>
//         <p className="">
//           Experience our Auth and Storage through a simple profile management example. Create a user
//           profile and upload an avatar image. Fast, simple, secure.
//         </p>
//       </div>
//       <div className="col-6 auth-widget">
//         <AuthForm />
//       </div>
//     </div>
//   )
// }
