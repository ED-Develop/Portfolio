import {useEffect, useRef} from "react";

export const useOutsideClick = <R extends Node, C extends Function = Function>(callback: C, deps: Array<any>) => {
    const ref = useRef<R>(null);

    const handleClick = (e: Event) => {
        const target = e.target as Node;

        if (ref.current && !ref.current.contains(target)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, deps);

    return ref;
}