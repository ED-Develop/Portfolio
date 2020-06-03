import {useEffect} from "react";

export const useClearFormAfterSubmit = (isSubmit: boolean, reset: () => void) => {
    useEffect(() => {
        if (isSubmit) {
            reset();
        }
    }, [isSubmit]);
};
