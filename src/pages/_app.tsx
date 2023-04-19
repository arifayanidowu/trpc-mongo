import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "@/utils/api";

import "@fontsource/barlow-condensed";
import "@/styles/globals.css";
import ThemeWrapper from "@/theme/ThemeWrapper";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeWrapper>
        <Component {...pageProps} />
      </ThemeWrapper>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
