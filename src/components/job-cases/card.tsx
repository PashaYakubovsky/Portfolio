import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";
import style from "./job-cases.module.scss";

const ImgMediaCard = React.forwardRef(
    (
        {
            description,
            name,
            link,
            index = 0,
            tooltipsText = "link",
        }: JobExperience,
        ref: any
    ) => {
        return (
            <Card
                ref={(node) => {
                    if (ref?.current) {
                        ref.current[index] = node;
                    }
                }}
                onMouseMove={(e) => {
                    e.preventDefault();
                    if (Array.isArray(ref?.current)) {
                        const card = ref?.current[index];
                        const rect = card.getBoundingClientRect(),
                            x = e.clientX - rect.left,
                            y = e.clientY - rect.top;

                        card.style.setProperty("--mouse-x", `${x}px`);
                        card.style.setProperty("--mouse-y", `${y}px`);
                    }
                }}
                className={style["job-case"]}
            >
                <CardContent
                    sx={{
                        height: "60%",
                        overflow: "hidden",
                    }}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                </CardContent>

                <CardActions>
                    <LightTooltip title={tooltipsText}>
                        <Button
                            sx={{ zIndex: 5 }}
                            onClick={() => link && window.open(link)}
                            size="small"
                        >
                            Watch More
                        </Button>
                    </LightTooltip>
                </CardActions>
            </Card>
        );
    }
);

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: "rgba(0, 0, 0, 0.87)",
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}));

export default ImgMediaCard;
