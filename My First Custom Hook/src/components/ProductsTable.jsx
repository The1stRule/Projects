import Product from "./Product.jsx";

const ProductsTable = ({ curUser, setCurUser }) => {
    return (
        <div>
            <h3>Products Table</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Edit</th>
                        <th>Del</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        curUser.products.map((curValue, index) => {
                            return (
                                <Product key={curValue.id} index={index} curValue={curValue} setCurUser={setCurUser} />
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ProductsTable;