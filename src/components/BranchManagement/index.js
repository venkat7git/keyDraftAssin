import React,{useContext,useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { IoIosAddCircle } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { MdUpload } from "react-icons/md";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { TfiLayoutColumn3Alt } from "react-icons/tfi";
import { MdFullscreen } from "react-icons/md";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { BiSortAlt2 } from "react-icons/bi";
import {ExcelContext} from "../uploadFile"
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

import './index.css';




const columns = [
  { id: 'Rno', label: '#', minWidth: 30 },
  { id: 'BranchName', label: 'Branch Name', minWidth: 100 },
  {
    id: 'BranchCode',
    label: 'Branch Code',
    minWidth: 70,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'BranchShortName',
    label: 'Branch Short Name',
    minWidth: 70,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'Locality',
    label: 'Locality',
    minWidth: 70,
    align: 'left',
    format: (value) => value.toFixed(2),
  },
  { id: 'City', label: 'City', minWidth: 70 },
  { id: 'State', label: 'State', minWidth: 70 },
  { id: 'ContactPerson', label: 'Contact Person', minWidth: 70 },
  { id: 'ContactPersonPhone', label: 'Contact Person Phone', minWidth: 170 },
  { id: 'PanNo', label: 'Pan No', minWidth: 70 },
  { id: 'GSTIN', label: 'GSTIN', minWidth: 70 },
  { id: 'Status', label: 'Status', minWidth: 70 },
  { id: 'Action', label: 'Action', minWidth: 70 },

];


function createData(Rno,BranchName,BranchCode,BranchShortName,Locality,City,State,ContactPerson,ContactPersonPhone,PanNo,GSTIN,Status,Action) {
  
    return { Rno,BranchName,BranchCode,BranchShortName,Locality,City,State,ContactPerson,ContactPersonPhone,PanNo,GSTIN,Status,Action };
  }
  
  const datarows = [
    createData(1,"SPL-CORPORATE","C001","SPL","chennai","CHENNAI","TAMIL NADU","S SRINIVASAN","9988776655","AAACS4949P","33AAACS4949P1ZU","Active",""),
    createData(2,"CHENNAI","B001","CHN","Alandur(Reopened W.E.F.6.6.05) S.0","CHENNAI","TAMIL NADU","RAJASEKAR S","8877665544","AAACS4949P","27AAACS4949P1ZN","Active",""),
  ];


function BranchManagement() {
    const contextData = useContext(ExcelContext)
    const {data} = contextData
    console.log(data)
    const navigate = useNavigate()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows,setRows] = useState(datarows)

    useEffect(()=>{
        if(data.length !== 0){
            const ExcelData = data.map(row=>createData(row.Rno,row.BranchName,row.BranchCode,row.BranchShortName,row.Locality,row.City,row.State,row.ContactPerson,row.ContactPersonPhone,row.PanNo,row.GSTIN,row.Status,row.Action))
            setRows(ExcelData)
        }
            
        
    },[data])
    
   
    
    const handleDownload = () => { 
        const worksheet = XLSX.utils.json_to_sheet(data); 
        const workbook = XLSX.utils.book_new(); 
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data'); 
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' }); 
        saveAs(dataBlob, 'data.xlsx');

    };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const uploadSecColor = "#4c4e64"
  const uploadIconSize = 18

  return (
    
    <div className="management-container">
      <div className="profile-container">
        <div className="img-name-container">
          <img className="profile-image" src="https://res.cloudinary.com/dbb5puzve/image/upload/v1735878255/1_oe0gno.png" alt="profile" />
          <p className="profile-name">barath</p>
        </div>
      </div>
      <div className="table-container">
        <div className="branch-container">Branch</div>
        <div className="add-import-export-container">
        <div className="add-search-container">
            <button className='data-buttons'>
            <IoIosAddCircle size={24} color={'26c6f9'}/>
            </button>
            
            <div className="search-input-container">
                    <IoSearch size={14}/>
                    <input type="search" placeholder="Search" className="search-input"/>
                </div>
                
            </div>
            <div className="upload-container">
            <button className='data-buttons' onClick={()=>{navigate('/excel-upload')}}>
            <MdUpload size={uploadIconSize} color={uploadSecColor} opacity={0.8}/>
            </button>
            <button className='data-buttons' onClick={handleDownload}>
            <PiMicrosoftExcelLogoFill size={uploadIconSize} color={uploadSecColor} opacity={0.8} />
            </button>
            <button className='data-buttons'>
            <TfiLayoutColumn3Alt size={14} color={uploadSecColor} opacity={0.8} />
            </button>
            <button className='data-buttons'>
            <MdFullscreen size={23} color={uploadSecColor} opacity={0.8} />
            </button>
            </div>
        </div>
      <Paper sx={{ width: '100%', overflowX: 'auto' }}>
        <TableContainer sx={{ maxHeight: 440, overflowX: 'auto' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 0, 
                    minWidth: column.minWidth, 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis',
                    color:"#26c6f9",
                    backgroundColor:"#eeeeee",
                    fontWeight:"bold",
                   
                     }}
                  >
                    {column.label}
                    <button type="button" className="data-buttons">
                    <BiSortAlt2 color={uploadSecColor} opacity={0.8}/>
                    </button>
                    <button type="button"className="data-buttons">
                    <IoEllipsisVerticalSharp color={uploadSecColor} opacity={0.8}/>
                    </button>
                    
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      </div>
    </div>
  );
}

export default BranchManagement;
