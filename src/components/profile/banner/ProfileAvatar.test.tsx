import React from "react";
import {render, fireEvent} from "@testing-library/react";
import ProfileAvatar from "./ProfileAvatar";
import avatar from '../../../assets/images/user.png';

describe('profile avatar', () => {
    const setIsUploadModal = jest.fn();

    test('should render avatar', () => {
        const {container} = render(
            <ProfileAvatar
                avatar={avatar}
                isMyProfile={true}
                setIsUploadModal={setIsUploadModal}
            />
        );
        const img = container.querySelector('img');

        expect(img?.src.includes(avatar)).toBeTruthy();
    });

    test('should show edit button', () => {
        const {container} = render(
            <ProfileAvatar
                avatar={avatar}
                isMyProfile={true}
                setIsUploadModal={setIsUploadModal}
            />
        );

        expect(container.querySelector('button')).toBeTruthy();
    });

    test('shouldn\'t show edit button', () => {
        const {container} = render(
            <ProfileAvatar
                avatar={avatar}
                isMyProfile={false}
                setIsUploadModal={setIsUploadModal}
            />
        );

        expect(container.querySelector('button')).toBeNull();
    });

    test('callback should be called with "avatar" param after click', () => {
        const {container} = render(
            <ProfileAvatar
                avatar={avatar}
                isMyProfile={true}
                setIsUploadModal={setIsUploadModal}
            />
        );

        fireEvent.click(container.querySelector('button') || document);

        expect(setIsUploadModal).toBeCalled();
        expect(setIsUploadModal).toBeCalledWith('avatar');
    })
});