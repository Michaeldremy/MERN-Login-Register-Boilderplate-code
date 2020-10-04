import React from "react";
import "../../styles/Header.css";
import { Link } from "react-router-dom";
import AuthOptions from '../auth/AuthOptions';

export default function Header() {
  return (
    <header id="header">
      <Link to="/">
        <h1 className="title">Enter Site Name</h1>
      </Link>
      {/* if we want to add more navigation we would add it here */}
      <AuthOptions />
    </header>
  );
}
