import React, { useState, useContext, useEffect } from "react";
import { Col, Row, Media, Button, Spinner } from "reactstrap";
import Menu2 from "../../../public/assets/images/mega-menu/2.jpg";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import FilterContext from "../../../helpers/filter/FilterContext";
import ProductItem from "../../../components/common/product-box/ProductBox1";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import { useRouter } from "next/router";
import PostLoader from "../../../components/common/PostLoader";
import CartContext from "../../../helpers/cart";
import { WishlistContext } from "../../../helpers/wishlist/WishlistContext";
import { CompareContext } from "../../../helpers/Compare/CompareContext";

import productService from "../../../services/product-service";
import { stripIgnoredCharacters } from "graphql";

const GET_PRODUCTS = gql`
  query products(
    $type: _CategoryType!
    $indexFrom: Int!
    $limit: Int!
    $color: String!
    $brand: [String!]!
    $sortBy: _SortBy!
    $priceMax: Int!
    $priceMin: Int!
  ) {
    products(
      type: $type
      indexFrom: $indexFrom
      limit: $limit
      color: $color
      brand: $brand
      sortBy: $sortBy
      priceMax: $priceMax
      priceMin: $priceMin
    ) {
      total
      hasMore
      items {
        id
        title
        description
        type
        brand
        category
        price
        new
        sale
        stock
        discount
        variants {
          id
          sku
          size
          color
          image_id
        }
        images {
          image_id
          id
          alt
          src
        }
      }
    }
  }
`;

