import React from 'react';
import renderer from 'react-test-renderer';

import OneRoom from '../components/Book/OneRoom';

const component = <OneRoom room="Hell's Kitchen" />;

test('renders without exploding', () => {
  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});
