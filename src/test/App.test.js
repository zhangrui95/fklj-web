import React from 'react';
import ReactDOM from 'react-dom';
import App from '../business/MainPage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
