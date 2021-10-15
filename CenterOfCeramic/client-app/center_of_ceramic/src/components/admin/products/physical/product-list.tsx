import React, { Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb";
// import data from "../../../assets/data/physical_list";
import { Edit, Trash2 } from "react-feather";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";

import { Category } from "../../../../redux/types/categoryTypes"

import { connect } from "react-redux";
import { useEffect } from "react";

import categoryService from "../../../../services/CategoryService";

import { ApplicationState } from "../../../../redux/store";
import { fetchRequest } from "../../../../redux/actions/categoryAction";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

interface PropsFromState {
	data: Category[]
}
interface propsFromDispatch {
	fetchRequest: (list: Category[]) => any;
}

type AllProps = PropsFromState & propsFromDispatch;

const Product_list: React.FC<AllProps> = ({ data, fetchRequest }) => {
	console.log("HELLO from prodList: ")
	useEffect(() => {
		categoryService.GetCategories().then(data => {
			console.log("HELLO from prodList: ", data.List)
			fetchRequest(data.List);
		})
	}, [])

	return (
		<Fragment>
			<Breadcrumb title="Product List" parent="Physical" />
			<Container fluid={true}>
				<Row className="products-admin ratio_asos">
					{data.map((myData, i) => {
						return (
							<Col xl="3" sm="6" key={i}>
								<Card>
									<div className="products-admin">
										<CardBody className="product-box">
											<div className="img-wrapper">
												{/* <div className="lable-block">
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
												</div> */}
												<div className="front">
													{/* <a href="/#" className="bg-size">
														<img
															alt=""
															className="img-fluid blur-up bg-img lazyloaded"
															src={myData.image}
														/>
													</a> */}
													<div className="product-hover">
														<ul>
															<li>
																<Button color="btn" type="button">
																	<Edit className="editBtn" />
																</Button>
															</li>
															<li>
																<Button color="btn" type="button">
																	<Trash2 className="deleteBtn" />
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
													<h6>{myData.name}</h6>
												</a>
												<h4>
													{/* {myData.price} <del>{myData.discount_price}</del> */}
												</h4>
												<ul className="color-variant">
													<li className="bg-light0"></li>
													<li className="bg-light1"></li>
													<li className="bg-light2"></li>
												</ul>
											</div>
										</CardBody>
									</div>
								</Card>
							</Col>
						);
					})}
				</Row>
			</Container>
		</Fragment>
	);
};

// const mapStateToProps = ({ category }: ApplicationState) => ({
// 	data: category.data
// });

// const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
// 	return {
// 		fetchRequest: (list: Category[]) => {
// 			dispatch(fetchRequest(list));
// 		}
// 	};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Product_list);

export default Product_list;