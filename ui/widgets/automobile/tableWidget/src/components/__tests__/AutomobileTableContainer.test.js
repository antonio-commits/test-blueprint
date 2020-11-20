import React from 'react';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import automobileMocks from 'components/__mocks__/automobileMocks';
import { apiAutomobilesGet } from 'api/automobiles';
import 'i18n/__mocks__/i18nMock';
import AutomobileTableContainer from 'components/AutomobileTableContainer';

jest.mock('api/automobiles');

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

jest.mock('components/pagination/withPagination', () => {
  const withPagination = (Component) => {
    return (props) => (
      <Component
        {...props} // eslint-disable-line react/jsx-props-no-spreading
        pagination={{
          onChangeItemsPerPage: () => {},
          onChangeCurrentPage: () => {},
        }}
      />
    );
  };

  return withPagination;
});

describe('AutomobileTableContainer', () => {
  const errorMessageKey = 'error.dataLoading';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls API', async () => {
    apiAutomobilesGet.mockImplementation(() =>
      Promise.resolve({ automobiles: automobileMocks, count: 2 })
    );
    const { queryByText } = render(<AutomobileTableContainer />);

    await wait(() => {
      expect(apiAutomobilesGet).toHaveBeenCalledTimes(1);
      expect(queryByText(errorMessageKey)).not.toBeInTheDocument();
    });
  });

  it('shows an error if the API call is not successful', async () => {
    apiAutomobilesGet.mockImplementation(() => {
      throw new Error();
    });
    const { getByText } = render(<AutomobileTableContainer />);

    wait(() => {
      expect(apiAutomobilesGet).toHaveBeenCalledTimes(1);
      expect(getByText(errorMessageKey)).toBeInTheDocument();
    });
  });
});
