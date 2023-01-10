import { ITableColumn } from '@components/TailwindTable';

const useTableConfiguration = <T>(
  data: T[],
  columns: ITableColumn<T>[],
  defaultConfig?: Omit<ITableColumn<T>, 'accessor' | 'label'>,
): {
  tableData: (T & { id: number | string })[];
  tableColumns: ITableColumn<T & { id: number | string }>[];
} => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!!data[0] && !(data[0] as any).id) {
    return {
      tableData: data.map((v, idx) => ({ ...v, id: idx })),
      tableColumns: columns.map((v) => ({ ...defaultConfig, ...v })),
    };
  }
  return {
    tableData: data as (T & { id: number | string })[],
    tableColumns: columns.map((v) => ({ ...defaultConfig, ...v })),
  };
};

export { useTableConfiguration };
