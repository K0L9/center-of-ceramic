import { parseAndCheckHttpResponse } from '@apollo/client';
import React, { useState, useEffect, useContext } from 'react';
import { Collapse } from 'reactstrap';

import categoryService from "../../../services/category-service"
import productService from '../../../services/product-service';

import { useRouter } from "next/router";
import { canNotDefineSchemaWithinExtensionMessage } from 'graphql/validation/rules/LoneSchemaDefinition';

import FilterContext from "../../../helpers/filter/FilterContext";

const Filter = ({ category }) => {

    const router = useRouter();
    const [categoryList, setCategoryList] = useState({})
    const filterContext = useContext(FilterContext);

    useEffect(() => {
        categoryService.getAllCategories().then(list => {
            // let tmpList = [];
            // if (category !== undefined)
            //     tmpList.push(category);

            // for (let i = 0; i < 4 || i < list.length; i++) {
            //     if (list[i] != category) {
            //         tmpList.push(list[i])
            //     }
            // }
            setCategoryList(list);
        })
    }, [])

    const backClick = () => {
        document.getElementById("filter").style.left = "-365px";
    }

    const [isBrandOpen, setIsBrandOpen] = useState(true);
    const toggleBrand = () => setIsBrandOpen(!isBrandOpen);

    const redirectToCategoryFind = (category) => {
        filterContext.setSelectedCategory(category);
        router.push(`/shop/left_sidebar`)
    }

    // const getActiveStyle = (categoryLi) => {
    //     console.log("category: ", category)

    //     if (!category || !categoryLi) {
    //         return ("");
    //     }
    //     if (categoryLi.name === category.name) {
    //         return ({ color: '#ec710a' })
    //     }
    // }

    return (
        <div className="collection-filter-block creative-card creative-inner">
            <div className="collection-mobile-back" onClick={backClick}>
                <span className="filter-back">
                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                    back
                </span>
            </div>
            <div className="collection-collapse-block border-0 open">
                <h3 className="collapse-block-title" onClick={toggleBrand}>категорії</h3>
                <Collapse isOpen={isBrandOpen}>
                    <div className="collection-collapse-block-content">
                        <div className="collection-brand-filter">
                            {categoryList && categoryList.length > 0 ? (
                                <ul className="category-list">
                                    {categoryList.map((x, id) => (
                                        <li key={id}><a href={null} onClick={() => redirectToCategoryFind(x.name)}>{x.name}</a></li>
                                    ))}
                                </ul>
                            ) : (
                                "Loading"
                            )}
                        </div>
                    </div>
                </Collapse>
            </div>
        </div>
    );
}


export default Filter;