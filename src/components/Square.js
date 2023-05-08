import React, {} from 'react';
import '../App.css'

const Square = (props) => {
    const {squareValue, handleClick} = props;

    return <>
        <div className="box"><button onClick={()=>handleClick()}>{squareValue}</button></div>
    </>;
}

export default Square;