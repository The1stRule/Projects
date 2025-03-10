import { addProduct } from "../utils/handlerFunctions.js";

const AddProduct = ({ setCurUserForm }) => {
    return (
        <form onSubmit={(e) => setCurUserForm(e, addProduct)}>
            <input type="text" name="title" maxLength="24" placeholder="Enter product title" required />
            <input type="text" name="price" maxLength="6" placeholder="Enter product price" required />
            <button>Add</button>
        </form>
    );
}

export default AddProduct;