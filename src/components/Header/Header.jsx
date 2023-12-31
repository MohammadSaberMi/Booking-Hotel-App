import {MdLocationOn, MdLogout} from "react-icons/md"
import {HiCalendar, HiMinus, HiPlus, HiSearch} from "react-icons/hi"
import { useRef, useState } from "react"
import useOutsideClik from "../../hooks/useOutsidClick";
import 'react-date-range/dist/styles.css'; // main style filereact-date-range/dist/styles.css
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import { NavLink, createSearchParams, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
function Header() {
const [searchParams,setSearchParams]=useSearchParams();

    const [destination,setDestination]=useState(searchParams.get("destination") ||"");
    const [openOptions,setOpenOptions]=useState(false);
    const [options,setOptions]=useState({
   adult:1,
   children:0,
   room:1,
    });
   const [date,setDate] =useState([
{
        startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
}
])
const [openDate,setOpenDate]=useState(false);
const navigate=useNavigate();

    const handleOption=(name,operation)=>{
    setOptions((priv)=>{
    return {
    ...priv,
    [name]:operation==="inc" ? options[name]+1:options[name]-1 ,
    } ;
    
    })
    }

    const handleSearch = () => {
        const encodedParams = createSearchParams({
          date: JSON.stringify(date),
          destination,
          options: JSON.stringify(options),
        });
        //note : =>  setSearchParams(encodedParams);
        navigate({
          pathname: "/hotels",
          search: encodedParams.toString(),
        });
      };
    
    return (
    <div className="header">
     <NavLink to="/bookmark">Bookmarks</NavLink>
    <div className="headerSearch">
        <div className="headerSearchItem">
           <MdLocationOn className="headerIcon locationIcon"/> 
           <input 
           value={destination}
           onChange={(e)=>setDestination(e.target.value)}
           type="text"
            placeholder="Where to go?"
            className="headerSearchInput"
            name="destination"
            id="destination"
            />
         <span className="seperator"></span>
        </div>
        <div className="headerSearchItem">
            <HiCalendar className="headerIcon dateIcon " />
            <div onClick={()=>setOpenDate(!openDate)} className="dateDropDown"> 
            {`${format(date[0].startDate,"MM/dd/yyyy")} to ${format(date[0].endDate,"MM/dd/yyyy")}`}
            </div> 
           {openDate && <DateRange 
           ranges={date} 
          className="date" 
           onChange={item=> setDate([item.selection])}
           minDate={new Date()}   
          moveRangeOnFirstSelection={true}
/>}

         <span className="seperator"></span>

        </div>
        <div className="headerSearchItem">
        <div id="optionDropDown" onClick={()=>setOpenOptions(!openOptions)}>
        {options.adult} adult &bull; {options.children} children &bull; {options.room} room  
        </div>
        {openOptions && <GuestOptiionList setOpenOptions={setOpenOptions} handleOption={handleOption} options={options}/>}
        <span className="seperator"></span>

        </div>

        <div className="headerSearchItem">
        <button className="headerSearchBtn" onClick={handleSearch}>
            <HiSearch className="headerIcon"/>
        </button>
            
        </div>

    </div>
    <User/>

    </div>
  )
}

export default Header


function GuestOptiionList({options,handleOption,setOpenOptions}){
    const optionsRef=useRef();
    useOutsideClik(optionsRef ,"optionDropDown", ()=>setOpenOptions(false));
return (    
<div className="guestOptions" ref={optionsRef}>

<OptionItem handleOption={handleOption}  
type="adult" 
options={options}
minLimit={1}    
/>
<OptionItem handleOption={handleOption} 
type="children"
options={options}
minLimit={0}      
/>
<OptionItem handleOption={handleOption}
type="room"
options={options}
minLimit={1}      
/>

</div>
    
    
    )

}
 
function OptionItem({options,type,minLimit,handleOption}){
return <div className="guestOptionItem">
<span className="optionText">{type} </span>
<div className="optionCounter">
    <button className="optionCounterBtn"
    onClick={()=>handleOption(type,"dec")} 
    disabled={options[type] <=minLimit }
    >
    <HiMinus className="icon"/>
    </button>
    <span className="optionCounterNumber">{options[type]}</span>
    <button className="optionCounterBtn"
    onClick={()=>handleOption(type,"inc")} 
    
    >
    <HiPlus className="icon"/>

    </button>
   </div> 
   </div>
  
}


function User() {
 const navigate=useNavigate()
const {user, isAthenticated,logout}=useAuth();
const handleLogout=()=>{
logout();
navigate("/");

}
  return (<div>
    {isAthenticated ? <div>
    <span>{user.name}</span>
    <button>
   &nbsp; <MdLogout onClick={handleLogout} className="logout icon" />
     </button>
    </div> :<NavLink to="/login">login</NavLink>}
  </div>
    
     )
  }