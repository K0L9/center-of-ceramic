import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Form,
  Label,
  Input,
} from "reactstrap";

import { Link, RichText, Date } from 'prismic-reactjs';
import ReactStars from "react-rating-stars-component";

import reviewService from "../../../services/review-service"
import { toast, ToastContainer } from "react-toastify";
import Parser from 'html-react-parser';

const ProductTab = ({ product }) => {
  const [activeTab, setActiveTab] = useState("1");

  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(1);

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };
  const bodyChanged = (e) => {
    setBody(e.target.value);
  }
  const nameChagned = (e) => {
    setName(e.target.value);
  }
  const emailChanged = (e) => {
    setEmail(e.target.value);
  }

  const sendReview = (e) => {
    e.preventDefault();

    const review = { name, email, body, rating, productId: product.id };
    reviewService.addReview(review).then(isOk => {
      if (isOk) {
        toast.success("Дякуємо за відгук");
        Discard();
      }
      else {
        toast.error("Виникли помилки. Спробуйте ще раз");
      }
    });

  }

  const Discard = () => {
    setRating(1);
    setBody("");
    setName("");
    setEmail("");
  }

  console.log("product: ", product)

  return (
    <section className="tab-product m-0">
      <Container>
        <Row>
          <Col sm="12" lg="12">
            <Row className="product-page-main m-0">
              <Nav tabs className="nav-material">
                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                  <NavLink
                    className={activeTab === "1" ? "active" : ""}
                    onClick={() => setActiveTab("1")}
                  >
                    Опис
                  </NavLink>
                </NavItem>
                <NavItem className="nav nav-tabs" id="myTab" role="tablist">
                  <NavLink
                    className={activeTab === "4" ? "active" : ""}
                    onClick={() => setActiveTab("4")}
                  >
                    Відгуки
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab} className="nav-material">
                <TabPane tabId="1">
                  {product.description && (
                    <div>{Parser(product.description)}</div>
                  )}
                </TabPane>

                <TabPane tabId="4">
                  <Form onSubmit={sendReview} className="form-fluid">
                    <div className="form-group">
                      <Row className="mb-2">
                        <Col sm="12" lg="4">
                          <Label for="review">Ім'я</Label>
                          <Input type="text" className="form-control" id="review" value={name}
                            placeholder="Введіть ім'я" required="" onChange={nameChagned} />
                        </Col>

                        <Col sm="12" lg="4">
                          <Label for="email">Пошта</Label>
                          <Input type="text" className="form-control" id="email" value={email}
                            placeholder="Введіть пошту" required="" onChange={emailChanged} />
                        </Col>

                        <Col sm="12" lg="4" >
                          <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={35}
                            value={rating}
                            activeColor="#ffd700"
                          />
                        </Col>
                      </Row>
                      <Row className="mb-2" >
                        <Col>
                          <Input type="textarea" style={{ height: 200 }} className="form-control" value={body} placeholder="Залиште ваш відгук про товар тут." onChange={bodyChanged} />
                        </Col>
                      </Row>
                      <Row className="mb-2">
                        <Col>
                          <button type="submit" className="btn btn-solid">Відіслати</button>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </TabPane>
              </TabContent>
            </Row>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </section>
  );
};

export default ProductTab;
