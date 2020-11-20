import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { apiAutomobilePost } from 'api/automobiles';
import AutomobileAddFormContainer from 'components/AutomobileAddFormContainer';
import 'i18n/__mocks__/i18nMock';
import automobileMock from 'components/__mocks__/automobileMocks';

jest.mock('api/automobiles');
jest.mock('@material-ui/pickers', () => {
  // eslint-disable-next-line react/prop-types
  const MockPicker = ({ id, value, name, label, onChange }) => {
    const handleChange = (event) => onChange(event.currentTarget.value);
    return (
      <span>
        <label htmlFor={id}>{label}</label>
        <input id={id} name={name} value={value || ''} onChange={handleChange} />
      </span>
    );
  };
  return {
    ...jest.requireActual('@material-ui/pickers'),
    DateTimePicker: MockPicker,
    DatePicker: MockPicker,
  };
});

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

describe('AutomobileAddFormContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const errorMessageKey = 'error.dataLoading';
  const successMessageKey = 'common.dataSaved';

  const onErrorMock = jest.fn();
  const onCreateMock = jest.fn();

  it('saves data', async () => {
    apiAutomobilePost.mockImplementation((data) => Promise.resolve(data));

    const { findByTestId, findByLabelText, queryByText, rerender } = render(
      <AutomobileAddFormContainer onError={onErrorMock} onUpdate={onCreateMock} />
    );

    const marcaField = await findByLabelText('entities.automobile.marca');
    fireEvent.change(marcaField, { target: { value: automobileMock.marca } });
    const modelloField = await findByLabelText('entities.automobile.modello');
    fireEvent.change(modelloField, { target: { value: automobileMock.modello } });
    rerender(<AutomobileAddFormContainer onError={onErrorMock} onUpdate={onCreateMock} />);

    const saveButton = await findByTestId('submit-btn');

    fireEvent.click(saveButton);

    await wait(() => {
      expect(apiAutomobilePost).toHaveBeenCalledTimes(1);
      expect(apiAutomobilePost).toHaveBeenCalledWith('', automobileMock);

      expect(queryByText(successMessageKey)).toBeInTheDocument();

      expect(onErrorMock).toHaveBeenCalledTimes(0);
      expect(queryByText(errorMessageKey)).not.toBeInTheDocument();
    });
  }, 7000);

  it('shows an error if data is not successfully saved', async () => {
    apiAutomobilePost.mockImplementation(() => Promise.reject());

    const { findByTestId, findByLabelText, queryByText, rerender } = render(
      <AutomobileAddFormContainer onError={onErrorMock} onUpdate={onCreateMock} />
    );

    const marcaField = await findByLabelText('entities.automobile.marca');
    fireEvent.change(marcaField, { target: { value: automobileMock.marca } });
    const modelloField = await findByLabelText('entities.automobile.modello');
    fireEvent.change(modelloField, { target: { value: automobileMock.modello } });
    rerender(<AutomobileAddFormContainer onError={onErrorMock} onUpdate={onCreateMock} />);

    const saveButton = await findByTestId('submit-btn');

    fireEvent.click(saveButton);

    await wait(() => {
      expect(apiAutomobilePost).toHaveBeenCalledTimes(1);
      expect(apiAutomobilePost).toHaveBeenCalledWith('', automobileMock);

      expect(queryByText(successMessageKey)).not.toBeInTheDocument();

      expect(onErrorMock).toHaveBeenCalledTimes(1);
      expect(queryByText(errorMessageKey)).toBeInTheDocument();
    });
  }, 7000);
});
