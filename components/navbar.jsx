import { useState } from "react";
import Link from "next/link";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  rem,
  Transition,
  Paper,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faChartLine,
  faHouse,
  faScrewdriverWrench,
  faToolbox,
  faTruckFast,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const useStyles = createStyles((theme) => ({
  dropdown: {
    position: "absolute",
    top: "3rem",
    left: "0rem",
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: "#303841",
    fontSize: theme.fontSizes.lg,
    fontWeight: 500,
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
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
    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: "0.75rem",
    },
  },

  linkActive: {
    "&, &:hover": {
      color: "#FFCD11",
      [theme.fn.smallerThan("sm")]: {
        backgroundColor: "#F5F5F5",
      },
    },
  },
}));

export default function Navbar() {
  const links = [
    {
      id: "1",
      href: "/",
      label: "Home",
    },
    {
      id: "2",
      href: "/equipments",
      label: "Equipments",
    },
    {
      id: "3",
      href: "/signup",
      label: "Get Started",
    },
  ];

  const profileLinks = [
    {
      id: "1",
      href: "/",
      label: "Home",
      icon: <FontAwesomeIcon icon={faHouse} className="mr-2 text-lg" />,
    },
    {
      id: "2",
      href: "/rentals",
      label: "My Rentals",
      icon: <FontAwesomeIcon icon={faTruckFast} className="mr-2 text-lg" />,
    },
    {
      id: "3",
      href: "/equipments",
      label: "Equipments",
      icon: <FontAwesomeIcon icon={faToolbox} className="mr-2 text-lg" />,
    },
  ];

  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].href);
  const { classes, cx } = useStyles();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((dropdownOpen) => !dropdownOpen);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  return (
    <Header height={60} mb={0} className="">
      <Container className="flex justify-between items-center h-full">
        <Link href="/" className="normal-case text-xl font-extrabold">
          CERS
        </Link>
        <Group spacing={5} className={classes.links}>
          <div className="flex">
            <ul className="menu menu-horizontal px-1 flex flex-row">
              {links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className={cx(classes.link, {
                      [classes.linkActive]: active === link.href,
                    })}
                    onClick={(event) => {
                      setActive(link.href);
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href=""
                  className={cx(classes.link)}
                  onClick={toggleDropdown}
                  size="sm"
                  // onMouseLeave={handleMouseLeave}
                  onMouseEnter={handleMouseEnter}
                >
                  <FontAwesomeIcon icon={faUser} />
                </Link>
                {dropdownOpen ? (
                  <div className="absolute top-16 right-40 px-2 py-2 z-50 rounded bg-lightgray border-0 border-b-darkgray shadow-darkgray shadow-lg">
                    <ul>
                      <li className="">
                        <Link href="/owner" className={cx(classes.link)}>
                          <FontAwesomeIcon
                            icon={faChartLine}
                            className="mr-3"
                          />
                          Dashboard
                        </Link>
                      </li>
                      <li className="">
                        <Link
                          href="/owner/rentals"
                          className={cx(classes.link)}
                        >
                          <FontAwesomeIcon
                            icon={faCartShopping}
                            className="mr-3"
                          />
                          My Rentals (Owner)
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/owner/equipments"
                          className={cx(classes.link)}
                        >
                          <FontAwesomeIcon
                            icon={faScrewdriverWrench}
                            className="mr-3"
                          />
                          My Equipments (Owner)
                        </Link>
                      </li>
                      <li>
                        <Link href="/renter" className={cx(classes.link)}>
                          <FontAwesomeIcon
                            icon={faScrewdriverWrench}
                            className="mr-3"
                          />
                          My rentals (Renter)
                        </Link>
                      </li>
                    </ul>
                  </div>
                ) : null}
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
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} style={styles}>
              {links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className={cx(classes.link, {
                      [classes.linkActive]: active === link.href,
                    })}
                    onClick={(event) => {
                      setActive(link.href);
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}
