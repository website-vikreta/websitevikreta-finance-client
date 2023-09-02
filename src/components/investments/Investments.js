import React from "react";
import { useState, useEffect } from "react";
// import { format } from 'date-fns';
import DataTable from "react-data-table-component";
import { tableCustomStyles } from "./TableStyle.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Import Icons
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { Grid } from "@mui/material";

import {
	getInvestments,
	getInvestmentMedia,
	deleteInvestment
} from "../../api/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FileCopy } from "@mui/icons-material";
import DetailedView from "./DetailedView.js";

// Import Components
const Popup = React.lazy(() => import("../PopupModals/Popup.js"));
const DeletePopup = React.lazy(() => import("../PopupModals/DeletePopup.js"));
const PopupInvestDocs = React.lazy(() => import("../PopupModals/PopupInvestDocs.js"));

const Investment = ({
	investments,
	setInvestments,
	render,
	setRender,
	type,
	dateFilter,
	startDate,
	endDate,
}) => {

	const [search, setSearch] = useState("");
	const [filteredElements, setFilteredElements] = useState("");
	const [showModal, setShowModal] = useState({
		openDialog: false,
		currInvestment: "",
	});

	const [showDetailsModal, setShowDetailsModal] = useState({
		openDetailsDialog: false,
		currInvestment: "",
	});

	const [showDocsModal, setShowDocsModal] = useState({
		openImgDialog: false,
		id: "",
		documents: [],
	});
	const [delModal, setDelModal] = useState({
		openDelDialog: false,
		deleteId: null,
	});

	const [page, setPage] = useState(1);
	const handlePageChange = (page) => setPage(page);
	const [btnStatus, setBtnStatus] = useState(false);

	// get all items
	const getAllInvestments = async () => {
		let res = localStorage.getItem("user-info");
		let response = await getInvestments(JSON.parse(res).id);
		setInvestments(response.data);
	};
	useEffect(() => {
		const getAllInvestments = async () => {
			let res = localStorage.getItem("user-info");
			let response = await getInvestments(JSON.parse(res).id);
			setInvestments(response.data);
		};
		getAllInvestments();
		setRender("unset");
	}, [render, setInvestments, setRender]);
	useEffect(() => {
		function check(investments, type) {
			if (type === "_id" || type === undefined) return investments;
			return investments.investmentCategory === type ? investments : null;
		}
		function getQuarter(month) {
			if (month >= 4 && month <= 6) return 1;
			else if (month >= 7 && month <= 9) return 2;
			else if (month >= 10 && month <= 12) return 3;
			else return 4;
		}

		// Current quarter items
		function thisQuarter(currentDate, now, month, quarter, investments) {
			if (quarter === 4) {
				if (currentDate.getFullYear() === now.getFullYear() && month <= 3) {
					return investments;
				} else {
					return null;
				}
			} else if (currentDate.getFullYear() === now.getFullYear()) {
				if (quarter === 1)
					return currentDate.getFullYear() === now.getFullYear() &&
						month >= 4 &&
						month <= 6
						? investments
						: null;
				if (quarter === 2)
					return currentDate.getFullYear() === now.getFullYear() &&
						month >= 7 &&
						month <= 9
						? investments
						: null;
				if (quarter === 3)
					return currentDate.getFullYear() === now.getFullYear() &&
						month >= 10 &&
						month <= 12
						? investments
						: null;
			} else return null;
		}

		function lastQuarter(currentDate, now, month, investments) {
			return currentDate.getFullYear() === now.getFullYear() - 1 &&
				month >= 10 &&
				month <= 12
				? investments
				: null;
		}

		function getYearlyData(currentYear, investmentDate, investment) {
			if (investmentDate.getMonth() < 3) {
				if (currentYear === investmentDate.getFullYear()) return investments;
			} else {
				if (
					currentYear - 1 === investmentDate.getFullYear() &&
					investmentDate.getMonth() >= 3
				)
					return investment;
			}
			return null;
		}

		// Function to Select Items Date Range
		function checkDuration(investment, dateFilter, startDate, endDate) {
			const now = new Date();
			const currDate = new Date(investment.dateOfMature);
			const currentDate = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate());
			const month = currentDate.getMonth() + 1;
			var quarter = 0;
			switch (dateFilter) {
				case 1:
					return investment;
				case 2:
					return currentDate.getTime() === now.getTime() ? investment : null;
				case 3:
					return currentDate.getFullYear() === now.getFullYear() && currentDate.getMonth() === now.getMonth() ? investment : null;
				case 4:
					quarter = getQuarter(now.getMonth() + 1);
					return thisQuarter(currentDate, now, month, quarter, investment);
				case 5:
					if ((now.getMonth() < 3 && currentDate.getMonth() < 3 && now.getFullYear() === currentDate.getFullYear()) ||
						(now.getMonth() >= 3 && currentDate.getMonth() >= 3 && now.getFullYear() === currentDate.getFullYear()) ||
						(now.getMonth() < 3 && currentDate.getMonth() >= 3 && now.getFullYear() - 1 === currentDate.getFullYear()) ||
						(now.getMonth() >= 3 && currentDate.getMonth() < 3 && now.getFullYear() + 1 === currentDate.getFullYear())) {
						return investment;
					}
					return null;
				case 6:
					const prevMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
					return currentDate.getFullYear() === now.getFullYear() && currentDate.getMonth() === prevMonth ? investment : null;
				case 7:
					quarter = getQuarter(now.getMonth() + 1);
					if (quarter === 1) return thisQuarter(currentDate, now, month, 4, investment);
					if (quarter === 4) return lastQuarter(currentDate, now, month, investment);
					return thisQuarter(currentDate, now, month, quarter - 1, investment);
				case 8:
					if ((now.getMonth() < 3 && currentDate.getMonth() < 3 && now.getFullYear() - 1 === currentDate.getFullYear()) ||
						(now.getMonth() >= 3 && currentDate.getMonth() >= 3 && now.getFullYear() - 1 === currentDate.getFullYear()) ||
						(now.getMonth() < 3 && currentDate.getMonth() >= 3 && now.getFullYear() - 2 === currentDate.getFullYear()) ||
						(now.getMonth() >= 3 && currentDate.getMonth() < 3 && now.getFullYear() - 1 === currentDate.getFullYear())) {
						return investment;
					}
					return null;
				case 9:
					if (startDate && endDate) {
						const startDate_ = new Date(startDate);
						const endDate_ = new Date(endDate);
						return currentDate >= startDate_ && currentDate <= endDate_ ? investment : null;
					}
					return investment;
				case 10:
					return getYearlyData(now.getFullYear() - 3, currentDate, investment);
				case 11:
					return getYearlyData(now.getFullYear() - 2, currentDate, investment);
				case 12:
					return getYearlyData(now.getFullYear() - 1, currentDate, investment);
				default:
					return investment;
			}
		}


		var result = investments
			.filter((investment) => checkDuration(investment, dateFilter))
			.filter((investment) => check(investment, type))
			.filter((investment) => {
				return String(Object.values(investment))
					.toLowerCase()
					.includes(search.toLowerCase());
			});

		setFilteredElements(result);
	}, [search, dateFilter, investments, type, startDate, endDate]);

	const deleteInvestmentData = (id) => {
		setDelModal({ openDelDialog: true, deleteId: id });
	};

	function confirm() {
		deleteConfirm(delModal.deleteId);
		setDelModal({ openDelDialog: false, deleteId: null });
	}

	// Delete investment
	const deleteConfirm = async (id) => {
		await deleteInvestment(id);
		toast(" Successfully Deleted", {
			position: "top-center",
			autoClose: 2000,
			hideProgressBar: false,
			closeOnClick: true,
			theme: "light",
		});
		getAllInvestments();
	};

	const formatedate = (date) => {
		return (
			date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
		);
	};


	// Get payment proof
	const getInvestmentDocs = async (id) => {
		setShowDocsModal({ ...showDocsModal, openImgDialog: true, loading: true });
		let response = await getInvestmentMedia(id);

		setTimeout(() => {
			setShowDocsModal({
				openImgDialog: true,
				id: response.data._id,
				documents: response.data.investmentDocuments,
				loading: false,
			});
		}, 2000);
	};
	
	const rowsPerPage = 10;
	const columns = [
		{
			name: "Sr No",
			cell: (row, index) => (page - 1) * rowsPerPage + index + 1,
			sortable: true,
			width: "90px",
		},
		{
			name: "Amount",
			selector: (row) => row.investmentAmount,
			cell: (row) => (
				<>
					<div className="cell-with-tooltip" title={row.investmentAmount}>
						{row.investmentAmount}
					</div>
				</>
			),
			sortable: true,
		},
		{
			name: "Name",
			selector: (row) => row.investmentName,
			cell: (row) => (
				<>
					<div className="cell-with-tooltip" title={row.investmentName}>
						{row.investmentName}
					</div>
				</>
			),
			sortable: true,
		},
		{
			name: "Investment Date",
			selector: (row) => formatedate(new Date(row.investmentDate)),
			cell: (row) => (
				<>
					<div
						className="cell-with-tooltip"
						title={formatedate(new Date(row.investmentDate))}
					>
						{formatedate(new Date(row.investmentDate))}
					</div>
				</>
			),
		},
		{
			name: "Mature Date",
			selector: (row) => formatedate(new Date(row.dateOfMature)),
			cell: (row) => (
				<>
					<div
						className="cell-with-tooltip"
						title={formatedate(new Date(row.dateOfMature))}
					>
						{formatedate(new Date(row.dateOfMature))}
					</div>
				</>
			),
		},
		{
			name: "Details",
			cell: (row) => (
				<>
					<div className="cell-with-tooltip" title={"Show Details"}>
						<IconButton
							title={"Display all details"}
							sx={{ color: "#7700ff", padding: "0 2px" }}
							variant="contained"
							style={{ marginRight: 10 }}
							onClick={() => setShowDetailsModal({ openDetailsDialog: true, currInvestment: row })}
						>
							<VisibilityIcon fontSize="small" />
						</IconButton>
					</div>
				</>
			),
		},
		{
			name: "Documents",
			cell: (row) => (
				<>
					<div className="cell-with-tooltip" title={"Show Documents"}>
						<IconButton
							title={"Investment Documents"}
							sx={{ color: "#7700ff", padding: "0 2px" }}
							variant="contained"
							style={{ marginRight: 10 }}
							onClick={() => getInvestmentDocs(row._id)}
						>
							<FileCopy fontSize="small" />
						</IconButton>
					</div>
				</>
			),
			sortable: true,
		},
		{
			name: "Action",
			cell: (row) => (
				<>
					<IconButton
						title="Edit Investment"
						sx={{ color: "#7700ff", padding: "0 2px" }}
						variant="contained"
						style={{ marginRight: 10 }}
						onClick={() => setShowModal({ openDialog: true, currInvestment: row })}
					>
						<EditIcon fontSize="small" />
					</IconButton>
					<IconButton
						title="Delete Investment"
						sx={{ color: "red", padding: "0 2px" }}
						variant="contained"
						onClick={() => deleteInvestmentData(row._id)}
					>
						<DeleteIcon fontSize="small" />
					</IconButton>
				</>
			),
			width: "90px",
		},
	];

	//Custom Sort on Data Table
	const customSort = (rows, selector, direction) => {
		return rows.sort((firstRow, secondRow) => {
			const firstRowField = selector(firstRow);
			const secondRowField = selector(secondRow);

			let comparison = 0;
			if (typeof firstRowField === "number") {
				if (firstRowField > secondRowField) {
					comparison = 1;
				} else if (firstRowField < secondRowField) {
					comparison = -1;
				}
			} else if (firstRowField.match(/\d{1,2}\/\d{1,2}\/\d{4}/)) {
				var parts = firstRowField.split("/");
				const firstRowDate = new Date(
					parts[parts.length - 1],
					parts[1] - 1,
					parts[0]
				);

				parts = secondRowField.split("/");
				const secondRowDate = new Date(
					parts[parts.length - 1],
					parts[1] - 1,
					parts[0]
				);

				if (firstRowDate < secondRowDate) comparison = 1;
				else comparison = -1;
			} else if (firstRowField > secondRowField) {
				comparison = 1;
			} else if (firstRowField < secondRowField) {
				comparison = -1;
			}

			return direction === "desc" ? comparison * -1 : comparison;
		});
	};


	// Export data to excel
	const donwloadExcel = async () => {
		setBtnStatus(true);
		/*try {
			var productIds = filteredElements.map((investment) => item._id);
			var response = await downloadInvestment(productIds);
			const blob = new Blob([response.data], {
				type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			});
			const url = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;

			const currentDate = new Date();
			const formattedDate = format(currentDate, 'ddMMyyyy_HHmmss', { timeZone: 'Asia/Kolkata' });

			link.setAttribute("download", `FinanceReport_${formattedDate}.xlsx`);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			setBtnStatus(false);
			console.log("exported");
		} catch (error) {
			console.log(error);
		}*/
	};
	return (
		<Grid className="tableWrapper" container alignContent={"center"}>

			<DetailedView
				showDetailsModal={showDetailsModal}
				setShowDetailsModal={setShowDetailsModal}
			/>

			<Popup
				setRender={setRender}
				showModal={showModal}
				setShowModal={setShowModal}
				formType="Edit Investment"
			></Popup>
			<DeletePopup
				delModal={delModal}
				setDelModal={setDelModal}
				confirm={confirm}
			></DeletePopup>

			<PopupInvestDocs
				showDocsModal={showDocsModal}
				setShowDocsModal={setShowDocsModal}
			></PopupInvestDocs>

			<ToastContainer />

			<DataTable
				columns={columns}
				data={filteredElements}
				sortFunction={customSort}
				customStyles={tableCustomStyles}
				fixedHeader
				pagination
				paginationResetDefaultPage={true}
				paginationTotalRows={filteredElements.length}
				paginationComponentOptions={{
					rowsPerPageText: "Rows per page:",
					rangeSeparatorText: "of",
					noRowsPerPage: false,
					selectAllRowsItem: false,
					selectAllRowsItemText: "All",
				}}
				subHeader
				subHeaderComponent={
					<div className="tableSubHeaderComponent">
						<div className="headingWrapper">
							<h5 className="heading heading-two">All records</h5>
							<button
								className="btn btn-primary"
								disabled={btnStatus}
								onClick={donwloadExcel}
							>
								{btnStatus ? "Export Data..." : "Export Data"}
								{btnStatus && <FontAwesomeIcon icon="spinner" spin />}
							</button>
						</div>
						<input
							type="text"
							placeholder="Search Here"
							className="form-control"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
				}
				onChangePage={handlePageChange}
				highlightOnHover
			/>
		</Grid>
	);
};

export default Investment;
