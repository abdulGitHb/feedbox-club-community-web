import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCaretDown,
  faRightFromBracket,
  faUser,faObjectsColumn
} from "@fortawesome/free-solid-svg-icons";



import { Link } from "react-router-dom";

const AccessibilityContainer = styled.div`
  display: flex;
  margin-left: 10px;
`;

const RegisterButton = styled.button`
  border: 0;
  outline: 0;
  padding: 8px 1em;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  border-radius: 20px;
  background-color: #6adf76;
  background-image: linear-gradient(to right, transparent 0%, #00c9ff 100%);
  transition: all 240ms ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #00c9ff;
  }

  &:not(:last-of-type) {
    margin-right: 7px;
  }
`;

const LoginButton = styled.button`
  border: 0;
  outline: 0;
  padding: 8px 1em;
  color: #222;
  font-size: 13px;
  font-weight: 600;
  border-radius: 20px;
  background-color: transparent;
  // border: 2px solid #00c9ff;
  transition: all 240ms ease-in-out;
  cursor: pointer;

  &:hover {
    color: gray;
  //   background-color: #00c9ff;
  // margin-right : 10px;

  }

  &:not(:last-of-type) {
    margin-right: 7px;
  }
`;
const Links = styled(Link)`
  // text-decoration: none;
  // color: inherit;
  // font-size: inherit;
`;

export function Accessibility(props) {

  const selectedPage = window.location.pathname;

  const logoutHandler = () => {
    localStorage.clear();
  };

  return (
    <AccessibilityContainer>
       {/* *********************profile icon*************************** */}
       <Links to='/profile' title="Profile Page" className={selectedPage === '/profile' || selectedPage === '/dashboard' ? 'hidden' : 'block'}>
        <LoginButton >
          <FontAwesomeIcon icon={faUser} className="fa-xl" />
        </LoginButton>
      </Links>
      {/* *************************Dashboard****************************** */}
      <Links to='/dashboard' title="Dashboard" className={selectedPage === '/dashboard' || selectedPage === '/profile' ? 'hidden' : 'block'}>
        <LoginButton >
          <img src="Images/Dashboard.png" alt="" />
        </LoginButton>
      </Links>
      {/* *************************logout************************************ */}
      <Links to='/' title="Logout" onClick={logoutHandler} className={selectedPage === '/profile' || selectedPage === '/dashboard' ? 'block' : 'hidden'}>
        <LoginButton >
          <FontAwesomeIcon icon={faRightFromBracket} className="fa-xl" />
        </LoginButton>
      </Links>
      {/* *******************notification bell**************** */}
      <RegisterButton>
        <FontAwesomeIcon icon={faBell} className="fa-xl" />
      </RegisterButton>

     



     

    </AccessibilityContainer>
  );
}
