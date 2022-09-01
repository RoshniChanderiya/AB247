import { ChevronDown, ChevronRight, Search } from "@/assets/images";
import ColumnSort from "@/components/ColumnsSort";
import ThemeInput, { ThemeInputProps } from "@/components/ThemeInput";
import classNames from "classnames";
import debounce from "lodash/debounce";
import get from "lodash/get";
import omit from "lodash/omit";
import toLower from "lodash/toLower";
import React, {
  ChangeEvent,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { Col, Row, Spinner, Table as NativeTable } from "reactstrap";
import styles from "./styles.module.scss";

export interface ColumnProps<T> {
  name: string;
  dataKey: string;
  render?:
    | ((value: any, item: T, index?: number) => React.ReactNode)
    | ((value: any, item?: T, index?: number) => React.ReactNode);
  sort?: boolean;
  align?: React.CSSProperties["textAlign"];
  width?: number | `${number}%`;
}
type RowProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
>;
export interface TableProps<T> {
  columns: ColumnProps<T>[];
  items: T[];
  rowKey?: string;
  loading?: boolean;
  searchable?:
    | boolean
    | (Omit<ThemeInputProps, "onChanage"> & {
        onChange?: (value: string) => void | Promise<void>;
      });
  expandable?: {
    heading?: string;
    align?: ColumnProps<T>["align"];
    expandedRowRender: (item: T) => React.ReactNode;
  };
  title?: string;
  rowProps?: (item: T, index: number) => Omit<RowProps, "onClick">;
  headerRowProps?: RowProps;
}
export interface TableRef {
  search?: (value: string) => void;
}
const Table: React.ForwardRefRenderFunction<TableRef, TableProps<any>> = (
  {
    columns,
    items,
    rowKey = "id",
    loading,
    searchable,
    expandable,
    title,
    rowProps = () => ({}),
    headerRowProps = {},
  },
  ref
) => {
  const [expandedRow, setExpandedRow] = useState(-1);
  const [tableData, setTableData] = useState<any[]>(items);

  useEffect(() => {
    setTableData(items);
  }, [items]);

  const onRowExpand = (index: number) => {
    setExpandedRow(index);
  };

  const executeSearch = useMemo(
    () =>
      debounce((value: string) => {
        if (typeof searchable === "object" && searchable.onChange) {
          searchable.onChange(value);
          return;
        }
        const keys = columns.map((column) => column.dataKey);

        const newTableData: any[] = items.filter((item: any) =>
          keys.some((key) =>
            toLower(get(item, key, "")).includes(toLower(value))
          )
        );

        setTableData(newTableData);
      }, 500),
    [searchable, columns, items]
  );

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    executeSearch(e.target.value);
  };

  useImperativeHandle(ref, () => ({
    search: (value: string) => {
      executeSearch(value);
    },
  }));

  return (
    <Row className="m-0 p-0">
      {searchable && (
        <Row className={styles.searchHeader}>
          <Col xs={12} lg={2}>
            <h5 className={classNames(styles.heading, "ms-3")}>{title}</h5>
          </Col>
          <Col xs={12} lg={10} className="position-relative mt-3">
            <ThemeInput
              data-testid="table-search"
              label=""
              type="search"
              placeholder="Search.."
              onChange={onSearch}
              {...omit(searchable as ThemeInputProps, ["type", "onChange"])}
            />
            <Search className={styles.searchIcon} />
          </Col>
        </Row>
      )}
      <Col sm={12} className="p-0">
        <div className={styles.tableContainer}>
          <NativeTable className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr
                className={classNames(
                  styles.noBorder,
                  headerRowProps.className
                )}
                {...omit(headerRowProps, "className")}
              >
                {expandable && (
                  <th style={{ textAlign: expandable?.align }}>
                    {expandable.heading}
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.name}
                    style={{
                      width: column.width,
                    }}
                  >
                    <div
                      className={`d-flex justify-content-${
                        column?.align || "center"
                      }`}
                    >
                      <div className="my-auto">{column.name}</div>
                      {column.sort && <ColumnSort />}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={columns.length + 1} className="text-center">
                    <Spinner color="primary" />
                  </td>
                </tr>
              )}
              {!loading && tableData.length === 0 && (
                <tr className={styles.list}>
                  <td colSpan={columns.length + 1} className="text-center">
                    {items.length
                      ? "No data found for your search..."
                      : "No data found..."}
                  </td>
                </tr>
              )}
              {!loading &&
                tableData.map((item, itemIndex) => {
                  const actualRowProps: RowProps = rowProps(item, itemIndex);
                  return (
                    <React.Fragment key={item[rowKey]}>
                      <tr
                        className={classNames(
                          styles.list,
                          {
                            "cursor-pointer": expandable,
                          },
                          actualRowProps.className
                        )}
                        onClick={() => {
                          if (expandable) {
                            onRowExpand(
                              expandedRow === -1 || expandedRow !== itemIndex
                                ? itemIndex
                                : -1
                            );
                          }
                        }}
                        {...omit(actualRowProps, ["className"])}
                      >
                        {expandable && (
                          <td className="cursor-pointer">
                            <div
                              className={styles.expandIcon}
                              style={{ textAlign: expandable.align }}
                            >
                              {expandedRow === itemIndex ? (
                                <ChevronDown />
                              ) : (
                                <ChevronRight />
                              )}
                            </div>
                          </td>
                        )}

                        {columns.map((column, index) => (
                          <td
                            key={`${column.dataKey}-${index}`}
                            style={{ textAlign: column.align }}
                          >
                            {column.render
                              ? column.render(
                                  get(item, column.dataKey),
                                  item,
                                  index
                                )
                              : get(item, column.dataKey)}
                          </td>
                        ))}
                      </tr>
                      {expandable && expandedRow === itemIndex && (
                        <tr>
                          <td
                            colSpan={columns.length + 1}
                            className={styles.expandedRow}
                          >
                            {expandable.expandedRowRender(item)}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
            </tbody>
          </NativeTable>
        </div>
      </Col>
    </Row>
  );
};

export default React.forwardRef(Table);
