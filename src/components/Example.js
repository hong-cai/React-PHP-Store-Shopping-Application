import React, { useState,useEffect} from 'react';
import ButtonStyled2 from "../components/layouts/ButtonStyled2";

const SongList = () => {
    let [count, setCount] = useState(0);

    const increCount = (element) => {
        element.preventDefault();
        setCount(++count);
        //IMPORTANT:setSongs([...songs, { title: "new one", id: 3 }])
    };

    const decreCount = (element) => {
        element.preventDefault();
        setCount(count > 0 ? --count : 0);
    };


    return (
        <div>
            <form>
                <label>Count:</label>
                <ButtonStyled2 type="submit" onClick={increCount}> <i className="fa fa-plus" aria-hidden="true"></i> </ButtonStyled2>

                <input value={count} type='number' onChange={(element) => { setCount(element.target.value++) }} />

                <ButtonStyled2 type="submit" onClick={decreCount}> <i className="fa fa-minus" aria-hidden="true"></i> </ButtonStyled2>
                <h5>{count}</h5>
            </form>
        </div>
    );
}

export default SongList;
