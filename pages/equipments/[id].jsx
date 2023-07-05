import { supabaseClient } from "@/utils/supabaseClient";

import RentalModal from "../../components/rentalModal";
import {
  Card,
  Image,
  Text,
  Group,
  createStyles,
  Button,
  getStylesRef,
  rem,
  Badge,
} from "@mantine/core";
import { openModal } from "@mantine/modals";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

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
            <Text fz="sm" c="dimmed" className="text-lg">
              <FontAwesomeIcon icon={faLocationDot} className="mr-1" />
              {equipment.location}
            </Text>
          </div>
          <div className="flex laptop:gap-2 laptop:flex-col laptop:w-40">
            <div className="flex laptop:justify-center laptop:w-full">
              <Text
                fz="xl"
                className="text-sm rounded font-semibold p-2 text-darkgray bg-orange bg-opacity-50 mt-2 normal-case"
              >
                Tsh.{equipment.price} per day
              </Text>
            </div>
            <div className="flex laptop:justify-center laptop:w-full">
              <Button
                radius="md"
                className="flex text-darkgray hover:text-lightgray bg-orange hover:bg-gray "
                onClick={() =>
                  openModal({
                    title: "",
                    children: (
                      <RentalModal equipmentId={equipment.equipment_id} />
                    ),
                    size: "lg",
                  })
                }
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
    </>
  );
}
