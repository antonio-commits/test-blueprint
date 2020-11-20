import React from 'react';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import 'components/__mocks__/i18n';
import { apiAutomobileGet } from 'api/automobile';
import automobileApiGetResponseMock from 'components/__mocks__/automobileMocks';
import AutomobileDetailsContainer from 'components/AutomobileDetailsContainer';

jest.mock('api/automobile');

jest.mock('auth/withKeycloak', () => {
  const withKeycloak = (Component) => {
    return (props) => (
      <Component
        {...props} // eslint-disable-line react/jsx-props-no-spreading
        keycloak={{
          initialized: true,
          authenticated: true,
        }}
      />
    );
  };

  return withKeycloak;
});

beforeEach(() => {
  apiAutomobileGet.mockClear();
});

describe('AutomobileDetailsContainer component', () => {
  test('requests data when component is mounted', async () => {
    apiAutomobileGet.mockImplementation(() => Promise.resolve(automobileApiGetResponseMock));

    render(<AutomobileDetailsContainer id="1" />);

    await wait(() => {
      expect(apiAutomobileGet).toHaveBeenCalledTimes(1);
    });
  });

  test('data is shown after mount API call', async () => {
    apiAutomobileGet.mockImplementation(() => Promise.resolve(automobileApiGetResponseMock));

    const { getByText } = render(<AutomobileDetailsContainer id="1" />);

    await wait(() => {
      expect(apiAutomobileGet).toHaveBeenCalledTimes(1);
      expect(getByText('entities.automobile.marca')).toBeInTheDocument();
      expect(getByText('entities.automobile.modello')).toBeInTheDocument();
    });
  });

  test('error is shown after failed API call', async () => {
    const onErrorMock = jest.fn();
    apiAutomobileGet.mockImplementation(() => Promise.reject());

    const { getByText } = render(<AutomobileDetailsContainer id="1" onError={onErrorMock} />);

    await wait(() => {
      expect(apiAutomobileGet).toHaveBeenCalledTimes(1);
      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(getByText('common.couldNotFetchData')).toBeInTheDocument();
    });
  });
});
