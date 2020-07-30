import React from "react";
import {render, RenderResult} from "@testing-library/react";
import ProfileContainer from "./ProfileContainer";
import {MockStore} from "redux-mock-store";
import {Provider} from "react-redux";
import {mockStore} from "../../utils/test/mock-store";
import {BrowserRouter} from "react-router-dom";

describe('Profile container', () => {
    let store: MockStore;
    let component: RenderResult;

    beforeEach(() => {
        mockStore.clearActions();
        component = render(
            <BrowserRouter>
                <Provider store={mockStore}>
                    <ProfileContainer/>
                </Provider>
            </BrowserRouter>
        )
    });

    test('should render profile', () => {

        console.log(component);
    });
});