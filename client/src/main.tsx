import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
// Base styles for media player and provider (~400B).
import '@vidstack/react/player/styles/base.css';
import {BrowserRouter} from "react-router";
import RouterIndex from "@/router/Index.tsx";
import {ThemeProvider} from "@/components/ThemeProvider.tsx";
import {Toaster} from "sonner";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <BrowserRouter>
                <RouterIndex/>
        <Toaster />

            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
)
