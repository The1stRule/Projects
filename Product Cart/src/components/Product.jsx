import { useState } from "react";
import { changePrice, handleDelete } from "../utils/handlerFunctions.js";

const Product = ({ index, curValue, setCurUser }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [userInput, setUserInput] = useState(curValue.price.toString());

    const handleChange = (e) => {
        setUserInput(e.target.value);
    }

    const handleClick = () => {
        setIsEdit(prev => !prev);
    }

    const handleSave = () => {
        handleClick();
        changePrice(setCurUser, curValue.id, userInput);
    }

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{curValue.title}</td>
            <td>${!isEdit ? `${curValue.price}` : <input type="text" maxLength="6" value={userInput} onChange={handleChange} />}</td>
            <td>{isEdit ? <button onClick={handleSave}>Save</button> : <button onClick={handleClick}>Edit price</button>}</td>
            <td><button onClick={() => handleDelete(setCurUser, curValue.id)}>Del</button></td>
        </tr>
    );
}

export default Product;