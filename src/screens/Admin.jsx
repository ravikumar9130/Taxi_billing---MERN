import axios from "axios";
import React from "react";
import authHeader from "../assets/header/auth-header";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

const Admin = () => {
    let Navigate = useNavigate();
    const [report, setReport] = useState('');
    useEffect( () => {

        async function getReport()
        {
            try{
                const res = await axios.get("http://127.0.0.1:8000/api/auth/get-report",{ headers: authHeader() });
                if (res) {
                    const r_data = res.data;
                    setReport(r_data);
                }
            }catch(e){
                console.log(e);
            }       
        }
        getReport() 

    }, [])

    console.log(report);
    const total_days = report && report.one_day[0].days + report.taxi[0].days + report.local[0].days +report.hills[0].days;
    const total = report && report.one_day[0].total + report.taxi[0].total + report.local[0].total +report.hills[0].total;


    const navigateToTable = () => {
        Navigate("/dashboard/car");
      };
 
  return (
    <div className="flex-grow-1">
     <h3 className="text-center p-3" style={{color: "#e6de08", backgroundColor: "Black"}} >Welcome to SRI VETRI TAXI</h3>
        <div className="container">
            <div className="row" id="ads">
            <div className="col-md-3 col-sm-6  col-lg-3 my-3 cars" onClick={navigateToTable}>
                <div className="card rounded">
                    <div className="card-body text-center">
                        <div className="ad-title m-auto">
                            <h5>Total Cars</h5>
                            <h2>8</h2>
                        </div>
                        
                    </div> 
                </div>
            </div>
            
            <div className="col-md-3 col-sm-6  col-lg-3 my-3">
                <div className="card rounded">
                    <div className="card-body text-center">
                        <div className="ad-title m-auto">
                            <h5>Income last 30 days</h5>
                            <h2>{report && total_days}</h2>
                        </div>

                    </div> 
                </div>
            </div>
            <div className="col-md-3 col-sm-6  col-lg-3 my-3">
                <div className="card rounded">
                    <div className="card-body text-center">
                        <div className="ad-title m-auto">
                            <h5>Total Income</h5>
                            <h2>{report && total}</h2>
                        </div>

                    </div> 
                </div>
            </div>
            </div>

            <h3>Last 30 days Income</h3>
            <div className="row" id="ads">
            <div className="col-md-3 col-sm-6  col-lg-3 my-3">
                <div className="card rounded">
                    <div className="card-body text-center">
                        <div className="ad-title m-auto">
                            <h5>One Day Trip</h5>
                            <h2>{report && report.one_day[0].days}</h2>
                        </div>
                    </div> 
                </div>
            </div>
            
            <div className="col-md-3 col-sm-6  col-lg-3 my-3">
                <div className="card rounded">
                    <div className="card-body text-center">
                        <div className="ad-title m-auto">
                            <h5>Normal Taxi Trip</h5>
                            <h2>{report && report.taxi[0].days}</h2>
                        </div>
                        
                    </div> 
                </div>
            </div>

            <div className="col-md-3 col-sm-6  col-lg-3 my-3">
                <div className="card rounded">
                    <div className="card-body text-center">
                        <div className="ad-title m-auto">
                            <h5>Local Trip</h5>
                            <h2>{report && report.local[0].days}</h2>
                        </div>
                        
                    </div> 
                </div>
            </div>

            <div className="col-md-3 col-sm-6  col-lg-3 my-3">
                <div className="card rounded">
                    <div className="card-body text-center">
                        <div className="ad-title m-auto">
                            <h5>Hills Trip</h5>
                            <h2>{report && report.hills[0].days}</h2>
                        </div>
                        
                    </div> 
                </div>
            </div>

            </div>

        </div>      
    </div>
    
  );
};
export default Admin;
