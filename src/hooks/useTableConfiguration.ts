import { ITableColumn } from '@components/TailwindTable';

const useTableConfiguration = <T>(
  data: T[],
  columns: ITableColumn<T>[],
): {
  tableData: (T & { id: number | string })[];
  tableColumns: ITableColumn<T>[];
} => {
  if (!!data[0] && !('id' in data[0])) {
    return { tableData: data.map((v, idx) => ({ ...v, id: idx })), tableColumns: columns };
  }
  return { tableData: data as (T & { id: number | string })[], tableColumns: columns };
};

export { useTableConfiguration };
