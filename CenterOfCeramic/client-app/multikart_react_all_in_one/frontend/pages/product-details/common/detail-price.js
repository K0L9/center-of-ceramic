import React, { useState, useContext } from "react";
import Link from "next/link";
import sizeChart from "../../../public/assets/images/size-chart.jpg";
import { Modal, ModalBody, ModalHeader, Media, Input } from "reactstrap";
import { CurrencyContext } from "../../../helpers/Currency/CurrencyContext";
import CartContext from "../../../helpers/cart";
import CountdownComponent from "../../../components/common/widgets/countdownComponent";
import MasterSocial from "./master_social";

const DetailsWithPrice = ({ item, stickyClass, changeColorVar }) => {
  const [modal, setModal] = useState(false);
  const CurContect = useContext(CurrencyContext);
  const symbol = CurContect.state.symbol;
  const toggle = () => setModal(!modal);
  const product = item;
  const context = useContext(CartContext);
  const stock = context.stock;
  const plusQty = context.plusQty;
  const minusQty = context.minusQty;
  const quantity = context.quantity;
  const uniqueColor = [];
  const uniqueSize = [];

  const [qty, setQty] = useState(1);

  const changeQty = (e) => {
    setQty(e.target.value);
  };

  const minusQuantity = (e) => {
    setQty(e.target.value > 1 ? e.target.value - 1 : e.target.value)
  }
  const plusQuantity = (e) => {
    setQty(e.target.value + 1);
  }

  function removeTags(str) {
    if ((str === null) || (str === ''))
      return false;
    else
      str = str.toString();

    return str.replace(/(<([^>]+)>)/ig, '').split(".")[0];
  }

  const getInStock = () => {
    if (qty <= product.quantity) {
      return (
        <span>В наявності</span>
      )
    }
    return (
      <span>Недостатньо товарів</span>
    )
  }

  return (
    <>
      <div className={`product-right ${stickyClass}`}>
        <h2> {product.title} </h2>

        {product.isSale === true &&
          <h4>
            <del>
              {symbol}
              {product.oldPrice}
            </del>
            <span>{parseInt(100 - (product.price * 100 / product.oldPrice))}% економії</span>
          </h4>
        }
        <h3>
          {symbol}
          {product.price}
        </h3>

        {/* {product.variants.map((vari) => {
          var findItem = uniqueColor.find((x) => x.color === vari.color);
          if (!findItem) uniqueColor.push(vari);
          var findItemSize = uniqueSize.find((x) => x === vari.size);
          if (!findItemSize) uniqueSize.push(vari.size);
        })} */}
        {product.variants.lenght === 1 && (
          changeColorVar === undefined ? (
            <>
              <ul className="color-variant">
                {product.variants.map((vari, i) => {
                  return (
                    <li className={vari.colorHex} style={{ backgroundColor: vari.colorHex }} key={i}></li>
                  );
                })}
              </ul>
            </>
          ) : (
            <>
              <ul className="color-variant">
                {product.variants.map((vari, i) => {
                  return (
                    <li
                      className={vari.color}
                      key={i}
                      title={vari.color}
                      style={{ backgroundColor: vari.colorHex }}
                      onClick={() => changeColorVar(i)}
                    ></li>
                  );
                })}
              </ul>
            </>
          )
        )}
        <div className="product-description border-product">
          {/* {product.variants ? (
            <div>
              <h6 className="product-title size-text">
                select size
                <span>
                  <a
                    href={null}
                    data-toggle="modal"
                    data-target="#sizemodal"
                    onClick={toggle}
                  >
                    size chart
                  </a>
                </span>
              </h6>
              <Modal isOpen={modal} toggle={toggle} centered>
                <ModalHeader toggle={toggle}>Sheer Straight Kurta</ModalHeader>
                <ModalBody>
                  <Media src={sizeChart} alt="size" className="img-fluid" />
                </ModalBody>
              </Modal>
              <div className="size-box">
                <ul>
                  {uniqueSize.map((data, i) => {
                    return (
                      <li key={i}>
                        <a href={null}>{data}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ) : (
            ""
          )} */}
          <span className="instock-cls">{getInStock()}</span>
          <h6 className="product-title">Кількість</h6>
          <div className="qty-box">
            <div className="input-group">
              <span className="input-group-prepend">
                <button
                  type="button"
                  className="btn quantity-left-minus"
                  onClick={minusQuantity}
                  data-type="minus"
                  data-field=""
                >
                  <i className="fa fa-angle-left"></i>
                </button>
              </span>
              <Input
                type="text"
                name="quantity"
                value={qty}
                onChange={changeQty}
                className="form-control input-number"
              />
              <span className="input-group-prepend">
                <button
                  type="button"
                  className="btn quantity-right-plus"
                  onClick={plusQuantity}
                  data-type="plus"
                  data-field=""
                >
                  <i className="fa fa-angle-right"></i>
                </button>
              </span>
            </div>
          </div>
        </div>
        <div className="product-buttons">
          <a
            href={null}
            className="btn btn-solid"
            onClick={() => context.addToCart(product, quantity)}
          >
            в корзину
          </a>
          <Link href={`/page/account/checkout`}>
            <a className="btn btn-solid">купити зараз</a>
          </Link>
        </div>
        <div className="border-product">
          <h6 className="product-title">Короткий опис</h6>
          <p>{removeTags(product.description)}</p>
        </div>
        <div className="border-product">
          <h6 className="product-title">поширити це</h6>
          <div className="product-icon">
            <MasterSocial />
          </div>
        </div>
        {/* <div className="border-product">
          <h6 className="product-title">Time Reminder</h6>
          <CountdownComponent />
        </div> */}
      </div>
    </>
  );
};

export default DetailsWithPrice;
