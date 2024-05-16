import { FormEvent, useEffect, useState } from 'react';
import ProductModel from '../../../../models/ProductModel';
import CategoryModel from '../../../../models/CategoryModel';
import { getProductById } from '../../../../api/ProductAPI';
import {
  getAllCategories,
  getCategoryByProductAlias,
} from '../../../../api/CategoryAPI';
import { backendEndpoint } from '../../../../utils/Constant';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import BrandModel from '../../../../models/BrandModel';
import { getAllBrands, getBrandByAlias } from '../../../../api/BrandAPI';
import './ProductForm.css';
import { getAllImageByAlias } from '../../../../api/ProductImageAPI';

interface ProductFormProps {
  id: number;
  option: string;
  handleCloseModal: any;
}

export const ProductForm: React.FC<ProductFormProps> = (props) => {
  const [product, setProduct] = useState<ProductModel>({
    id: 0,
    name: '',
    shortDescription: '',
    fullDescription: '',
    createdTime: new Date(),
    enabled: false,
    quantity: NaN,
    listedPrice: NaN,
    discountPercent: NaN,
    length: NaN,
    width: NaN,
    height: NaN,
    weight: NaN,
    operatingSystem: '',
    mainImage: '',
    categoryId: NaN,
    brandId: NaN,
    relatedImages: [],
  });

  const [brandsList, setBrandsList] = useState<BrandModel[] | null>([]);
  const [brandId, setBrandId] = useState<number | null>(null);
  const [categoriesList, setCategoriesList] = useState<CategoryModel[] | null>(
    [],
  );
  const [categoryId, setCategoryId] = useState<number | null>(null);
  // const [mainImage, setMainImage] = useState('');
  // const [relatedImages, setRelatedImages] = useState<ProductImageModel[]>([]);
  const [relatedImagesUrls, setRelatedImagesUrls] = useState<string[]>([]);

  // Convert file to Base64
  const getBase64 = (file: File): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        resolve(reader.result ? (reader.result as string) : null);
      reader.onerror = (error) => reject(error);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandsResult, categoriesResult] = await Promise.all([
          getAllBrands(),
          getAllCategories(),
        ]);

        setBrandsList(brandsResult.brandList);
        setCategoriesList(categoriesResult.categoryList);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  });

  // useEffect(() => {
  //   const urls = relatedImages
  //     .map((image) => image.url)
  //     .filter((url) => url !== undefined) as string[];
  //   setRelatedImagesUrls(urls);
  //   setProduct({ ...product, relatedImages: urls });
  // }, [relatedImages]);

  useEffect(() => {
    if (product.alias) {
      Promise.all([
        getBrandByAlias(product.alias),
        getCategoryByProductAlias(product.alias),
        getAllImageByAlias(product.alias),
      ])
        .then(([brandResponse, categoryResponse, allImagesResponse]) => {
          const brandId = brandResponse.brand ? brandResponse.brand.id : 0;
          const categoryId = categoryResponse.category
            ? categoryResponse.category.id
            : 0;
          const relatedImages = allImagesResponse;

          if (brandResponse.brand !== null) {
            setBrandId(brandResponse.brand.id);
          }
          if (categoryResponse.category !== null) {
            setCategoryId(categoryResponse.category.id);
          }
          const urls = relatedImages
            .map((image) => image.url)
            .filter((url) => url !== undefined) as string[];
          setRelatedImagesUrls(urls);

          setProduct((prevProduct) => ({
            ...prevProduct,
            brandId,
            categoryId,
            relatedImages: urls,
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [product.alias]);

  // Lấy dữ liệu khi update
  useEffect(() => {
    if (props.option === 'update') {
      getProductById(props.id).then((response) => {
        setProduct(response as ProductModel);
        // setMainImage(response?.mainImage as string);

        if (response?.alias) {
          getAllImageByAlias(response.alias).then((imageResponse) => {
            const urls = imageResponse
              .map((image) => image.url)
              .filter((url) => url !== undefined) as string[];
            setRelatedImagesUrls(urls);
            setProduct((prevProduct) => ({
              ...prevProduct,
              relatedImages: urls,
            }));
          });
        }
      });
    }
  }, [props.option, props.id]);

  useEffect(() => console.log('product', product), [product]);

  async function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const token = localStorage.getItem('token');

    let productRequest: ProductModel = product;

    console.log('productRequest', productRequest);

    const endpoint =
      props.option === 'add'
        ? backendEndpoint + '/product/add-product'
        : backendEndpoint + '/product/update-product';
    const method = props.option === 'add' ? 'POST' : 'PUT';
    toast.promise(
      fetch(endpoint, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify(productRequest),
      })
        .then((response) => {
          if (response.ok) {
            setProduct({
              id: 0,
              name: '',
              shortDescription: '',
              fullDescription: '',
              createdTime: new Date(),
              enabled: false,
              quantity: NaN,
              listedPrice: NaN,
              discountPercent: NaN,
              length: NaN,
              width: NaN,
              height: NaN,
              weight: NaN,
              operatingSystem: '',
              mainImage: '',
              categoryId: NaN,
              brandId: NaN,
              relatedImages: [],
            });
            // setMainImage('');
            setRelatedImagesUrls([]);
            props.handleCloseModal();
            props.option === 'add'
              ? toast.success('Thêm sản phẩm thành công')
              : toast.success('Cập nhật sản phẩm thành công');
          } else {
            toast.error('Gặp lỗi trong quá trình xử lý sản phẩm (ảnh quá lớn)');
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error('Gặp lỗi trong quá trình xử lý sản phẩm (ảnh quá lớn)');
        }),
      {
        pending: 'Vui lòng đợi trong giây lát ...',
      },
    );
  }

  function handleMainImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      const selectedFile = inputElement.files[0];

      getBase64(selectedFile).then((base64) => {
        if (base64) {
          setProduct({
            ...product,
            mainImage: base64,
          });
          // setMainImage(URL.createObjectURL(selectedFile));
        }
      });
    }
  }

  function handleRelatedImageUpload(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      const newPreviewImages = [...relatedImagesUrls];

      if (newPreviewImages.length + inputElement.files.length > 5) {
        toast.warning('Bạn chỉ được tải lên tối đa 5 ảnh');
        return;
      }

      for (let i = 0; i < inputElement.files.length; i++) {
        const selectedFile = inputElement.files[i];

        getBase64(selectedFile).then((base64) => {
          if (base64) {
            newPreviewImages.push(base64);
            setRelatedImagesUrls(newPreviewImages);
            setProduct({ ...product, relatedImages: newPreviewImages });
          }
        });
      }
    }
  }

  return (
    <div className="form-selector">
      <h1 className="text-center mt-4">
        <strong>
          {props.option === 'add'
            ? 'TẠO SẢN PHẨM MỚI'
            : 'SỬA THÔNG TIN SẢN PHẨM'}
        </strong>
      </h1>
      <div className="container px-5">
        <form onSubmit={handleSubmitForm} className="form">
          <input
            type="hidden"
            id="idProduct"
            // value={product?.idProduct}
            hidden
          />
          {/* <div className={props.option === 'update' ? 'col-4' : 'col-6'}> */}
          <div style={{ marginTop: '15px' }}>
            <Box
              sx={{
                '& .MuiTextField-root': { mb: 3 },
              }}
            >
              <div className="row">
                <div className="col col-xxl-4">
                  <TextField
                    required
                    fullWidth
                    type="text"
                    id="standard-required"
                    label="Tên sản phẩm"
                    defaultValue={product.name}
                    value={product.name}
                    variant="standard"
                    className="input-field"
                    style={{ fontSize: '170px !important' }}
                    onChange={(e: any) =>
                      setProduct({ ...product, name: e.target.value })
                    }
                    size="small"
                  />
                </div>
                <div className="col col-xxl-4">
                  <FormControl fullWidth variant="standard">
                    <InputLabel
                      id="brand-select-label"
                      shrink={brandId !== null ? true : false}
                    >
                      Thương hiệu
                    </InputLabel>
                    <Select
                      required
                      labelId="brand-select-label"
                      id="brand-select"
                      variant="standard"
                      value={brandId}
                      onChange={(e: any) => {
                        setBrandId(e.target.value);
                        setProduct({ ...product, brandId: e.target.value });
                      }}
                      label="Thương hiệu"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {brandsList?.map((brand) => (
                        <MenuItem key={brand.id} value={brand.id}>
                          {brand.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="col col-xxl-4">
                  <FormControl fullWidth variant="standard">
                    <InputLabel
                      id="category-select-label"
                      shrink={categoryId !== null ? true : false}
                    >
                      Danh mục sản phẩm
                    </InputLabel>
                    <Select
                      required
                      labelId="category-select-label"
                      id="category-select"
                      variant="standard"
                      value={categoryId}
                      onChange={(e: any) => {
                        setCategoryId(e.target.value);
                        setProduct({ ...product, categoryId: e.target.value });
                      }}
                      label="Thương hiệu"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {categoriesList?.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="col col-xxl-4">
                  <TextField
                    required
                    fullWidth
                    type="text"
                    id="standard-required"
                    label="Số lượng"
                    defaultValue={product.quantity}
                    value={
                      Number.isNaN(product.quantity) ? '' : product.quantity
                    }
                    variant="standard"
                    className="input-field"
                    style={{ fontSize: '170px !important' }}
                    onChange={(e: any) =>
                      setProduct({
                        ...product,
                        quantity: e.target.value,
                      })
                    }
                    size="small"
                  />
                </div>
                <div className="col col-xxl-4">
                  <TextField
                    required
                    fullWidth
                    type="text"
                    id="standard-required"
                    label="Giá niêm yết"
                    defaultValue={product.listedPrice}
                    value={
                      Number.isNaN(product.listedPrice)
                        ? ''
                        : product.listedPrice
                    }
                    variant="standard"
                    className="input-field"
                    style={{ fontSize: '170px !important' }}
                    onChange={(e: any) =>
                      setProduct({ ...product, listedPrice: e.target.value })
                    }
                    size="small"
                  />
                </div>
                <div className="col col-xxl-4">
                  <TextField
                    required
                    fullWidth
                    type="text"
                    id="standard-required"
                    label="Tỉ lệ giảm (%)"
                    defaultValue={product.discountPercent}
                    value={
                      Number.isNaN(product.discountPercent)
                        ? ''
                        : product.discountPercent
                    }
                    variant="standard"
                    className="input-field"
                    style={{ fontSize: '170px !important' }}
                    onChange={(e: any) =>
                      setProduct({
                        ...product,
                        discountPercent: e.target.value,
                      })
                    }
                    size="small"
                  />
                </div>
              </div>
            </Box>
            <h1 className="text-center mt-4">
              <strong>THÔNG SỐ KỸ THUẬT</strong>
            </h1>
            <Box
              sx={{
                '& .MuiTextField-root': { mb: 3 },
              }}
            >
              <div className="row">
                <div className="col col-xxl-3">
                  <TextField
                    required
                    fullWidth
                    type="text"
                    id="standard-required"
                    label="Chiều dài (mm)"
                    defaultValue={product.length}
                    value={Number.isNaN(product.length) ? '' : product.length}
                    variant="standard"
                    className="input-field"
                    style={{ fontSize: '170px !important' }}
                    onChange={(e: any) =>
                      setProduct({ ...product, length: e.target.value })
                    }
                    size="small"
                  />
                </div>
                <div className="col col-xxl-3">
                  <TextField
                    required
                    fullWidth
                    type="text"
                    id="standard-required"
                    label="Chiều rộng (mm)"
                    defaultValue={product.width}
                    value={Number.isNaN(product.width) ? '' : product.width}
                    variant="standard"
                    className="input-field"
                    style={{ fontSize: '170px !important' }}
                    onChange={(e: any) =>
                      setProduct({
                        ...product,
                        width: e.target.value,
                      })
                    }
                    size="small"
                  />
                </div>
                <div className="col col-xxl-3">
                  <TextField
                    required
                    fullWidth
                    type="text"
                    id="standard-required"
                    label="Chiều cao (nếu có)"
                    defaultValue={product.height}
                    value={Number.isNaN(product.height) ? '' : product.height}
                    variant="standard"
                    className="input-field"
                    style={{ fontSize: '170px !important' }}
                    onChange={(e: any) =>
                      setProduct({ ...product, height: e.target.value })
                    }
                    size="small"
                  />
                </div>
                <div className="col col-xxl-3">
                  <TextField
                    required
                    fullWidth
                    type="text"
                    id="standard-required"
                    label="Cân nặng (kg)"
                    defaultValue={product.weight}
                    value={Number.isNaN(product.weight) ? '' : product.weight}
                    variant="standard"
                    className="input-field"
                    style={{ fontSize: '170px !important' }}
                    onChange={(e: any) =>
                      setProduct({ ...product, weight: e.target.value })
                    }
                    size="small"
                  />
                </div>
                <div className="col col-xxl-6">
                  <TextField
                    required
                    fullWidth
                    type="text"
                    id="standard-required"
                    label="Hệ điều hành (nếu có)"
                    defaultValue={product.operatingSystem}
                    value={product.operatingSystem}
                    variant="standard"
                    className="input-field"
                    style={{ fontSize: '170px !important' }}
                    onChange={(e: any) =>
                      setProduct({
                        ...product,
                        operatingSystem: e.target.value,
                      })
                    }
                    size="small"
                  />
                </div>
                <div className="col col-xxl-6">
                  <TextField
                    required
                    fullWidth
                    type="text"
                    id="standard-required"
                    label="Mô tả sản phẩm"
                    defaultValue={product.shortDescription}
                    value={product.shortDescription}
                    variant="standard"
                    className="input-field"
                    style={{ fontSize: '170px !important' }}
                    onChange={(e: any) =>
                      setProduct({
                        ...product,
                        shortDescription: e.target.value,
                      })
                    }
                    size="small"
                  />
                </div>
              </div>
            </Box>
          </div>

          <h1 className="text-center mt-4">
            <strong>HÌNH ẢNH SẢN PHẨM</strong>
          </h1>
          <div className="d-flex align-items-center my-5">
            <Button
              size="small"
              component="label"
              variant="outlined"
              startIcon={<CloudUpload />}
            >
              Upload ảnh sản phẩm
              <input
                style={{ opacity: '0', width: '10px' }}
                required={props.option === 'update' ? false : true}
                type="file"
                accept="image/*"
                onChange={handleMainImageUpload}
                alt=""
              />
            </Button>
            <img src={product.mainImage} alt="" width={100} />
          </div>
          <div className="my-5">
            <Button
              size="small"
              component="label"
              variant="outlined"
              startIcon={<CloudUpload />}
            >
              Upload ảnh liên quan
              <input
                style={{ opacity: '0', width: '10px' }}
                type="file"
                accept="image/*"
                onChange={handleRelatedImageUpload}
                multiple
                alt=""
              />
            </Button>
            {relatedImagesUrls.map((relatedImage, index) => (
              <img key={index} src={relatedImage} alt="" width={100} />
            ))}
            {relatedImagesUrls.length > 0 && (
              <Button
                onClick={() => {
                  setRelatedImagesUrls([]);
                  setProduct({ ...product, relatedImages: [] });
                }}
              >
                Xoá tất cả
              </Button>
            )}
          </div>

          {props.option !== 'view' && (
            <button
              className="w-100 my-3 btn btn-dark mb-5"
              type="submit"
              style={{ padding: '7px', fontSize: '1.5rem' }}
            >
              {props.option === 'add' ? 'Tạo sản phẩm' : 'Lưu sản phẩm'}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
