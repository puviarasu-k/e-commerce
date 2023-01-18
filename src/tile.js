// import axios from 'axios';

// import React,{Component} from 'react';

// class App extends Component {

// 	state = {

// 	// Initially, no file is selected
// 	selectedFile: null
// 	};

// 	// On file select (from the pop up)
// 	onFileChange = event => {

// 	// Update the state
// 	this.setState({ selectedFile: event.target.files[0] });

// 	};

// 	// On file upload (click the upload button)
// 	onFileUpload = () => {

// 	// Create an object of formData
// 	const formData = new FormData();

// 	// Update the formData object
// 	formData.append(
// 		"myFile",
// 		this.state.selectedFile,
// 		this.state.selectedFile.name
// 	);

// 	// Details of the uploaded file
// 	console.log(this.state.selectedFile);

// 	// Request made to the backend api
// 	// Send formData object
// 	axios.post("http://localhost:2000/uploadfile", formData);
// 	};

// 	// File content to be displayed after
// 	// file upload is complete
// 	fileData = () => {

// 	if (this.state.selectedFile) {

// 		return (
// 		<div>
// 			<h2>File Details:</h2>
// 			<p>File Name: {this.state.selectedFile.name}</p>

// 			<p>File Type: {this.state.selectedFile.type}</p>

// 			<p>
// 			Last Modified:{" "}
// 			{this.state.selectedFile.lastModifiedDate.toDateString()}
// 			</p>

// 		</div>
// 		);
// 	} else {
// 		return (
// 		<div>
// 			<br />
// 			<h4>Choose before Pressing the Upload button</h4>
// 		</div>
// 		);
// 	}
// 	};

// 	render() {

// 	return (
// 		<div>
// 			<h3>
// 			File Upload using React!
// 			</h3>
// 			<div>
// 				<input type="file" onChange={this.onFileChange} />
// 				<button onClick={this.onFileUpload}>
// 				Upload!
// 				</button>
// 			</div>
// 		{this.fileData()}
// 		</div>
// 	);
// 	}
// }

// export default App;
import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import image from './honey.jpg'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReactPaginate from "react-paginate"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import Singleproduct from './singleproduct';

export default function ResponsiveGrid() {

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [data, setData] = useState([]);
	React.useEffect(() => {
		const data = { field: 'productname', value: 1, page: 0 };
		fetch("http://localhost:2000/getprods", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(data)

		})
			.then((response) => response.json())
			.then((data) => {
				setData(data)
			})
	}, []);

	function handlePageClick({ selected: selectedPage }) {
		// setCurrentPage(selectedPage);
		const data = { field: 'productname', value: 1, page: selectedPage };
		return fetch("http://localhost:2000/getprods", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(data)

		})
			.then((response) => response.json())
			.then((data) => {
				setData(data)
			})
	}

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const click=(item)=>{
		
	}
	// const changeit = (event) => {
	// 	event.target.value = Number(event.target.value) + 1;
	// 	console.log(event.target.value);
	// 	setQuantity(quantity-1)

	// };

	const nPages = Math.ceil(data.count / 5)
	return (
		<div>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						{/* <IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
						>
							 <MenuIcon />
						</IconButton> */}
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							Products
						</Typography>
						<div>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								// onClick={handleMenu}
								color="inherit"
							>
								<ShoppingCartIcon sx={{ fontSize: 30 }} />
							</IconButton>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
								color="inherit"
							>
								<AccountCircle sx={{ fontSize: 30 }} />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorEl)}
								onClose={handleClose}
							>
								<MenuItem onClick={handleClose}>Profile</MenuItem>
								<MenuItem onClick={handleClose}>My account</MenuItem>
							</Menu>
						</div>
					</Toolbar>
				</AppBar>
			</Box>

			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
					{data?.users?.map((item, index) => {
						console.log(item);
						// const [quantity, setQuantity] = useState(0);			
						return (
							<Singleproduct key={index} click={click}item={item} />
							// <div key={index}>sdfcsiujnd</div>
						)
					})}
				</Grid>
			</Box>

			<div style={{ height: 400, marginLeft: '75%' }}>
				<div>
					<ReactPaginate
						previousLabel={"← Previous"}
						nextLabel={"Next →"}
						pageCount={nPages}
						onPageChange={handlePageClick}
						containerClassName={"pagination"}
						// previousLinkClassName={"pagination__link"}
						// nextLinkClassName={"pagination__link"}
						// disabledClassName={"pagination__link--disabled"}
						activeClassName={"active"}
					/>
				</div>
			</div>
		</div>
	);
}