import React, { useState, useContext, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import ProductItem from "../product-box/ProductBox1";
import CartContext from "../../../helpers/cart/index";
import { Container, Row, Col, Media } from "reactstrap";
import { WishlistContext } from "../../../helpers/wishlist/WishlistContext";
import PostLoader from "../PostLoader";
import { CompareContext } from "../../../helpers/Compare/CompareContext";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import emptySearch from "../../../public/assets/images/empty-search.jpg";

import productService from "../../../services/product-service"

const GET_PRODUCTS = gql`
  query products($type: _CategoryType!, $indexFrom: Int!, $limit: Int!) {
    products(type: $type, indexFrom: $indexFrom, limit: $limit) {
      items {
        id
        title
        description
        type
        brand
        category
        price
        new
        stock
        sale
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

const TabContent = ({
  data,
  loading,
  startIndex,
  endIndex,
  cartClass,
  backImage,
  emptyMessage,
}) => {
  const context = useContext(CartContext);
  const wishListContext = useContext(WishlistContext);
  const compareContext = useContext(CompareContext);
  const curContext = useContext(CurrencyContext);
  const currency = curContext.state;
  const quantity = context.quantity;

  return (
    <Row className="no-slider">
      {!data ||
        !data.products ||
        !data.products.items ||
        data.products.items.length === 0 ||
        loading ? (
        loading ?
          (
            <div className="row mx-0 margin-default">
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
          ) : (
            <Col xs="12">
              <div>
                <div className="col-sm-12 empty-cart-cls text-center">
                  <Media
                    src={emptySearch}
                    className="img-fluid mb-4 mx-auto"
                    alt=""
                  />
                  <h3>
                    <strong>Пошук результатів не дав</strong>
                  </h3>
                  <h4>{emptyMessage}</h4>
                </div>
              </div>
            </Col>
          )
      ) : (
        data &&
        data.products.items
          .slice(startIndex, endIndex)
          .map((product, i) => (
            <ProductItem
              key={i}
              product={product}
              symbol={currency.symbol}
              addCompare={() => compareContext.addToCompare(product)}
              addCart={() => context.addToCart(product, quantity)}
              addWishlist={() => wishListContext.addToWish(product)}
              cartClass={cartClass}
              backImage={backImage}
            />
          ))
      )}
    </Row>
  );
};

const SpecialProducts = ({
  type,
  fluid,
  designClass,
  cartClass,
  heading,
  noTitle,
  title,
  inner,
  line,
  hrClass,
  backImage,
}) => {
  const [activeTab, setActiveTab] = useState(type);
  const context = useContext(CartContext);
  const wishListContext = useContext(WishlistContext);
  const compareContext = useContext(CompareContext);
  const curContext = useContext(CurrencyContext);
  const currency = curContext.state;
  const quantity = context.quantity;

  var { loading, data } = useQuery(GET_PRODUCTS, {
    variables: {
      type: activeTab,
      indexFrom: 0,
      limit: 8,
    },
  });

  const [list, setProductList] = useState({});
  const [newProducts, setNewProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [salesProducts, setSalesProducts] = useState([]);

  useEffect(() => {
    productService.getAllProducts().then(list => {
      setProductList({ products: { items: list } });

      let tmpSalesProduct = { products: { items: [] } };
      let tmpNewProduct = { products: { items: [] } };
      let tmpBestProduct = { products: { items: [] } };

      list.map((x, counter) => {
        if (x.isSale)
          tmpSalesProduct.products.items.push(x);
        if (x.isNew)
          tmpNewProduct.products.items.push(x);
        if (x.rating === 5)
          tmpBestProduct.products.items.push(x);
      })


      setNewProducts(tmpNewProduct);
      setBestProducts(tmpBestProduct);
      setSalesProducts(tmpSalesProduct);
    })
  }, [])

  return (
    <div>
      <section className={designClass}>
        <Container fluid={fluid}>
          {noTitle ? (
            ""
          ) : (
            <div className={title}>
              <h4>{heading}</h4>
              {/* exclusive products */}
              <h2 className={inner}>спеціальні пропозиції</h2>
              {line ? (
                <div className="line"></div>
              ) : hrClass ? (
                <hr role="tournament6"></hr>
              ) : (
                ""
              )}
            </div>
          )}

          <Tabs className="theme-tab">
            <TabList className="tabs tab-title">
              <Tab
                className={activeTab == type ? "active" : ""}
                onClick={() => setActiveTab(type)}
              >
                ЗНИЖКИ
              </Tab>
              <Tab
                className={activeTab == "furniture" ? "active" : ""}
                onClick={() => setActiveTab("furniture")}
              >
                БЕСТСЕЛЛЕРИ{" "}
              </Tab>
              <Tab
                className={activeTab == "furniture" ? "active" : ""}
                onClick={() => setActiveTab("furniture")}
              >
                НОВІ ТОВАРИ
              </Tab>
            </TabList>

            <TabPanel>
              <TabContent
                data={salesProducts}
                loading={loading}
                startIndex={0}
                endIndex={8}
                cartClass={cartClass}
                backImage={backImage}
                emptyMessage={"Товарів за знижкою на даний момент немає "}
              />
            </TabPanel>
            <TabPanel>
              <TabContent
                data={bestProducts}
                loading={loading}
                startIndex={0}
                endIndex={8}
                cartClass={cartClass}
                backImage={backImage}
                emptyMessage={"Бестселерів товарів не знайдено"}
              />
            </TabPanel>
            <TabPanel>
              <TabContent
                data={newProducts}
                loading={loading}
                startIndex={0}
                endIndex={8}
                cartClass={cartClass}
                backImage={backImage}
                emptyMessage={"Нових товарів не знайдено"}
              />
            </TabPanel>
          </Tabs>
        </Container>
      </section>
    </div>
  );
};

export default SpecialProducts;
