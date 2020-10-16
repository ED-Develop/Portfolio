import React from "react";
import {fireEvent, render, screen} from "@testing-library/react";
import image from "../../../assets/images/user.png";
import ProfileBanner from "./ProfileBanner";

describe('profile banner', () => {
    const setIsUploadModal = jest.fn();

    beforeEach(() => {
        setIsUploadModal.mockClear();
    })

    test('should render banner image', () => {
        const {container} = render(
            <ProfileBanner
                bannerImg={image}
                avatar={null}
                isMyProfile={true}
                setIsUploadModal={setIsUploadModal}
            />
        );
        const img = container.querySelector('img');

        expect(img?.src.includes(image)).toBeTruthy();
    });

    test('should show edit button', () => {
        render(
            <ProfileBanner
                bannerImg={image}
                avatar={null}
                isMyProfile={true}
                setIsUploadModal={setIsUploadModal}
            />
        );

        expect(screen.queryByText('Edit')).toBeTruthy();
    });

    test('shouldn\'t show edit button', () => {
        render(
            <ProfileBanner
                bannerImg={image}
                avatar={null}
                isMyProfile={false}
                setIsUploadModal={setIsUploadModal}
            />
        );

        expect(screen.queryByText('Edit')).toBeNull();
    });

    test('callback should be called with "banner" param', () => {
        render(
            <ProfileBanner
                bannerImg={image}
                avatar={null}
                isMyProfile={true}
                setIsUploadModal={setIsUploadModal}
            />
        );

        fireEvent.click(screen.queryByText('Edit') || document);

        expect(setIsUploadModal).toBeCalled();
        expect(setIsUploadModal).toBeCalledWith('banner');
    });
});