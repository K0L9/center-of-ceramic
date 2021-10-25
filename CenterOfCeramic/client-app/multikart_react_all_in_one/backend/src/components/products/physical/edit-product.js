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
import productService from "../../../app/services/productService";

import Select from 'react-select';
import { ToastContainer, toast } from "react-toastify";

//import css
import "./add-product.css"
import { getDefaultNormalizer } from "@testing-library/dom";

const Add_product = ({ afterPaste, onBlur, onChange, addProduct, List, onSearchTermChange }) => {
    useEffect(() => {
        let tmpList = [];

        categoryService.getCategoryList().then(data => {
            data.List.forEach(element => {
                tmpList.push({ value: element.id, label: element.name });
            });
            setCategoryList(tmpList);

            if (tmpList.length === 0) {
                toast.error("Немає жодної категорії для товару. Добавте категорію")
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
    const [categoryId, setCategoryId] = useState(43);
    const [quantity, setQuantity] = useState(1);
    const [categoryList, setCategoryList] = useState([]);

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


const mapStateToProps = ({ categoryReducer }) => {
    const { List } = categoryReducer;
    return { List };
}

const mapDispatchToProps = {
    addProduct
}


export default connect(mapStateToProps, mapDispatchToProps)(Add_product);
