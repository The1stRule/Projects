const form = document.getElementById('myForm');
const productsDiv = document.getElementById('products-div');
const totalP = document.getElementById('total');
const filterForm = document.getElementById('filter-form');

let products = [];
let id = 1;
let total;

// პროდუქტის ობიექტის კონსტრუქტორი
function Product(title, price, quantity, id) {
    this.title = title;
    this.price = parseFloat(price);
    this.quantity = parseInt(quantity, 10);
    this.id = id;
}

// ფუნქცია, როემლიც წამოიღებს form-ში ჩაწერილ ინფორმაციას და შეამომწებს არის თუ არა ობიექტი ასეთი პარამეტრით,
// ობიექტების სიაში. თუ კი გაზრდის მის quantity-ს, სხვა შემთხვევაში შექმნის ახალ ობიექტს და ჩაამატებს სიაში products
const formSubmit = () => {
    const title = form.title.value;
    const price = form.price.value;
    const quantity = form.quantity.value;
    const filteredProduct = products.filter(curValue => curValue.title === title && curValue.price === parseFloat(price));
    
    if(filteredProduct.length > 0) {
        const p = document.getElementById(`${filteredProduct[0].id}`).children[1].children[1];
        productQuantity(p, Number(quantity));
    } else {
        const product = new Product(title, price, quantity, id);
        id++
        products.push(product);
        addToCart();
    }
    // form.reset();
}

// ფილტრავს და არ ამატებს განახლებულ სიაში ისეთ ობიექტებს,
// რომელების quantity კუთვნილების მნიშვნელობა არის 0
const productsFilter = () => {
    products = products.filter(curValue => curValue.quantity > 0);
    addToCart();
}

// +, ან - ის დაკლიკებისას გაეშვება ეს ფუქნცია, რომელიც შეცვლის
// quantity პარაგრაფს, product-ს სიაში კონკტეტული ობიექტის quantity კუთვნილების მნიშვნელობას
const productQuantity = (p, quantityChange) => {
    if(quantityChange > 0) {
        products.forEach(curValue => {
            if(curValue.id === parseInt(p.parentElement.parentElement.id, 10)) {
                curValue.quantity += quantityChange;
            }
        })
    } else {
        products.forEach(curValue => {
            if(curValue.id === parseInt(p.parentElement.parentElement.id, 10)) {
                curValue.quantity += quantityChange;
            }
        })
    }
    productsFilter();
}

const priceFilter = (maxPrice) => {
    products = products.filter(curValue => curValue.price * curValue.quantity <= maxPrice);
}

const quantityFilter = (maxQuantity) => {
    products = products.filter(curValue => curValue.quantity <= maxQuantity);
}

const findProducts = () => {
    const maxPrice = filterForm.maxPrice.value;
    const maxQuantity = filterForm.maxQuantity.value;

    if(maxPrice === '' && maxQuantity === '') {
        alert('Please fill out filds');
        return;
    }

    if(maxPrice !== '') {
        priceFilter(maxPrice);
    }

    if(maxQuantity !== '') {
        quantityFilter(maxQuantity);
    }

    addToCart();
}

const calculateDiscount = (total) => {
    return (total / 100) * 10;
}

// ვანახლებთ მთავარი დივის innerHTML-ს
const addToCart = () => {
    productsDiv.innerHTML = '';
    total = 0;
    let priceP;

    products.forEach(curValue => {
        const oldPrice = curValue.price * curValue.quantity

        if(curValue.price * curValue.quantity < 100){
            priceP = oldPrice;
        } else {
            priceP = oldPrice - calculateDiscount(oldPrice);
        }

        total += priceP;
        const pr = `
            <div id="${curValue.id}" class="product">
                <p class="title">${curValue.title}</p>
                <div class="quantity-div">
                    <p class="minus" onclick="productQuantity(this, -1)">-</p>
                    <p class="quantity">${curValue.quantity}</p>
                    <p class="plus" onclick="productQuantity(this, 1)">+</p>
                </div>
                <div class="price-div">
                    <p class="discount-p" id="line" style="display: ${oldPrice < 100 ? 'none' : 'block'};">Old Price: ${(oldPrice).toFixed(2)}$</p>
                    <p class="price">Price: ${priceP.toFixed(2)}$</p>
                    <p class="discount-p" style="display: ${oldPrice < 100 ? 'none' : 'block'};">Discount: -${calculateDiscount(oldPrice).toFixed(2)}$</p>
                </div>
                <i class="fa-solid fa-xmark" onclick="removeProduct(this)"></i>
            </div>`
        productsDiv.innerHTML += pr;
    })

    totalP.textContent = `Total: ${total.toFixed(2)}$`;
}

const removeProduct = (icon) => {
    const parentElementId = icon.parentElement.id;
    products = products.filter(curValue => curValue.id !== Number(parentElementId));
    addToCart();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    formSubmit();

    form.reset();
})

filterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    findProducts();

    filterForm.reset();
})