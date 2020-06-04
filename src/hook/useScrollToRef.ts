import {MutableRefObject, useEffect} from "react";

export const useScrollToRef = <T extends HTMLElement | null>(ref: MutableRefObject<T>, isScroll: boolean) => {
    useEffect(() => {
        if (isScroll && ref.current) {
            window.scrollTo(0, ref.current.offsetTop + ref.current.clientHeight)
        }
    }, [isScroll, ref]);
};
