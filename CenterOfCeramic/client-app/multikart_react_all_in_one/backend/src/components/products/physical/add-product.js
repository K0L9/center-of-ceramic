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

import { useEffect, useRef } from "react"

import categoryService from "../../../app/services/categoryService"
import productService from "../../../app/services/productService";
import countryService from "../../../app/services/countryService";

import Select from 'react-select';
import { ToastContainer, toast } from "react-toastify";
import { ChromePicker } from "react-color"
import rgbHex from "rgb-hex";

import { setVariant, removeVariant, clearVariants } from "../../../app/actions/variantActions";
// import { variantReducer } from "../../../app/reducers/variantReducer"

//import css
import "./add-product.css"
import { Disc } from "react-feather";
import { Editor } from '@tinymce/tinymce-react'

const Add_product = ({ afterPaste, onBlur, onChange, productVariants, setVariant, removeVariant, clearVariants }) => {
	useEffect(() => {
		SaveProductToState();

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
	const SetDescription = () => {
		setDescription(editorRef.current.getContent());
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
	const SetIdentifier = (e) => {
		setIdentifierNumber(e.target.value);
	}

	const handleValidSubmit = (e) => {
		e.preventDefault();

		SaveProductToState();
		console.log("STYLES: ", variantsStyles);

		var product = {};

		product.title = title;
		product.price = price;
		product.description = description;
		product.quantity = quantity;
		product.categoryId = categoryId;
		product.countryId = countryId;

		let colorVariants = [];

		productVariants.map((x, ind) => {
			colorVariants.push({ images: x.images, colorHex: variantsStyles[ind].background, identifierNumber: x.identifierNumber })
		})

		if (colorVariants.length !== variantsStyles.length)
			colorVariants.push({ images: imgsBase64, colorHex: variantsStyles[variantsStyles.length - 1].background, identifyNumber: identifierNumber });

		product.variants = colorVariants;

		productService.addProduct(product).then(isOk => {
			if (isOk === true) {
				toast.success("Товар успішно доданий")
				Discard();
				VariantsDiscard();
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
		setIdentifierNumber("");
		setDescription("");

		setDummyimgs(defaultDummyImgs);
		setImgsBase64(defaultBase64StateValues);
		setCurrentImageSrc(one);
		setIndSmallImgActive(0);
	}
	const DiscardToVariant = () => {
		setIdentifierNumber("");

		setDummyimgs(defaultDummyImgs);
		setImgsBase64(defaultBase64StateValues);
		setCurrentImageSrc(one);
		setIndSmallImgActive(0);
	}
	const VariantsDiscard = () => {
		setVariants([{ id: 0 }]);
		setIsColorPicker(false);
		setColor("#ccc");
		setIndCurrVariant(0);
		setVariantsStyles([]);
		clearVariants();
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
	const [identifierNumber, setIdentifierNumber] = useState("");
	const [color, setColor] = useState("#ccc");
	const [variants, setVariants] = useState([{ id: 0 }]);
	const [variantsStyles, setVariantsStyles] = useState([{ background: color }]);
	const [isColorPicker, setIsColorPicker] = useState(false);
	const [indCurrVariant, setIndCurrVariant] = useState(0);

	const AddVariant = () => {
		let tmpVariants = variants.slice();
		tmpVariants.push({ id: tmpVariants.length });
		setVariants(tmpVariants);

		setIndCurrVariant(tmpVariants.length - 1)

		SaveProductToState();

		let tmpVariantsStyles = variantsStyles.slice();
		tmpVariantsStyles.push({ background: "#ccc" });
		setVariantsStyles(tmpVariantsStyles);

		DiscardToVariant();
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
		setDummyimgs(product.dummyimgs)
		setImgsBase64(product.images)
		setIndCurrVariant(product.varId);
		setCurrentImageSrc(product.dummyimgs[0].img);
		setIndSmallImgActive(0);
		setIdentifierNumber(product.identifierNumber);
	}
	const SaveProductToState = () => {
		let product = {};
		product.images = imgsBase64;
		product.dummyimgs = dummyimgs;
		product.identifierNumber = identifierNumber;
		product.varId = indCurrVariant;
		setVariant(product);
	}
	const handleColorDelete = () => {
		let tmpVariants = variants.slice();
		tmpVariants.splice(indCurrVariant, 1);
		setVariants(tmpVariants);

		let tmpVariantsStyles = variantsStyles.slice();
		tmpVariantsStyles.splice(indCurrVariant, 1);
		setVariantsStyles(tmpVariantsStyles);

		console.log(productVariants);
		removeVariant(indCurrVariant);
		console.log(productVariants);

		if (indCurrVariant === 0) {
			setTimeout(() => console.log("productvariant[0]: ", productVariants[0]), 3000);
			setIndCurrVariant(0);
			SetProductToFields(productVariants[0]);
		}
		else {
			console.log(indCurrVariant)
			setIndCurrVariant(indCurrVariant - 1);
			SetProductToFields(productVariants[indCurrVariant - 1]);
		}
	}
	const editorRef = useRef(null);
	return (
		<Fragment>
			<Breadcrumb title="Add Product" parent="Physical" />

			<Container fluid={true}>
				<Row>
					<Form
						className="needs-validation add-product-form"
						onSubmit={handleValidSubmit}
					>
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
												{isColorPicker === true &&
													<div id="chromePickerContainer">
														<ChromePicker
															color={color}
															onChange={c =>
																OnColorChange(c)
															} />
													</div>}
												<div >
													<Button type="button" color="light" onClick={AddVariant} >Добавити колір</Button>
													<Button type="button" color="light" onClick={handleColorChange} >Змінити колір</Button>
													<Button type="button" color="light" onClick={handleColorDelete} >Видалити колір</Button>
												</div>

											</div>

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
														Код:
													</Label>
													<div className="col-xl-8 col-sm-7">
														<Input
															className="form-control"
															name="identify_number"
															id="validationCustom01"
															type="text"
															onChange={SetIdentifier}
															value={identifierNumber}
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
														className="basic-single z-101"
														classNamePrefix="select"
														defaultValue="Оберіть категорію"
														lang="ru"
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
														className="basic-single z-100"
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

											</FormGroup>
											{/* </Form> */}

										</Col>


										<Label className="col-xl-12 col-sm-12" style={{ textAlign: "center", fontSize: 16, fontWeight: 600 }}>
											Опис:
										</Label>
										<div className="col-xl-12 col-sm-12 description-sm">
											<Editor
												onInit={(evt, editor) => editorRef.current = editor}
												className="p10"
												apiKey="rnv1zli3c4ebl1nb1ffig1imvcmahopklllvbv9br4wythl8"
												init={{
													height: 250,
													menubar: true,
													language: "ru",
													plugins: [
														'advlist autolink lists link image charmap print preview anchor',
														'searchreplace visualblocks code fullscreen',
														'insertdatetime media table paste code help wordcount'
													],
													toolbar: 'undo redo | formatselect | ' +
														'bold italic backcolor | alignleft aligncenter ' +
														'alignright alignjustify | bullist numlist outdent indent | ' +
														'removeformat | help',
													content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
												}}
												onChange={SetDescription}
											/>
										</div>

										<div className="offset-xl-12 offset-sm-12" style={{ marginTop: 10 }}>
											<Button type="submit" color="primary">
												Підтвердити
											</Button>
											<Button type="button" color="light" onClick={Discard}>
												Очистити
											</Button>
										</div>

									</Row>
								</CardBody>
							</Card>
						</Col>
					</Form>

				</Row>
			</Container>
			<ToastContainer pauseOnHover={false}></ToastContainer>
		</Fragment >
	);
};

const mapStateToProps = ({ variantReducer }) => {
	const { productVariants } = variantReducer;
	return { productVariants };
}

const mapDispatchToProps = {
	setVariant, removeVariant, clearVariants
}

export default connect(mapStateToProps, mapDispatchToProps)(Add_product);
