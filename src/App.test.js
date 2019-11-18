import React from 'react';
import ReactDOM from 'react-dom';
import PortfolioApp from "./App";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PortfolioApp/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
