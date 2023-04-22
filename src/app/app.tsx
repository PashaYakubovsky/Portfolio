// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from "./app.module.scss";
import { Routes, Route } from "react-router-dom";
import HomeV2 from "src/pages/home/home-v2";
import { ThemeContext, whiteThemeColors } from "src/contexts/theme-context";

import { NoMatch } from "src/pages/no-match/no-match";
import { useState } from "react";
import StickyHeader from "src/components/sticky-header/sticky-header";
import ScrollWave from "src/components/scroll-wave/scroll-wave";
import Register from "src/pages/register/register";
import SignIn from "src/pages/sign-in/sign-up";
import SignUp from "src/pages/sign-in/sign-up";

export const App = () => {
    const [theme, changeTheme] = useState("white");
    return (
        <ThemeContext.Provider
            value={{ theme, changeTheme, ...whiteThemeColors }}
        >
            <StickyHeader />
            <Routes>
                <Route
                    path="/"
                    element={
                        <ScrollWave>
                            <HomeV2 />
                        </ScrollWave>
                    }
                />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </ThemeContext.Provider>
    );
};

export default App;
