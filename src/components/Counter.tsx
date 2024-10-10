import {useState} from "react";
import './Counter.scss'

export const Counter = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    }

    return (
        <div className="counter">
            <h1>{count}</h1>
            <button onClick={increment}>+1</button>
        </div>
    )
}
