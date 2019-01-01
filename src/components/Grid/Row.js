import React from "react";


// Row component, children will hold additional compoanents and content.
export const Row = ({children}) => (
    <div className="row">
        {children}
    </div>
);

export default Row;