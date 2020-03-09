import {ProjectType} from "../types/types";

const initialState = {
    projects: [
        {
            name: 'Online store',
            type: 'SPA',
            technologies: 'React/Redux',
            logo: 'https://us.123rf.com/450wm/natalypaint/natalypaint1704/natalypaint170400066/77108225-web-banner-online-store-with-shopping-bags-concept-online-shopping.jpg?ver=6',
            link: 'https://ed-develop.github.io/online-store/'
        },
        {
            name: 'Sports Hold',
            type: 'HTML layout',
            technologies: 'Bootstrap/SCSS',
            logo: 'https://pbs.twimg.com/media/DT-MU2QW4AE3hEO.jpg',
            link: 'https://ed-develop.github.io/sport-hold/'
        }
    ] as Array<ProjectType>
};

type InitialStateType = typeof initialState;

const projectsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        default: return state;
    }
};

export default projectsReducer;