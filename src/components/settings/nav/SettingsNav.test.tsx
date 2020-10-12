import React from 'react';
import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {SettingsNav} from './SettingsNav';

describe('SettingsNav component', () => {
    test('Should renders correctly', () => {
        const {container} = render(
            <BrowserRouter>
                <SettingsNav/>
            </BrowserRouter>
        );

        expect(container).toMatchSnapshot();
    });
})