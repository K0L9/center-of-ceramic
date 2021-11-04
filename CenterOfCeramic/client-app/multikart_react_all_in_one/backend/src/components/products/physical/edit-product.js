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
import rgbHex from "rgb-hex";

import { connect } from "react-redux"
import { useEffect } from "react"

import { addProduct } from "../../../app/actions/productAction";
import categoryService from "../../../app/services/categoryService"
import countryService from "../../../app/services/countryService"
import productService from "../../../app/services/productService";

import { ChromePicker } from "react-color"

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

        let variantsIdsTmp = [];
        let variantsStylesTmp = [];
        let tmpVariantsList = []

        if (CurrentProduct.variants !== undefined) {
            if (CurrentProduct.variants.length > 1) {
                CurrentProduct.variants.map((x, ind) => {
                    let tmpDmmyImgs = [];
                    if (x.images !== undefined) {
                        x.images.map(img => {
                            tmpDmmyImgs.push({ img: img === undefined ? one : img.url });
                        })
                        for (let counter = x.images.length; counter < 6; counter++) {
                            tmpDmmyImgs.push({ img: one });
                        }
                    }
                    else {
                        tmpDmmyImgs = defaultDummyImgs;
                    }
                    let tmp = {
                        dummyimgs: tmpDmmyImgs,
                        identifierNumber: x.identifierNumber,
                        images: defaultBase64StateValues,
                        varId: x.varid
                    }
                    tmpVariantsList.push(tmp);

                    variantsIdsTmp.push(ind);
                    variantsStylesTmp.push({ background: x.colorHex });
                })
                setProductVariants(tmpVariantsList);
            }
        }

        setVariants(variantsIdsTmp);
        setVariantsStyles(variantsStylesTmp);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const checkAvaiblePhotos = (ind) => {
        return CurrentProduct.variants === undefined || CurrentProduct.variants[0].images === undefined
            || CurrentProduct.variants[0].images[ind] === undefined;
    }
    let defaultBase64StateValues = [
        { base64Str: '', fileName: "", isDeleted: false },
        { base64Str: '', fileName: "", isDeleted: false },
        { base64Str: '', fileName: "", isDeleted: false },
        { base64Str: '', fileName: "", isDeleted: false },
        { base64Str: '', fileName: "", isDeleted: false },
        { base64Str: '', fileName: "", isDeleted: false },
    ]
    let defaultDummyImgs = [
        { img: CurrentProduct.images === undefined || CurrentProduct.images[0] === undefined ? one : CurrentProduct.images[0].url },
        { img: CurrentProduct.images === undefined || CurrentProduct.images[1] === undefined ? one : CurrentProduct.images[1].url },
        { img: CurrentProduct.images === undefined || CurrentProduct.images[2] === undefined ? one : CurrentProduct.images[2].url },
        { img: CurrentProduct.images === undefined || CurrentProduct.images[3] === undefined ? one : CurrentProduct.images[3].url },
        { img: CurrentProduct.images === undefined || CurrentProduct.images[4] === undefined ? one : CurrentProduct.images[4].url },
        { img: CurrentProduct.images === undefined || CurrentProduct.images[5] === undefined ? one : CurrentProduct.images[5].url },
    ]

    const [file, setFile] = useState();
    const [dummyimgs, setDummyimgs] = useState([
        { img: checkAvaiblePhotos(0) ? one : CurrentProduct.variants[0].images[0].url },
        { img: checkAvaiblePhotos(1) ? one : CurrentProduct.variants[0].images[1].url },
        { img: checkAvaiblePhotos(2) ? one : CurrentProduct.variants[0].images[2].url },
        { img: checkAvaiblePhotos(3) ? one : CurrentProduct.variants[0].images[3].url },
        { img: checkAvaiblePhotos(4) ? one : CurrentProduct.variants[0].images[4].url },
        { img: checkAvaiblePhotos(5) ? one : CurrentProduct.variants[0].images[5].url },
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

        SaveProductToState();
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

    // const Discard = () => {
    // 	setTitle("");
    // 	setPrice(0);
    // 	setDescription("");
    // 	setCategoryId(0);
    // 	setCountryId(0);
    // 	setQuantity(1);
    // 	setIdentifierNumber("");
    // 	setDescription("");

    // 	setDummyimgs(defaultDummyImgs);
    // 	setImgsBase64(defaultBase64StateValues);
    // 	setCurrentImageSrc(one);
    // 	setIndSmallImgActive(0);
    // }
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
        // clearVariants();
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
    const handleValidSubmit = (e) => {
        e.preventDefault();

        var product = new Product();
        product.id = CurrentProduct.id;
        product.title = title;
        product.description = description;
        product.quantity = quantity;
        product.categoryId = categoryId;
        product.countryId = countryId;
        product.isSale = isSale;

        console.log("IMAGES: ", imgsBase64);
        console.log("DUMMY: ", dummyimgs);

        if (!isSale) {
            product.price = price;
        }
        else {
            product.oldPrice = price;
            product.price = newPrice;
        }

        let colorVariants = [];

        console.log("productVariants: ", productVariants)

        productVariants.map((x, ind) => {
            console.log("X: ", x)
            colorVariants.push({ images: x.images, colorHex: variantsStyles[ind].background, identifierNumber: x.identifierNumber })
        })

        if (colorVariants.length !== variantsStyles.length)
            colorVariants.push({ images: imgsBase64, colorHex: variantsStyles[variantsStyles.length - 1].background, identifyNumber: identifierNumber });

        product.variants = colorVariants;

        console.log("Ready product: ", product);

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




    //variants
    const [identifierNumber, setIdentifierNumber] = useState(CurrentProduct.variants === undefined ? null : CurrentProduct.variants[0].identifierNumber);
    const [color, setColor] = useState(CurrentProduct.variants === undefined ? null : CurrentProduct.variants[0].color);
    const [variants, setVariants] = useState([{ id: 0 }]);
    const [variantsStyles, setVariantsStyles] = useState([{ background: color }]);
    const [isColorPicker, setIsColorPicker] = useState(false);
    const [indCurrVariant, setIndCurrVariant] = useState(0);
    const [productVariants, setProductVariants] = useState([]);

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
        SaveProductToState();
        setIndCurrVariant(ind);
        console.log("productVariants: ", productVariants)

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

        let tmpList = productVariants.slice();

        if (tmpList.length <= product.varId) {
            tmpList.push(product);
        }
        else {
            tmpList[product.varId] = product;
        }

        console.log("tmpList: ", tmpList)

        setProductVariants(tmpList);
    }
    const handleColorDelete = () => {
        let tmpVariants = variants.slice();
        tmpVariants.splice(indCurrVariant, 1);
        setVariants(tmpVariants);

        let tmpVariantsStyles = variantsStyles.slice();
        tmpVariantsStyles.splice(indCurrVariant, 1);
        setVariantsStyles(tmpVariantsStyles);

        // removeVariant(indCurrVariant);

        if (indCurrVariant === 0) {
            setIndCurrVariant(0);
            SetProductToFields(productVariants[0]);
        }
        else {
            setIndCurrVariant(indCurrVariant - 1);
            SetProductToFields(productVariants[indCurrVariant - 1]);
        }
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
