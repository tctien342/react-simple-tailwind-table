import { render } from '@testing-library/react';
import React from 'react';

import { TailwindTable } from '.';

describe('Test Table', () => {
  test('Should render table', () => {
    const { queryByText } = render(
      <TailwindTable
        data={[{ id: 1, content: 'HelloWorld!' }]}
        columns={[
          {
            label: 'ID',
            accessor: 'id',
            sort: (a, b) => a.id - b.id,
            renderData: () => <div>Custom Render as well</div>,
          },
          {
            label: 'Content',
            accessor: 'content',
          },
          {
            label: '',
            renderHeader: () => <div>WORKED!</div>,
          },
        ]}
      />,
    );
    const cellEle = queryByText(/HelloWorld/i);
    expect(cellEle).not.toBe(null);
    const customEle = queryByText(/Custom Render as well/i);
    expect(customEle).not.toBe(null);
    const headerEle = queryByText(/WORKED!/i);
    expect(headerEle).not.toBe(null);
  });
});
