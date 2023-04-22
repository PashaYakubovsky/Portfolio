// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from "./app.module.scss";
import { Routes, Route } from "react-router-dom";
import HomeV2 from "src/home/homev2";
import { ThemeContext, whiteThemeColors } from "src/сontext/theme-context";

import { NoMatch } from "src/no-match/no-match";
import { useState } from "react";
import StickyHeader from "src/sticky-header/sticky-header";
import ScrollWave from "src/scroll-wave/scroll-wave";

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
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </ThemeContext.Provider>
    );
};

export default App;
