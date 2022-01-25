import axios from "axios";
import { useEffect, useState } from "react";

import CarCard from "../components/carCard";

import { useLocation, Outlet} from "react-router";
import authHeader from "../assets/header/auth-header";

const Car = () => {
    let location = useLocation();
    const [cars, setCars] = useState([]);

    

    useEffect( () => {

        async function getCars()
        {
        const res = await axios.get("http://127.0.0.1:8000/api/auth/cars-list",{ headers: authHeader() });
        if (res) {
            setCars(res.data.data);
        }
       
        }

        getCars() 

    }, [])


    return (
        <><Outlet></Outlet>
         {location.pathname === "/dashboard/car" &&(
            <div className="container">
                <div className="row" id="ads">
                {
                    cars && cars.length > 0 ? 
                    
                    cars.map((car,i)=>(
                        <CarCard key={i} data={car} id ={i+1} />
                    )):"Loding ..."
                    

                }
     
                </div>
            </div>)}

        </>
    )
}

export default Car;