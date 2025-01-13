import { useState, useEffect } from 'react';

const calcdetails = [7, 8, 9, "DEL", 4, 5, 6, "+", 1, 2, 3, "-", ".", 0, "/", "x", "RESET", "="];

const Calculator = () => {
    const [operators, setOperator] = useState([]);
    const [firstNum, setFirstNum] = useState("");
    const [secondNum, setSecondNum] = useState("");
    const [isFirst, setIsFirst] = useState(false);

    useEffect(() => {
        if(operators.length === 1 && operators[0] === "=") {
            setOperator([]);
        } else if(operators.length === 2) {
            setIsFirst(true);
            if(operators[0] === "+") {
                setFirstNum(prev => `${Number(prev) + Number(secondNum)}`);
            } else if(operators[0] === "-") {
                setFirstNum(prev => `${Number(prev) - Number(secondNum)}`);
            } else if(operators[0] === "x") {
                setFirstNum(prev => `${Number(prev) * Number(secondNum)}`);
            } else {
                if(secondNum === "0") {
                    setFirstNum("ERROR");
                } else {
                    setFirstNum(prev => `${Number(prev) / Number(secondNum)}`);
                }
            }

            String(firstNum) === "NaN" && setFirstNum("ERROR");

            setSecondNum("");
            operators[1] !== "=" ? setOperator(prev => [prev[1]]) : setOperator([]);
        }

        console.log(operators)
    }, [operators]);

    useEffect(() => {
        console.log(firstNum, secondNum)
    })


    const handleClick = (itemValue) => {
        if(itemValue === "DEL") {
            secondNum === "" ? setFirstNum("") : setSecondNum("");
        } else if(itemValue === "RESET") {
            setFirstNum("");
            setSecondNum("");
            setOperator([]);
        } else if (typeof itemValue === "number" || itemValue === ".") {
            if(operators.length < 1) {
                if(itemValue === "." && !(firstNum.toString().includes(itemValue)) || typeof itemValue === "number") {
                    setFirstNum(prev => prev + itemValue)
                }
            } else {
                if(itemValue === "." && !(secondNum.includes(itemValue)) || typeof itemValue === "number") {
                    setSecondNum(prev => prev + itemValue)
                }
            }
        } else if(itemValue !== ".") {
            setOperator(prev => prev.length === 1 && prev[0] === itemValue && secondNum === "" ? [...prev] : [...prev, itemValue]);
        }
    }

    return (
        <>
            <div id="answers">
                {firstNum === "" ? "0" : (operators.length === 0 || isFirst && secondNum === "" ? 
                (firstNum[0] === "0" && firstNum[1] !== "." && firstNum.length === 2 ?  firstNum.slice(1, 17) : firstNum.slice(0, 17)) : 
                (secondNum === "" ? "0" : secondNum.slice(0, 17)))}
            </div>
            <div id="grid-div">
                {
                    calcdetails.map((curValue, index) => {
                        return (
                        <div key={index} onClick={() => handleClick(curValue)}>
                            <p>{curValue}</p>
                        </div>);
                    })
                }
            </div>
        </>
    );
}

export default Calculator;