import React from 'react';
import {Transition} from 'react-transition-group';

type PropsType = {
    inProp: boolean
    duration?: number
}

const Fade: React.FC<PropsType> = ({inProp, duration = 300, children}) => {
    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0,
    }

    const transitionStyles = {
        entering: {opacity: 1},
        entered: {opacity: 1},
        exiting: {opacity: 0},
        exited: {opacity: 0},
    };

    return (
        <div>
            <Transition in={inProp} timeout={duration} unmountOnExit>
                {(state: keyof typeof transitionStyles) => (
                    <div style={{
                        ...defaultStyle,
                        ...transitionStyles[state]
                    }}>
                        {children}
                    </div>
                )}
            </Transition>
        </div>
    )
};

export default Fade;