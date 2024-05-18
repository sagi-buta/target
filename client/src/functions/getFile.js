import axios from 'axios';
import { useContext } from 'react';
import { DataContext } from '../context';

async function getFile(fullUrl,setPopUp) {
  let info = {}
  try {
     await axios
      .get(fullUrl, { headers:{
        responseType: 'arraybuffer',
        "authorization":  localStorage.getItem("token"),
        "adminid": localStorage.getItem("id")

      } })
      .then((response) => {
        let contentType = response.headers.getContentType();
        let file=response.data
        let blob = new Blob([file], { type: contentType });
        let fileUrl = URL.createObjectURL(blob);
        info = { fileUrl, contentType };
      })
  } catch (error) {
    setPopUp(" בעיה בקבלת קובץ מפונקצית getFile ")
  }
  return info;
}
export default ({ getFile })