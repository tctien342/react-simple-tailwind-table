import { faker } from '@faker-js/faker/locale/en';
import { Meta, Story } from '@storybook/react';
import { cx } from '@utils/common';
import { cloneDeep } from 'lodash';
import * as React from 'react';

import { ITailwindTableProps, TailwindTable } from '.';

const TOTAL_FAKE_DATA = 10;

interface IFakeData {
  id: number;
  name: string;
  time: number;
  status: string;
}

const FakeData = Array(TOTAL_FAKE_DATA)
  .fill(0)
  .map(
    (): IFakeData => ({
      id: faker.mersenne.rand(),
      name: faker.commerce.productName(),
      time: Date.now() - faker.mersenne.rand(9999999, 999999999),
      status: ['DOING', 'DONE', 'PENDING', 'ERROR'][faker.mersenne.rand(0, 4)],
    }),
  );

export default {
  title: 'Table',
  component: TailwindTable,
} as Meta;

const StoryTemplate: Story<ITailwindTableProps<IFakeData>> = (args) => <TailwindTable {...args} />;

export const TemplateNormal = cloneDeep(StoryTemplate);
TemplateNormal.args = {
  data: FakeData,
  difference: {
    enable: true,
  },
  columns: [
    {
      label: 'ID',
      accessor: 'id',
      sort: (a, b) => a.id - b.id,
      align: 'left',
      width: '48px',
      body: { className: 'px-2 text-gray-600' },
      renderData: (data) => `# ${data.id}`,
    },
    {
      label: 'Name',
      accessor: 'name',
      align: 'left',
    },
    {
      label: 'Unlock time',
      accessor: 'time',
      body: { className: 'py-1' },
      sort: (a, b) => a.time - b.time,
      renderData: (data) => {
        return new Date(data.time).toLocaleDateString();
      },
    },
    {
      label: 'status',
      accessor: 'status',
      body: { className: 'py-1' },
      header: { className: 'py-1 text-green-500' },
      sort: (a, b) => {
        const rank = {
          DOING: 0,
          DONE: 1,
          PENDING: -1,
          ERROR: -2,
        };
        return rank[a.status] - rank[b.status];
      },
      renderData: (data) => {
        return (
          <div className="flex justify-center items-center">
            <div
              className={cx('px-2 py-1 rounded  text-white text-xs font-bold', {
                'bg-green-500': data.status === 'DONE',
                'bg-yellow-500': data.status === 'DOING',
                'bg-gray-500': data.status === 'PENDING',
                'bg-red-500': data.status === 'ERROR',
              })}>
              {data.status}
            </div>
          </div>
        );
      },
    },
  ],
};
