import { Container, Grid, Typography } from "@mui/material";
import Copyright from "./copyright";
import style from "./home.module.scss";

const Footer = () => {
    return (
        <Container className={style.footerBox} maxWidth="lg" fixed>
            <Grid container direction="column" alignItems="center">
                <Copyright />

                <Grid item xs={12}>
                    <Typography
                        textAlign="center"
                        color="textSecondary"
                        variant="subtitle1"
                    >
                        React | Material UI
                        <br />
                        TypeScript | React Three Fiber | React Spring
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};
export default Footer;
