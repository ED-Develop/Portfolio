import React from "react";
import {render, RenderResult} from "@testing-library/react";
import ProfileContainer from "./ProfileContainer";
import {Provider} from "react-redux";
import {mockStore} from "../../utils/test/mock-store";
import {BrowserRouter} from "react-router-dom";

describe('Profile container', () => {
    let component: RenderResult;

    beforeEach(() => {
        mockStore.clearActions();
        component = render(
            <BrowserRouter>
                <Provider store={mockStore}>
                    <ProfileContainer/>
                </Provider>
            </BrowserRouter>
        );
    });

    test('should render profile', () => {
    });
});