import Layout from "../components/layout";
import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { supabaseClient } from "@/utils/supabaseClient";
import { ModalsProvider } from "@mantine/modals";

export default function App({ Component, pageProps }) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        // colors: {
        //   orange: "#FFCD11",
        //   darkgray: "#303841",
        //   lightgray: "#F5F5F5",
        //   gray: "#303841bf",
        //   black: "#000000",
        // },
        globalStyles: (theme) => ({
          body: {
            backgroundColor: "F5F5F5",
          },
        }),
      }}
    >
      <ModalsProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ModalsProvider>
    </MantineProvider>
  );
}
