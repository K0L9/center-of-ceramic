import React, { useState, useContext, useEffect } from "react";
import InputRange from "react-input-range";
import FilterContext from "../../../helpers/filter/FilterContext";
import { useRouter } from "next/router";

const Price = () => {
  const context = useContext(FilterContext);
  const router = useRouter();
  const setSelectedPrice = context.setSelectedPrice;
  const [url, setUrl] = useState();
  useEffect(() => {
    const pathname = window.location.pathname;
    setUrl(pathname);
  }, []);

  const [currPrice, setCurrPrice] = useState({ min: 0, max: 20000 });

  const changeCurrPrice = (e) => {
    setCurrPrice(e)
  }
  const completeChangePrice = () => {
    context.setSelectedPrice(currPrice);
  }

  return (
    <div className="collection-collapse-block border-0 open">
      <h3 className="collapse-block-title">ціна</h3>
      <div className="collection-collapse-block-content">
        <div className="wrapper mt-3">
          <div className="range-slider">
            <InputRange
              maxValue={20000}
              minValue={0}
              value={currPrice}
              step={5}
              onChange={changeCurrPrice}
              onChangeComplete={completeChangePrice}
            // onChange={(price) => {
            //   setSelectedPrice(price);
            //   router.push(
            //     `${url}?category=${context.state}&brand=${context.selectedBrands}&color=${context.selectedColor}&size=${context.selectedSize}&minPrice=${context.selectedPrice.min}&maxPrice=${context.selectedPrice.max}`
            //   );
            // }}
            // onChangeComplete={(price) => {
            // context.setSelectedPrice(price);
            // router.push(
            //   `${url}?category=${context.state}&brand=${context.selectedBrands}&color=${context.selectedColor}&size=${context.selectedSize}&minPrice=${context.selectedPrice.min}&maxPrice=${context.selectedPrice.max}`
            // );
            // }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Price;
