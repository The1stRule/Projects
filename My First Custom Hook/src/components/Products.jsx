import AddProduct from "./AddProtuct.jsx";
import ProductsTable from "./ProductsTable.jsx";

const Products = ({ curUser, setCurUserForm, setCurUser }) => {
    return (
        <section>
            <h1>Products</h1>
            <div className="p-btn">
                <p>Welcome <span>{curUser.fullname}</span></p>
                <button onClick={() => setCurUser({})} >Log out</button>
            </div>
            <h3>Add product</h3>
            <AddProduct setCurUserForm={setCurUserForm} />
            <div className="table-div">
                {
                    curUser.products?.length > 0 ? <ProductsTable curUser={curUser} setCurUser={setCurUser} /> :
                        <p>No products</p>
                }
            </div>
        </section>
    );
}

export default Products;