import React from "react";
import {render, screen} from "@testing-library/react";
import ProfileTitle from "./ProfileTitle";

describe('Profile title', () => {
    const updateProfileStatus = jest.fn();

    test('should render component with correct props', () => {
        const name = 'test';
        const status = 'test status';

        render(
            <ProfileTitle
                fullName={name}
                status={status}
                isMyProfile={true}
                updateProfileStatus={updateProfileStatus}
            />
        );

        expect(screen.queryByText(name)).not.toBeNull();
        expect(screen.queryByText(status)).not.toBeNull();
    });
});