import { useConfirm } from 'material-ui-confirm';
import CartItemModel from '../../../models/CartItemModel';
import { useCartItem } from '../../../utils/CartItemContext';
import { useEffect, useState } from 'react';
import { Skeleton, Tooltip } from '@mui/material';
import SelectQuantity from '../../../components/GlobalStyles/Layout/components/select-quantity/SelectQuantity';
import ProductImageModel from '../../../models/ProductImageModel';
import { getAllImageByProduct } from '../../../api/ProductImageAPI';
import { isToken } from '../../../utils/JwtService';
import { backendEndpoint } from '../../../utils/Constant';
import { Link } from 'react-router-dom';
import TextEllipsis from '../../../components/GlobalStyles/Layout/components/text-ellipsis/TextEllipsis';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { toast } from 'react-toastify';

interface ProductCartProps {
  cartItem: CartItemModel;
  handleRemoveProduct: any;
}

const ProductCartProps: React.FC<ProductCartProps> = (props) => {
  const { setCartList } = useCartItem();
  const confirm = useConfirm();

  // Tạo các biến
  const [quantity, setQuantity] = useState(
    props.cartItem.product.quantity !== undefined
      ? props.cartItem.quantity &&
        props.cartItem.quantity > props.cartItem.product.quantity
        ? props.cartItem.product.quantity
        : props.cartItem.quantity
      : props.cartItem.quantity,
  ); //Nếu số SP trong giỏ hàng > hiện có => chỉ lấy số SP hiện có

  const [imageList, setImageList] = useState<ProductImageModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [erroring, setErroring] = useState(null);

  function handleConfirm() {
    confirm({
      title: <span style={{ fontSize: '20px' }}>XÓA SẢN PHẨM</span>,
      description: (
        <span style={{ fontSize: '16px' }}>
          Bạn có chắc chắn rằng sẽ loại bỏ sản phẩm này khỏi giỏ hàng?
        </span>
      ),
      confirmationText: <span style={{ fontSize: '15px' }}>Đồng ý</span>,
      cancellationText: <span style={{ fontSize: '15px' }}>Huỷ</span>,
    })
      .then(() => {
        props.handleRemoveProduct(props.cartItem.product.id);
        if (isToken()) {
          const token = localStorage.getItem('token');
          fetch(backendEndpoint + `/cart-item/${props.cartItem.id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
              'content-type': 'application/json',
            },
          }).catch((err) => console.log('Lỗi khi xóa:', err));
        } else {
          toast.error('Bạn cần đăng nhập để thực hiện chức năng này!');
          return;
        }
      })
      .catch(() => {});
  }

  // Lấy ảnh ra từ BE
  useEffect(() => {
    getAllImageByProduct(props.cartItem.product.id)
      .then((response) => {
        setImageList(response);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setErroring(error.message);
      });
  }, [props.cartItem.product.id]);

  // Xử lý tăng số lượng
  const add = () => {
    if (quantity) {
      if (
        quantity <
        (props.cartItem.product.quantity ? props.cartItem.product.quantity : 1)
      ) {
        setQuantity(quantity + 1);
        handleModifiedQuantity(props.cartItem.product.id, 1);
      }
    }
  };

  // Xử lý giảm số lượng
  const reduce = () => {
    if (quantity) {
      // Nếu số lượng về không thì xoá sản phẩm đó
      if (quantity - 1 === 0) {
        handleConfirm();
      } else if (quantity > 1) {
        setQuantity(quantity - 1);
        handleModifiedQuantity(props.cartItem.product.id, -1);
      }
    }
  };

  // Xử lý cập nhật lại quantity trong localstorage / database
  function handleModifiedQuantity(id: number, quantity: number) {
    const cartData: string | null = localStorage.getItem('cart');
    const cart: CartItemModel[] = cartData ? JSON.parse(cartData) : [];
    // cái existingProduct này sẽ tham chiếu đến cái cart ở trên, nên khi update thì cart nó cũng update theo
    let existingProduct = cart.find((cartItem) => cartItem.product.id === id);
    // Thêm 1 sản phẩm vào giỏ hàng
    if (existingProduct) {
      // nếu có rồi thì sẽ tăng số lượng
      if (existingProduct && existingProduct.quantity !== undefined) {
        existingProduct.quantity += quantity;
      }

      // Cập nhật trong db
      if (isToken()) {
        const token = localStorage.getItem('token');
        fetch(backendEndpoint + `/cart-item/update-item`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            id: props.cartItem.id,
            quantity: existingProduct.quantity,
          }),
        }).catch((err) => console.log(err));
      }
    }
    // Cập nhật lại
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartList(cart);
  }

  if (loading) {
    return (
      <>
        <Skeleton className="my-3" variant="rectangular" />
      </>
    );
  }

  if (erroring) {
    return (
      <>
        <h4>Lỗi ...</h4>
      </>
    );
  }
  return (
    <>
      <div className="col">
        <div className="d-flex">
          <Link to={`/product/${props.cartItem.product.alias}`}>
            <img
              src={props.cartItem.product.mainImage}
              className="card-img-top"
              alt={props.cartItem.product.name}
              style={{ width: '100px' }}
            />
          </Link>
          <div className="d-flex flex-column pb-2">
            <Link to={`/product/${props.cartItem.product.id}`}>
              <Tooltip title={props.cartItem.product.name} arrow>
                <span className="d-inline">
                  <TextEllipsis
                    text={props.cartItem.product.name + ' '}
                    limit={38}
                  />
                </span>
              </Tooltip>
            </Link>
            <div className="mt-auto">
              <span className="discounted-price text-danger">
                <strong style={{ fontSize: '22px' }}>
                  {props.cartItem.product.currentPrice &&
                    props.cartItem.product.currentPrice.toLocaleString()}
                  đ
                </strong>
              </span>
              <span
                className="original-price ms-3 small"
                style={{ color: '#000' }}
              >
                <del>
                  {props.cartItem.product.listedPrice &&
                    props.cartItem.product.listedPrice.toLocaleString()}
                  đ
                </del>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-3 text-center my-auto d-flex align-items-center justify-content-center">
        <SelectQuantity
          max={props.cartItem.product.quantity}
          setQuantity={setQuantity}
          quantity={quantity}
          add={add}
          reduce={reduce}
          product={props.cartItem.product}
        />
      </div>
      <div className="col-2 text-center my-auto">
        {quantity !== undefined &&
          props.cartItem.product.currentPrice !== undefined && (
            <span className="text-danger">
              <strong>
                {(
                  quantity * props.cartItem.product.currentPrice
                ).toLocaleString()}
                đ
              </strong>
            </span>
          )}
      </div>
      <div className="col-2 text-center my-auto">
        <Tooltip title={'Xoá sản phẩm'} arrow>
          <button
            style={{
              outline: 0,
              backgroundColor: 'transparent',
              border: 0,
            }}
            onClick={() => handleConfirm()}
          >
            <DeleteOutlineOutlinedIcon sx={{ cursor: 'pointer' }} />
          </button>
        </Tooltip>
      </div>
      <hr className="my-3" />
    </>
  );
};

export default ProductCartProps;
