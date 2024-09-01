import React from "react";
import { header, headerLeftIcon, headerLeftIconImage,headerLeft } from "./Header.module.css";

export default function Header() {
  return (
    <header className={header}>
      <div className="header-right">
        <strong>Contacts</strong>
      </div>
      <div className={headerLeft}>
        <i className={headerLeftIcon}>
          <img src="/images/search.svg" className={headerLeftIconImage} alt="" srcSet="" />
        </i>
        <i className={headerLeftIcon}>
          <img src="/images/more.svg" className={headerLeftIconImage} alt="" srcSet="" />
        </i>
      </div>
    </header>
  );
}
