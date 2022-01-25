import React, { useState } from "react";
import axios from "axios";
import authHeader from "../assets/header/auth-header";

function Oneday() {
  let car_id='';
  if(sessionStorage.length){
      const user_val = sessionStorage.getItem('user');
      const user = JSON.parse(user_val);
      car_id = user.user.id; 
  }
  const [kms, setKms] = useState(0);

  const [xtracharge, setXtra] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tollcharge, setToll] = useState(0);
  const [description, setDesc] = useState("");

  const [custName, setCustName] = useState("");
  const [custNo, setCustNo] = useState("");
  const initPayment = 1800;
  const pricePerKm = 7;
  const totalPrice = initPayment + pricePerKm * kms;

  let calc = 0;
  discount >0 ? calc = (parseFloat(tollcharge) + parseFloat(xtracharge))-parseFloat(discount) : calc = parseFloat(tollcharge) + parseFloat(xtracharge);
  const result = totalPrice + calc;

  function kmsHandler(e) {
    setKms(e.target.value);
  }
  function custNameHandler(e) {
    setCustName(e.target.value);
  }
  function custNoHandler(e) {
    setCustNo(e.target.value);
  }
  function submitHandler(e) {
    e.preventDefault();
    let data = {
      car_id : car_id,
      cus_name: custName,
      mobile: custNo,
      distance: kms,

      xtra_desc: description,
      xtracharge: xtracharge,
      tollcharge: tollcharge,
      discount: discount,

      total: result
    }
    async function addbill(){
      try{
        const response = await axios.post("http://127.0.0.1:8000/api/auth/add-day-trip",data, { headers: authHeader() });
      if(response){
        alert(response.data.message);
      }
      }catch(e){
        alert("Something went wrong..!");
      }
    }
    addbill();

    console.log(JSON.stringify(data));
    setCustName("");
    setCustNo("");
    setKms(0);

    setDesc("");
    setXtra(0);
    setDiscount(0);
    setToll(0);
  }
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">

    <h3 className="my-3">Day Trip</h3>
    <div className="container">
        <div className="row">
            <div className="auth-wrapper">
                <div className="col-sm-12 col-md-10 col-lg-10 taxi-inner">
                    <div className="row">
                        <div className="form col-md-6 col-lg-6 col-sm-12">

                            <form onSubmit={submitHandler}>
                            <div className="row">
                                    <div className=" mt-3 col-md-6 col-sm-12 col-lg-6 form-group">
                                    <label className="mt-2 mb-1" htmlFor={"customer_name"}>
                                      Customer Name :
                                    </label>
                                    <input
                                      className={`form-control mb-2 border border-warning`}
                                      type={"text"}
                                      id={"customer_name"}
                                      name={"customer_name"}
                                      placeholder={"Customer Name"}
                                      value={custName}
                                      onChange={custNameHandler}
                                      required="required"
                                    />
                                    </div>
                                    <div className=" mt-3  col-md-6 col-lg-6 col-sm-12 form-group">
                                    <label className="mt-2 mb-1" htmlFor={"mobile_no"}>
                                    Mobile No :
                                  </label>
                                  <input
                                    className={`form-control mb-2 border border-warning`}
                                    type={"tel"}
                                    pattern="^\d{10}$"
                                    id={"mobile_no"}
                                    name={"mobile_no"}
                                    placeholder={"Mobile No"}
                                    value={custNo}
                                    onChange={custNoHandler}
                                    required="required"
                                  />
                                    </div>
                                </div>
                              <div className="row">
                              <div className=" mt-3 col-md-6 col-sm-12 col-lg-6 form-group">
                              <label className="mt-2 mb-1" htmlFor={"initial_payment"}>
                                Initial Payment :
                                </label>
                                <input
                                  value={initPayment}
                                  name="initial_payment"
                                  id="initial_payment"
                                  type="number"
                                  className="form-control mt-1"
                                  placeholder="Initial Payment"
                                  disabled
                                />
                              </div>
                              <div className=" mt-3 col-md-6 col-sm-12 col-lg-6 form-group">
                              <label className="mt-2 mb-1" htmlFor={"kms_covered"}>
                                Distance Travelled :
                                </label>
                                <input
                                  className={`form-control mb-2 border border-warning`}
                                  type={"number"}
                                  id={"kms_covered"}
                                  name={"kms_covered"}
                                  placeholder={"Distance Travelled"}
                                  value={kms}
                                  onChange={kmsHandler}
                                  required="required"
                                  min={1}
                                />
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

                        <div className=" p-3   mt-3 result-inner col-md-5 col-lg-5 col-sm-12">

                            <div className="row">
                                <div className="m-auto col-12">
                                    <h3 className="mt-3 " > Tariff Calculation</h3>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-7">
                                    <p>Initial Payment </p>
                                </div>
                                <div className="col-5">
                                    : {initPayment}
                                </div>
                                <div className="col-7">
                                    <p>Price /Km </p>
                                </div>
                                <div className="col-5">
                                    : {pricePerKm}
                                </div>
                                <div className="col-7">
                                    <p>Distance(Km) </p>
                                </div>
                                <div className="col-5">
                                    : {kms}
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
                                  <b>: {totalPrice + parseFloat(xtracharge)+ parseFloat(tollcharge)}</b>  
                                </div>
                                <div className="col-7">
                                    <p>Discount(Rs) </p>
                                </div>
                                <div className="col-5">
                                    : {discount}
                                </div>
                                </>):(<></>) }
                                <div className="col-7">
                                    <h5 className="font-warning">Total (Rs) </h5>
                                </div>
                                <div className="col-5">
                                    <b>: { result }</b>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
);
}

export default Oneday;
