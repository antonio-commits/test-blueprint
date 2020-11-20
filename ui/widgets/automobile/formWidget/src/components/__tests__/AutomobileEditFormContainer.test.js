import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { apiAutomobileGet, apiAutomobilePut } from 'api/automobiles';
import AutomobileEditFormContainer from 'components/AutomobileEditFormContainer';
import 'i18n/__mocks__/i18nMock';
import automobileMock from 'components/__mocks__/automobileMocks';

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

describe('AutomobileEditFormContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const errorMessageKey = 'error.dataLoading';
  const successMessageKey = 'common.dataSaved';

  const onErrorMock = jest.fn();
  const onUpdateMock = jest.fn();

  it('loads data', async () => {
    apiAutomobileGet.mockImplementation(() => Promise.resolve(automobileMock));
    const { queryByText } = render(
      <AutomobileEditFormContainer id="1" onError={onErrorMock} onUpdate={onUpdateMock} />
    );

    await wait(() => {
      expect(apiAutomobileGet).toHaveBeenCalledTimes(1);
      expect(apiAutomobileGet).toHaveBeenCalledWith('', '1');
      expect(queryByText(errorMessageKey)).not.toBeInTheDocument();
      expect(onErrorMock).toHaveBeenCalledTimes(0);
    });
  }, 7000);

  it('saves data', async () => {
    apiAutomobileGet.mockImplementation(() => Promise.resolve(automobileMock));
    apiAutomobilePut.mockImplementation(() => Promise.resolve(automobileMock));

    const { findByTestId, queryByText } = render(
      <AutomobileEditFormContainer id="1" onError={onErrorMock} onUpdate={onUpdateMock} />
    );

    const saveButton = await findByTestId('submit-btn');

    fireEvent.click(saveButton);

    await wait(() => {
      expect(apiAutomobilePut).toHaveBeenCalledTimes(1);
      expect(apiAutomobilePut).toHaveBeenCalledWith('', automobileMock);
      expect(queryByText(successMessageKey)).toBeInTheDocument();
      expect(onErrorMock).toHaveBeenCalledTimes(0);
      expect(queryByText(errorMessageKey)).not.toBeInTheDocument();
    });
  }, 7000);

  it('shows an error if data is not successfully loaded', async () => {
    apiAutomobileGet.mockImplementation(() => Promise.reject());
    const { queryByText } = render(
      <AutomobileEditFormContainer id="1" onError={onErrorMock} onUpdate={onUpdateMock} />
    );

    await wait(() => {
      expect(apiAutomobileGet).toHaveBeenCalledTimes(1);
      expect(apiAutomobileGet).toHaveBeenCalledWith('', '1');
      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(queryByText(errorMessageKey)).toBeInTheDocument();
      expect(queryByText(successMessageKey)).not.toBeInTheDocument();
    });
  }, 7000);

  it('shows an error if data is not successfully saved', async () => {
    apiAutomobileGet.mockImplementation(() => Promise.resolve(automobileMock));
    apiAutomobilePut.mockImplementation(() => Promise.reject());
    const { findByTestId, getByText } = render(
      <AutomobileEditFormContainer id="1" onError={onErrorMock} />
    );

    const saveButton = await findByTestId('submit-btn');

    fireEvent.click(saveButton);

    await wait(() => {
      expect(apiAutomobileGet).toHaveBeenCalledTimes(1);
      expect(apiAutomobileGet).toHaveBeenCalledWith('', '1');

      expect(apiAutomobilePut).toHaveBeenCalledTimes(1);
      expect(apiAutomobilePut).toHaveBeenCalledWith('', automobileMock);

      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(getByText(errorMessageKey)).toBeInTheDocument();
    });
  }, 7000);
});
