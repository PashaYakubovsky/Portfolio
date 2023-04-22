import { Link, Typography } from "@mui/material";

const Copyright = () => {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://github.com/PashaYakubovsky">
                My Github
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
};
export default Copyright;
