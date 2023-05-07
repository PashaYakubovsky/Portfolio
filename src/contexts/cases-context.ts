import React from "react";

export const CasesContext = React.createContext<{
    changeJobsCases: React.Dispatch<
        React.SetStateAction<JobExperience[]>
    > | null;
    jobCases: JobExperience[] | null;
    showJobs: boolean[];
    changeShowJobs: React.Dispatch<React.SetStateAction<boolean[]>>;
}>({
    changeJobsCases: null,
    jobCases: [],
    changeShowJobs: null,
    showJobs: [],
});
