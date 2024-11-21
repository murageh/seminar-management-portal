import React from 'react';
import {Link, useLocation} from 'react-router-dom';

const BreadCrumbs: React.FC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <nav className="flex mt-6 mb-2 px-12 bg-transparent" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link to="/dashboard" className="text-gray-700 hover:text-gray-900">
                        Home
                    </Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;

                    return (
                        <li key={to} className="inline-flex items-center">
                            <span className="mx-2 text-gray-500">&nbsp;/&nbsp;</span>
                            {isLast ? (
                                <span className="text-gray-700 font-bold underline">{value}</span>
                            ) : (
                                <Link to={to} className="text-gray-700 hover:text-gray-900 font-normal">
                                    {value}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default BreadCrumbs;