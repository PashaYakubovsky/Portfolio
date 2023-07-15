import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import style from "./job-cases.module.scss";
import LightTooltip from "../tooltip/light-tooltip";
import JobExperienceTag from "../tags/job-expirience-tag";
import { animated } from "react-spring";

const ImgMediaCard = React.forwardRef(
    (
        {
            description,
            name,
            link,
            index = 0,
            tooltipsText = "link",
            techStack,
            show,
            changeShow,
        }: JobExperience,
        ref: React.RefObject<HTMLDivElement[]>
    ) => {
        return (
            <animated.div className={style.jobContainer} id={`job-${index}`}>
                <Card
                    ref={(node) => {
                        if (ref?.current) {
                            ref.current[index] = node;
                        }
                    }}
                    onClick={changeShow}
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

                        <div className={style.techStack}>
                            {techStack?.map((tech, index) => (
                                <JobExperienceTag key={index} label={tech} />
                                // <ThreeDButton>{tech}</ThreeDButton>
                            ))}
                        </div>
                    </CardContent>

                    <CardActions>
                        <LightTooltip title={tooltipsText}>
                            <Button
                                sx={{ zIndex: 5 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (link) window.open(link);
                                }}
                                size="small"
                            >
                                Watch More
                            </Button>
                        </LightTooltip>
                    </CardActions>
                </Card>
            </animated.div>
        );
    }
);

export default ImgMediaCard;
