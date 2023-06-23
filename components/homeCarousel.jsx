import { Carousel } from "@mantine/carousel";
import {
  createStyles,
  Paper,
  useMantineTheme,
  rem,
  getStylesRef,
} from "@mantine/core";
import Image from "next/image";

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(400),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
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

function HomeCard({ image, title, category }) {
  const { classes } = useStyles();

  return (
    <Paper shadow="md" p="xl" radius="md" className={classes.card}></Paper>
  );
}

const data = [
  {
    image:
      "https://drive.google.com/uc?export=view&id=1StUEuP0OdY4htBrx2t6EQ_0Hmwl1is8-",
    title: "Best forests to visit in North America",
    alt: "Equipment photos",
  },
  {
    image:
      "https://drive.google.com/uc?export=view&id=1_WUdd3TAgCN3wwIloOz2Y_JQnGtQ9Eng",
    title: "Hawaii beaches review: better than you think",
    alt: "Equipment photos",
  },
  {
    image:
      "https://drive.google.com/uc?export=view&id=1pJAkaFZUo90iz_dCpZ-0hSU_X4VQakJK",
    title: "Mountains at night: 12 best locations to enjoy the view",
    alt: "Equipment photos",
  },
  {
    image:
      "https://drive.google.com/uc?export=view&id=1x9-v6uSNDjeSwF5wLxOXL386ARomA3uB",
    title: "Aurora in Norway: when to visit for best experience",
    alt: "Equipment photos",
  },
  {
    image:
      "https://drive.google.com/uc?export=view&id=1tuwOMz5I3x7iIW62-M2saASP75gDZHqh",
    title: "Active volcanos reviews: travel at your own risk",
    alt: "Equipment photos",
  },
];

export default function HomeCarousel() {
  const theme = useMantineTheme();

  const { classes } = useStyles();
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Image
        src={item.image}
        alt={item.alt}
        width={250}
        height={100}
        className="w-full rounded"
      />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize="100%"
      controlsOffset="xs"
      controlSize="60"
      withIndicators
      loop
      classNames={{
        root: classes.carousel,
        controls: classes.carouselControls,
        indicator: classes.carouselIndicator,
      }}
    >
      {slides}
    </Carousel>
  );
}
