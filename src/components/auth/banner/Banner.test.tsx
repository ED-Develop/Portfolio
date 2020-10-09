import React from 'react';
import {render} from '@testing-library/react';
import {Banner} from './Banner';
import {BrowserRouter} from 'react-router-dom';

describe('Banner component: ', () => {
    test('Should renders correctly', () => {
        const {container} = render(
            <BrowserRouter>
                <Banner/>
            </BrowserRouter>
        );

        expect(container).toMatchSnapshot();
    });
});