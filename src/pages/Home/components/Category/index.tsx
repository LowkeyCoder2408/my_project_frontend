import { Link } from 'react-router-dom';
import './Category.css';
import { useEffect, useState } from 'react';
import CategoryModel from '../../../../models/CategoryModel';
import { getAllCategories } from '../../../../api/CategoryAPI';

function Category() {
  const [categoriesList, setCategoriesList] = useState<CategoryModel[]>([]);

  useEffect(() => {
    getAllCategories().then((result) => {
      setCategoriesList(result.categoryList);
    });
  }, []);

  return (
    <div className="container" style={{ marginTop: '60px' }}>
      <h2 className="my-3">
        <strong>CÁC DANH MỤC NỔI BẬT</strong>
      </h2>
      <div className="category__list row mt-5">
        {categoriesList.map((category, index) => (
          <div className="category__item-wrapper col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-3">
            <Link
              to={`/product-list/${index + 1}`}
              className="category__item d-flex align-items-center"
            >
              <div className="category__item-information">
                <div className="category__item-name">
                  <strong>{category.name}</strong>
                </div>
                <h4 style={{ fontWeight: '400', color: '#444' }}>
                  Còn <strong style={{ color: 'red' }}>14</strong> sản phẩm
                </h4>
              </div>
              <img src={category.image} className="category__item-img"></img>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
