import React from "react";
import ProfileStatus from "./ProfileStatus";
import {fireEvent, render, screen} from "@testing-library/react";

describe('Profile status', () => {
    const status = 'test status';
    const updateProfileStatus = jest.fn();

    beforeEach(() => {
        updateProfileStatus.mockClear();
    });

    test('should contain tag p with status', () => {
        render(<ProfileStatus
            isMyProfile={true}
            status={status}
            updateProfileStatus={updateProfileStatus}
        />);

        expect(screen.queryByText(status)).not.toBeNull();
    });

    test('should contain initial status if didn\'t have status in props', () => {
        const defaultStatus = 'Type this your status';

        render(
            <ProfileStatus
                isMyProfile={true}
                status={''}
                updateProfileStatus={updateProfileStatus}
            />
        )

        expect(screen.queryByText(defaultStatus)).not.toBeNull();
    });

    test('after click active activate edit mode should show input with status', () => {
        render(
            <ProfileStatus
                isMyProfile={true}
                status={status}
                updateProfileStatus={updateProfileStatus}
            />
        );

        fireEvent.click(screen.queryByText('Edit') || document);

        expect(screen.queryByDisplayValue(status)).not.toBeNull();
        expect(screen.queryByText('Edit')).toBeNull();
    });

    test('after deactivate edit mode hide input and show status', () => {
        render(
            <ProfileStatus
                isMyProfile={true}
                status={status}
                updateProfileStatus={updateProfileStatus}
            />
        );

        fireEvent.click(screen.queryByText('Edit') || document);
        fireEvent.blur(screen.queryByDisplayValue(status) || document);

        expect(screen.queryByDisplayValue(status)).toBeNull();
        expect(screen.queryByText(status)).not.toBeNull();
        expect(screen.queryByText('Edit')).not.toBeNull();
    });

    test('no edit mode if not profile owner', () => {
        render(
            <ProfileStatus
                isMyProfile={false}
                status={status}
                updateProfileStatus={updateProfileStatus}
            />
        );

        fireEvent.click(screen.queryByText('Edit') || document);

        expect(screen.queryByDisplayValue(status)).toBeNull();
    });

    test('should call callback with new status after deactivate edit mode', () => {
        const newStatus = 'new status';

        render(
            <ProfileStatus
                isMyProfile={true}
                status={status}
                updateProfileStatus={updateProfileStatus}
            />
        );

        fireEvent.click(screen.queryByText('Edit') || document);
        const input = screen.queryByDisplayValue(status);

        fireEvent.change(input || document, {
            target: {value: newStatus}
        });

        fireEvent.blur(input || document);

        expect(updateProfileStatus).toBeCalled();
        expect(updateProfileStatus).toBeCalledWith(newStatus);
    });
});