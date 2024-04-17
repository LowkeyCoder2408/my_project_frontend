import CartItemModel from '../models/CartItemModel';
import { backendEndpoint } from '../utils/Constant';
import { getUserIdByToken } from '../utils/JwtService';
import { myRequest } from './MyRequest';
import { getProductByCartItemId } from './ProductAPI';

export async function getCartAllByIdUser(): Promise<CartItemModel[]> {
  const idUser = getUserIdByToken();
  const endpoint =
    backendEndpoint +
    `/cart-item/search/findByCustomer_Id?customerId=${idUser}`;
  try {
    const cartResponse = await myRequest(endpoint);

    if (cartResponse) {
      const cartsResponseList: CartItemModel[] = await Promise.all(
        cartResponse._embedded.cartItems.map(async (item: any) => {
          const productResponse = await getProductByCartItemId(item.id);
          return { ...item, product: productResponse };
        }),
      );
      return cartsResponseList;
    }
  } catch (error) {
    console.error('Error: ', error);
  }
  return [];
}
