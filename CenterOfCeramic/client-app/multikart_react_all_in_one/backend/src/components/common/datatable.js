import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	Button,
	Form,
	FormGroup,
	Input,
	Label,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
} from "reactstrap";
import { Category } from "../../app/models/categoty";

const Datatable = ({ myData, myClass, multiSelectOption, pagination, handleDelete, handleEdit }) => {
	const [open, setOpen] = useState(false);
	const [checkedValues, setCheckedValues] = useState([]);
	const [data, setData] = useState(myData);
	const [name, setName] = useState('');
	const [editedRow, setEditedRow] = useState({});

	useEffect(() => {
		setData(myData);
	});

	const selectRow = (e, i) => {
		if (!e.target.checked) {
			setCheckedValues(checkedValues.filter((item, j) => i !== item));
		} else {
			checkedValues.push(i);
			setCheckedValues(checkedValues);
		}
	};

	const onNameChange = (event) => {
		setName(event.target.value);
	}


	const handleRemoveRow = () => {
		const updatedData = myData.filter(function (el) {
			return checkedValues.indexOf(el.id) < 0;
		});
		setData([...updatedData]);
	};

	const renderEditable = (cellInfo) => {
		return (
			<div
				style={{ backgroundColor: "#fafafa" }}
				contentEditable
				suppressContentEditableWarning
				onBlur={(e) => {
					data[cellInfo.index][cellInfo.index.id] = e.target.innerHTML;
					setData({ myData: data });
				}}
				dangerouslySetInnerHTML={{
					__html: myData[cellInfo.index][cellInfo.index.id],
				}}
			/>
		);
	};

	// const handleDelete = (index) => {
	// 	if (window.confirm("Are you sure you wish to delete this item?")) {
	// 		const del = data;
	// 		del.splice(index, 1);
	// 		setData([...del]);
	// 	}
	// 	toast.success("Successfully Deleted !");
	// };

	const [oldName, setOldName] = useState('');
	const onOpenModal = (row) => {
		setName(row.name);
		setOldName(row.name);
		setEditedRow(row);
		setOpen(true);
	};

	const onCloseModal = (status) => {
		if (status === "OK") {
			if (name !== oldName) {
				var categ = new Category(editedRow.id, name, editedRow.products);
				handleEdit(categ);
			}
		}
		setOpen(false);
	};

	const Capitalize = (str) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	const columns = [];
	for (var key in myData[0]) {
		let editable = renderEditable;
		if (key === "image") {
			editable = null;
		}
		if (key === "status") {
			editable = null;
		}
		if (key === "avtar") {
			editable = null;
		}
		if (key === "vendor") {
			editable = null;
		}
		if (key === "order_status") {
			editable = null;
		}

		columns.push({
			name: <b>{Capitalize(key.toString())}</b>,
			header: <b>{Capitalize(key.toString())}</b>,
			selector: key,
			Cell: editable,
			style: {
				textAlign: "center",
			},
		});
	}

	if (multiSelectOption === true) {
		columns.push({
			name: (
				<button
					className="btn btn-danger btn-sm btn-delete mb-0 b-r-4"
					onClick={(e) => {
						if (window.confirm("Are you sure you wish to delete this item?"))
							handleRemoveRow();
					}}
				>
					Delete
				</button>
			),
			id: "delete",
			accessor: (str) => "delete",
			cell: (row) => (
				<div>
					<span>
						<input
							type="checkbox"
							name={row.id}
							defaultChecked={checkedValues.includes(row.id)}
							onChange={(e) => selectRow(e, row.id)}
						/>
					</span>
				</div>
			),
			style: {
				textAlign: "center",
			},
			sortable: false,
		});
	} else {
		columns.push({
			name: <b>Action</b>,
			id: "delete",
			accessor: (str) => "delete",
			cell: (row, index) => (
				<div>
					<span onClick={() => handleDelete(index)}>
						<i
							className="fa fa-trash"
							style={{
								width: 35,
								fontSize: 20,
								padding: 11,
								color: "#e4566e",
							}}
						></i>
					</span>

					<span>
						<i
							onClick={() => onOpenModal(row)}
							className="fa fa-pencil"
							style={{
								width: 35,
								fontSize: 20,
								padding: 11,
								color: "rgb(40, 167, 69)",
							}}
						></i>
						<Modal
							isOpen={open}
							toggle={() => onCloseModal("CLOSE")}
							style={{ overlay: { opacity: 0.1 } }}
						>
							<ModalHeader toggle={() => onCloseModal("CLOSE")}>
								<p className="modal-title f-w-600 h5" id="exampleModalLabel2">
									Редагування категорії
								</p>
							</ModalHeader>
							<ModalBody>
								<Form>
									<FormGroup>
										<Label htmlFor="recipient-name" className="col-form-label">
											Назва:
										</Label>
										<Input type="text" className="form-control" onChange={onNameChange} value={name} />
									</FormGroup>
									{/* <FormGroup>
										<Label htmlFor="message-text" className="col-form-label">
											Category Image :
										</Label>
										<Input
											className="form-control"
											id="validationCustom02"
											type="file"
										/>
									</FormGroup> */}
								</Form>
							</ModalBody>
							<ModalFooter>
								<Button
									type="button"
									color="primary"
									onClick={() => onCloseModal("OK")}
								>
									Зберегти
								</Button>
								<Button
									type="button"
									color="secondary"
									onClick={() => onCloseModal("CLOSE")}
								>
									Відміна
								</Button>
							</ModalFooter>
						</Modal>
					</span>
				</div>
			),
			style: {
				textAlign: "center",
			},
			sortable: false,
		});
	}
	return (
		<div>
			<Fragment>
				<DataTable
					data={data}
					columns={columns}
					className={myClass}
					pagination={pagination}
					striped={true}
					center={true}
				/>

				<ToastContainer />
			</Fragment>
		</div>
	);
};

export default Datatable;
