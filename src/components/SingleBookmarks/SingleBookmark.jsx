import { useEffect } from "react";
import { useBookmark } from "../context/BookmarkListContext"
import { useNavigate, useParams } from 'react-router-dom';
import Loader from "../Loader/Loader"   
import ReactCountryFlag from "react-country-flag"

function SingleBookmark() {
    const navigate= useNavigate();
    const { id }=useParams();
    const {getBookmark,isLoading,currentBookmark}=useBookmark();

    useEffect(()=>{
    getBookmark(id);
    },[id]);
//   const handlback=()=>{
//    navigate(-1);
//    
//    }

    if(isLoading|| !currentBookmark) return <Loader/>


  return (
   <div>
    <button onClick={()=>navigate(-1)} className="btn btn--back">
        &larr; back
    </button>
    <h2>{currentBookmark.cityName}</h2>
    <div className={`bookmarkItem`}>
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode}/>
        &nbsp; <strong>{currentBookmark.cityName}</strong> &nbsp;
                  <span>{currentBookmark.country}</span>
          </div>
</div>
  )
}

export default SingleBookmark