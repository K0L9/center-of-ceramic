import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Media } from "reactstrap";
import Slider from "react-slick";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import productService from "../../../services/product-service";

const GET_PRODUCTS = gql`
  query newProducts($type: String!) {
    newProducts(type: $type) {
      title
      price
      images {
        alt
        src
      }
    }
  }
`;

const NewProduct = () => {
  const CurContect = useContext(CurrencyContext);
  const symbol = CurContect.state.symbol;
  // var { loading, data } = useQuery(GET_PRODUCTS, {
  //   variables: {
  //     type: "fashion",
  //   },
  // });

  const [data, setData] = useState({});

  useEffect(() => {
    productService.getNewProducts().then(products => {
      setData({ newProducts: products });
    })
  }, [])

  const getStarsRating = (ratingPr) => {
    let RatingStars = [];
    let rating = ratingPr;
    for (var i = 0; i < rating; i++) {
      RatingStars.push(<i className="fa fa-star" key={i}></i>);
    }

    return RatingStars;
  }

  console.log("Products; ", data);

  return (
    // <!-- side-bar single product slider start -->
    <div className="theme-card">
      <h5 className="title-border">нові товари</h5>
      <Slider className="offer-slider slide-1">
        <div>
          {!data ||
            !data.newProducts ||
            data.newProducts.length === 0 ? (
            "loading"
          ) : (
            <>
              {data &&
                data.newProducts.slice(0, 3).map((product, index) => (
                  <div className="media" key={index}>
                    <a href="">
                      <Media
                        className="img-fluid blur-up lazyload"
                        src={product.variants[0].images[0].url}
                        alt={product.variants[0].images[0].alt}
                      />
                    </a>
                    <div className="media-body align-self-center">
                      {product.rating !== 0 && (
                        <div className="rating">
                          {getStarsRating(product.rating)}
                        </div>
                      )}
                      <a href={null}>
                        <h6>{product.title}</h6>
                      </a>
                      <h4>
                        {symbol}
                        {product.price}
                      </h4>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
        <div>
          {!data ||
            !data.newProducts ||
            data.newProducts.length === 0 ? (
            "loading"
          ) : (
            <>
              {data &&
                data.newProducts.slice(4, 7).map((product, index) => (
                  <div className="media" key={index}>
                    <a href="">
                      <Media
                        className="img-fluid blur-up lazyload"
                        src={product.variants[0].images[0].src}
                        alt={product.variants[0].images[0].alt}
                      />
                    </a>
                    <div className="media-body align-self-center">
                      {product.rating !== 0 && (
                        <div className="rating">
                          {getStarsRating(product.rating)}
                        </div>
                      )}
                      <a href={null}>
                        <h6>{product.title}</h6>
                      </a>
                      <h4>
                        {symbol}
                        {product.price}
                      </h4>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>
      </Slider>
    </div>
    //  <!-- side-bar single product slider end -->
  );
};

export default NewProduct;
