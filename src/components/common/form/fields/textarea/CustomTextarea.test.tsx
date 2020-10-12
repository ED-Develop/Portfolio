import React from 'react';
import {render} from '@testing-library/react';
import {CustomTextarea} from './CustomTextarea';

describe('CustomTextarea component', () => {
    test('Should renders correctly', () => {
        const {container} = render(<CustomTextarea/>);

        expect(container).toMatchSnapshot();
    })
})