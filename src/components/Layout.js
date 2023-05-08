import React, { useRef, useState, useEffect } from 'react';
import '../App.css'
import Square from './Square';

const Layout = () => {
    const [ turn, setTurns] = useState('X');
    const [winner, setWinner] = useState('');
    const [currentMove, setCurrentMove] = useState(0);
    const [button, setButton] = useState(['go to starting move']);
    const [pastMoves, setPastMoves] = useState([['','','','','','','','','']]);
    const [squareValue, setSquareValue]  = useState(['','','','','','','','','']);
    const rowsAndColumns = useRef([[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]);
    
    const handleSquareClick = (i) => {
        if(!squareValue[i] && !winner) {
            const nextSquares = squareValue.slice();
            nextSquares[i] = turn;
            const nextHistory = [...pastMoves.slice(0,currentMove+1), nextSquares];
            console.log(...pastMoves.slice(0,currentMove+1),pastMoves.slice(0,currentMove+1))
            setPastMoves(nextHistory);
            setSquareValue(nextSquares);
            setCurrentMove(nextHistory.length-1)
        }
    }

    const handleGetPastMove = (moveNumber) => {
        setWinner('');
        setCurrentMove(moveNumber)
        setSquareValue(pastMoves[moveNumber]);
    }
    useEffect(() => {
        rowsAndColumns.current.every(line => {
            if(squareValue[line[0]] && squareValue[line[1]] && squareValue[line[2]]) {
                if((squareValue[line[0]] === squareValue[line[1]]) &&  (squareValue[line[1]] === squareValue[line[2]]) && (squareValue[line[2]] === squareValue[line[0]])) {
                    setWinner(squareValue[line[0]]);
                    return false;
                }
            }
            return true;
        })
    }, [squareValue])

    useEffect(() => {
        const des = [];
        for(let i=0;i<pastMoves.length;i++) {
            if(i === 0){
                des.push(`Go to starting move`)
            } else {
                des.push(`Go to ${i} move`)
            }    
        }
        setButton(des)
    },[pastMoves])

    useEffect(()=> {
        setTurns(currentMove % 2 === 0 ? "X" : "O");
    },[currentMove])
    return (
    <>
        {winner && <p>Winner : {winner}</p>}
        <div className='container'>
        <div className='layout'>
            <Square squareValue={squareValue[0]} handleClick={() => { handleSquareClick(0) }} />
            <Square squareValue={squareValue[1]} handleClick={() => { handleSquareClick(1) }} />
            <Square squareValue={squareValue[2]} handleClick={() => { handleSquareClick(2) }} />
            <Square squareValue={squareValue[3]} handleClick={() => { handleSquareClick(3) }} />
            <Square squareValue={squareValue[4]} handleClick={() => { handleSquareClick(4) }} />
            <Square squareValue={squareValue[5]} handleClick={() => { handleSquareClick(5) }} />
            <Square squareValue={squareValue[6]} handleClick={() => { handleSquareClick(6) }} />
            <Square squareValue={squareValue[7]} handleClick={() => { handleSquareClick(7) }} />
            <Square squareValue={squareValue[8]} handleClick={() => { handleSquareClick(8) }} />
        </div>
        <div > 
            {button.map((val,index) => <button className='past-moves' onClick={() => handleGetPastMove(index)}>{val}</button> )}
        </div>
        </div>
    </>)
}

export default Layout;