import React, { useState, useEffect, useRef } from "react";
import ProductTab from "../common/product-tab";
import Service from "../common/service";
import NewProduct from "../../shop/common/newProduct";
import Slider from "react-slick";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import ImageZoom from "../common/image-zoom";
import DetailsWithPrice from "../common/detail-price";
import Filter from "../common/filter";
import { Container, Row, Col, Media } from "reactstrap";

import productService from "../../../services/product-service"

const GET_SINGLE_PRODUCTS = gql`
  query product($id: Int!) {
    product(id: $id) {
      id
      title
      description
      type
      brand
      category
      price
      new
      sale
      discount
      stock
      variants {
        id
        sku
        size
        color
        image_id
      }
      images {
        alt
        src
      }
    }
  }
`;

const LeftSidebarPage = ({ pathId }) => {
  // var { loading, data } = useQuery(GET_SINGLE_PRODUCTS, {
  //   variables: {
  //     id: parseInt(pathId),
  //   },
  // });

  const [state, setState] = useState({ nav1: null, nav2: null });
  const slider1 = useRef();
  const slider2 = useRef();

  var products = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    fade: true,
  };
  var productsnav = {
    slidesToShow: 3,
    swipeToSlide: true,
    arrows: false,
    dots: false,
    focusOnSelect: true,
  };

  const [product, setProduct] = useState({});

  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });

    let id = pathId.split("-")[0];
    productService.getProductById(id).then(product => {
      setProduct(product);
    })


  }, product);

  console.log("PRODUCT: ", product);

  const { nav1, nav2 } = state;

  const filterClick = () => {
    document.getElementById("filter").style.left = "-15px";
  };

  const changeColorVar = (img_id) => {
    setIdVarSelect(img_id);
    slider1.current.slickGoTo(0);
    slider2.current.slickGoTo(img_id);
  };
  const changePhoto = (id) => {
    if (slider1)
      slider1.current.slickGoTo(id);
  }
  const photoSlide = (event, slick, currentSlide, nextSlide) => {
    if (slider2)
      slider2.current.slickGoTo(slick);
  }
  const [idVarSelect, setIdVarSelect] = useState(0);

  return (
    <section className="">
      <div className="collection-wrapper">
        <Container>
          <Row>
            <Col sm="3" className="collection-filter">
              <Filter />
              <Service />
              <NewProduct />
            </Col>
            <Col lg="9" sm="12" xs="12">
              <Container fluid={true}>
                <Row>
                  <Col cl="12">
                    <div className="filter-main-btn mb-2">
                      <span onClick={filterClick} className="filter-btn">
                        <i className="fa fa-filter" aria-hidden="true"></i>{" "}
                        filter
                      </span>
                    </div>
                  </Col>
                </Row>
                {!product || !product.variants || !product.variants[0].images ? (
                  "loading"
                ) : (
                  <Row>
                    <Col lg="6" className="product-thumbnail">
                      <Slider
                        {...products}
                        asNavFor={nav2}
                        ref={(slider) => (slider1.current = slider)}
                        className="product-slick"
                        beforeChange={photoSlide}
                      >
                        {product.variants[idVarSelect].images.map((vari, index) => (
                          <div key={index}>
                            <ImageZoom image={vari} />
                          </div>
                        ))}
                      </Slider>
                      <Slider
                        className="slider-nav"
                        {...productsnav}
                        asNavFor={nav1}
                        ref={(slider) => (slider2.current = slider)}
                      >
                        {product && product.variants && product.variants[idVarSelect] && product.variants[idVarSelect].images
                          ? product.variants[idVarSelect].images.map((vari, index) => (
                            <div key={index}>
                              <Media
                                src={`${vari.url}`}
                                key={index}
                                alt={vari.alt}
                                className="img-fluid"
                                onClick={() => changePhoto(index)}
                              />
                            </div>
                          ))
                          : ""}
                      </Slider>
                    </Col>
                    <Col lg="6" className="rtl-text">
                      <DetailsWithPrice
                        item={product}
                        changeColorVar={changeColorVar}
                      />
                    </Col>
                  </Row>
                )}
              </Container>
              <ProductTab />
            </Col>
          </Row>
        </Container>
      </div>
    </section >
  );
};

export default LeftSidebarPage;
