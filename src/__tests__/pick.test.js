import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import Pick from '../components/Pick/Pick';

test('renders without exploding', () => {
  const tree = renderer.create(
    <MemoryRouter>
      <Pick />
    </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
