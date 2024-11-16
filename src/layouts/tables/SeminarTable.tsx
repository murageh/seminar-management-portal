import React from 'react';
import {Seminar} from '../../models/Seminar';

interface SeminarTableProps {
    seminars: Seminar[];
}

const SeminarTable: React.FC<SeminarTableProps> = ({seminars}) => {
    return (
        <div className="relative rounded-xl overflow-auto">
            <div className="shadow-sm my-8">
                <table className="border-collapse table-auto w-full text-sm">
                    <thead>
                    <tr>
                        <th className="border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-600 text-left">No</th>
                        <th className="border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-600 text-left">Name</th>
                        <th className="border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-600 text-left">Duration</th>
                        <th className="border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-600 text-left">Price</th>
                        <th className="border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-600 text-left">Gen Prod
                            Posting Group
                        </th>
                        <th className="border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-600 text-left">VAT Prod
                            Posting Group
                        </th>
                        <th className="border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-600 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white">
                    {seminars.map((seminar) => (
                        <tr key={seminar.no}>
                            <td className="border-b border-slate-200 p-4 pl-8 text-slate-700">{seminar.no}</td>
                            <td className="border-b border-slate-200 p-4 pl-8 text-slate-700">{seminar.name}</td>
                            <td className="border-b border-slate-200 p-4 pl-8 text-slate-700">{seminar.seminarDuration}</td>
                            <td className="border-b border-slate-200 p-4 pl-8 text-slate-700">{seminar.seminarPrice}</td>
                            <td className="border-b border-slate-200 p-4 pl-8 text-slate-700">{seminar.gen_Prod_Posting_Group}</td>
                            <td className="border-b border-slate-200 p-4 pl-8 text-slate-700">{seminar.vaT_Prod_Posting_Group}</td>
                            <td className="border-b border-slate-200 p-4 pl-8 text-slate-700">
                                <a href={`/seminars/${seminar.no}`}
                                   className="py-1 text-indigo-600 hover:text-indigo-900">
                                    <i className="text-base fa-regular fa-eye"></i>
                                </a>
                                <a href={`/seminars/edit/${seminar.no}`}
                                   className="py-1 text-indigo-600 hover:text-indigo-900">
                                    <i className="text-base fa-regular fa-pen-to-square"></i>
                                </a>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SeminarTable;