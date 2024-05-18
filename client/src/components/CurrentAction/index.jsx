import React, { useContext, useEffect } from "react";
import styles from "./style.module.css";
import { useParams } from "react-router-dom";
import { DataContext } from "../../context";
import apiCalls from "../../functions/apiCalls";

const CurrentAction = () => {
  const param = useParams();
  const context = useContext(DataContext);
  useEffect(() => {
    if (
      !context.currentAction ||
      context.currentAction?._id != param?.actionId
    ) {
      apiCalls
        .get("/actions/" + param.actionId)
        .then((res) =>{
          context.setCurrentAction(res)
        })
        .catch(err =>{
          context.setPopUp(
          <div>
            <h4>שגיאה: {err.response.status}</h4>
            <p>הודעה: {err.response.data.msg}</p>
        </div>
        )})
      }
    }, []);

  
  return <></>;
};

export default CurrentAction;
