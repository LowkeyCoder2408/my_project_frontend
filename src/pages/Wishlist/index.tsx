import { useEffect, useState } from 'react';
import FavoriteProductModel from '../../models/FavoriteProductModel';
import { getFavoriteProductsByCustomerId } from '../../api/FavoriteProductAPI';
import { getUserIdByToken } from '../../utils/JwtService';
import ProductProps from '../ProductList/components/ProductProps';
import WishlistProps from '../../components/GlobalStyles/Layout/components/Information/components/WishlistProps';
import { Link } from 'react-router-dom';

function Wishlist() {
  const [favoriteProductList, setFavoriteProductList] = useState<
    FavoriteProductModel[]
  >([]);
  const customerId = getUserIdByToken();

  useEffect(() => {
    getFavoriteProductsByCustomerId(customerId)
      .then((result) => {
        console.log(result.favoriteProductList);
        setFavoriteProductList(result.favoriteProductList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [favoriteProductList]);

  return (
    <div className="container" style={{ marginTop: '50px' }}>
      {favoriteProductList.length > 0 ? (
        <>
          <h1>
            <strong>SẢN PHẨM YÊU THÍCH</strong>
          </h1>
          <div className="row mt-5">
            {favoriteProductList.map((favoriteProduct, index) => (
              <div
                key={index}
                className="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6 col-6"
              >
                <WishlistProps key={index} favoriteProduct={favoriteProduct} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="d-flex align-items-center justify-content-center flex-column p-5">
            <img
              className="mb-2"
              src="https://res.cloudinary.com/dgdn13yur/image/upload/v1715271544/empty_wishlist_mbo2jv.png"
              alt="success"
              style={{ width: '200px' }}
            />
            <h1 className="mt-5 mb-3 text-center">
              BẠN CHƯA YÊU THÍCH SẢN PHẨM NÀO
            </h1>
            <Link to={'/product-list'} className="mt-5">
              <div
                className="btn btn-dark py-2 px-4"
                style={{ fontSize: '16px', fontWeight: '450' }}
              >
                ĐI ĐẾN KHO HÀNG
              </div>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Wishlist;
