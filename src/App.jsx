import { useState } from "react";
import "./App.css";
import ThemeContext from "./contexts/ThemeContext";
import AppBody from "./layout/AppBody";
import AppHeader from "./layout/AppHeader";
import AppFooter from "./layout/AppFooter";
import LeftSideNavBar from "./layout/LeftSideNavBar";
function App() {
    return (
        <div className="flex h-dvh">
            <div className={`h-full bg-red-300`}>
                <LeftSideNavBar />
            </div>
            <div className={`flex flex-col flex-auto bg-red-50`}>
                <AppHeader />
                <AppBody />
                {/* <AppFooter /> */}
            </div>
        </div>
    );
}

export default App;
