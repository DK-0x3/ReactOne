import {useState} from "react";
import * as classes from './Counter.module.scss';

const Counter = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    }

    return (
        <div className={classes.btn}>
            <h1>{count}</h1>
            <button onClick={increment}>+1</button>
        </div>
    )
}

export default Counter;
