import React from 'react';
import {render} from '@testing-library/react';
import {Landing} from './Landing';
import {BrowserRouter} from 'react-router-dom';

describe('Landing component', () => {
    test('Should renders correctly', () => {
        const {container} = render(
            <BrowserRouter>
                <Landing/>
            </BrowserRouter>
        );

        expect(container).toMatchSnapshot();
    });
})