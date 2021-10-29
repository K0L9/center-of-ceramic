import React, { Fragment, useState } from "react";
import Breadcrumb from "../../common/breadcrumb";
import "react-toastify/dist/ReactToastify.css";
// import { data } from "../../../assets/data/category";
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
import categoryService from "../../../app/services/categoryService"
import { getAllCategories, addCategory, deleteCategory, editCategory } from "../../../app/actions/categoryActions"
import { Category as Categ } from "../../../app/models/categoty"
import { ToastContainer, toast } from "react-toastify";

const Category = ({ CategoryList, getAllCategories, addCategory, deleteCategory, editCategory }) => {
	useEffect(() => {
		categoryService.getCategoryList().then(data => {
			getAllCategories(data.List);
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
				var categ = new Categ();
				categ.name = name;

				categoryService.addCategory(categ).then(isOk => {
					if (isOk === true) {
						toast.success("Категорія успішно додана");
						addCategory(categ);
					}
					else {
						toast.error("Виникли помилки при добавлені категорії. Спробуйте ще раз");
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
		var indInDB = CategoryList[index].id;
		deleteCategory(index);
		categoryService.deleteCategory(indInDB).then(isOk => {
			if (isOk == true) {
				toast.success("Категорія успішно видалена");
			}
			else {
				toast.success("Виникли помилки при видаленні категорії. Спробуйте ще раз");
			}
		});

	}
	const handleEdit = (category) => {
		categoryService.editCategory(category);
		editCategory(category);

		toast.success("Категорія успішно відредагована");
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
								<h5>Управління категоріями</h5>
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
										Добавити категорію
									</Button>
									<Modal isOpen={open} toggle={onCloseModal}>
										<ModalHeader toggle={onCloseModal}>
											<p
												className="modal-title f-w-600 h5"
												id="exampleModalLabel2"
											>
												Добавлення категорії
											</p>
										</ModalHeader>
										<ModalBody>
											<Form>
												<FormGroup>
													<Label
														htmlFor="recipient-name"
														className="col-form-label"
													>
														Введіть назву нової категорії
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
										myData={CategoryList}
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

const mapStateToProps = ({ categoryReducer }) => {
	const { CategoryList } = categoryReducer;
	return { CategoryList };
}

const mapDispatchToProps = {
	getAllCategories, addCategory, deleteCategory, editCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
