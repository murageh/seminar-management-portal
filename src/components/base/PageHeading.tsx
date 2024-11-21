import Loader from "../loaders/Loaders.tsx";
import {RefreshButton} from "./RefreshButton.tsx";
import React from "react";

export function PageHeading(props: { heading: string, loading: boolean, onClick: () => void }) {
    return <div className="w-full flex items-center justify-between">
        <h1 className="w-full flex-grow text-3xl font-bold sticky top-0">{props.heading}</h1>
        {
            props.loading ?
                <Loader/>
                :
                <>
                    {/*  Refresh button  */}
                    <RefreshButton onClick={props.onClick}/>
                </>
        }
    </div>;
}