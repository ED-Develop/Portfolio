import React, {useEffect, useState} from 'react';
import './scss/App.scss';
import {BrowserRouter} from 'react-router-dom';
import {Provider, useDispatch} from 'react-redux';
import {appActions, initializeApp} from './redux/app/app-reducer';
import store from './redux/store';
import ErrorAlert from './components/common/error-alert/ErrorAlert';
import {BaseRoutes} from './components/routing/BaseRoutes';
import {useSelector} from './hook/useSelector';
import {selectGlobalError, selectInitialized} from './redux/app/app-selectors';
import {InitLoader} from './components/common/init-loader/InitLoader';

export type TAside = {
    width: string
    collapsedWidth: string
    isCollapsed: boolean
}

const App = () => {
    const dispatch = useDispatch();
    const initialized = useSelector(selectInitialized);
    const globalError = useSelector(selectGlobalError);

    const [aside, setAside] = useState<TAside>({
        width: '20%',
        collapsedWidth: '11%',
        isCollapsed: false
    });

    const toggleIsAsideCollapsed = () => {
        setAside(aside => ({
            ...aside,
            isCollapsed: !aside.isCollapsed
        }))
    };

    const catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
        dispatch(appActions.setGlobalError(promiseRejectionEvent.reason));
    };

    useEffect(() => {
        dispatch(initializeApp());
        window.addEventListener('unhandledrejection', catchAllUnhandledErrors);

        return () => {
            window.removeEventListener('unhandledrejection', catchAllUnhandledErrors);
        }
    }, []);

    if (!initialized) return <InitLoader/>;

    return (
        <>
            {globalError && <ErrorAlert message={globalError.message}/>}
            <BaseRoutes
                aside={aside}
                toggleIsAsideCollapsed={toggleIsAsideCollapsed}
            />
        </>
    );
}

const AppWithProviders: React.FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    );
};

export default AppWithProviders;
