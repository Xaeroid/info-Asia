import axios from 'axios';
import { useEffect, useState } from 'react';
const Home = () => {
    const[search,setSearch] = useState(null);
    const[submit,setSubmit] = useState(false);
    const[name,setName] = useState(null);
    const[capital,setCapital] = useState(null);
    const[region,setRegion] = useState(null);
    
    

    useEffect(()=> {
            const response = async() =>{
            const resreg = await axios.get(`http://api.countrylayer.com/v2/name/${search}?access_key=3e10d0f4d544d6e6a2333f6a0ed22ae6&FullText=true`);    
            console.log(resreg);
            setName(resreg.data[0].name);
                    setRegion(resreg.data[0].region);
                    setCapital(resreg.data[0].capital);
        }
        response();
    },[search])

    const refresh = () =>{
        setSearch(null);
        setSubmit(false);
        setName(null);
        setRegion(null);
        setCapital(null);
    }
    return(
        <>
            <div className="search">
                <h2 id = "searchheader">ENTER THE COUNTRY'S NAME</h2>
                <input
                    type = "text"
                    className = "searchField"
                    onChange = {(event)=>{
                        setSearch(event.target.value);
                        setSubmit(false);
                    }}>    
                </input>
                    <div className = "button" onClick = {()=>setSubmit(true)}>ENTER</div>
                    <div className = "refresh" onClick = {() => refresh()}>REFRESH</div>
            </div>
            <div className = "values">
            {
                !(submit)?(
                <h1>{null}</h1>
                ): (
                    <>
                        <h1 className="vname">Name of the Country - {name}</h1>
                        <h1 className="vcapital"> Its Capital - {capital}</h1>
                        <h1 className="vregion"> region - {region}</h1>
                    </>
                )
            }
            </div>
        </>        
    )
        
}
export default Home;
