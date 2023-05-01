import { Chip } from "@mui/material";

const JobExperienceTag = ({ label }: { label: string }) => {
    return (
        <Chip
            label={label ?? ""}
            color="primary"
            variant="outlined"
        />
    );
};

export default JobExperienceTag;
