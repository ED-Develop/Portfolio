import {ProjectType} from "../../types/types";

const initialState = {
    projects: [
        {
            title: 'Online store',
            stack: ['React', 'Redux'],
            logo: 'https://us.123rf.com/450wm/natalypaint/natalypaint1704/natalypaint170400066/77108225-web-banner-online-store-with-shopping-bags-concept-online-shopping.jpg?ver=6',
            link: 'https://ed-develop.github.io/online-store/',
            description: 'It’s a replica for Google Sheets. This is SPA without any JavaScript framework. I’ve developed my own framework, using OOP principles. Ideas for this project I\'ve used from a video course.\n'
        },
        {
            title: 'Online store',
            stack: ['React', 'Redux'],
            logo: 'https://us.123rf.com/450wm/natalypaint/natalypaint1704/natalypaint170400066/77108225-web-banner-online-store-with-shopping-bags-concept-online-shopping.jpg?ver=6',
            link: 'https://ed-develop.github.io/online-store/',
            description: 'It’s a replica for Google Sheets. This is SPA without any JavaScript framework. I’ve developed my own framework, using OOP principles. Ideas for this project I\'ve used from a video course.\n'
        },
        {
            title: 'Online store',
            stack: ['React', 'Redux'],
            logo: 'https://us.123rf.com/450wm/natalypaint/natalypaint1704/natalypaint170400066/77108225-web-banner-online-store-with-shopping-bags-concept-online-shopping.jpg?ver=6',
            link: 'https://ed-develop.github.io/online-store/',
            description: 'It’s a replica for Google Sheets. This is SPA without any JavaScript framework. I’ve developed my own framework, using OOP principles. Ideas for this project I\'ve used from a video course.\n'
        }
    ] as Array<ProjectType>
};

const projectsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        default:
            return state;
    }
};

type InitialStateType = typeof initialState;

export default projectsReducer;
