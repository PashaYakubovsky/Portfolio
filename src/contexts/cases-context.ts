import React from "react";

export const CasesContext = React.createContext<{
    changeJobsCases: React.Dispatch<
        React.SetStateAction<JobExperience[]>
    > | null;
    jobCases: JobExperience[] | null;
}>({ changeJobsCases: null, jobCases: null });
