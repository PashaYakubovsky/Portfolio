/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-empty-pattern */
import { Container, Grid } from "@mui/material";
import ImgMediaCard from "./card";
import { LegacyRef, forwardRef, useContext, useRef } from "react";
import { CasesContext } from "src/contexts/cases-context";

const JobsCases = forwardRef(({}: {}, ref: LegacyRef<HTMLElement>) => {
    const { jobCases } = useContext(CasesContext);
    const refs = useRef<HTMLDivElement[]>([]);

    return (
        <main ref={ref}>
            <Container sx={{ py: 8, mt: "100vh" }} maxWidth="md">
                <Grid
                    container
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "2vw",
                    }}
                    spacing={2}
                >
                    {jobCases?.map((jobCase, index) => (
                        <ImgMediaCard ref={refs} index={index} {...jobCase} />
                    ))}
                </Grid>
            </Container>
        </main>
    );
});

export default JobsCases;
