import React, { useState } from 'react'
import axios from "axios";
import authHeader from '../assets/header/auth-header';

function Taxi() {
    let car_id='';
        if(sessionStorage.length){
            const user_val = sessionStorage.getItem('user');
            const user = JSON.parse(user_val);
            car_id = user.user.id; 
        }      
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [km, setKm] = useState("");
    const [hr, setHr] = useState("");

    const [xtracharge, setXtra] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tollcharge, setToll] = useState(0);
  const [description, setDesc] = useState("");

    let result = 12 * km;
    let w_charge = 0 ;
    let d_batta = 0 ;

    hr <=2 ? w_charge= hr*60 : hr <=4 && hr>2 ? w_charge= hr*80 : w_charge= hr*120 

    km>=300 ? d_batta = 300 : d_batta = 0 ;

    km >= 300 ? result = result + d_batta + w_charge : result = result + w_charge ;

    let calc = 0;
  discount >0 ? calc = (parseFloat(tollcharge) + parseFloat(xtracharge))-parseFloat(discount) : calc = parseFloat(tollcharge) + parseFloat(xtracharge);
  const results = result + calc;

    function subHandler(e) {
        e.preventDefault();
        let data = {
            car_id: car_id,
            from: start,
            to: end,
            cus_name: name,
            mobile: phone,
            distance: km,

            xtra_desc: description,
            xtracharge: xtracharge,
            tollcharge: tollcharge,
            discount: discount,

            w_hour: hr,
            w_charge: w_charge,
            driver_batta: d_batta,
            total: results
          }
        console.log(JSON.stringify(data))
        async function addbill(){
            try{
                const response = await axios.post("http://127.0.0.1:8000/api/auth/taxi-trip", data, { headers: authHeader() });
            if(response){
              alert(response.data.message);
            }
            }catch(e){
                alert("Something went wrong..!");
            }
            
          }
          addbill();

            setStart("")
            setEnd("")
            setName("")
            setPhone("")
            setKm("")
            setHr("")
            setDesc("");
            setXtra(0);
            setDiscount(0);
            setToll(0);
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">

        <h2 className="my-3">Taxi</h2>
        <div className="container">
            <div className="row">
                <div className="auth-wrapper">
                    <div className="col-sm-12 col-md-10 col-lg-10 taxi-inner">
                        <div className="row">
                            <div className="form col-md-6 col-lg-6 col-sm-12">

                                <form onSubmit={subHandler}>
                                <div className="row">
                                        <div className=" mt-3 col-md-6 col-sm-12 col-lg-6 form-group">
                                        <label htmlFor="from">From : </label>
                                        <input required="required" onChange={(e) => setStart(e.target.value)} value={start} name="from" type="text" className="form-control mt-1" placeholder="Start" />
                                        </div>
                                        <div className=" mt-3  col-md-6 col-lg-6 col-sm-12 form-group">
                                        <label htmlFor="to">To : </label>
                                        <input required="required" value={end} onChange={(e) => setEnd(e.target.value)} name="to" type="text" className="form-control mt-1" placeholder="End" />
                                        </div>
                                    </div>
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
                                            <label htmlFor="kms">Distance Travelled : </label>
                                            <input required="required" onChange={(e) => setKm(e.target.value)} name="kms" value={km} type="number" min="1" className="form-control mt-1" placeholder="Distance Travelled" />
                                        </div>
                                        <div className=" mt-3  col-md-6 col-lg-6 col-sm-12 form-group">

                                        
                                        <label htmlFor="to">Waiting Hours :  </label>
                                        <select id="select" name={hr} className="form-control form-control-select2"  onChange={(e) => setHr(e.target.value)} value={hr} data-fouc required>
                                            <option value="">Enter hour</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                           
                                        </select>


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
                                        <p>Distance Travelled </p>
                                    </div>
                                    <div className="col-5">
                                        : {km} kms
                                    </div>
                                    
                                    {hr ?
                                        (<>  <div className="col-7">
                                        <p>Waiting Hours </p>
                                    </div>
                                    <div className="col-5">
                                        : {hr}
                                    </div></>) : (<></>)
                                    }

                                    {km >= 300 ?
                                        (<><div className="col-7">
                                            <p>Driver Beta</p>
                                        </div>
                                            <div className="col-5">
                                                : 300 ₹
                                            </div></>) : (<></>)
                                    }

                                    
                                   <div className="col-7">
                                            <p>Waiting Charges</p>
                                        </div>

                                            <div className="col-5">
                                                : { w_charge } ₹
                                            </div>

                                            { xtracharge >0 ? ( <>
                                <div className="col-7">
                                    <p>Extra Charge(Rs) </p>
                                </div>
                                <div className="col-5">
                                    : {xtracharge} ₹
                                </div>
                                </>):(<></>) }
                                { tollcharge >0 ? ( <>
                                <div className="col-7">
                                    <p>Toll/Parking Charge(Rs) </p>
                                </div>

                                <div className="col-5">
                                    : {tollcharge} ₹
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
                                    : {discount} ₹
                                </div>
                                </>):(<></>) }

                                    <div className="col-7">
                                        <h3 className="font-warning">Total </h3>
                                    </div>
                                    <div className="col-5">

                                       : { results } ₹

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

export default Taxi
