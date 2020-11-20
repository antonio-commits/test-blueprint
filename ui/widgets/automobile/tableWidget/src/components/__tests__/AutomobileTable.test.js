import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import 'components/__mocks__/i18n';
import automobileMocks from 'components/__mocks__/automobileMocks';
import AutomobileTable from 'components/AutomobileTable';

describe('AutomobileTable', () => {
  it('shows automobiles', () => {
    const { getByText } = render(<AutomobileTable items={automobileMocks} />);
    expect(
      getByText(
        'Explicabo ex rerum doloremque deserunt. Dolorem dolorem dignissimos impedit fugit doloremque dolorem velit. Vel neque aut mollitia nostrum eveniet. Minima rerum sint iusto inventore fugiat id ea ratione. Qui fugiat et maxime voluptatem vel. Officiis officia numquam veniam ut amet voluptatem.'
      )
    ).toBeInTheDocument();
    expect(
      getByText(
        'Aut fugit tempore cum distinctio qui voluptatem non qui. Voluptas et officia repellendus. Repudiandae non voluptatem officiis possimus. Pariatur est ipsum officia ut rem quidem eum ea ut. Unde nemo laudantium non ut nobis occaecati.'
      )
    ).toBeInTheDocument();
  });

  it('shows no automobiles message', () => {
    const { queryByText } = render(<AutomobileTable items={[]} />);
    expect(
      queryByText(
        'Explicabo ex rerum doloremque deserunt. Dolorem dolorem dignissimos impedit fugit doloremque dolorem velit. Vel neque aut mollitia nostrum eveniet. Minima rerum sint iusto inventore fugiat id ea ratione. Qui fugiat et maxime voluptatem vel. Officiis officia numquam veniam ut amet voluptatem.'
      )
    ).not.toBeInTheDocument();
    expect(
      queryByText(
        'Aut fugit tempore cum distinctio qui voluptatem non qui. Voluptas et officia repellendus. Repudiandae non voluptatem officiis possimus. Pariatur est ipsum officia ut rem quidem eum ea ut. Unde nemo laudantium non ut nobis occaecati.'
      )
    ).not.toBeInTheDocument();

    expect(queryByText('entities.automobile.noItems')).toBeInTheDocument();
  });

  it('calls onSelect when the user clicks a table row', () => {
    const onSelectMock = jest.fn();
    const { getByText } = render(
      <AutomobileTable items={automobileMocks} onSelect={onSelectMock} />
    );
    fireEvent.click(
      getByText(
        'Explicabo ex rerum doloremque deserunt. Dolorem dolorem dignissimos impedit fugit doloremque dolorem velit. Vel neque aut mollitia nostrum eveniet. Minima rerum sint iusto inventore fugiat id ea ratione. Qui fugiat et maxime voluptatem vel. Officiis officia numquam veniam ut amet voluptatem.'
      )
    );
    expect(onSelectMock).toHaveBeenCalledTimes(1);
  });
});
