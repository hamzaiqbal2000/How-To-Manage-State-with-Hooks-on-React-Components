import React, { useReducer } from "react";
import "./Product.css";

const currencyOptions = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
};

const products = [
  {
    emoji: "🍦",
    name: "ice cream",
    price: 5,
  },
  {
    emoji: "🍩",
    name: "donuts",
    price: 2.5,
  },
  {
    emoji: "🍉",
    name: "watermelon",
    price: 4,
  },
];

function getTotal(cart) {
  const total = cart.reduce((totalCost, item) => totalCost + item.price, 0);
  return total.toLocaleString(undefined, currencyOptions);
}

function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.product];
    case "remove":
      //   const update = [...state];
      //   update.splice(update.indexOf(action.name), 1);
      //   return update;
      const productIndex = state.findIndex(
        (item) => item.name === action.product.name
      );
      if (productIndex < 0) {
        return state;
      }
      const update = [...state];
      update.splice(productIndex, 1);
      return update;
    default:
      return state;
  }
}

// function totalReducer(state, action) {
//   switch (action.type) {
//     case "add":
//       return state + action.price;
//     case "remove":
//       return state - action.price;
//     default:
//       return state;
//   }
// }

const Product = () => {
  const [cart, setCart] = useReducer(cartReducer, []);

  function add(product) {
    // const { name, price } = product;
    // //setCart((current) => [...current, product.name]);
    // setCart({ name, type: "add" });
    // setTotal({ price, type: "add" });
    setCart({ product, type: "add" });
  }

  function remove(product) {
    //const { name, price } = product;
    setCart({ product, type: "remove" });
  }

  return (
    <div className="wrapper">
      <div>Shopping Card: {cart.length} total items</div>
      <div>Total: {getTotal(cart)}</div>
      <div>
        {products.map((product) => (
          <div key={product.name}>
            <div className="product">
              <span role="img" aria-label={product.name}>
                {product.emoji}
              </span>
            </div>
            <button onClick={() => add(product)}>Add</button>
            <button
              onClick={() => {
                remove(product);
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
