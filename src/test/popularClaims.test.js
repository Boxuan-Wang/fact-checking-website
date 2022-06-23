import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import PopularClaims from '../src/elements/popularClaims';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('test popular claims list', async () => {
  const fakeClaimList = [
    {field: 'Human will die.', score: true},
    {field: 'Human will not die.', score: false},
  ];
  jest.spyOn(global, 'fetch').mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeClaimList),
    }),
  );

  await act(async () => {
    render(<PopularClaims />, container);
  });

  // assert
});
