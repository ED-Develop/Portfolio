import React from "react";
import AsideContainer from "./Aside/AsideContainer";
import {Redirect, Route, Switch} from "react-router-dom";
import ProfileContainer from "./Profile/ProfileContainer";
import Projects from "./Projects/Projects";
import withSuspense from "../hoc/withSuspense";
import {Layout} from "antd";
import Preloader from "./common/Preloader/Preloader";

const {Content} = Layout;
const DialogsContainer = withSuspense(React.lazy(() => import ("../components/Dialogs/DialogsContainer")));
const People = withSuspense(React.lazy(() => import ("./People/PeopleContainer")));
const Edit = withSuspense(React.lazy(() => import ("../components/Edit/Edit")));

type PropsType = {
    isAsideCollapsed: boolean
    isFetching: boolean
}

const MainRoutes: React.FC<PropsType> = ({isAsideCollapsed, isFetching}) => {
    return (
        <Layout className='app-main'>
            {isFetching && <Preloader/>}
            <AsideContainer collapsed={isAsideCollapsed}/>
            <Content className='app-content'>
                <Switch>
                    <Redirect exact from='/' to='/profile'/>
                    <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                    <Route path='/messages/:userId?' render={() => <DialogsContainer/>}/>
                    <Route path='/people/:filter?' render={() => <People/>}/>
                    <Route path='/projects' render={() => <Projects/>}/>
                    <Route path='/edit' render={() => <Edit/>}/>
                </Switch>
            </Content>
        </Layout>
    )
};

export default MainRoutes;
