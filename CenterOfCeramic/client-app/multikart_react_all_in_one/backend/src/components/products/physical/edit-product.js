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
import FontAwesome, { contextType, FontAwesomeIcon } from "react-fontawesome";

import { connect } from "react-redux"
import { useEffect } from "react"

import { addProduct } from "../../../app/actions/productAction";
import categoryService from "../../../app/services/categoryService"
import countryService from "../../../app/services/countryService"
import productService from "../../../app/services/productService";

import Select from 'react-select';
import { ToastContainer, toast } from "react-toastify";

//import css
import "./add-product.css"
import { getDefaultNormalizer, prettyDOM } from "@testing-library/dom";
import { Redirect } from "react-router-dom";
import { isCallExpression } from "@babel/types";


const Edit_product = ({ CurrentProduct }) => {

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
                toast.error("Немає жодної категорії для товару. Добавте категорію")
            }
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let defaultBase64StateValues = [
        { base64Str: '', fileName: "", isDeleted: false },
        { base64Str: '', fileName: "", isDeleted: false },
        { base64Str: '', fileName: "", isDeleted: false },
        { base64Str: '', fileName: "", isDeleted: false },
        { base64Str: '', fileName: "", isDeleted: false },
        { base64Str: '', fileName: "", isDeleted: false },
    ]
    let defaultDummyImgs = [
        { img: CurrentProduct.photos === undefined || CurrentProduct.photos[0] === undefined ? one : CurrentProduct.photos[0].url },
        { img: CurrentProduct.photos === undefined || CurrentProduct.photos[1] === undefined ? one : CurrentProduct.photos[1].url },
        { img: CurrentProduct.photos === undefined || CurrentProduct.photos[2] === undefined ? one : CurrentProduct.photos[2].url },
        { img: CurrentProduct.photos === undefined || CurrentProduct.photos[3] === undefined ? one : CurrentProduct.photos[3].url },
        { img: CurrentProduct.photos === undefined || CurrentProduct.photos[4] === undefined ? one : CurrentProduct.photos[4].url },
        { img: CurrentProduct.photos === undefined || CurrentProduct.photos[5] === undefined ? one : CurrentProduct.photos[5].url },
    ]

    const [file, setFile] = useState();
    const [dummyimgs, setDummyimgs] = useState([
        { img: CurrentProduct.photos === undefined || CurrentProduct.photos[0] === undefined ? one : CurrentProduct.photos[0].url },
        { img: CurrentProduct.photos === undefined || CurrentProduct.photos[1] === undefined ? one : CurrentProduct.photos[1].url },
        { img: CurrentProduct.photos === undefined || CurrentProduct.photos[2] === undefined ? one : CurrentProduct.photos[2].url },
        { img: CurrentProduct.photos === undefined || CurrentProduct.photos[3] === undefined ? one : CurrentProduct.photos[3].url },
        { img: CurrentProduct.photos === undefined || CurrentProduct.photos[4] === undefined ? one : CurrentProduct.photos[4].url },
        { img: CurrentProduct.photos === undefined || CurrentProduct.photos[5] === undefined ? one : CurrentProduct.photos[5].url },
    ]);
    const [imgsBase64, setImgsBase64] = useState([
        { base64Str: '', fileName: "", isDeleted: false },
        { base64Str: '', fileName: "", isDeleted: false },
        { base64Str: '', fileName: "", isDeleted: false },
        { base64Str: '', fileName: "", isDeleted: false },
        { base64Str: '', fileName: "", isDeleted: false },
        { base64Str: '', fileName: "", isDeleted: false },
    ]);

    const [title, setTitle] = useState(CurrentProduct.title);
    const [isSale, setIsSale] = useState(CurrentProduct.isSale);
    const [price, setPrice] = useState(CurrentProduct.isSale === false ? CurrentProduct.price : CurrentProduct.oldPrice);
    const [newPrice, setNewPrice] = useState(CurrentProduct.isSale === true ? CurrentProduct.price : undefined);
    const [description, setDescription] = useState(CurrentProduct.description);
    const [categoryId, setCategoryId] = useState(CurrentProduct.categoryId);
    const [countryId, setCountryId] = useState(CurrentProduct.countryId);
    const [quantity, setQuantity] = useState(CurrentProduct.quantity);
    const [categoryList, setCategoryList] = useState([]);
    const [countryList, setCountryList] = useState([]);

    const [currentImageSrc, setCurrentImageSrc] = useState(dummyimgs[0].img);
    const [indSmallImgActive, setIndSmallImgActive] = useState(0);

    const [isRedirect, setIsRedirect] = useState(false);

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
            imgsBase64[indSmallImgActive].isDeleted = false;

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
    const SetNewPrice = (e) => {
        setNewPrice(e.target.value);
    }

    const handleValidSubmit = (e) => {
        e.preventDefault();

        var product = new Product();
        product.id = CurrentProduct.id;
        product.title = title;
        product.description = description;
        product.quantity = quantity;
        product.categoryId = categoryId;
        product.countryId = countryId;
        product.images = imgsBase64;
        product.isSale = isSale;

        if (!isSale) {
            product.price = price;
        }
        else {
            product.oldPrice = price;
            product.price = newPrice;
        }

        console.log("FINAL PRODUCT: ", product);

        productService.editProduct(product).then(isOk => {
            if (isOk === true) {
                setIsRedirect(true);
                toast.success("Товар успішно відредагований");
            }
            else {
                toast.error("Виникли помилки. Перевірте дані та спробуйте ще раз");
            }
        });
    };
    const Discard = () => {
        setTitle(CurrentProduct.title);
        setPrice(CurrentProduct.price);
        setIsSale(CurrentProduct.isSale);
        setDescription(CurrentProduct.description);
        setCategoryId(CurrentProduct.categoryId);
        setCategoryId(CurrentProduct.countryId);
        setQuantity(CurrentProduct.quantity);

        setDummyimgs(defaultDummyImgs);
        setImgsBase64(defaultBase64StateValues);
        setCurrentImageSrc(defaultDummyImgs[0].img);
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
        imgsBase64[indSmallImgActive] = { base64Str: '', fileName: "", isDeleted: true };
        setCurrentImageSrc(one);
    }
    const SetIsSaleHandle = (event) => {
        let isChecked = event.target.checked;
        setIsSale(isChecked);

        if (isChecked === false)
            setNewPrice(0);
    }

    if (isRedirect === true) {
        return (
            <Redirect to="/products/physical/product-list" />
        )
    }

    return (
        <Fragment>
            <Breadcrumb title="Add Product" parent="Physical" />

            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>Редагування товару</h5>
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
                                                            id="price" //validationCustom02
                                                            type="number"
                                                            onChange={SetPrice}
                                                            value={price}
                                                            required
                                                            disabled={isSale}
                                                        />
                                                    </div>
                                                    <div className="valid-feedback">Looks good!</div>
                                                </FormGroup>

                                                <FormGroup className="form-group mb-3 row">
                                                    <Label className="col-xl-3 col-sm-4 mb-0">
                                                        <Input
                                                            className="checkbox_animated"
                                                            id="chk-ani2"
                                                            type="checkbox"
                                                            onChange={SetIsSaleHandle}
                                                            checked={isSale}
                                                        />
                                                        Акція:
                                                    </Label>
                                                    <div className="col-xl-8 col-sm-7">
                                                        <Input
                                                            className="form-control mb-0"
                                                            name="newPrice"
                                                            id="newPrice"
                                                            type="number"
                                                            onChange={SetNewPrice}
                                                            value={newPrice}
                                                            disabled={!isSale}
                                                        />
                                                    </div>
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
                                                        value={categoryList.filter(option => option.value === categoryId)}
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
                                                        value={countryList.filter(option => option.value === countryId)}
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
                                                    Відмінити зміни
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


const mapStateToProps = ({ productReducer }) => {
    const { CurrentProduct } = productReducer;
    return { CurrentProduct };
}

const mapDispatchToProps = {
    addProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit_product);
