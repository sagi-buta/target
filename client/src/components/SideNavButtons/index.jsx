import React, { useContext, useState } from "react";
import styles from "./style.module.css";
import { GoHomeFill } from "react-icons/go";
import { FiCheckCircle } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { BsCalendar4 } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { CiFolderOn } from "react-icons/ci";
import { Link } from "react-router-dom";
import { DataContext } from "../../context";
const SideNavButtons = () => {
  const [active, setActive] = useState("");
  const context = useContext(DataContext);
  const actionId = context.currentAction?._id
  const textArr = [
    { text: "פרטים", icon: <AiOutlineInfoCircle />, to: `/action/${actionId}` },
    { text: "קבצים", icon: <CiFolderOn />, to: `/action/${actionId}/files` },
    { text: "משימות", icon: <FiCheckCircle />, to: `/action/${actionId}/tasks` },
    { text: "תלמידים", icon: <FaUserAlt />, to: `/action/${actionId}/students` },
    { text: 'לו"ז', icon: <BsCalendar4 />, to: `/action/${actionId}/schedule` }
  ];
  return (
    <>
      <Link id={styles.homeBtu} to={"/"} className={`center ${styles.btu}`}>
        <GoHomeFill />
      </Link>
      {textArr.map((v) => {
        return (
          <Link
            onClick={() => setActive(v.text)}
            key={v.text}
            to={v.to}
            className={`center ${styles.btu} ${
              active === v.text ? styles.active : ""
            }`}
          >
            {v.icon}
            <span>{v.text}</span>
          </Link>
        );
      })}
    </>
  );
};

export default SideNavButtons;
