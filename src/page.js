// import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Records from './components/Records';
import Pagination from './components/Pagination';
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate"


const Page = (props) => {

    // To hold the actual data
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);


    useEffect(() => {
        axios.post('http://localhost:2000/getusers')
            .then(res => {
                setData(res.data.users);
            })
            .catch(() => {
                alert('There was an error while retrieving the data')
            })
    }, [])
    console.log(data)

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(data.length / recordsPerPage)

    function handlePageClick({ selected: selectedPage }) {
        // setCurrentPage(selectedPage);
        console.log(selectedPage);

    }

    return (
        <div className='container mt-5'>
            <h2> Pagination </h2>
            <Records data={currentRecords} />
            <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={nPages}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
            />
            {/* <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                // onPageChange = {}
                // onClick={props.onPageChange}
            /> */}
        </div>
    );
}

export default Page;