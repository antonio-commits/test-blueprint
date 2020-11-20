import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, wait } from '@testing-library/react';
import 'i18n/__mocks__/i18nMock';
import automobileMock from 'components/__mocks__/automobileMocks';
import AutomobileForm from 'components/AutomobileForm';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme();

describe('Automobile Form', () => {
  it('shows form', () => {
    const { getByLabelText } = render(
      <ThemeProvider theme={theme}>
        <AutomobileForm automobile={automobileMock} />
      </ThemeProvider>
    );
    expect(getByLabelText('entities.automobile.marca').value).toBe(
      'Explicabo ex rerum doloremque deserunt. Dolorem dolorem dignissimos impedit fugit doloremque dolorem velit. Vel neque aut mollitia nostrum eveniet. Minima rerum sint iusto inventore fugiat id ea ratione. Qui fugiat et maxime voluptatem vel. Officiis officia numquam veniam ut amet voluptatem.'
    );
  });

  it('submits form', async () => {
    const handleSubmit = jest.fn();
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <AutomobileForm automobile={automobileMock} onSubmit={handleSubmit} />
      </ThemeProvider>
    );

    const form = getByTestId('automobile-form');
    fireEvent.submit(form);

    await wait(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
