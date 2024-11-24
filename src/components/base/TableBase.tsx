import React from 'react';

export type TableAccessor<T> = keyof T | ((item: T) => string);
export type TableColumn<T> = {
    header: string;
    accessor: TableAccessor<T>;
    underline?: 'none' | 'solid' | 'dashed';
}

export type TableBaseProps<T> = {
    data: T[];
    columns: TableColumn<T>[];
    onRowClick?: (item: T) => void;
}

const TableBase = <T, >({data, columns, onRowClick}: TableBaseProps<T>) => {
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
            {data.map((item, index) => (
                <tr key={index} onClick={() => onRowClick && onRowClick(item)} className="cursor-pointer">
                    {columns.map((column) => (
                        <td key={column.accessor as string}
                            className={`border-b border-slate-200 p-4 pl-4 text-slate-700 ${column.underline ? `underline decoration-${column.underline} underline-offset-8 cursor-pointer` : ''}`}>
                            {/* @ts-expect-error Accessor could be null */}
                            {item[column.accessor] || '-'}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default TableBase;