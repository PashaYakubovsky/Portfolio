import { Grid, Typography } from "@mui/material";
import Copyright from "../copyright/copyright";
import style from "./footer.module.scss";

const Footer = () => {
    return (
        <div className={style["footer-box"]}>
            <Grid container direction="column" alignItems="center">
                <Copyright />

                <Grid item xs={12}>
                    <Typography
                        textAlign="center"
                        color="textSecondary"
                        variant="subtitle1"
                    ></Typography>
                </Grid>
            </Grid>
        </div>
    );
};
export default Footer;
