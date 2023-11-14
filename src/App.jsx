
import { Toaster } from "react-hot-toast";
import "./App.css";

import LocatonList from "./components/LocatonList/LocatonList";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/hotels";
import HotelProvider from "./components/context/HotelProvider";

function App() {
  return <div>
  <HotelProvider>
    <Header/>
    <Toaster/>
    <Routes>
<Route path="/" element={<LocatonList/>}/>
<Route path="/hotels" element={<AppLayout/> }>
<Route index element={<Hotels/>}/>
<Route path=":id" element={<div>single hotele</div>}/>
</Route>
    </Routes>
</HotelProvider>
    {/*<LocatonList/>*/}
  </div>
}

export default App; 

