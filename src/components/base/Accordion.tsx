import React, {useState} from 'react';
import {FaChevronDown, FaChevronUp} from 'react-icons/fa6';

interface AccordionProps {
    title: string;
    theme: 'plain' | 'neutral' | 'success' | 'info' | 'warning';
    children: React.ReactNode;
    collapsed?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({title, theme, children, collapsed}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const themeClasses = {
        plain: 'bg-transparent text-gray-800',
        neutral: 'bg-gray-100 text-gray-800',
        success: 'bg-green-100 text-green-800',
        info: 'bg-blue-100 text-blue-800',
        warning: 'bg-yellow-100 text-yellow-800',
    };

    return (
        <div className={`accordion ${themeClasses[theme]} rounded-lg shadow-md`}>
            <div
                className="accordion-header flex justify-between gap-x-4 items-center p-4 cursor-pointer"
                onClick={toggleAccordion}
            >
                {!collapsed && <span className="font-semibold">{title}</span>}
                {isOpen ? <FaChevronUp/> : <FaChevronDown/>}
            </div>
            {isOpen && <div className="accordion-content p-4 border-t border-gray-200">{children}</div>}
        </div>
    );
};

export default Accordion;