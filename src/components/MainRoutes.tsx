import React from "react";
import AsideContainer from "./Aside/AsideContainer";
import {Redirect, Route, Switch} from "react-router-dom";
import ProfileContainer from "./Profile/ProfileContainer";
import Projects from "./Projects/Projects";
import withSuspense from "../hoc/withSuspense";

const DialogsContainer = withSuspense(React.lazy((): Promise<any> => {
    return import ("../components/Dialogs/DialogsContainer");
}));
const People = withSuspense(React.lazy((): Promise<any> => {
    return import ("../components/People/People");
}));
const Edit = withSuspense(React.lazy((): Promise<any> => {
    return import ("../components/Edit/Edit");
}));

const MainRoutes = () => {
    return (
        <main className='app-main'>
            <AsideContainer/>
            <div className='app-content'>
                <Switch>
                    <Route exact path='/' render={() => <Redirect to='/profile'/>}/>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/messages/:userId?' render={() => <DialogsContainer/>}/>
                    <Route path='/people' render={() => <People/>}/>
                    <Route path='/projects' render={() => <Projects/>}/>
                    <Route path='/edit' render={() => <Edit/>}/>
                </Switch>
            </div>
        </main>
    )
};

export default MainRoutes;
