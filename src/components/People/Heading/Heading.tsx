import React from "react";
import style from '../People.module.css';
import TabsNavigation from "../../common/TabsNavigation/TabsNavigation";

const BASE_URL = '/people';

const Heading = () => {
    const navItems = [
        {title: 'All People', href: BASE_URL, exact: true},
        {title: 'New People', href: `${BASE_URL}/new`},
        {title: 'Friends', href: `${BASE_URL}/friends`},
    ];

    return (
        <div className={style.heading}>
            <h1>Your Friends</h1>
            <TabsNavigation navItems={navItems}/>
        </div>
    )
}

export default Heading;