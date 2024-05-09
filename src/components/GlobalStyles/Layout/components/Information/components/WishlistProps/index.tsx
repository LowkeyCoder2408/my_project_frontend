import { useEffect, useState } from 'react';
import FavoriteProductModel from '../../../../../../../models/FavoriteProductModel';
import { getUserIdByToken } from '../../../../../../../utils/JwtService';
import ProductModel from '../../../../../../../models/ProductModel';
import { getProductByFavoriteProductId } from '../../../../../../../api/ProductAPI';
import ProductProps from '../../../../../../../pages/ProductList/components/ProductProps';

interface WishlistPropsProps {
  favoriteProduct: FavoriteProductModel;
}

function WishlistProps(props: WishlistPropsProps) {
  const customerId = getUserIdByToken();
  const [product, setProduct] = useState<ProductModel | null>(null);

  useEffect(() => {
    getProductByFavoriteProductId(props.favoriteProduct.id)
      .then((result) => {
        setProduct(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <>{product && <ProductProps product={product} />}</>;
}

export default WishlistProps;
