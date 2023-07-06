import Layout from "../components/layout";
import "@/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { SessionProvider } from "next-auth/react";

// import Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { supabaseClient } from "@/utils/supabaseClient";
import { ModalsProvider } from "@mantine/modals";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session} supabaseClient={supabaseClient}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colors: {
            orange: "#FFCD11",
            darkgray: "#303841",
            lightgray: "#F5F5F5",
            // gray: "#303841bf",
            black: "#000000",
            red: "#FF0000",
            blue: "#0000FF",
            green: "#3CB043",
          },
          globalStyles: (theme) => ({
            body: {
              backgroundColor: "F5F5F5",
            },
          }),
        }}
      >
        <ModalsProvider>
          <Layout>
            <Notifications />
            <Component {...pageProps} />
          </Layout>
        </ModalsProvider>
      </MantineProvider>
    </SessionProvider>
  );
}
