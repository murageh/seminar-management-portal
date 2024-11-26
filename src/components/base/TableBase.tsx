import React from 'react';

export type TableAccessor<T> = keyof T | ((item: T) => string);
export type TableColumn<T> = {
    header: string;
    accessor: TableAccessor<T>;
    underline?: 'none' | 'solid' | 'dashed';
    format?: (value: any) => string;
}

export type TableBaseProps<T> = {
    data: T[];
    columns: TableColumn<T>[];
    onRowClick?: (item: T) => void;
    loading?: boolean;
    emptyText?: string;
    emptyComponent?: React.ReactNode;
}

const TableBase = <T, >({data, columns, onRowClick, loading, ...rest}: TableBaseProps<T>) => {
    // Helper function to calculate the data based on the format function, and accessor. Should be memoized
    // once we access the data using the accessor, we can format it using the format function if it is defined
    const calcData = React.useCallback((item: T, accessor: TableAccessor<T>, format?: (value: any) => string) => {
        let data;
        if (typeof accessor === 'function') {
            data = accessor(item);
            data = format ? format(data) : data;
        } else {
            data = item[accessor];
            data = format ? format(data) : data;
        }

        return (data ?? '') as React.ReactNode;
    }, []);

    return (
        <table className="border-collapse table-auto w-full text-sm">
            <thead className="bg-white">
            <tr>
                {columns.map((column) => (
                    <th key={column.header}
                        className="sticky top-0 bg-white border-b font-medium p-4 pr-8 pt-4 pb-3 text-slate-600 text-left">
                        {column.header}
                    </th>
                ))}
            </tr>
            </thead>
            <tbody className="bg-white">
            {
                loading ? (
                    <tr>
                        <td colSpan={columns.length} className="text-center">
                            <div role="status" className="my-2">
                                <svg aria-hidden="true"
                                     className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"/>
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"/>
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </td>
                    </tr>
                ) : null
            }
            {
                !loading && data.length === 0 ? (
                    <tr>
                        <td colSpan={columns.length}
                            className="border-b border-slate-200 p-4 pl-4 text-slate-700 text-center">
                            {
                                rest.emptyText || 'Oh-oh! It seems there is nothing to display here.'
                            }
                            {
                                rest.emptyComponent || null
                            }
                        </td>
                    </tr>
                ) : null
            }
            {data.map((item, index) => (
                <tr key={index} onClick={() => onRowClick && onRowClick(item)} className="cursor-pointer">
                    {columns.map((column) => (
                        <td key={column.accessor as string}
                            className={`border-b border-slate-200 p-4 pl-4 text-slate-700 ${column.underline ? `underline decoration-${column.underline} underline-offset-8 cursor-pointer` : ''}`}>
                            {calcData(item, column.accessor, column.format)}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default TableBase;