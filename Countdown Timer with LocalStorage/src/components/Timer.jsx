
import { useEffect, useState } from 'react';

const Timer = () => {
    const [seconds, setSeconds] = useState(JSON.parse(localStorage.getItem("seconds")) || 0);
    const [count, setCount] = useState(0);
    const [isOnTimer, setIsOnTimer] = useState("off");

    useEffect(() => {
        console.log("re-render");
        if(seconds > 0 && isOnTimer === "on") {
            setTimeout(() => {
                if(isOnTimer === "on") {
                    setCount(count + 1);
                    setSeconds(seconds - 1);
                    localStorage.setItem("seconds", JSON.stringify(seconds - 1))
                }
            }, 1000)
        }
    }, [seconds])

    console.log(count)

    const handleSubmit = (e) => {
        e.preventDefault();

        const sec = Number(e.target.seconds.value);
        e.target.reset();
        setIsOnTimer("on");
        setSeconds(sec);
    }

    const handleStart = () => {
        if(seconds > 0) {
            setIsOnTimer("on");
            setSeconds(seconds - 1);
        }
    }

    const handleStop = () => {
        setIsOnTimer("off");
    }

    return (
        <>
            <h1>Timer!</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="seconds" placeholder="Enter timer start value" required />
                <button>Submit</button>
            </form>
            <div id="timer-section">
                <h2>
                    {
                        seconds === 0 && count === 0? "Hello Timer!" : (seconds === 0? "Stop timer!" : seconds)
                    }
                </h2>
                <div id="btn-div">
                    <button id="start-btn" className="timer-btn" onClick={handleStart}>Start timer</button>
                    <button id="stop-btn" className="timer-btn" onClick={handleStop}>Stop timer</button>
                </div>
            </div>
        </>
    );
}

export default Timer;
