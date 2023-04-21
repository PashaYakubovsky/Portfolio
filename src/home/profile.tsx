import { useContext } from "react";
import style from "./profile.module.scss";
import { ThemeContext } from "src/сontext/theme-context";

const Profile = () => {
    const context = useContext(ThemeContext);
    return (
        <div
            className={style.profile}
            style={{ backgroundColor: context?.bgColor }}
        >
            <h2 style={{ color: context?.textColor }}>Привіт</h2>
        </div>
    );
};

export default Profile;
