import React, { useState, useContext, useEffect } from "react";
import { Collapse } from "reactstrap";
import FilterContext from "../../../helpers/filter/FilterContext";

import categoryService from "../../../services/category-service";

const Category = () => {
  const context = useContext(FilterContext);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);
  const setSelectedCategory = context.setSelectedCategory;
  const [url, setUrl] = useState();

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    categoryService.getAllCategories().then(list => {
      setCategoryList(list);
    })
  }, [])

  const updateCategory = (category) => {
    setSelectedCategory(category);
  };
  const getActiveCategoryStyle = (category) => {
    if (category.name === context.state) {
      return (
        { color: "#ec710a" }
      )
    }
  }

  return (
    <>
      <div className="collection-collapse-block open">
        <h3 className="collapse-block-title" onClick={toggleCategory}>
          Категорія
        </h3>
        <Collapse isOpen={isCategoryOpen}>
          <div className="collection-collapse-block-content">
            <div className="collection-brand-filter">

              {categoryList && categoryList.length > 0 ? (
                <ul className="category-list">
                  <li>
                    <a style={getActiveCategoryStyle({ name: "all" })} href={null} onClick={() => updateCategory("all")}>
                      всі продукти
                    </a>
                  </li>
                  {categoryList.map((x, id) => (
                    <li key={id}>
                      <a style={getActiveCategoryStyle(x)} href={null} onClick={() => updateCategory(x.name)}>
                        {x.name}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                "loading"
              )}

            </div>
          </div>
        </Collapse>
      </div>
    </>
  );
};

export default Category;
