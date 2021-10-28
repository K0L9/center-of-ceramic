import React, { Fragment, useState } from "react";
import Breadcrumb from "../../common/breadcrumb";
import "react-toastify/dist/ReactToastify.css";
import Datatable from "../../common/datatable";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
} from "reactstrap";

import { useEffect } from "react";
import { connect } from "react-redux";
import countryService from "../../../app/services/countryService"
import { getAllCountries, addCountry, deleteCountry, editCountry } from "../../../app/actions/countryActions"
import { Country as Countr } from "../../../app/models/country"
import { ToastContainer, toast } from "react-toastify";

const Country = ({ CountryList, getAllCountries, addCountry, deleteCountry, editCountry }) => {
    useEffect(() => {
        countryService.getCountryList().then(data => {
            getAllCountries(data.List);
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');

    const onOpenModal = () => {
        setOpen(true);
    };

    const onCloseModal = (status) => {
        if (status === "OK") {
            if (name !== '') {
                var country = new Countr();
                country.name = name;

                countryService.addCountry(country).then(isOk => {
                    if (isOk === true) {
                        toast.success("Країна-виробник успішно додана");
                        addCountry(country);
                    }
                    else {
                        toast.error("Виникли помилки при добавлені країни-виробника. Спробуйте ще раз");
                    }
                });
            }
        }
        setOpen(false);
    };
    const onNameChange = (event) => {
        setName(event.target.value);
    }

    const handleDelete = (index) => {
        var indInDB = CountryList[index].id;
        deleteCountry(index);
        countryService.deleteCountry(indInDB).then(isOk => {
            if (isOk == true) {
                toast.success("Країна-виробник успішно видалена");
            }
            else {
                toast.success("Виникли помилки при видаленні країни-виробника. Спробуйте ще раз");
            }
        });

    }
    const handleEdit = (country) => {
        countryService.editCountry(country);
        editCountry(country);

        toast.success("Країна-виробник успішно відредагована");
    }

    return (
        <Fragment>
            <Breadcrumb title="Category" parent="Physical" />
            {/* <!-- Container-fluid starts--> */}
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>Управління країнами-виробниками</h5>
                            </CardHeader>
                            <CardBody>
                                <div className="btn-popup pull-right">
                                    <Button
                                        type="button"
                                        color="primary"
                                        onClick={onOpenModal}
                                        data-toggle="modal"
                                        data-original-title="test"
                                        data-target="#exampleModal"
                                    >
                                        Добавити країну-виробника
                                    </Button>
                                    <Modal isOpen={open} toggle={onCloseModal}>
                                        <ModalHeader toggle={onCloseModal}>
                                            <p
                                                className="modal-title f-w-600 h5"
                                                id="exampleModalLabel2"
                                            >
                                                Добавлення країни-виробника
                                            </p>
                                        </ModalHeader>
                                        <ModalBody>
                                            <Form>
                                                <FormGroup>
                                                    <Label
                                                        htmlFor="recipient-name"
                                                        className="col-form-label"
                                                    >
                                                        Введіть назву нової країни-виробника
                                                    </Label>
                                                    <Input type="text" className="form-control" onChange={onNameChange} />
                                                </FormGroup>
                                                <FormGroup>
                                                    {/* <Label
														htmlFor="message-text"
														className="col-form-label"
													>
														Category Image :
													</Label>
													<Input
														className="form-control"
														id="validationCustom02"
														type="file"
													/> */}
                                                </FormGroup>
                                            </Form>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button
                                                type="button"
                                                color="primary"
                                                onClick={() => onCloseModal("VaryingMdo")}
                                            >
                                                Скасувати
                                            </Button>
                                            <Button
                                                type="button"
                                                color="secondary"
                                                onClick={() => onCloseModal("OK")}
                                            >
                                                Зберегти
                                            </Button>
                                        </ModalFooter>
                                    </Modal>
                                </div>
                                <div className="clearfix"></div>
                                <div id="basicScenario" className="product-physical">
                                    <Datatable
                                        myData={CountryList}
                                        multiSelectOption={false}
                                        pageSize={10}
                                        pagination={true}
                                        class="-striped -highlight"
                                        handleDelete={handleDelete}
                                        handleEdit={handleEdit}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
            {/* <!-- Container-fluid Ends--> */}
            <ToastContainer pauseOnHover={false}></ToastContainer>
        </Fragment>
    );
};

const mapStateToProps = ({ countryReducer }) => {
    const { CountryList } = countryReducer;
    return { CountryList };
}

const mapDispatchToProps = {
    getAllCountries, addCountry, deleteCountry, editCountry
}

export default connect(mapStateToProps, mapDispatchToProps)(Country);
