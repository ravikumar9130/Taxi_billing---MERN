import React, { useState } from 'react'
import axios from "axios";
import authHeader from '../assets/header/auth-header';

function Hillstrip() {
    let car_id='';
        if(sessionStorage.length){
            const user_val = sessionStorage.getItem('user');
            const user = JSON.parse(user_val);
            car_id = user.user.id; 
        }
    const [tripto, setTripto] = useState("");
    const [tripdays, setTripdays] = useState("");
    const [name, setName] = useState("");
    const [payment, setPayment] = useState("");
    const [phone, setPhone] = useState("");

    const [xtracharge, setXtra] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [tollcharge, setToll] = useState(0);
    const [description, setDesc] = useState("");
    let batta = 0;
    batta = 300 * tripdays;
    let result = 0;
    let pay;

    function tariffcalc(tripto){
        setTripto(tripto)
        tripto==='Yercaud'? pay=3000 :tripto==='Kolli Hills'? pay=3500 :tripto==='Kodaikanal'? pay=6000 :tripto==='Ooty'? pay=6000 :tripto==='Palani'? pay=3000 : pay=0
        setPayment(pay)
    }

    batta>0 ? result = payment + batta : result = payment;
    let calc = 0;
    discount >0 ? calc = (parseFloat(tollcharge) + parseFloat(xtracharge))-parseFloat(discount) : calc = parseFloat(tollcharge) + parseFloat(xtracharge);
    const results = result + calc;

    function subHandler(e) {
        e.preventDefault();
        let data = {
            car_id: car_id,
            trip_from: "Tiruchengode",
            trip_to: tripto,
            payment: payment,
            cus_name: name,
            mobile: phone,
            xtra_desc: description,
            xtracharge: xtracharge,
            tollcharge: tollcharge,
            discount: discount,
            members: "4",
            trip_days: tripdays,
            driver_batta: batta,
            total: results
          }
        console.log(JSON.stringify(data))
        async function addbill(){
            try{
                const response = await axios.post("http://127.0.0.1:8000/api/auth/hills-trip", data,{ headers: authHeader() });
            if(response){
              alert(response.data.message);
            }
            }catch(e){
                alert("Something went wrong..!");
            }
          }
          addbill();

            setTripto("")
            setName("")
            setPayment("")
            setPhone("")
            setTripdays("")
            setDesc("");
            setXtra(0);
            setDiscount(0);
            setToll(0);
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">

        <h2 className="my-4">Hills Trip</h2>
        <div className="container">
            <div className="row">

                <div className="auth-wrapper">

                    <div className="col-sm-12 col-md-10 col-lg-10 taxi-inner">
                        <div className="row">
                            <div className="form col-md-6 col-lg-6 col-sm-12">

                                <form onSubmit={subHandler}>
                                <div className="row">
                                        <div className=" mt-3 col-md-6 col-sm-12 col-lg-6 form-group">
                                        <label htmlFor="name">Customer Name : </label>
                                        <input required="required" name="name" onChange={(e) => setName(e.target.value)} value={name} type="text" className="form-control mt-1" placeholder="Customer Name" />
                                        </div>
                                        <div className=" mt-3  col-md-6 col-lg-6 col-sm-12 form-group">
                                        <label htmlFor="number">Phone No : </label>
                                        <input required="required" onChange={(e) => setPhone(e.target.value)} name="number" value={phone} type="tel" pattern="^\d{10}$" className="form-control mt-1" placeholder="Phone No" />
                                        </div>
                                    </div>

                                    <div className="row">
                                    <div className=" mt-3 col-md-6 col-sm-12 col-lg-6 form-group">
                                        <label htmlFor="from">Trip From : </label>
                                        <select id="select" className="form-control form-control-select2" data-fouc>
                                            <option value="Tiruchengode">Tiruchengode</option>
                                        </select>
                                        </div>
                                         <div className=" mt-3  col-md-6 col-lg-6 col-sm-12 form-group">
                                        <label htmlFor="to">Trip To : </label>
                                        <select id="select" name={tripto} className="form-control form-control-select2" onChange={(e) => tariffcalc(e.target.value)} data-fouc required>
                                            <option value="">Select place</option>
                                            <option value="Yercaud">Yercaud</option>
                                            <option value="Kolli Hills">Kolli Hills</option>
                                            <option value="Kodaikanal">Kodaikanal</option>
                                            <option value="Ooty">Ooty</option>
                                            <option value="Palani">Palani</option>
                                        </select>
                                        </div> 
                                    </div>
                                    <div className="row">
                                        <div className=" mt-3 col-md-6 col-sm-12 col-lg-6 form-group">
                                        <label htmlFor="from">Days : </label>
                                        <input required="required" min="1" value={tripdays} name="tripdays" onChange={(e) => setTripdays(e.target.value)} type="number" className="form-control mt-1" placeholder="Enter days" />
                                        </div>
                                        <div className=" mt-3 col-md-6 col-sm-12 col-lg-6 form-group">
                                        <label htmlFor="from">Members : </label>
                                        <input  required="required" value="4" name="members" type="text" className="form-control mt-1" disabled/>
                                        </div>
                                    </div>
                                    <div className="row">
                                    <div className=" mt-3 col-md-6 col-sm-12 col-lg-6 form-group">
                                    <label className="mt-2 mb-1" htmlFor={"customer_name"}>
                                      Description :
                                    </label>
                                    <input
                                      className={`form-control mb-2 border border-warning`}
                                      type={"text"}
                                      id={"description"}
                                      name={"description"}
                                      placeholder={"Description"}
                                      value={description}
                                      onChange={(e) => setDesc(e.target.value)}
                                    />
                                    </div>
                                    <div className=" mt-3  col-md-6 col-lg-6 col-sm-12 form-group">
                                    <label className="mt-2 mb-1" htmlFor={"mobile_no"}>
                                    Extra Charge(Rs) :
                                  </label>
                                  <input
                                    className={`form-control mb-2 border border-warning`}
                                    type={"number"}
                                    id={"xtracharge"}
                                    name={"xtracharge"}
                                    placeholder={"Extra Charge"}
                                    value={xtracharge}
                                    onChange={(e) => setXtra(e.target.value)}
                                    required="required"
                                  />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className=" mt-3 col-md-6 col-sm-12 col-lg-6 form-group">
                                    <label className="mt-2 mb-1" htmlFor={"customer_name"}>
                                      Toll / Parking Charge(Rs) :
                                    </label>
                                    <input
                                      className={`form-control mb-2 border border-warning`}
                                      type={"number"}
                                      id={"tollcharge"}
                                      name={"tollcharge"}
                                      placeholder={"Toll / Parking Charge"}
                                      value={tollcharge}
                                      onChange={(e) => setToll(e.target.value)}
                                      required="required"
                                    />
                                    </div>
                                    <div className=" mt-3  col-md-6 col-lg-6 col-sm-12 form-group">
                                    <label className="mt-2 mb-1" htmlFor={"mobile_no"}>
                                    Discount (Rs):
                                  </label>
                                  <input
                                    className={`form-control mb-2 border border-warning`}
                                    type={"number"}
                                    id={"discount"}
                                    name={"discount"}
                                    placeholder={"Discount Amount"}
                                    value={discount}
                                    onChange={(e) => setDiscount(e.target.value)}
                                    required="required"
                                  />
                                    </div>
                                </div>
                                    <div className="d-grid mt-4    ">
                                        <button value='submit' className="btn btn-warning" type="submit"> Submit </button>
                                    </div>
                                </form>
                            </div>



                            <div className=" p-3   mt-4 result-inner col-md-5 col-lg-5 col-sm-12">

                                <div className="row">
                                    <div className="m-auto col-12"> 
                                    <h3 className="mt-3 " > Tariff Calculation</h3>
                                    </div>
                                </div>

                                <div className="row">
                                <div className="col-7">
                                        <p>Trip Payment </p>
                                    </div>
                                    
                                    <div className="col-5">
                                        : {payment} ₹
                                    </div>
                                    <div className="col-7">
                                        <p>Days </p>
                                    </div>
                                    <div className="col-5">
                                        : {tripdays}
                                    </div>
                                    <div className="col-7">
                                        <p>Driver Batta(300/day) </p>
                                    </div>
                                    <div className="col-5">
                                        : {batta} ₹
                                    </div>
                                    { xtracharge >0 ? ( <>
                                <div className="col-7">
                                    <p>Extra Charge(Rs) </p>
                                </div>
                                <div className="col-5">
                                    : {xtracharge}
                                </div>
                                </>):(<></>) }
                                { tollcharge >0 ? ( <>
                                <div className="col-7">
                                    <p>Toll/Parking Charge(Rs) </p>
                                </div>

                                <div className="col-5">
                                    : {tollcharge}
                                </div>
                                </>):(<></>) }
                                { discount >0 ? ( <>
                                  <div className="col-7">
                                    <p><b>Subtotal</b> </p>
                                </div>
                                <div className="col-5">
                                  <b>: {result + parseFloat(xtracharge)+ parseFloat(tollcharge)}</b>  
                                </div>
                                <div className="col-7">
                                    <p>Discount(Rs) </p>
                                </div>
                                <div className="col-5">
                                    : {discount}
                                </div>
                                </>):(<></>) }
                                    <div className="col-7">
                                        <h3 className="font-warning">Total </h3>
                                    </div>
                                    <div className="col-5">

                                        <b> : {results} ₹ </b>
                                        
                                    </div>
                                
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
        </div>
    )
}

export default Hillstrip