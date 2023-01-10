import { faker } from '@faker-js/faker/locale/en';
import { useTableConfiguration } from '@hooks/useTableConfiguration';
import { Meta, Story } from '@storybook/react';
import { cx } from '@utils/common';
import * as React from 'react';

import { ITailwindTableProps, TailwindTable } from '.';

const TOTAL_FAKE_DATA = 10;

interface IFakeData {
  id: number;
  name: string;
  time: number;
  status: string;
}

// eslint-disable-next-line react-hooks/rules-of-hooks
const { tableData: dataDemo, tableColumns: columnsDemo } = useTableConfiguration(
  [
    { name: 'CRIS', status: 'DONE', score: 1000 },
    { name: 'NIDA', status: 'DONE', score: 200 },
    { name: 'TEEL', status: 'DOING', score: 450 },
    { name: 'LOUS', status: 'DOING', score: 800 },
    { name: 'JAN', status: 'PENDING', score: 0 },
  ],
  [
    {
      label: 'Username',
      accessor: 'name',
      align: 'left',
    },
    {
      label: 'Status',
      accessor: 'status',
      renderData: (data, _, accessor) => {
        const color = {
          DONE: 'text-green-500',
          DOING: 'text-orange-600',
          PENDING: 'text-gray-500',
        };
        return <span className={color[data.status]}>{data[accessor!]}</span>;
      },
    },
    { label: 'Score', accessor: 'score', sort: (a, b) => a.score - b.score },
  ],
  {
    body: {
      className:
        'px-2 font-bold text-gray-600 transition-all duration-300 group-hover:!bg-gray-300 group-active:!bg-gray-200',
    },
    header: { background: '#345543', className: 'text-white' },
    align: 'right',
  },
);

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

// eslint-disable-next-line react-hooks/rules-of-hooks
const { tableData, tableColumns } = useTableConfiguration(FakeData, [
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
  {
    label: 'Tools',
    renderData: () => (
      <div className="py-2">
        <button className="py-1 px-2 bg-indigo-500 text-white rounded hover:shadow-indigo-500 hover:shadow-md transition-all duration-300 active:shadow-sm">
          Setting
        </button>
      </div>
    ),
  },
]);

export default {
  title: 'Table',
  component: TailwindTable,
} as Meta;

export const TemplateDemo: Story<ITailwindTableProps<(typeof dataDemo)[0]>> = (args) => <TailwindTable {...args} />;
TemplateDemo.args = {
  data: dataDemo,
  columns: columnsDemo,
  difference: { enable: false },
  rowClassName: 'group cursor-pointer',
  onClickRow: console.log,
  rounded: 'md',
};

export const TemplateNormal: Story<ITailwindTableProps<IFakeData>> = (args) => <TailwindTable {...args} />;
TemplateNormal.args = {
  data: tableData,
  columns: tableColumns,
  difference: { enable: true },
};
