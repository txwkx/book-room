import React from 'react';
import renderer from 'react-test-renderer';

import OneMeeting from '../components/Look/OneMeeting';

const component = <OneMeeting />;

test('renders without exploding', () => {
  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});
