import React from 'react';
import {toast} from "react-toastify";
import {Seminar} from "../../dtos/Seminar.ts";

interface SeminarTableProps {
    seminars: Seminar[];
}

const SeminarTable: React.FC<SeminarTableProps> = ({seminars}) => {
    const handleNoClick = (seminarName: string) => {
        toast.info(`Seminar: ${seminarName}`);
    };

    return (
        <>
            <table className="border-collapse table-auto w-full text-sm">
                <thead className="bg-white">
                <tr>
                    <th className="sticky top-0 bg-white border-b font-medium p-4 pr-8 pt-4 pb-3 text-slate-600 text-left">No</th>
                    <th className="sticky top-0 bg-white border-b font-medium p-4 pr-8 pt-4 pb-3 text-slate-600 text-left">Name</th>
                    <th className="sticky top-0 bg-white border-b font-medium p-4 pr-8 pt-4 pb-3 text-slate-600 text-left">Duration</th>
                    <th className="sticky top-0 bg-white border-b font-medium p-4 pr-8 pt-4 pb-3 text-slate-600 text-left">Price</th>
                    <th className="sticky top-0 bg-white border-b font-medium p-4 pr-8 pt-4 pb-3 text-slate-600 text-left">Gen
                        Prod Posting
                        Group
                    </th>
                    <th className="sticky top-0 bg-white border-b font-medium p-4 pr-8 pt-4 pb-3 text-slate-600 text-left">VAT
                        Prod Posting
                        Group
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white">
                {seminars.map((seminar) => (
                    <tr key={seminar.no}>
                        <td
                            className="border-b border-slate-200 p-4 pl-8 text-slate-700 underline decoration-dashed cursor-pointer"
                            title={seminar.name}
                            onClick={() => handleNoClick(seminar.name)}
                        >
                            {seminar.no}
                        </td>
                        <td className="border-b border-slate-200 p-4 pl-8 text-slate-700">{seminar.name}</td>
                        <td className="border-b border-slate-200 p-4 pl-8 text-slate-700">{seminar.seminarDuration}</td>
                        <td className="border-b border-slate-200 p-4 pl-8 text-slate-700">{seminar.seminarPrice}</td>
                        <td className="border-b border-slate-200 p-4 pl-8 text-slate-700">{seminar.gen_Prod_Posting_Group}</td>
                        <td className="border-b border-slate-200 p-4 pl-8 text-slate-700">{seminar.vaT_Prod_Posting_Group}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
};

export default SeminarTable;