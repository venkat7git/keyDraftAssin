import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar/';
import BranchManagement from './components/BranchManagement/';
import {ExcelUploader} from './components/uploadFile'
import {ExcelProvider} from './components/reactContext'
import './App.css'; // Import the CSS file

function App() {
  return (
    <ExcelProvider>
    <Router>
      <div className="App">
        <Sidebar />
        <Routes>
          <Route path="/branch" element={<BranchManagement/>} />
          <Route path ='/excel-upload' element={<ExcelUploader/>}/>
          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
    </ExcelProvider>
  );
}

export default App;
