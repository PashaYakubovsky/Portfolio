import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { JobExperience } from "./homev2";
import { getLinkPreview } from "link-preview-js";
import { Tooltip, TooltipProps, styled, tooltipClasses } from "@mui/material";

// import { useNavigate } from "react-router-dom";

export interface ILinkData {
    url: string;
    mediaType: string;
    contentType: string;
    favicons: string[];
    description: string;
    images: string[];
    siteName: string;
}

export default function ImgMediaCard({
    description,
    name,
    link,
    screenshots,
}: JobExperience) {
    // const navigate = useNavigate();
    const [linkData, changeLinkData] = React.useState<ILinkData>({
        contentType: "",
        mediaType: "",
        favicons: [],
        url: "",
        images: [],
        description: "",
        siteName: "",
    });

    React.useEffect(() => {
        if (link)
            getLinkPreview(link).then((data) => {
                if (data) {
                    changeLinkData((state) => ({
                        ...state,
                        ...(data as ILinkData),
                    }));
                    console.log(data);
                }
            });
    }, []);
    return (
        <Card sx={{ m: 3 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <LightTooltip title="link">
                    <Button
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