const ProductList = ({ colClass, layoutList, openSidebar, noSidebar }) => {
  const cartContext = useContext(CartContext);
  const quantity = cartContext.quantity;
  const wishlistContext = useContext(WishlistContext);
  const compareContext = useContext(CompareContext);
  const router = useRouter();
  const [limit, setLimit] = useState(8);
  const curContext = useContext(CurrencyContext);
  const [grid, setGrid] = useState(colClass);
  const symbol = curContext.state.symbol;
  const filterContext = useContext(FilterContext);
  const selectedBrands = filterContext.selectedBrands;
  const selectedColor = filterContext.selectedColor;
  const selectedPrice = filterContext.selectedPrice;
  const selectedCategory = filterContext.state;
  const selectedSize = filterContext.selectedSize;
  const [sortBy, setSortBy] = useState("MostRating");
  const [isLoading, setIsLoading] = useState(false);
  const [layout, setLayout] = useState(layoutList);
  const [url, setUrl] = useState();

  const [data, setData] = useState({ products: { items: [] } });
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const pathname = window.location.pathname;
    // setUrl(pathname);
    // router.push(
    //   `${pathname}?${filterContext.state}&brand=${selectedBrands}&color=${selectedColor}&size=${selectedSize}&minPrice=${selectedPrice.min}&maxPrice=${selectedPrice.max}`
    // );

    productService.getAllDetailsProducts().then(list => {
      setAllProducts(list);
    })

    console.log("UseEfffect")
  }, [selectedBrands, selectedColor, selectedSize, selectedPrice]);

  // var { loading, data, fetchMore } = useQuery(GET_PRODUCTS, {
  //   variables: {
  //     type: selectedCategory,
  //     priceMax: selectedPrice.max,
  //     priceMin: selectedPrice.min,
  //     color: selectedColor,
  //     brand: selectedBrands,
  //     sortBy: sortBy,
  //     indexFrom: 0,
  //     limit: limit,
  //   },
  // });

  // console.log("data: ", data);

  if (allProducts && allProducts.length != 0) {
    console.log("selectedprice: ", selectedCategory);
    let tmpData = allProducts.filter(x => x.price > selectedPrice.min && x.price < selectedPrice.max);
    if (selectedCategory !== 'all')
      tmpData = tmpData.filter(x => x.category.name === selectedCategory);
    data.products.items = tmpData;
  }

  const handlePagination = () => {
    setIsLoading(true);
    setTimeout(
      () =>
        fetchMore({
          variables: {
            indexFrom: data.products.items.length,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            setIsLoading(false);
            return {
              products: {
                __typename: prev.products.__typename,
                total: prev.products.total,
                items: [
                  ...prev.products.items,
                  ...fetchMoreResult.products.items,
                ],
                hasMore: fetchMoreResult.products.hasMore,
              },
            };
          },
        }),
      1000
    );
  };

  const removeBrand = (val) => {
    const temp = [...selectedBrands];
    temp.splice(selectedBrands.indexOf(val), 1);
    filterContext.setSelectedBrands(temp);
  };

  const removeSize = (val) => {
    const temp = [...selectedSize];
    temp.splice(selectedSize.indexOf(val), 1);
    filterContext.setSelectedSize(temp);
  };

  const removeColor = () => {
    filterContext.setSelectedColor("");
  };

  const setSorting = (value) => {
    setSortBy(value);
  }

  const getSortedList = () => {
    switch (sortBy) {
      case "AscOrder":
        return data.products.items.sort((a, b) => localCompare(a.title, b.title));
      case "DescOrder":
        return data.products.items.sort((a, b) => localCompare(b.title, a.title));
      case "LowToHigh":
        return data.products.items.sort((a, b) => a.price - b.price);
      case "HighToLow":
        return data.products.items.sort((a, b) => b.price - a.price);
      case "MostRating":
        return data.products.items.sort((a, b) => b.rating - a.rating);
      case "Newest":
        return data.products.items.sort((a, b) => b.rating - a.rating);
    }
  }

  const localCompare = (item1, item2) => {
    if (item1 < item2)
      return -1;
    if (item1 > item2)
      return 1;
    return 0;
  }


  return (
    <Col className="collection-content">
      <div className="page-main-content">
        <Row>
          <Col sm="12">
            {/* <div className="top-banner-wrapper">
              <a href={null}>
                <Media
                  src={Menu2}
                  className="img-fluid blur-up lazyload"
                  alt=""
                />
              </a>
              <div className="top-banner-content small-section">
                <h4>fashion</h4>
                <h5>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </h5>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div> */}
            <Row>
              <Col xs="12">
                <ul className="product-filter-tags">
                  {selectedBrands.map((brand, i) => (
                    <li key={i}>
                      <a href={null} className="filter_tag">
                        {brand}
                        <i
                          className="fa fa-close"
                          onClick={() => removeBrand(brand)}
                        ></i>
                      </a>
                    </li>
                  ))}
                  {selectedColor ? (
                    <li>
                      <a href={null} className="filter_tag">
                        {selectedColor}
                        <i className="fa fa-close" onClick={removeColor}></i>
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
                  {selectedSize.map((size, i) => (
                    <li key={i}>
                      <a href={null} className="filter_tag">
                        {size}
                        <i
                          className="fa fa-close"
                          onClick={() => removeSize(size)}
                        ></i>
                      </a>
                    </li>
                  ))}
                  {
                    <li>
                      <a href={null} className="filter_tag">
                        ціна: {selectedPrice.min}- {selectedPrice.max}
                      </a>
                    </li>
                  }
                </ul>
              </Col>
            </Row>
            <div className="collection-product-wrapper">
              <div className="product-top-filter">
                {!noSidebar ? (
                  <Row>
                    <Col xl="12">
                      <div
                        className="filter-main-btn"
                        onClick={() => openSidebar()}
                      >
                        <span className="filter-btn btn btn-theme">
                          <i className="fa fa-filter" aria-hidden="true"></i>{" "}
                          Filter
                        </span>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
                <Row>
                  <Col>
                    <div className="product-filter-content">
                      <div className="search-count">
                        <h5>
                          {data
                            ? `Знайдено ${data.products.items.length} товарів`
                            : "loading"}{" "}
                        </h5>
                      </div>
                      <div className="collection-view">
                        <ul>
                          <li>
                            <i
                              className="fa fa-th grid-layout-view"
                              onClick={() => {
                                setLayout("");
                                setGrid("col-lg-3");
                              }}
                            ></i>
                          </li>
                          <li>
                            <i
                              className="fa fa-list-ul list-layout-view"
                              onClick={() => {
                                setLayout("list-view");
                                setGrid("col-lg-12");
                              }}
                            ></i>
                          </li>
                        </ul>
                      </div>
                      <div
                        className="collection-grid-view"
                        style={
                          layout === "list-view"
                            ? { opacity: 0 }
                            : { opacity: 1 }
                        }
                      >
                        <ul>
                          <li>
                            <Media
                              src={`/assets/images/icon/2.png`}
                              alt=""
                              className="product-2-layout-view"
                              onClick={() => setGrid("col-lg-6")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/images/icon/3.png`}
                              alt=""
                              className="product-3-layout-view"
                              onClick={() => setGrid("col-lg-4")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/images/icon/4.png`}
                              alt=""
                              className="product-4-layout-view"
                              onClick={() => setGrid("col-lg-3")}
                            />
                          </li>
                          <li>
                            <Media
                              src={`/assets/images/icon/6.png`}
                              alt=""
                              className="product-6-layout-view"
                              onClick={() => setGrid("col-lg-2")}
                            />
                          </li>
                        </ul>
                      </div>
                      <div className="product-page-per-view">
                        <select
                          onChange={(e) => setLimit(parseInt(e.target.value))}
                        >
                          <option value="2">2 продуктів на сторінку</option>
                          <option value="4">4 продуктів на сторінку</option>
                          <option value="20">20 продуктів на сторінку</option>
                        </select>
                      </div>
                      <div className="product-page-filter">
                        <select onChange={(e) => setSorting(e.target.value)}>
                          <option value="MostRating">Найрейтинговіший</option>
                          <option value="HighToLow">Дорогий - дешевий</option>
                          <option value="LowToHigh">Дешевий - дорогий</option>
                          <option value="Newest">Найновіший</option>
                          <option value="AscOrder">За алфавітом | зростання</option>
                          <option value="DescOrder">За алфавітом | спадання</option>
                        </select>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div className={`product-wrapper-grid ${layout}`}>
                <Row>
                  {/* Product Box */}
                  {!data ||
                    !data.products ||
                    !data.products.items ||
                    data.products.items.length === 0 ? (
                    data &&
                      data.products &&
                      data.products.items &&
                      data.products.items.length === 0 ? (
                      <Col xs="12">
                        <div>
                          <div className="col-sm-12 empty-cart-cls text-center">
                            <img
                              src={`/assets/images/empty-search.jpg`}
                              className="img-fluid mb-4 mx-auto"
                              alt=""
                            />
                            <h3>
                              <strong>Нічого не знайдено</strong>
                            </h3>
                            <h4>Немає товарів які відповідали б умовам пошуку</h4>
                          </div>
                        </div>
                      </Col>
                    ) : (
                      <div className="row mx-0 margin-default mt-4">
                        <div className="col-xl-3 col-lg-4 col-6">
                          <PostLoader />
                        </div>
                        <div className="col-xl-3 col-lg-4 col-6">
                          <PostLoader />
                        </div>
                        <div className="col-xl-3 col-lg-4 col-6">
                          <PostLoader />
                        </div>
                        <div className="col-xl-3 col-lg-4 col-6">
                          <PostLoader />
                        </div>
                      </div>
                    )
                  ) : (
                    data &&
                    getSortedList().map((product, i) => (
                      <div className={grid} key={i}>
                        <div className="product">
                          <div>
                            <a href={null}>
                              <ProductItem
                                des={true}
                                product={product}
                                symbol={symbol}
                                cartClass="cart-info cart-wrap"
                                addCompare={() =>
                                  compareContext.addToCompare(product)
                                }
                                addWishlist={() =>
                                  wishlistContext.addToWish(product)
                                }
                                addCart={() =>
                                  cartContext.addToCart(product, quantity)
                                }
                              />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </Row>
              </div>
              <div className="section-t-space">
                <div className="text-center">
                  <Row>
                    <Col xl="12" md="12" sm="12">
                      {data && data.products && data.products.hasMore && (
                        <Button onClick={() => handlePagination()}>
                          {isLoading && (
                            <Spinner animation="border" variant="light" />
                          )}
                          Load More
                        </Button>
                      )}
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default ProductList;