import React, { useEffect, useState } from 'react';
import './CategoryFilter.css';
import CategoryModel from '../../../../models/CategoryModel';
import { getAllCategories } from '../../../../api/CategoryAPI';
import { Link, useLocation } from 'react-router-dom';

interface CategoryFilterProps {
  categoryIdNumber: number;
}

function CategoryFilter(props: CategoryFilterProps) {
  const [categoriesList, setCategoriesList] = useState<CategoryModel[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    props.categoryIdNumber,
  );
  // const pathname = useLocation();
  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategoryId((prevId) =>
      prevId === categoryId ? null : categoryId,
    );
  };

  useEffect(() => {
    getAllCategories().then((result) => {
      setCategoriesList(result.categoryList);
    });
  }, []);

  // useEffect(() => {
  //   if (pathname.pathname === '/product-list' && !pathname.search) {
  //     setSelectedCategoryId(null);
  //   }
  // }, [pathname]);

  useEffect(() => {
    setSelectedCategoryId(props.categoryIdNumber);
  }, [props.categoryIdNumber]);

  return (
    <div className="category-filter__wrapper row m-0 p-0 mt-4">
      {categoriesList.map((category, index) => (
        <div
          className="col-xxl-3 col-xl-4 col-lg-3 col-md-2 col-sm-3 col-3 category-filter__item p-0"
          key={index}
        >
          <Link
            to={
              selectedCategoryId === category.id && selectedCategoryId != null
                ? `/product-list`
                : `/product-list/${category.id}`
            }
            onClick={() => handleCategoryClick(category.id)}
            className={`d-flex justify-content-center align-items-center flex-column ${
              selectedCategoryId === category.id && selectedCategoryId !== null
                ? 'active'
                : ''
            }`}
          >
            <div className="category-filter__img-wrapper">
              <img className="category-filter__img" src={category.image} />
            </div>
            <div className="category-filter__name mt-2">{category.name}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CategoryFilter;
