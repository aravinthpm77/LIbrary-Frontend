import React from "react";
import { Route,Routes } from "react-router-dom";
import Home from "./page/Home/Home.jsx";
import DisplayBook from './page/DisplayBook/DisplayBook.jsx'
const AllRoutes= ()=>{
    return(
        <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/DisplayBook' element={<DisplayBook/>}/>
        </Routes>
    )
}
export default AllRoutes;