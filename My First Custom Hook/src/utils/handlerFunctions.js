import { getLocalStorage, setLocalStorage } from "./localStorage";

const register = (target, formData, setData, navigate, handleError) => {
    for(const user of getLocalStorage("users")) {
        if(user.email === formData.email) {
            handleError(true);
            return;
        }
    }

    handleError(false);
    target.reset();
    setLocalStorage("users", { ...formData, products: [] });
    setData(prev => [...prev, { ...formData, products: [] }]);
    navigate("/authorization");
}

const authorization = (target, formData, setData, navigate, handleError) => {
    
    for(const user of getLocalStorage("users")) {
        if(user.email === formData.email && user.password === formData.password) {
            setLocalStorage("curUser", user);
            target.reset();
            handleError(false);
            setData(user);
            navigate("/");
        }
    }

    handleError(true);
}

const addProduct = (target, formData, setData) => {
    target.reset();
    formData.price = Number(formData.price);
    setData(prev => {
        setLocalStorage("curUser", { ...prev, products: [...prev.products, { id: Date.now(), ...formData }] });
        return { ...prev, products: [...prev.products, { id: Date.now(), ...formData }] };
    })
}

const handleDelete = (setData, delId) => {
    setData(prev => {
        const filteredProducts = prev.products.filter(curValue => curValue.id !== delId);
        setLocalStorage("curUser", { ...prev, products: [...filteredProducts] })
        return { ...prev, products: [...filteredProducts] };
    })
}

const changePrice = (setCurUser, productId, newPrice) => {
    setCurUser(prev => {
        const filteredProducts = prev.products.map(curValue => {
            if(curValue.id === productId) {
                return { ...curValue, price: Number(newPrice) }
            }

            return curValue;
        });

        setLocalStorage("curUser", { ...prev, products: filteredProducts });
        return { ...prev, products: filteredProducts };
    })
}

export { register, authorization, addProduct, handleDelete, changePrice };