import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import LiveChat from "./Reusables/LiveChat";

// Create a new router instance
const router = createRouter({ routeTree });
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

createRoot(rootElement).render(
  <StrictMode>
    <SpeedInsights />
    <QueryClientProvider client={queryClient} >
      <LiveChat />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
