import React from 'react';
import style from '../People.module.scss';
import TabsNavigation from '../../common/tabs-navigation/TabsNavigation';
import {url} from '../../../utils/routeManager';
import {PeopleFilterEnum} from '../PeopleContainer';

const Heading = () => {
    const navItems = [
        {title: 'All people', href: url('people', {filter: null}), exact: true},
        {title: 'New people', href: url('people', {filter: PeopleFilterEnum.New})},
        {title: 'Friends', href: url('people', {filter: PeopleFilterEnum.Friends})},
    ];

    return (
        <div className={style.heading}>
            <h1>Your Friends</h1>
            <TabsNavigation navItems={navItems}/>
        </div>
    )
}

export default Heading;