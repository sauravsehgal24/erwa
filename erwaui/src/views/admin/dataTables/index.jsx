/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
import { columnsDataDevelopment } from "views/admin/dataTables/variables/columnsData";
import React, { useEffect, useState } from "react";
import axios from '../../../util/api';
import { useDispatch } from "react-redux";
import { renderSuccessMessage, renderErrMessage, renderWarnMessage } from '../../../redux/actions/messageAction';

export default function AdminExpenses() {
  const [tableData, setTableData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("/admin/get_expenses")
      .then(res => {
        setTableData(res.data);
        if(res.data.length > 0)
          dispatch(renderSuccessMessage("Expenses loaded successfully"));
        else
          dispatch(renderWarnMessage("No Expense data available to load"))
      })
      .catch(err => {
        console.error(err);
        dispatch(renderErrMessage("Error fetching admin expenses"));
      });
  }, [dispatch]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <DevelopmentTable tableData={tableData} set_tableData={setTableData} />
    </Box>
  );
}
