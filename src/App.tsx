import React, { useState } from 'react';
import './App.css';
import Table from './components/Table';
import data from './data.json'
import Pagination from './components/Pagination';

function App() {
  //const [currentPage, setCurrentPage] = useState(1);
  //const [postsPerPage] = useState(10);
  //const paginate = (pageNumber:number) => setCurrentPage(pageNumber);
  return (
    <div>
      <Table/>
      {/* <Pagination
        postsPerPage={postsPerPage}
        totalPosts={25}
        paginate={paginate}
        //paginate={10}
      /> */}
    </div>
  );
}

export default App;
