import React, { Fragment, useState } from "react";
import Breadcrumb from "../../common/breadcrumb";
import data from "../../../assets/data/physical_list";
import { Edit, Trash2 } from "react-feather";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";

import { useEffect } from "react";
import { connect } from "react-redux";
import productService from "../../../app/services/productService"
import { deleteProduct, getAllProducts, setCurrProduct } from "../../../app/actions/productAction"
import { toast, ToastContainer } from "react-toastify";
import { Link, Redirect } from "react-router-dom";
import one from "../../../assets/images/pro3/1.jpg";
import { COMPARISON_BINARY_OPERATORS } from "@babel/types";

const Product_list = ({ ProductList, getAllProducts, deleteProduct, setCurrProduct }) => {

	const [isEdit, setIsEdit] = useState(false);

	useEffect(() => {
		let starterImages = [];
		productService.getProductList().then(data => {
			getAllProducts(data.List);

			data.List.map(x => {
				if (x.variants[0].images[0] === undefined)
					starterImages.push(one);
				else
					starterImages.push(x.variants[0].images[0].url);
			})
		});
		setCurrentImages(starterImages);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const DeleteProduct = (indInDb, indInArr) => {
		deleteProduct(indInArr);
		productService.deleteProduct(indInDb).then(isOk => {
			if (isOk == true)
				toast.success("Товар успішно видалений");
			else
				toast.error("Виникли помилки. Оновіть сторінку та спробуйте ще раз");
		});
	}
	const HandleEdit = (myData) => {
		setIsEdit(true);
		setCurrProduct(myData);
	}

	const [currentImages, setCurrentImages] = useState([]);

	const setCurrVariantImage = (prInd, varInd) => {
		let tmp = currentImages.slice();

		tmp[prInd] = ProductList[prInd].variants[varInd].images[0].url;
		setCurrentImages(tmp);
	}

	const getImage = (ind) => {
		if (currentImages[ind] === undefined) {
			if (ProductList[ind].variants[0].images[0] === undefined)
				return one;
			return ProductList[ind].variants[0].images[0].url;
		}
		return currentImages[ind];
	}

	if (isEdit === true) {
		return (
			<Redirect push to="edit-product" />
		)
	}

	return (
		<Fragment>
			<Breadcrumb title="Product List" parent="Physical" />
			<Container fluid={true}>
				<Row className="products-admin ratio_asos">
					{ProductList.map((myData, i) => {
						return (
							<Col xl="3" sm="6" key={i}>
								<Card>
									<div className="products-admin">
										<CardBody className="product-box">
											<div className="img-wrapper">
												<div className="lable-block">
													{myData.tag === "new" ? (
														<span className="lable3">{myData.tag}</span>
													) : (
														""
													)}
													{myData.discount === "on sale" ? (
														<span className="lable4">{myData.discount}</span>
													) : (
														""
													)}
												</div>
												<div className="front">
													<a href="/#" className="bg-size">
														<img
															alt=""
															className="img-fluid blur-up bg-img lazyloaded"
															src={getImage(i) === undefined ? one : getImage(i)}
														/>
													</a>
													<div className="product-hover">
														<ul>
															<li>
																<Link to="products/physical/product-list/edit-product" />
																<Button color="btn" type="button">
																	<Edit className="editBtn" onClick={() => HandleEdit(myData)} />
																</Button>
															</li>
															<li>
																<Button color="btn" type="button">
																	<Trash2 className="deleteBtn" onClick={() => DeleteProduct(myData.id, i)} />
																</Button>
															</li>
														</ul>
													</div>
												</div>
											</div>
											<div className="product-detail">
												<div className="rating">
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
													<i className="fa fa-star"></i>
												</div>
												<a href="/#">
													{" "}
													<h6>{myData.title}</h6>
												</a>
												<h4>
													{myData.price} <del>{myData.discount_price}</del>
												</h4>
												{myData.variants.length !== 1 && (
													<ul className="color-variant">
														{myData.variants.map((variant, ind) =>
															(<li key={ind} className="bg-light1" style={{ backgroundColor: variant.colorHex }} onClick={() => setCurrVariantImage(i, ind)}></li>)
														)}
													</ul>
												)}
											</div>
										</CardBody>
									</div>
								</Card>
							</Col>
						);
					})}
				</Row>
			</Container>
			<ToastContainer pauseOnHover={false}></ToastContainer>
		</Fragment>
	);
};

const mapStateToProps = ({ productReducer }) => {
	const { ProductList } = productReducer;
	return { ProductList };
}

const mapDispatchToProps = {
	getAllProducts, deleteProduct, setCurrProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(Product_list);
