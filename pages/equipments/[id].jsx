import { supabaseClient } from "@/utils/supabaseClient";

import { useState, useEffect } from "react";

import RentalModal from "../../components/rentalModal";
import { Modal } from "@mantine/core";

// import { Carousel } from "@mantine/carousel";
import {
  Card,
  Image,
  Text,
  Group,
  createStyles,
  Button,
  getStylesRef,
  rem,
} from "@mantine/core";

export async function getServerSideProps(context) {
  const { id } = context.params;

  const { data, error } = await supabaseClient
    .from("equipments")
    .select("*")
    .eq("equipment_id", id)
    .single();

  if (error || !data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      equipment: data,
    },
  };
}

const useStyles = createStyles((theme) => ({
  imageSection: {
    padding: theme.spacing.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: rem(-0.25),
    textTransform: "uppercase",
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: rem(5),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },

  //carousel styles

  carousel: {
    "&:hover": {
      [`& .${getStylesRef("carouselControls")}`]: {
        opacity: 1,
      },
    },
  },

  carouselControls: {
    ref: getStylesRef("carouselControls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  carouselIndicator: {
    width: rem(4),
    height: rem(4),
    transition: "width 250ms ease",

    "&[data-active]": {
      width: rem(16),
    },
  },
}));

export default function EquipmentPage({ equipment }) {
  const { classes } = useStyles();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [session, setSession] = useState(null);

  // useEffect(() => {
  //   const callback = (event, newSession) => {
  //     if (event === 'SIGNED_IN') {
  //       setSession(newSession);
  //     } else if (event === 'SIGNED_OUT') {
  //       setSession(null);
  //     }
  //   };

  //   // supabaseClient.auth.onAuthStateChange(callback);

  //   // Clean up the subscription
  //   return () => {
  //     // supabaseClient.auth.offAuthStateChange(callback);
  //   };
  // }, []);

  const handleRentClick = () => {
    setIsModalOpen(true);
    // if (session) {
    //   console.log("User is logged in:", session.user);
    // } else {
    //   window.location.href = "/signup";
    // }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card
        withBorder
        radius="md"
        className="laptop:w-3/5 laptop:flex-row laptop:justify-center laptop:items-center laptop:mx-auto laptop:mt-10 laptop:mb-10 laptop:shadow-lg"
      >
        <Card.Section className={classes.imageSection}>
          <Image src={equipment.photo} height="20rem" />
        </Card.Section>

        <Group mt="md" className="flex laptop:flex-row">
          <div className="mr-80">
            <Text fz="xl" className="laptop:font-semibold">
              {equipment.equipment_name}
            </Text>
            <Text fz="sm" c="dimmed" className="">
              {equipment.location}
            </Text>
          </div>
          <div className="flex laptop:gap-2 laptop:flex-col laptop:w-40">
            <div className="flex laptop:justify-center laptop:w-full">
              <Text fz="xl" fw={700}>
                {equipment.price}
              </Text>
              <Text fz="sm" c="dimmed" fw={700}>
                per day
              </Text>
            </div>
            <div className="flex laptop:justify-center laptop:w-full">
              <Button
                radius="md"
                className="flex bg-orange hover:bg-gray"
                onClick={() => handleRentClick()}
              >
                Rent now
              </Button>
            </div>
          </div>
        </Group>

        <Card.Section className={classes.section} mt="md">
          <Text fz="sm" className={classes.label}>
            Description
          </Text>
          <Text fz="sm" c="dimmed" className="laptop:w-full">
            {equipment.equipment_description}
          </Text>
        </Card.Section>
      </Card>

      {isModalOpen && <RentalModal onClose={handleModalClose} />}
    </>
  );
}
