import React from 'react';
import ReactDOM from 'react-dom';
import AppWithProviders from "./App";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppWithProviders/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
