import React, { createContext, useContext, useEffect, useState } from 'react';
import CartItemModel from '../../models/CartItemModel';

interface CartItemProps {
  children: React.ReactNode;
}

interface CartItemType {
  cartList: CartItemModel[];
  setCartList: any;
  totalCart: number;
  setTotalCart: any;
}

const CartItem = createContext<CartItemType | undefined>(undefined);

export const CartItemProvider: React.FC<CartItemProps> = (props) => {
  const [cartList, setCartList] = useState<CartItemModel[]>([]);
  const [totalCart, setTotalCart] = useState(0);

  useEffect(() => {
    const cartData: string | null = localStorage.getItem('cart');
    let cart: CartItemModel[] = [];
    cart = cartData ? JSON.parse(cartData) : [];
    setCartList(cart);
    setTotalCart(cart.length);
  }, []);

  return (
    <CartItem.Provider
      value={{ cartList, setCartList, totalCart, setTotalCart }}
    >
      {props.children}
    </CartItem.Provider>
  );
};

export const useCartItem = (): CartItemType => {
  const context = useContext(CartItem);
  if (!context) {
    throw new Error('Lỗi context');
  }
  return context;
};

// import { ReactNode, createContext, useContext, useState } from 'react';
// import CartItemModel from '../../models/CartItemModel';
// import ProductModel from '../../models/ProductModel';

// interface CartContextProviderProps {
//   children: ReactNode;
// }

// // Định nghĩa các biến, function để thao tác với state
// interface CartContextType {
//   cartQuantity: number;
//   totalPrice: number;
//   cartItem: CartItemModel;
//   increaseQuantity: (id: number) => void;
//   decreaseQuantity: (id: number) => void;
//   addCartItem: (item: ProductModel) => void;
//   removeCartItem: (id: number) => void;
//   clearCart: (item: ProductModel) => void;
// }

// const CartContext = createContext<CartContextType>({} as CartContextType);

// // Sử dụng context CartContext. Hook này sẽ trả về giá trị hiện tại của context.
// export const useCartContext = () => {
//   return useContext(CartContext);
// };

// export const CartContextProvider = ({ children }: CartContextProviderProps) => {
//   const [cartItems, setCartItems] = useState<CartItemModel[]>([]);

//   const cartQuantity = cartItems.reduce(
//     (quantity, item) => quantity + (item.quantity ?? 0),
//     0,
//   );

//   const totalPrice = cartItems.reduce(
//     (total, item) =>
//       total + (item.quantity ?? 0) * (item.product.currentPrice ?? 0),
//     0,
//   );

//   const increaseQuantity = (id: number) => {
//     console.log('increaseQty => ', id);
//     const currentCartItem = cartItems.find((item) => item.id === id);

//     if (currentCartItem) {
//       const newItems = cartItems.map((item) => {
//         if (item.id === id) {
//           const newQuantity = (item.quantity ?? 0) + 1;
//           return { ...item, quantity: newQuantity };
//         } else {
//           return item;
//         }
//       });
//       setCartItems(newItems);
//     }
//   };

//   const decreaseQuantity = (id: number) => {
//     console.log('decreaseQty => ', id);
//     const currentCartItem = cartItems.find((item) => item.id === id);

//     if (currentCartItem) {
//       if (currentCartItem.quantity === 1) {
//         removeCartItem(id);
//       }
//       const newItems = cartItems.map((item) => {
//         if (item.id === id) {
//           const newQuantity = (item.quantity ?? 0) - 1;
//           return { ...item, quantity: newQuantity };
//         } else {
//           return item;
//         }
//       });
//       setCartItems(newItems);
//     }
//   };

//   const addCartItem = (product: ProductModel) => {
//     console.log('product => ', product.id);
//     if (product) {
//       const currentCartItem = cartItems.find((item) => item.id === product.id);
//       if (currentCartItem) {
//         const newItems = cartItems.map((item) => {
//           if (item.id === product.id) {
//             const newQuantity = (item.quantity ?? 0) + 1;
//             return { ...item, quantity: newQuantity };
//           } else {
//             return item;
//           }
//         });
//         setCartItems(newItems);
//       } else {
//         const newItem = { ...product, quantity: 1 };
//         setCartItems([...cartItems, newItem]);
//       }
//     }
//   };

//   const removeCartItem = (id: number) => {
//     console.log('removeCartItem => ', id);
//   };

//   return (
//     <CartContext.Provider
//       value={{ cartItems, cartQuantity, totalPrice, increaseQuantity }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export default CartContext;
