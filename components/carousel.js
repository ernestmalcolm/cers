import { Carousel } from "@mantine/carousel";
// import { useMediaQuery } from '@mantine/hooks';
import { createStyles, Paper, useMantineTheme, rem } from "@mantine/core";

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
}));

function Card({ image, title, category }) {
  const { classes } = useStyles();

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    ></Paper>
  );
}

const data = [
  {
    image:
      "https://drive.google.com/uc?export=view&id=1StUEuP0OdY4htBrx2t6EQ_0Hmwl1is8-",
    title: "Best forests to visit in North America",
    category: "nature",
  },
  {
    image:
      "https://drive.google.com/uc?export=view&id=1_WUdd3TAgCN3wwIloOz2Y_JQnGtQ9Eng",
    title: "Hawaii beaches review: better than you think",
    category: "beach",
  },
  {
    image:
      "https://drive.google.com/uc?export=view&id=1pJAkaFZUo90iz_dCpZ-0hSU_X4VQakJK",
    title: "Mountains at night: 12 best locations to enjoy the view",
    category: "nature",
  },
  {
    image:
      "https://drive.google.com/uc?export=view&id=1x9-v6uSNDjeSwF5wLxOXL386ARomA3uB",
    title: "Aurora in Norway: when to visit for best experience",
    category: "nature",
  },
  {
    image:
      "https://drive.google.com/uc?export=view&id=1JFPlGGkP0UyOrZDANijj1jkcQ11ji_2g",
    title: "Best places to visit this winter",
    category: "tourism",
  },
  {
    image:
      "https://drive.google.com/uc?export=view&id=1tuwOMz5I3x7iIW62-M2saASP75gDZHqh",
    title: "Active volcanos reviews: travel at your own risk",
    category: "nature",
  },
];

export default function HomeCarousel() {
  const theme = useMantineTheme();
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel slideSize="100%" controlsOffset="xs" controlSize="40">
      {slides}
    </Carousel>
  );
}
