import React from 'react';

interface PropertyTableProps {
    data: { property: string, value: string }[];
}

const PropertyTable: React.FC<PropertyTableProps> = ({data}) => {
    return (
        <table className="border-collapse table-auto w-full text-sm">
            <tbody className="bg-white">
            {data.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="border-b border-slate-200 p-4 text-slate-700 font-medium">{item.property}</td>
                    <td className="border-b border-slate-200 p-4 text-slate-700">{item.value}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default PropertyTable;