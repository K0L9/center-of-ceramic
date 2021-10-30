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
import { Product } from "../../../app/models/product"
import { connect } from "react-redux";

import { useEffect } from "react"

import categoryService from "../../../app/services/categoryService"
import productService from "../../../app/services/productService";
import countryService from "../../../app/services/countryService";

import Select from 'react-select';
import { ToastContainer, toast } from "react-toastify";
import { ChromePicker } from "react-color"
import rgbHex from "rgb-hex";

import { setVariant } from "../../../app/actions/variantActions";
// import { variantReducer } from "../../../app/reducers/variantReducer"

//import css
import "./add-product.css"
import { Disc } from "react-feather";

const Add_product = ({ afterPaste, onBlur, onChange, productVariants, setVariant }) => {
	useEffect(() => {
		let tmpListCateg = [];
		let tmpListCountry = [];

		categoryService.getCategoryList().then(data => {
			data.List.forEach(element => {
				tmpListCateg.push({ value: element.id, label: element.name });
			});
			setCategoryList(tmpListCateg);

			if (tmpListCateg.length === 0) {
				toast.error("Немає жодної категорії для товару. Добавте категорію")
			}
		});
		countryService.getCountryList().then(data => {
			data.List.forEach(element => {
				tmpListCountry.push({ value: element.id, label: element.name });
			});
			setCountryList(tmpListCountry);

			if (tmpListCountry.length === 0) {
				toast.error("Немає жодної країни-виробника для товару. Добавте країну")
			}
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	let defaultBase64StateValues = [
		{ base64Str: '', fileName: "" },
		{ base64Str: '', fileName: "" },
		{ base64Str: '', fileName: "" },
		{ base64Str: '', fileName: "" },
		{ base64Str: '', fileName: "" },
		{ base64Str: '', fileName: "" },
	]
	let defaultDummyImgs = [
		{ img: one },
		{ img: one },
		{ img: one },
		{ img: one },
		{ img: one },
		{ img: one },
	]

	const [file, setFile] = useState();
	const [dummyimgs, setDummyimgs] = useState([
		{ img: one },
		{ img: one },
		{ img: one },
		{ img: one },
		{ img: one },
		{ img: one },
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
	const [categoryId, setCategoryId] = useState(0);
	const [countryId, setCountryId] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [categoryList, setCategoryList] = useState([]);
	const [countryList, setCountryList] = useState([]);

	const [currentImageSrc, setCurrentImageSrc] = useState(one);
	const [indSmallImgActive, setIndSmallImgActive] = useState(0);

	const _handleImgChange = (e) => {
		let base64Str;
		e.preventDefault();
		let reader = new FileReader();
		const image = e.target.files[0];
		reader.onload = () => {
			dummyimgs[indSmallImgActive].img = reader.result;
			setFile({ file: file });
			setDummyimgs(dummyimgs);

			base64Str = reader.result.replace("data:", "")
				.replace(/^.+,/, "");

			imgsBase64[indSmallImgActive].base64Str = base64Str;
			imgsBase64[indSmallImgActive].fileName = image.name;

			setCurrentImageSrc(reader.result);
		};
		reader.readAsDataURL(image);
	};

	const IncrementItem = () => {
		setQuantity(quantity + 1);
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
		setDescription(e.target.value);
	}
	const SetPrice = (e) => {
		setPrice(e.target.value);
	}
	const SetCategory = (e) => {
		setCategoryId(e.value);
	}
	const SetCountry = (e) => {
		setCountryId(e.value);
	}

	const handleValidSubmit = (e) => {
		e.preventDefault();

		var product = new Product();
		product.title = title;
		product.price = price;
		product.description = description;
		product.quantity = quantity;
		product.categoryId = categoryId;
		product.countryId = countryId;
		product.images = imgsBase64;

		productService.addProduct(product).then(isOk => {
			if (isOk === true) {
				toast.success("Товар успішно доданий")
				Discard();
			}
			else {
				toast.error("Виникли проблеми. Перевірте дані та спробуйте ще раз")
			}
		});
	};
	const Discard = () => {
		setTitle("");
		setPrice(0);
		setDescription("");
		setCategoryId(0);
		setCountryId(0);
		setQuantity(1);

		setDummyimgs(defaultDummyImgs);
		setImgsBase64(defaultBase64StateValues);
		setCurrentImageSrc(one);
		setIndSmallImgActive(0);
	}

	const SetImageToBig = (src, i) => {
		setCurrentImageSrc(src);
		setIndSmallImgActive(i);
	}
	const CheckActiveSmallImg = (ind) => {
		if (indSmallImgActive === ind)
			return "activeSmImg";
		return "";
	}
	const DeletePhoto = () => {
		dummyimgs[indSmallImgActive] = { img: one };
		imgsBase64[indSmallImgActive] = { base64Str: '', fileName: "" };
		setCurrentImageSrc(one);
	}

	//variants
	const [variants, setVariants] = useState([{ id: 0 }]);
	const [isColorPicker, setIsColorPicker] = useState(false);
	const [color, setColor] = useState("#fff");
	const [indCurrVariant, setIndCurrVariant] = useState(0);
	const [variantsStyles, setVariantsStyles] = useState([]);

	const AddVariant = () => {
		let tmpVariants = variants.slice();
		tmpVariants.push({ id: tmpVariants.length });
		setVariants(tmpVariants);
		SaveProductToState();
		Discard();
		setIndCurrVariant(tmpVariants.length - 1)
	}
	const handleColorChange = () => {
		setIsColorPicker(!isColorPicker);
	}
	const OnColorChange = (c) => {
		setColor("#" + rgbHex(c.rgb.r, c.rgb.g, c.rgb.b, c.rgb.a))
		var tmpStyles = variantsStyles.slice();
		tmpStyles[indCurrVariant] = { background: color };
		setVariantsStyles(tmpStyles);
	}
	const CheckIfActiveVariant = (ind) => {
		if (ind === indCurrVariant)
			return "activeVariant"

		return null;
	}
	const SetCurrVariant = (ind) => {

		setIndCurrVariant(ind);

		SaveProductToState();

		let newProduct = productVariants[ind];
		if (newProduct !== undefined)
			SetProductToFields(newProduct);

	}
	const GetVariantStyle = (ind) => {
		return variantsStyles[ind];
	}
	const SetProductToFields = (product) => {
		setTitle(product.title);
		setPrice(product.price);
		setQuantity(product.quantity);
		setCountryId(product.countryId);
		setCategoryId(product.categoryId);
		setDescription(product.description);
		setDummyimgs(product.dummyimgs)
		setImgsBase64(product.images)
		setIndCurrVariant(product.varId);
		setCurrentImageSrc(product.dummyimgs[0].img);
		setIndSmallImgActive(0);
	}
	const SaveProductToState = () => {
		let product = {};
		product.title = title;
		product.price = price;
		product.description = description;
		product.quantity = quantity;
		product.categoryId = categoryId;
		product.countryId = countryId;
		product.images = imgsBase64;
		product.dummyimgs = dummyimgs;
		product.varId = indCurrVariant;
		setVariant(product);
	}
	return (
		<Fragment>
			<Breadcrumb title="Add Product" parent="Physical" />

			<Container fluid={true}>
				<Row>
					<Col sm="12">
						<Card>
							<CardHeader>
								<h5>Добавлення товару</h5>
							</CardHeader>
							<CardBody>
								<Row className="product-adding">
									<Col xl="5">
										<div className="add-product">
											<Row>
												<Col xl="9 xl-50" sm="6 col-9">
													<div className="big-curr-img">
														<img
															src={currentImageSrc}
															alt=""
															className="img-fluid image_zoom_1 blur-up lazyloaded"
														/>
														<div className="btnGroup">

															<button className="iconOverBtn" onClick={() => (document.getElementById("uploadFileInput").click())}>
																<Input
																	className="upload"
																	type="file"
																	hidden
																	id="uploadFileInput"
																	accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
																	onChange={(e) => _handleImgChange(e)}
																/>
																Завантажити</button>

															<button className="iconOverBtn" onClick={DeletePhoto}>Видалити</button>
														</div>
													</div>
												</Col>
												<Col xl="3 xl-50" sm="6 col-3">
													<ul className="file-upload-product">
														{dummyimgs.map((res, i) => {
															return (
																<li key={i}>
																	<div className={`box-input-file smallImgs ${CheckActiveSmallImg(i)}`} onClick={() => SetImageToBig(res.img, i)}>
																		{/* <Input
																			className="upload"
																			type="file"
																			onChange={(e) => _handleImgChange(e, i)}
																		/> */}
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
										<div className="variants">
											{variants.map((data, ind) => (
												<div className={`variantColor ${CheckIfActiveVariant(ind)}`} onClick={() => SetCurrVariant(ind)} style={GetVariantStyle(ind)} >

												</div>
											))}
											<div className="variantColor" onClick={AddVariant} >

											</div>
											{isColorPicker === true &&
												<div id="chromePickerContainer">
													<ChromePicker
														color={color}
														onChange={c =>
															OnColorChange(c)
														} />
												</div>}
											<div className="variantsBtnGroup">
												<Button type="button" color="light" onClick={handleColorChange} >Змінити колір</Button>
											</div>

										</div>


										<Form
											className="needs-validation add-product-form"
											onSubmit={handleValidSubmit}
										>
											<div className="form form-label-center">
												<FormGroup className="form-group mb-3 row">
													<Label className="col-xl-3 col-sm-4 mb-0">
														Назва:
													</Label>
													<div className="col-xl-8 col-sm-7">
														<Input
															className="form-control"
															name="product_name"
															id="validationCustom01"
															type="text"
															onChange={SetTitle}
															value={title}
															required
														/>
													</div>
													<div className="valid-feedback">Looks good!</div>
												</FormGroup>
												<FormGroup className="form-group mb-3 row">
													<Label className="col-xl-3 col-sm-4 mb-0">
														Ціна:
													</Label>
													<div className="col-xl-8 col-sm-7">
														<Input
															className="form-control mb-0"
															name="price"
															id="validationCustom02"
															type="number"
															onChange={SetPrice}
															value={price}
															required
														/>
													</div>
													<div className="valid-feedback">Looks good!</div>
												</FormGroup>
											</div>
											<FormGroup className="form-group row">
												<Label className="col-xl-3 col-sm-4 mb-0">
													К-сть на складі:
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
													Категорія товару:
												</Label>
												<div className="col-xl-8 col-sm-7 category-sm">
													<Select
														id="selectCategory"
														className="basic-single"
														classNamePrefix="select"
														defaultValue="Оберіть категорію"
														lang="ua"
														name="categoryId"
														onChange={SetCategory}
														options={categoryList}
														value={categoryList.filter(option => option.value == categoryId)}
													/>
												</div>
											</FormGroup>
											<FormGroup className="form-group row">
												<Label className="col-xl-3 col-sm-4">
													Країна-виробник товару:
												</Label>
												<div className="col-xl-8 col-sm-7 category-sm">
													<Select
														id="selectCountry"
														className="basic-single"
														classNamePrefix="select"
														defaultValue="Оберіть країну-виробника"
														lang="ru-RU"
														name="countryId"
														onChange={SetCountry}
														options={countryList}
														value={countryList.filter(option => option.value == countryId)}
													/>
												</div>
											</FormGroup>
											<FormGroup className="form-group row">
												<Label className="col-xl-3 col-sm-4">
													Опис:
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
													<textarea
														className="p10"
														value={description}
														onChange={SetDescription} />
												</div>
											</FormGroup>
											{/* </Form> */}
											<div className="offset-xl-3 offset-sm-4">
												<Button type="submit" color="primary">
													Підтвердити
												</Button>
												<Button type="button" color="light" onClick={Discard}>
													Очистити
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

const mapStateToProps = ({ variantReducer }) => {
	const { productVariants } = variantReducer;
	return { productVariants };
}

const mapDispatchToProps = {
	setVariant
}

export default connect(mapStateToProps, mapDispatchToProps)(Add_product);
