import React, { useState } from 'react'
import axios from "axios";
import authHeader from '../assets/header/auth-header';

   
function LocalTrip() {
    let car_id='';
        if(sessionStorage.length){
            const user_val = sessionStorage.getItem('user');
            const user = JSON.parse(user_val);
            car_id = user.user.id; 
        }
    const [triphr, setTriphr] = useState("");
    const [tripkms, setTripkms] = useState("");
    const [name, setName] = useState("");
    const [payment, setPayment] = useState("");
    const [phone, setPhone] = useState("");
    const [xtrakm, setXtrakm] = useState(0);

    const [xtracharge, setXtra] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [tollcharge, setToll] = useState(0);
    const [description, setDesc] = useState("");

    let xtrakmcharge = 0;
    xtrakmcharge = 12 * xtrakm;
    let result = 0;
    let km = 0;
    let pay;

    function setkm(triphr) {
        triphr === '1' ? km = 10 : triphr === '2' ? km = 20 : km = 0
        setTripkms(km)
        if (km >= 0) {
            km === 10 ? pay = 250 : km === 20 ? pay = 500 : pay = 0
            setPayment(pay)
        }
    }

    xtrakmcharge > 0 ? result = payment + xtrakmcharge : result = payment;

    let calc = 0;
    discount >0 ? calc = (parseFloat(tollcharge) + parseFloat(xtracharge))-parseFloat(discount) : calc = parseFloat(tollcharge) + parseFloat(xtracharge);
    const results = result + calc;

    function subHandler(e) {
        e.preventDefault();
        let data = {
            car_id: car_id,
            triphr: triphr,
            tripkms: tripkms,
            payment: payment,
            cus_name: name,
            mobile: phone,
            xtrakm: xtrakm,
            xtrakmcharge: xtrakmcharge,

            xtra_desc: description,
            xtracharge: xtracharge,
            tollcharge: tollcharge,
            discount: discount,

            total: results
        }
        console.log(JSON.stringify(data))
        
        async function addbill() {
            try{
                const response = await axios.post("http://127.0.0.1:8000/api/auth/local-trip", data, { headers: authHeader() });
            if (response) {
                alert(response.data.message);
            }
            }
            catch(e) {
                alert("Something went wrong..!");
            }
        }
        addbill();

        setTriphr("")
        setName("")
        setPayment("")
        setPhone("")
        setXtrakm(0)
        setTripkms("")

        setDesc("");
        setXtra(0);
        setDiscount(0);
        setToll(0);
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">

            <h2 className="my-4">Local Trip</h2>
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
                                            <input  name="name" onChange={(e) => setName(e.target.value)} value={name} type="text" className="form-control mt-1" required="required" placeholder="Customer Name" />
                                        </div>
                                        <div className=" mt-3  col-md-6 col-lg-6 col-sm-12 form-group">
                                        <label htmlFor="number">Phone No : </label>
                                            <input onChange={(e) => setPhone(e.target.value)} name="number" value={phone}  required="required" type="tel" pattern="^\d{10}$" className="form-control mt-1" placeholder="Phone No" />
                                        </div>
                                    </div>
    
                                        <div className="row">
                                            <div className=" mt-3 col-md-6 col-sm-12 col-lg-6 form-group">

                                            <label htmlFor="to">Trip Hour : </label>
                                        <select id="select" name={triphr} className="form-control form-control-select2"  onChange={(e) => [setTriphr(e.target.value), setkm(e.target.value)]} value={triphr} data-fouc required>
                                            <option value="">Enter hour</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                           
                                        </select>


                                                  </div>
                                            <div className=" mt-3  col-md-6 col-lg-6 col-sm-12 form-group">
                                                <label htmlFor="to">Kms Allowed : </label>
                                                <input value={tripkms} name="tripkm" type="text" className="form-control mt-1"  placeholder="Kms allowed" disabled />
                                            </div>

                                        </div>
                                        <div className=" mt-3 form-group">
                                            <label htmlFor="kms">Extra kms : </label>
                                            <input onChange={(e) => setXtrakm(e.target.value)} required="required" name="xtrakm" value={xtrakm} type="text" className="form-control mt-1" placeholder="Distance Travelled" />
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
                                            <p>Trip km </p>
                                        </div>

                                        <div className="col-5">
                                            : {tripkms} kms
                                        </div>
                                        <div className="col-7">
                                            <p>Trip Payment </p>
                                        </div>
                                        <div className="col-5">
                                            : {payment} ₹
                                        </div>
                                        <div className="col-7">
                                            <p>Extra kms </p>
                                        </div>
                                        <div className="col-5">
                                            : {xtrakm} kms
                                        </div>
                                        <div className="col-7">
                                            <p>Extra kms charge </p>
                                        </div>
                                        <div className="col-5">
                                            : {xtrakmcharge} ₹
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

export default LocalTrip