import { useState } from "react";
import Link from "next/link";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  links: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(10)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: "#303841",
    fontSize: theme.fontSizes.lg,
    fontWeight: 500,
    "&:hover": {
      color: "#FFCD11",
    },
  },
  link2: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(10)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: "#303841",
    fontSize: theme.fontSizes.lg,
    fontWeight: 500,
    backgroundColor: "#FFCD11",
    "&:hover": {
      backgroundColor: "#F5F5F5",
    },
  },

  linkActive: {
    "&, &:hover": {
      color: "#FFCD11",
    },
  },
}));

export default function Navbar() {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes, cx } = useStyles();

  const links = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/equipments",
      label: "Equipments",
    },
    // {
    //   href: "/register",
    //   label: "Get Started",
    // },
  ];

  return (
    <Header height={60} mb={0}>
      <Container className="flex justify-between items-center h-full">
        <Link href="/" className="normal-case text-xl font-extrabold">CERS</Link>
        <Group spacing={5} className={classes.links}>
          <div className="flex">
            <ul className="menu menu-horizontal px-1 flex flex-row">
              {links.map((link) => (
                <li>
                  <Link href={link.href} className={classes.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/register" className={classes.link2}>
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />
      </Container>
    </Header>
  );
}
