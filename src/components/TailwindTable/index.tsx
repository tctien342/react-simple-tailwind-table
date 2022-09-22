import { cx } from '@utils/common';
import chroma from 'chroma-js';
import React, { CSSProperties, HTMLAttributes, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import styles from './index.module.scss';

export type TTableSortFn<T = undefined> = (a: T, b: T) => number;

export type TTableSortState<T = undefined> = {
  /**
   * True if is decrease mode
   */
  isDesc: boolean;
  /**
   * Current accessor key
   */
  accessor?: keyof T;
};

export interface ITableState<T = undefined> {
  sorter: TTableSortState<T>;
}

export interface ITableColumn<T = undefined> {
  /**
   * Label in header
   */
  label: string;

  /**
   * Key of value in data
   */
  accessor?: Partial<keyof T>;

  /**
   * Width of column
   */
  width?: CSSProperties['width'];

  /**
   * Content align in column
   */
  align?: CSSProperties['textAlign'];

  /**
   * Custom render content
   */
  renderData?: (data: T, tableState?: ITableState<T>) => ReactNode;

  /**
   * Custom render header
   */
  renderHeader?: (tableState?: ITableState<T>) => ReactNode;

  /**
   * Sort method of this column, return score for normal array sort method
   */
  sort?: TTableSortFn<T>;

  /**
   * Extra config for body
   */
  body?: {
    className?: string;
    background?: CSSProperties['background'];
  };

  /**
   * Extra config for header
   */
  header?: {
    className?: string;
    background?: CSSProperties['background'];
    /**
     * Animation btn when hover or active (For sortable column)
     * @default: `hover:scale-105 active:scale-95 p-3`
     */
    buttonClass?: string;
  };

  filter?: {
    show?: boolean;
    dotColor?: string;
    /**
     * Custom render of filtered dot
     */
    render?: (tableState: ITableState<T>) => ReactNode;
  };
}

export interface ITailwindTableProps<T = undefined> {
  /**
   * Table data
   */
  data: T[];
  /**
   * Table columns configs
   */
  columns: ITableColumn<T>[];

  /**
   * Table extra class
   */
  className?: HTMLAttributes<HTMLTableElement>['className'];

  /**
   * Config table cache
   */
  cache?: {
    /**
     * Store current sort setting in localstore
     */
    sorter?: boolean;
  };

  /**
   * For now we only support sticky first and last col
   */
  sticky?: {
    /**
     * Sticky first column
     */
    left?: boolean;
    /**
     * Sticky last column
     */
    right?: boolean;
  };

  /**
   * Tweak difference background between rows
   */
  difference?: {
    /**
     * Enable diffences
     */
    enable?: boolean;
    /**
     * Differance value
     */
    offset?: number;
  };
}
/**
 * Then build your component
 */
export const TailwindTable = <T extends { id?: number | string }>({
  data,
  cache,
  sticky,
  columns,
  className,
  difference = {
    enable: true,
  },
}: ITailwindTableProps<T>): React.ReactElement => {
  /**
   * Current sort state of table
   */
  const [sorter, setSorter] = useState<TTableSortState<T>>({
    isDesc: false,
    accessor: undefined,
  });

  /**
   * On click into sortable column => update current sorter
   */
  const onChangeSorter = useCallback(
    (accessor: keyof T) => {
      if (sorter.accessor === accessor) {
        if (sorter.isDesc === false) {
          setSorter((prev) => ({ ...prev, isDesc: true }));
        } else {
          setSorter({ isDesc: false, accessor: undefined });
        }
      } else {
        setSorter({ isDesc: false, accessor });
      }
    },
    [sorter],
  );

  const renderHeader = useMemo(() => {
    return columns.map((c, idx) => {
      const onSort = () => {
        if (c.sort && c.accessor) {
          onChangeSorter?.(c.accessor);
        }
      };
      return (
        <th
          className={cx('sticky border-b border-t z-20 shadow-sm', c.header?.className || 'text-green-500', {
            'border-l': idx === 0 || idx === columns.length - 1,
            'border-r': idx < columns.length - 2 || idx === columns.length - 1,
          })}
          key={c.accessor as string}
          style={{
            minWidth: c.width || 'auto',
            maxWidth: c.width || 'auto',
            top: 0,
            textAlign: c.align || 'center',
            background: c.header?.background || 'white',
          }}>
          {!!c.sort && (
            <button
              className={cx(
                `outline-none w-full transition-all rounded-none`,
                {
                  'hover:scale-90 active:scale-100 p-3': !c.header?.buttonClass,
                },
                c.header?.buttonClass,
              )}
              style={{ textAlign: c.align }}
              onClick={onSort}>
              {c.renderHeader ? (
                c.renderHeader({ sorter })
              ) : (
                <span className="text-xs font-bold ">{c.label.toUpperCase()}</span>
              )}
            </button>
          )}
          {!c.sort && !c.renderHeader && <span className="text-xs font-bold p-2">{c.label.toUpperCase()}</span>}
          {!c.sort && !!c.renderHeader && c.renderHeader({ sorter })}
          {!!c.sort && c.filter?.show !== false && (
            <div className="absolute right-1 top-0 h-full flex justify-center items-center">
              {!c.filter?.render && (
                <div className={'w-1 h-4 bg-gray-200 rounded flex flex-col overflow-hidden '}>
                  {c.accessor === sorter.accessor && (
                    <>
                      <div
                        className={cx('w-full transition-all', {
                          'h-0': !sorter.isDesc,
                          'h-1/2': sorter.isDesc,
                        })}
                      />
                      <div className={`w-full h-1/2 bg-${c.filter?.dotColor || 'green'}-500 transition-all"`} />
                    </>
                  )}
                </div>
              )}
              {!!c.filter?.render && c.filter.render({ sorter })}
            </div>
          )}
        </th>
      );
    });
  }, [columns, onChangeSorter, sorter]);

  const renderBody = useMemo(() => {
    let items = data;
    if (sorter.accessor) {
      const sortFn = columns.find((v) => v.accessor === sorter.accessor)?.sort;
      items = [...data].sort((a, b) => (sortFn?.(a, b) || 0) * (sorter.isDesc ? 1 : -1));
    }

    return items.map((item, iIndex) => {
      return (
        <tr key={item.id} className="">
          {columns.map((c, idx) => {
            const content = String(item[c.accessor as keyof T]);
            const getBackground = () => {
              if (c.body?.background) {
                return difference.enable === false
                  ? c.body?.background
                  : iIndex % 2 === 0
                  ? chroma(c.body.background)
                      .darken(difference.offset || 0.12)
                      .hex()
                  : c.body.background;
              }
              return iIndex % 2 === 0 && difference.enable
                ? chroma('#ffffff')
                    .darken(difference.offset || 0.12)
                    .hex()
                : 'white';
            };

            return (
              <td
                className={cx('border-b h-full', c.body?.className, {
                  'border-l': idx === 0 || idx === columns.length - 1,
                  'px-2': !c.renderData,
                  'border-r z-10': idx < columns.length - 2 || idx === columns.length - 1,
                })}
                key={c.accessor as string}
                style={{
                  textAlign: c.align || 'center',
                  minWidth: c.width || 'auto',
                  maxWidth: c.width || 'auto',
                  background: getBackground(),
                }}>
                {c.renderData ? c.renderData(item, { sorter }) : content}
              </td>
            );
          })}
        </tr>
      );
    });
  }, [data, sorter, columns]);

  useEffect(() => {
    if (cache?.sorter) {
      try {
        const sorterCacheRaw = localStorage.getItem('TableViewSorter');
        if (sorterCacheRaw) setSorter(JSON.parse(sorterCacheRaw));
      } catch (e) {
        localStorage.removeItem('TableViewSorter');
      }
    }
  }, [cache?.sorter]);

  useEffect(() => {
    if (cache?.sorter && sorter.accessor) {
      localStorage.setItem('TableViewSorter', JSON.stringify(sorter));
    }
  }, [cache?.sorter, sorter]);

  return (
    <div
      className={cx('h-full w-full flex max-h-full overflow-auto relative ', className, {
        [styles['sticky-left']]: sticky?.left,
        [styles['sticky-right']]: sticky?.right,
      })}>
      <table className={cx('w-full border-separate', styles.table)}>
        <thead>
          <tr className="text-gray-800">{renderHeader}</tr>
        </thead>
        <tbody>{renderBody}</tbody>
      </table>
    </div>
  );
};
