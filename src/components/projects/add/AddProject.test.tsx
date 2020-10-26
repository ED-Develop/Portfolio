import React from 'react';
import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {AddProject} from './AddProject';

describe('AddProject component', () => {
    test('Should renders correctly', () => {
        const {container} = render(
            <BrowserRouter>
                <AddProject/>
            </BrowserRouter>
        )

        expect(container).toMatchSnapshot();
    });
});