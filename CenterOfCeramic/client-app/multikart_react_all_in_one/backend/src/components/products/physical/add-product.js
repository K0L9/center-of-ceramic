import React, { Fragment, useState } from "react";
import Breadcrumb from "../../common/breadcrumb";
import CKEditors from "react-ckeditor-component";
import {
	Card,
	CardBody,
	CardHeader,
	Col,
	Container,
	Form,
	FormGroup,
	Input,
	Label,
	Row,
	Button,
} from "reactstrap";
import one from "../../../assets/images/pro3/1.jpg";
import user from "../../../assets/images/user.png";
import { Product } from "../../../app/models/product"
import { contextType } from "react-fontawesome";

import { connect } from "react-redux"
import { useEffect } from "react"

import { addProduct } from "../../../app/actions/productAction";
import categoryService from "../../../app/services/categoryService"
import productService from "../../../app/services/productService";

import Select from 'react-select';
import { ToastContainer, toast } from "react-toastify";

const Add_product = ({ afterPaste, onBlur, onChange, addProduct, List }) => {
	useEffect(() => {
		let tmpList = [];

		categoryService.getCategoryList().then(data => {
			data.List.forEach(element => {
				tmpList.push({ value: element.id, label: element.name });
			});
			setCategoryList(tmpList);
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const [file, setFile] = useState();
	const [dummyimgs, setDummyimgs] = useState([
		{ img: user },
		{ img: user },
		{ img: user },
		{ img: user },
		{ img: user },
		{ img: user },
	]);

	const [imgsBase64, setImgsBase64] = useState([
		{ base64Str: '', fileName: "" },
		{ base64Str: '', fileName: "" },
		{ base64Str: '', fileName: "" },
		{ base64Str: '', fileName: "" },
		{ base64Str: '', fileName: "" },
		{ base64Str: '', fileName: "" },
	]);
	const [title, setTitle] = useState('');
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState('');
	const [categoryId, setCategoryId] = useState(43);
	const [quantity, setQuantity] = useState(1);
	const [categoryList, setCategoryList] = useState([]);

	const _handleImgChange = (e, i) => {
		let base64Str;
		e.preventDefault();
		let reader = new FileReader();
		const image = e.target.files[0];
		reader.onload = () => {
			dummyimgs[i].img = reader.result;
			setFile({ file: file });
			setDummyimgs(dummyimgs);

			base64Str = reader.result.replace("data:", "")
				.replace(/^.+,/, "");

			imgsBase64[i].base64Str = base64Str;
			imgsBase64[i].fileName = image.name;
		};
		reader.readAsDataURL(image);
	};

	const IncrementItem = () => {
		if (quantity < 9) {
			setQuantity(quantity + 1);
		} else {
			return null;
		}
	};
	const DecreaseItem = () => {
		if (quantity > 0) {
			setQuantity(quantity - 1);
		} else {
			return null;
		}
	};
	const handleChange = (event) => {
		setQuantity(event.target.value);
	};

	const SetTitle = (e) => {
		setTitle(e.target.value);
	}
	const SetDescription = (e) => {
		// console.log("EDITOR GETDATA: ", e.editor.getData())
		// setDescription(e.editor.getData());

		setDescription(e.target.value);
	}
	const SetPrice = (e) => {
		setPrice(e.target.value);
	}
	const SetCategory = (e) => {
		setCategoryId(e.value);
	}

	const handleValidSubmit = (e) => {
		e.preventDefault();

		var product = new Product();
		product.title = title;
		product.price = price;
		product.description = description;
		product.quantity = quantity;
		product.categoryId = categoryId;
		product.images = imgsBase64;

		productService.addProduct(product).then(isOk => {
			console.log("IS OK: ", isOk);
			if (isOk === true) {
				toast.success("Категорія успішно створена!")
			}
			else {
				toast.error("Виникли проблеми. Перевірте дані та спробуйте ще раз")
			}
		});
	};
	const Discard = () => {
		toast.success("WORKS");
		// setTitle("");
		// setPrice(0);
		// setDescription("");
		// setCategoryId(0);
		// setQuantity(0);
	}
	return (
		<Fragment>
			<Breadcrumb title="Add Product" parent="Physical" />

			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>
							<CardHeader>
								<h5>Add Product</h5>
							</CardHeader>
							<CardBody>
								<Row className="product-adding">
									<Col xl="5">
										<div className="add-product">
											<Row>
												<Col xl="9 xl-50" sm="6 col-9">
													<img
														src={one}
														alt=""
														className="img-fluid image_zoom_1 blur-up lazyloaded"
													/>
												</Col>
												<Col xl="3 xl-50" sm="6 col-3">
													<ul className="file-upload-product">
														{dummyimgs.map((res, i) => {
															return (
																<li key={i}>
																	<div className="box-input-file">
																		<Input
																			className="upload"
																			type="file"
																			onChange={(e) => _handleImgChange(e, i)}
																		/>
																		<img
																			alt=""
																			src={res.img}
																			style={{ width: 50, height: 50 }}
																		/>
																	</div>
																</li>
															);
														})}
													</ul>
												</Col>
											</Row>
										</div>
									</Col>
									<Col xl="7">
										<Form
											className="needs-validation add-product-form"
											onSubmit={handleValidSubmit}
										>
											<div className="form form-label-center">
												<FormGroup className="form-group mb-3 row">
													<Label className="col-xl-3 col-sm-4 mb-0">
														Product Name:
													</Label>
													<div className="col-xl-8 col-sm-7">
														<Input
															className="form-control"
															name="product_name"
															id="validationCustom01"
															type="text"
															onChange={SetTitle}
															required
														/>
													</div>
													<div className="valid-feedback">Looks good!</div>
												</FormGroup>
												<FormGroup className="form-group mb-3 row">
													<Label className="col-xl-3 col-sm-4 mb-0">
														Price:
													</Label>
													<div className="col-xl-8 col-sm-7">
														<Input
															className="form-control mb-0"
															name="price"
															id="validationCustom02"
															type="number"
															onChange={SetPrice}
															required
														/>
													</div>
													<div className="valid-feedback">Looks good!</div>
												</FormGroup>
											</div>
											<FormGroup className="form-group row">
												<Label className="col-xl-3 col-sm-4 mb-0">
													Total Products:
												</Label>
												<fieldset className="ml-0">
													<div className="input-group bootstrap-touchspin">
														<div className="input-group-prepend">
															<Button
																className="btn btn-primary btn-square bootstrap-touchspin-down"
																type="button"
																onClick={DecreaseItem}
															>
																<i className="fa fa-minus"></i>
															</Button>
														</div>
														<div className="input-group-prepend">
															<span className="input-group-text bootstrap-touchspin-prefix"></span>
														</div>
														<Input
															className="touchspin form-control"
															type="text"
															value={quantity}
															onChange={handleChange}
														/>
														<div className="input-group-append">
															<span className="input-group-text bootstrap-touchspin-postfix"></span>
														</div>
														<div className="input-group-append ml-0">
															<Button
																className="btn btn-primary btn-square bootstrap-touchspin-up"
																type="button"
																onClick={IncrementItem}
															>
																<i className="fa fa-plus"></i>
															</Button>
														</div>
													</div>
												</fieldset>
											</FormGroup>
											<FormGroup className="form-group row">
												<Label className="col-xl-3 col-sm-4">
													Category:
												</Label>
												<div className="col-xl-8 col-sm-7 category-sm">
													<Select
														className="basic-single"
														classNamePrefix="select"
														defaultValue="Оберіть категорію"
														name="categoryId"
														onChange={SetCategory}
														options={categoryList}
													/>
												</div>
											</FormGroup>
											<FormGroup className="form-group row">
												<Label className="col-xl-3 col-sm-4">
													Add Description:
												</Label>
												<div className="col-xl-8 col-sm-7 description-sm">
													{/* <CKEditors
														activeclassName="p10"
														events={{
															ready: onReadyCkEDITOR,
															// blur: onBlur,
															// afterPaste: afterPaste,
															change: SetDescription,
														}}

													// onChange={SetDescription}
													/> */}
													<textarea onChange={SetDescription} className="p10" />
												</div>
											</FormGroup>
											{/* </Form> */}
											<div className="offset-xl-3 offset-sm-4">
												<Button type="submit" color="primary">
													Add
												</Button>
												<Button type="button" color="light" onClick={Discard}>
													Discard
												</Button>
											</div>
										</Form>
									</Col>
								</Row>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
			<ToastContainer pauseOnHover={false}></ToastContainer>
		</Fragment>
	);
};


const mapStateToProps = ({ categoryReducer }) => {
	const { List } = categoryReducer;
	return { List };
}

const mapDispatchToProps = {
	addProduct
}


export default connect(mapStateToProps, mapDispatchToProps)(Add_product);
