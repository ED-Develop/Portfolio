import Preloader from "../components/common/Preloader/Preloader";
import React, {FC} from "react";

let withSuspense = (Component: React.ComponentType) => {
    const ContainerComponent: FC = (props) => {
        return (
            <React.Suspense fallback={<Preloader/>}>
                <Component {...props}/>
            </React.Suspense>
        )
    };

    return ContainerComponent;
};

export default withSuspense;