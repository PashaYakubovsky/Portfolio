import { createContext } from "react";

export const CasesContext = createContext<{
    changeJobsCases: React.Dispatch<
        React.SetStateAction<JobExperience[]>
    > | null;
    jobCases: JobExperience[] | null;
}>({ changeJobsCases: null, jobCases: null });
