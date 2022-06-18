import {  createContext } from "react";

const modeDataUri = "./constants/modeData.json"

export const UserContext = createContext(
    {
        primaryId: 0,
        secondaryId: 0,
        modeData: () => {
            fetch(modeDataUri)
                .then((res) => res.json())
                .then((data) => UserContext.modeData);
        },
        setPrimary: (val) => { this.primaryId = val % 7; },
        setSecondary: (val) => { this.secondaryId = val % 7; }

    }
);