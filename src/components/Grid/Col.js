import React from "react";

//Col Component
//the size prop will take in the the size of the column and add it to the className for the Materialize gridsystem
export const Col = ({size, children}) => (
    <div className= {`${size.split(" ").map(size => "col " + size).join(" ")}`}>
        {children}
    </div>
)

export default Col;