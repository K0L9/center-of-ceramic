import React from "react";

const MasterProductDetail = ({
  product,
  productDetail,
  currency,
  uniqueTags,
  detailClass,
  title,
  des,
  variantChangeByColor,
}) => {
  let RatingStars = [];
  let rating = 3;
  for (var i = 0; i < rating; i++) {
    RatingStars.push(<i className="fa fa-star" key={i}></i>);
  }

  return (
    <div className={`product-detail ${productDetail} ${detailClass}`}>
      <div>
        {title !== "Product style 4" ? (
          <div className="rating">{RatingStars}</div>
        ) : (
          ""
        )}
        <h6>{product.title}</h6>
        {des ? <p>{product.description}</p> : ""}
        <h4>
          {currency.symbol}
          {(
            (product.price) *
            currency.value
          ).toFixed(2)}
          {product.isSale === true &&
            <del>
              <span className="money">
                {currency.symbol}
                {(product.oldPirce * currency.value).toFixed(2)}
              </span>
            </del>
          }
        </h4>

        {/* {product.variants.map((vari) => {
          var findItem = uniqueTags.find((x) => x.color === vari.color);
          if (!findItem) uniqueTags.push(vari);
        })} */}

        <>

          <ul className="color-variant">
            {product.variants.map((vari, i) => {
              return (
                <li
                  className={vari.color}
                  key={i}
                  title={vari.color}
                  style={{ backgroundColor: vari.colorHex }}
                  onClick={() =>
                    variantChangeByColor(i)
                  }
                ></li>
              );
            })}
          </ul>


          {/* {title !== "Product style 4" && uniqueTags[0].color ? (
              <ul className="color-variant">
                {uniqueTags.map((vari, i) => {
                  return (
                    <li
                      className={vari.color}
                      key={i}
                      title={vari.color}
                      onClick={() =>
                        variantChangeByColor(vari.image_id, product.images)
                      }
                    ></li>
                  );
                })}
              </ul>
            ) : (
              ""
            )} */}
        </>
      </div>
    </div>
  );
};

export default MasterProductDetail;
