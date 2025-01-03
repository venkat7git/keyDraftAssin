

import React, { useContext } from "react";
import {useNavigate} from 'react-router-dom'
import {ExcelContext} from '../reactContext' 
import * as XLSX from "xlsx";
import { LuUpload } from "react-icons/lu";
import './index.css'



const ExcelUploader = () => {
  const {data, setData} = useContext(ExcelContext)
  const navigate = useNavigate()

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet);
        setData(json);
        console.log(json)
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
   
    <div className="upload-excel-container">
      <div className="upload-elements">
        <h2>Upload Excel File</h2>
        <div className="upload-file-container">
        <LuUpload color={"#ffffff"}/>
        <input className="file-input" type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        </div>
        
      </div>
      {data.length > 0 ? (<div>
        <h3 className="upload-heading">Uploaded Data:</h3>
        <table border="1">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((cell, idx) => (
                  <td key={idx}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="button-container">
        <button className="upload-button" onClick={()=>{
        navigate("/branch")
      }}>Uplaod</button>
      </div>
        </div>) : (
          <div>
            <p>No data uploaded yet.</p>
          </div>   
      )}
      
    </div>
 
  );
};

export {ExcelUploader,ExcelContext};
