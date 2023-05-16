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

export default function Register() {
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });
  return (
    <div className="bg-registerbg bg-cover min-h-screen flex justify-center items-center ">
      <Paper
        shadow="sm"
        p="md"
        radius="md"
        withBorder
        className="flex justify-center w-full mx-6 py-8 px-4 tablet:w-1/2 laptop:w-1/2"
      >
        <form onSubmit={form.onSubmit(() => {})} className="w-full">
          <Text size="lg" weight={500} className="flex justify-center">
            {upperFirst(type)} into CERS
          </Text>
          <Stack>
            {type === "register" && (
              <Stack>
                <TextInput
                  required
                  label="Name"
                  placeholder="Your name"
                  value={form.values.name}
                  onChange={(event) =>
                    form.setFieldValue("name", event.currentTarget.value)
                  }
                  radius="md"
                />
                <TextInput
                  required
                  label="Address"
                  placeholder="Dar-es-salaam"
                  value={form.values.address}
                  onChange={(event) =>
                    form.setFieldValue("email", event.currentTarget.value)
                  }
                  radius="md"
                />

                <TextInput
                  required
                  label="Phonenumber"
                  placeholder="0742200105"
                  value={form.values.phonenumber}
                  onChange={(event) =>
                    form.setFieldValue("email", event.currentTarget.value)
                  }
                  radius="md"
                />
              </Stack>
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@example.com"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />
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
            >
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </div>
  );
}
