import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Employ from './Employ';
import { Country, State, City } from 'country-state-city'
// import Update from './Update';
import 'react-toastify/dist/ReactToastify.css';

const Index = () => {

    const [country, setCountry] = useState([])
    const [state, setState] = useState([])
    const [city, setCity] = useState([])
    const [scode, setScode] = useState()
    const [ccode, setCcode] = useState()
    const [credentials, setCredentials] = useState({ name: "", age: "", email: "", salary: "", country: "", state: "", city: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(credentials,"credentials");
        const { name, age, email, salary, country, state, city } = credentials;
        const response = await fetch(`http://localhost:5000/api/emp/createemp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, age, email, salary, country, state, city })
        });
        const json = await response.json()
        let msg = json.errors;
        if (json.error === "401") {
            toast.error(msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if (json.error == "404") {
            toast.error('Employee Already Exist!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if (json.success) {
            toast.success('Your record inserted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            toast.error('Your record are not inserted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    const onChange = (e) => {
        // setCredentials({name:"e.target.name" , district:"e.target.email", place:"e.target.district", nearground:"e.target.nearground", distance:"e.target.distance" ,password:"e.target.password",confirmpassword:"e.target.confirmpassword"})
        let t2 = "";
        if(e.target.name=="country")        
        {
            const vc = e.target.value;
            const states = State.getAllStates();
            // var t1 = vc.split(',').shift();
            let t1 = "";
            let j = 0;
            while(vc[j]!=',')
            {
                t1 = t1 + vc[j];
                j++;
            }
            j++;
            while(j<vc.length)
            {
                t2 = t2+vc[j];
                j++;
            }
            // console.log(states);
            let p1 = [];
            for(let i=0;i<states.length;i++)
            {
                   if(states[i].countryCode==t1)
                   {
                       p1.push({stateCode: states[i].isoCode, name: states[i].name});
                    //    console.log(states[i].isoCode, states[i].name);
                   }
            }
            setState(p1);
            // console.log(e.target.value.p1,"e.target.value.p1")
            // setScode(e.target.value.p1);
        }
        if(e.target.name=="state")
        {
            let vc = e.target.value;
            // var t1 = vc.split(',').shift();
            let t1 = "";
            let j = 0;
            while(vc[j]!=',')
            {
                t1 = t1 + vc[j];
                j++;
            }
            j++;
            while(j<vc.length)
            {
                t2 = t2+vc[j];
                j++;
            }
            let p2 = [];
            const cities = City.getAllCities()
            for(let i=0;i<cities.length;i++)
            {
                    if(cities[i].stateCode==t1)
                    {
                        p2.push(cities[i].name);
                        // console.log(cities[i].name);
                    }
            }
            setCity(p2);
        }
        if(t2.length==0) t2 = e.target.value;
        setCredentials({ ...credentials, [e.target.name]: t2 })
    }
    useEffect(() => {
    const countries = Country.getAllCountries()
    let p = [];
    for(let i=0;i<countries.length;i++)
    {
           p.push({countryCode: countries[i].isoCode, name: countries[i].name});
        //    console.log(countries[i].countryCode, countries[i].name);
    }
    setCountry(p);
    // const states = State.getAllStates();
    // let p1 = [];
    // for(let i=0;i<states.length;i++)
    // {
    //        if(states[i].countryCode=="IN")
    //        {
    //         //    p1.push({stateCode: states[i].stateCode, name: states[i].name});
    //            console.log(states[i].countryCode, states[i].isoCode, states[i].name);
    //        }
    // }
    // setState(p1);
    // const cities = City.getAllCities();
    // let p2 = [];
    // const cities = City.getAllCities()
    // for(let i=0;i<cities.length;i++)
    // {
    //         if(cities[i].stateCode=="UP")
    //         {
    //             p2.push(cities[i].name);
    //             // console.log(cities[i].name);
    //         }
    // }
    // setCity(p2);
    }, []);
    return (
        <div className="container" style={{ marginTop: "100px" }}>
            <ToastContainer />
            <div className="grid md:block ">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-72 flex justify-center w-full">
                    <div className="mt-10 text-4xl font-bold">GET IN TOUCH</div>
                </div>
                <div className="bg-white h-auto flex justify-center">
                    <div className="bg-white shadow-lg -mt-40 md:w-1/2 grid lg:flex justify-center">
                        <div className="w-3/4 lg:w-2/3 ">
                            <div className="text-lg font-medium text-blue-600 m-6 ">Enter Employee Data</div>
                            <div className=" flex lg:flex-row flex-col">
                                <div className="m-6">
                                    <p className="text-sm text-stone-400">Full Name</p> <input
                                        onChange={onChange} type="text" id="name" name="name" className="border-b-2 border-stone-400 text-stone-400 w-36" />
                                    <p className="text-sm text-stone-400 mt-6">Age</p> <input
                                        onChange={onChange} type="number" id="age" name="age" className="border-b-2 border-stone-400 text-stone-400 w-36" />
                                    {/* <p className="text-sm text-stone-400 mt-6">Country</p> <input
                                        onChange={onChange} type="text" id="country" name="country" className="border-b-2 border-stone-400 text-stone-400 w-36" /> */}
                                    <select className="form-select my-3" name="country" defaultValue={'DEFAULT'} onChange={onChange} aria-label="Default select example">
                                        <option value="Default">Choose Your Country</option>
                                        {country.map(place1 => <option key={place1.name} value={[place1.countryCode,place1.name]}>{place1.name}</option>)}
                                    </select>
                                </div>
                                <div className="m-6 ">
                                    <p className="text-sm text-stone-400">E-mail</p> <input
                                        onChange={onChange} type="email" id="email" name="email" className="border-b-2 border-stone-400 text-stone-400 w-36" />
                                    <p className="text-sm text-stone-400 mt-6">Salary</p> <input
                                        onChange={onChange} type="number" id="salary" name="salary" className="border-b-2 border-stone-400 text-stone-400 w-36" />
                                    {/* <p className="text-sm text-stone-400 mt-6">State</p> <input
                                        onChange={onChange} type="text" id="state" name="state" className="border-b-2 border-stone-400 text-stone-400 w-36" /> */}
                                        <select className="form-select my-3" defaultValue={'DEFAULT'} name="state" onChange={onChange} aria-label="Default select example">
                                        <option value="Default">Choose Your State</option>
                                        {state.map(place2 => <option key={place2.name} value={[place2.stateCode,place2.name]}>{place2.name}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="m-6 ">
                                {/* <p className="text-sm text-stone-400 mt-6 ">City</p> <input
                                    onChange={onChange} type="text" id="city" name="city" className="border-b-2 border-stone-400 text-stone-400 w-36" /> */}
                                    <select className="form-select my-3" name="city" onChange={onChange} aria-label="Default select example">
                                        <option selected>Choose Your City</option>
                                        {city.map(place3 => <option key={place3} value={place3}>{place3}</option>)}
                                    </select>
                                <button type="submit" onClick={handleSubmit} className="group relative my-3 flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    </span>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Employ />
            <script src="https://cdn.tailwindcss.com"></script>
            <script src="https://use.fontawesome.com/03f8a0ebd4.js"></script>
            <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
            <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
        </div>
    )
}

export default Index