import {MdRefresh} from "react-icons/md";

export function RefreshButton(props: { onClick: () => void }) {
    return <div className="flex justify-end mb-2">
        <button onClick={props.onClick}
                className="bg-gray-200 hover:bg-blue-200 text-black font-bold py-2 px-4 rounded-full">
            <MdRefresh size="24"/>
        </button>
    </div>;
}