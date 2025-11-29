import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-react-components/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
        // Auto-import d
        AutoImport({
          imports: [
            "react",
            "react-router-dom",
            {
              "@/components/ui/layout": [
                // Shadcn components auto-import
                
                "Button",
                "NavigationMenu",
                "NavigationMenuList",
                "NavigationMenuItem",
                "NavigationMenuContent",
                "NavigationMenuTrigger",
                "NavigationMenuLink",
                "NavigationMenuIndicator",
                "NavigationMenuViewport",
              ],
            },
          ],
          dts: "./src/auto-imports.d.ts",
        }),
        Components({
          local: true,
          dts: true,
          include: [/\.tsx$/],
          exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.next[\\/]/],
        }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
