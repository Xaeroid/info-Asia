import axios from 'axios';
import { useEffect, useState } from 'react';
const Home = () => {
    const[search,setSearch] = useState(null);
    const[submit,setSubmit] = useState(false);
    const[name,setName] = useState(null);
    const[capital,setCapital] = useState(null);
    const[flag,setFlag] = useState(null);
    const[region,setRegion] = useState(null);
    const[subregion,setSubregion] = useState(null);
    const[population,setPopulation] = useState(null);
    const[border,setBorder] = useState([]);
    const[language,setLanguage] = useState([]);

    useEffect(()=> {
            const response = async() =>{
            const resreg = await axios.get('https://restcountries.eu/rest/v2/region/asia');    
            console.log(resreg);
            resreg.data.forEach(elem =>{
                if(elem.name === search){
                    console.log('success');
                    console.log(elem.borders);
                    setPopulation(elem.population);
                    setName(elem.name);
                    setCapital(elem.capital);
                    setRegion(elem.region);
                    setSubregion(elem.subregion);
                    setFlag(elem.flag);
                    setBorder(elem.borders);
                    setLanguage(elem.languages);
                }
                else{
                    setSubmit(false);
                }
            });
        }
        response();
    },[search])

    const refresh = () =>{
        setSearch(null);
        setSubmit(false);
        setName(null);
        setPopulation(null);
        setRegion(null);
        setSubregion(null);
        setFlag(null);
        setLanguage(null);
        setBorder(null);
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
                        <h1 className="vsubregion"> subregion - {subregion}</h1>
                        <h1 className="vpopulation">{name}'s population is - {population}</h1>
                        <div classname="vflag">
                            <h2>{name}'s Flag is given below</h2>
                            <img src ={flag} height = "150px" width = "150px" alt = "flag image"></img>
                        </div>
                        
                        <div className="borderdiv">
                            <h1>its borders are - </h1>
                        {
                                border.map(elem=>{
                                    return <ol className="borders">{elem}</ol>
                                })
                            }   
                        </div>
                        <div className="languagediv">
                            <h1>Languages spoken are :</h1>
                            {
                                language.map(elem=>{
                                    return <ul className="languages"> {elem.name} , native name - {elem.nativeName}</ul>
                                })
                            }
                        </div>
                    </>
                    
                )
            }
            </div>
        </>        
    )
}
export default Home;