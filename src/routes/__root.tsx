import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { useEffect } from "react";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { useVocab } from "@/lib/store";
import appCss from "../styles.css?url";

const APP_NAME = "Слово";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content: "Тренажер англійських слів: картки, тест і інтервальне повторення.",
      },
      { name: "theme-color", content: "#0c0c0e" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="uk" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <StoreHydrator />
          <Outlet />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

function StoreHydrator() {
  useEffect(() => {
    let live = true;
    void Promise.resolve(useVocab.persist.rehydrate()).finally(() => {
      if (live) useVocab.setState({ hydrated: true });
    });
    return () => {
      live = false;
    };
  }, []);
  return null;
}
