import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import path from "path";

export default defineConfig(() => ({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    sourcemap: false,
    minify: "terser" as const,
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true },
      mangle: true,
      format: { comments: false },
    },
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
  optimizeDeps: {
    include: ["@tanstack/react-router"],
  },
  plugins: [
    tanstackRouter({ target: "react" }),
    react(),
    // {
    //   name: "inject-devtools-blocker",
    //   transformIndexHtml(html) {
    //     if (mode === "production") {
    //       return html.replace(
    //         "</body>",
    //         `<script>
    //           (function () {
    //             function detectDevTools() {
    //               const start = performance.now();
    //               debugger;
    //               if (performance.now() - start > 100) {
    //                 window.location.href = "about:blank";
    //               }
    //             }
    //             setInterval(detectDevTools, 1000);
    //             detectDevTools();
    //           })();
    //         </script></body>`
    //       );
    //     }
    //     return html;
    //   },
    // },
  ],
}));
