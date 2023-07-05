import React from "react";
import Content from "./Content";
import Map from "./Map";
import Search from "./Search";
import Result from "./Result";
import "../../css/planner/Planner.css";

function Planner() {
    return (
        <div id="planner">
            <Map />
            <Search />
            <Content />
            <Result />
        </div>
    );
}

export default Planner;
