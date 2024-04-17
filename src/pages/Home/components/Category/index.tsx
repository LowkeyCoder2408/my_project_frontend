import { Link } from 'react-router-dom';
import './Category.css';
import { useEffect, useState } from 'react';
import CategoryModel from '../../../../models/CategoryModel';
import { getAllCategories } from '../../../../api/CategoryAPI';
import {
  findProductsByCategoryId,
  getTotalProductQuantity,
} from '../../../../api/ProductAPI';

function Category() {
  const [categoriesList, setCategoriesList] = useState<CategoryModel[]>([]);
  const [productQuantities, setProductQuantities] = useState<number[]>([]); // Lưu tổng số sản phẩm của mỗi danh mục

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getAllCategories();
        setCategoriesList(categories.categoryList);
        // Tính tổng số lượng sản phẩm của mỗi danh mục và lưu vào state productQuantities
        const quantities = await Promise.all(
          categories.categoryList.map((category) =>
            quantityOfCategory(category.id),
          ),
        );
        setProductQuantities(quantities);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const quantityOfCategory = async (categoryId: number): Promise<number> => {
    try {
      const products = await findProductsByCategoryId(categoryId);
      const totalProducts = getTotalProductQuantity(products.result);
      return totalProducts;
    } catch (error) {
      console.error('Xảy ra lỗi khi tính tổng sản phẩm theo danh mục:', error);
      return 0;
    }
  };

  return (
    <div className="container" style={{ marginTop: '60px' }}>
      <h2 className="my-3">
        <strong>CÁC DANH MỤC NỔI BẬT</strong>
      </h2>
      <div className="category__list row mt-5">
        {categoriesList.map((category, index) => (
          <div
            key={index}
            className="category__item-wrapper col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-3"
          >
            <Link
              to={`/product-list/${category.id}`}
              className="category__item d-flex align-items-center"
            >
              <div className="category__item-information">
                <div className="category__item-name">
                  <strong>{category.name}</strong>
                </div>
                <h4 style={{ fontWeight: '400', color: '#444' }}>
                  Còn{' '}
                  <strong style={{ color: 'red' }}>
                    {productQuantities[index]}
                  </strong>{' '}
                  sản phẩm
                </h4>
              </div>
              <img
                src={category.image}
                className="category__item-img"
                alt={category.name}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
