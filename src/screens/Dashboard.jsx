import React, { useState } from "react";
import styled from "styled-components";
import { Link,Outlet,useLocation,useNavigate } from "react-router-dom";

import logo from "../assets/logo.svg";
import Home from "../assets/home-solid.svg";
import Team from "../assets/social.svg";
import Taxi from "../assets/taxi.svg";
import axios from "axios";
import Admin from "./Admin";
import PowerOff from "../assets/power-off-solid.svg";
import authHeader from "../assets/header/auth-header";

function Dashboard() {
  const location = useLocation();
  let Navigate = useNavigate();
 
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  async function logout(){

    try{
      const res = await axios.get('http://127.0.0.1:8000/api/auth/log-out',{ headers: authHeader() });
    if(res){
      console.log(res);
      sessionStorage.removeItem('user');
      Navigate("/login");
      
    }
    }catch(e){
      console.log(e);
    }
    
  }

  const [profileClick, setprofileClick] = useState(false);
  const handleProfileClick = () => setprofileClick(!profileClick);
  return (
    <Main>
      <Container>
        <Button clicked={click} onClick={() => handleClick()}>
          Click
        </Button>
        <SidebarContainer>
          <Logo>
            <img src={logo} alt="logo" />
          </Logo>
          <SlickBar clicked={click}>
            <Item
              onClick={() => setClick(false)}
              
               className="active"
              to="/dashboard"
            >
              <img src={Home} alt="Home" />
              <Text clicked={click}>Home</Text>
            </Item>
            <Item
              onClick={() => setClick(false)}
               className="active"
              to="/dashboard/customer"
            >
              <img src={Team} alt="Team" />
              <Text clicked={click}>Customers</Text>
            </Item>

            <Item
              onClick={() => setClick(false)}
              className="active"
              to="/dashboard/car"
            >
              <img src={Taxi} alt="Projects" />
              <Text clicked={click}>Cars</Text>
            </Item>
          </SlickBar>

          <Profile clicked={profileClick}>
            <img
              onClick={() => handleProfileClick()}
              src={logo}
              alt="Profile"
            />
            <Details clicked={profileClick}>
              <Name>
                <p>Logout</p>
              </Name>
              <Logout>
                <img src={PowerOff} alt="logout" onClick={() => logout() }/>
              </Logout>
            </Details>
          </Profile>
        </SidebarContainer>
      </Container>
      <>
        {(location.pathname === "/dashboard") && <Admin />}
        <Outlet />
      </>
    </Main>
  );
}

export default Dashboard;

const Main = styled.main`
  display: flex;
  min-height: 100vh;
`
const Container = styled.div`
  .active {
    border-right: 4px solid var(--white);
    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }
`;

const Button = styled.button`
  background-color: var(--black);
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin: 0.5rem 0 0 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index:1;
  &::before,
  &::after {
    content: "";
    background-color: var(--white);
    height: 2px;
    width: 1rem;
    position: absolute;
    transition: all 0.3s ease;
  }
  &::before {
    top: ${(props) => (props.clicked ? "1.5" : "1rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }
  &::after {
    top: ${(props) => (props.clicked ? "1.2" : "1.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
`;

const SidebarContainer = styled.div`
  background-color: var(--black);
  width: 3.5rem;
  height: 80vh;
  margin-top: 1rem;
  border-radius: 0 30px 30px 0;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 1;
`;

const Logo = styled.div`
  width: 2rem;
  img {
    width: 100%;
    height: auto;
  }
`;

const SlickBar = styled.ul`
  color: var(--white);
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--black);
  padding: 2rem 0;
  position: absolute;
  top: 6rem;
  left: 0;
  width: ${(props) => (props.clicked ? "12rem" : "3.5rem")};
  transition: all 0.5s ease;
  border-radius: 0 30px 30px 0;
`;

const Item = styled(Link)`
  text-decoration: none;
  color: var(--white);
  width: 100%;
  padding: 1rem 0;
  cursor: pointer;
  display: flex;
  padding-left: 1rem;
  &:hover {
    border-right: 4px solid var(--white);
    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }
  img {
    width: 1.2rem;
    height: auto;
    filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg)
      brightness(78%) contrast(85%);
  }
`;

const Text = styled.span`
  width: ${(props) => (props.clicked ? "100%" : "0")};
  overflow: hidden;
  margin-left: ${(props) => (props.clicked ? "1.5rem" : "0")};
  transition: all 0.3s ease;
`;

const Profile = styled.div`
  width: ${(props) => (props.clicked ? "14rem" : "3rem")};
  height: 3rem;
  padding: 0.5rem 1rem;
  /* border: 2px solid var(--white); */
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${(props) => (props.clicked ? "9rem" : "0")};
  background-color: var(--black);
  color: var(--white);
  transition: all 0.3s ease;
  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      border: 2px solid var(--grey);
      padding: 2px;
    }
  }
`;

const Details = styled.div`
  display: ${(props) => (props.clicked ? "flex" : "none")};
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.div`
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h4 {
    display: inline-block;
  }
  a {
    font-size: 0.8rem;
    text-decoration: none;
    color: var(--grey);
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Logout = styled.button`
  border: none;
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  img {
    width: 100%;
    height: auto;
    filter: invert(15%) sepia(70%) saturate(6573%) hue-rotate(2deg)
      brightness(100%) contrast(126%);
    transition: all 0.3s ease;
    &:hover {
      border: none;
      padding: 0;
      opacity: 0.5;
    }
  }
`;
