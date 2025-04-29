import "../css/app.css";
import "./bootstrap";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./Context/ThemeContext";
import { SidebarProvider } from "./Context/SidebarContext";
import "@fontsource/inter";

createInertiaApp({
    title: (title) => `${title}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <SidebarProvider>
                <ThemeProvider>
                    <App {...props} />
                </ThemeProvider>
            </SidebarProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
