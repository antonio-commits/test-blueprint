import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import 'components/__mocks__/i18n';
import AutomobileDetails from 'components/AutomobileDetails';
import automobileMock from 'components/__mocks__/automobileMocks';

describe('AutomobileDetails component', () => {
  test('renders data in details widget', () => {
    const { getByText } = render(<AutomobileDetails automobile={automobileMock} />);

    expect(getByText('entities.automobile.marca')).toBeInTheDocument();
  });
});
