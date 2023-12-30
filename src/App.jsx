
import { Toaster } from "react-hot-toast";
import "./App.css";

import LocatonList from "./components/LocatonList/LocatonList";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/hotels";
import HotelProvider from "./components/context/HotelProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout";
import Bookmark from "./components/Bookmark/Bookmark";

import BookmarkProvider from "./components/context/BookmarkListContext";
import SingleBookmark from "./components/SingleBookmarks/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark";
import Login from "./components/Login/Login";
import AuthProvider from "./components/context/AuthProvider";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";



function App() {
  return <div>
<AuthProvider>
  <BookmarkProvider>
  <HotelProvider>
    <Header/>
    <Toaster/>
    <Routes>
<Route path="/" element={<LocatonList/>}/>
<Route path="/login" element={<Login/>} />
<Route path="/hotels" element={<AppLayout/> }>
<Route index element={<Hotels/>}/>
<Route path=":id" element={<SingleHotel/>}/>
</Route>  
<Route path="/bookmark" element={<ProtectedRoute>
  <BookmarkLayout/>
</ProtectedRoute>}>
<Route index element={<Bookmark/>}/>
<Route path=":id" element={<div><SingleBookmark/></div>}/>
<Route path="add" element={<AddNewBookmark/>}/>

</Route>
</Routes>   
</HotelProvider>
</BookmarkProvider>
</AuthProvider>
</div>
}

export default App; 


//list of bookmark location +map
//bookmark =list of bookmaark
//bookmark /add==> add new location