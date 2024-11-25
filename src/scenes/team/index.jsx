import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme"; 
import { mockDataTeam as initialData } from "../../data/mockData"; 
import EventDetail from "../../components/EventDetail"; // Import EventDetail component
import { useTheme } from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import the close icon
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { client, logUserAction } from '../../db/client';
import { getUserSession } from '../../session/userSession';

const updateAlertStatus = async(id, status) => {
  await client.models.Alert.update({
    id: id,
    alert_status: status,
  });
}

const getSeverityLevelValue = (severityLevel) => {
  if (severityLevel === "High") {
    return 1;
  } else if (severityLevel === "Medium") {
    return 2;
  } else {
    return 3;
  }
}

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode); 

  // State to manage dialog open/close
  const [open, setOpen] = useState(false);
  // State to hold the content for each row
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null); // To hold row-level data
  const [teamData, setTeamData] = useState([]); // Team data
  const [selectionModel, setSelectionModel] = useState([]); // To track selected rows
  const [userName, setUserName] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Get alerts
  useEffect(() => {
    const listAlerts = async() => {
      const userName = await getUserSession();
      if (!userName) {
        navigate("/signin"); // Redirect to sign-in if username is not available
        return;
      }
      const { data: alerts, errors } = await client.models.Alert.list({
        filter: {
          userName: {
            eq: userName
          }
        }
      });
      setUserName(userName);
      setTeamData(alerts);

      const inputElement = document.querySelector('input[aria-label="Select all rows"]');
      inputElement.addEventListener('click', () => {
        console.log("username:" + userName);
        console.log("UI-Component-Name:" + "Checkbox_all");
        logUserAction(userName, "Checkbox_all");
      });

//       setTimeout(() => {
//           const checkBoxElements = document.querySelectorAll('div[data-field="__check__"]');
//           console.log(checkBoxElements)
//       }, 2000);
    };
    listAlerts();
  }, []);

  // Check if username is available in localStorage
  useEffect(() => {
    const checkSession = async() => {
      const userName = await getUserSession();
      if (!userName) {
        navigate("/signin"); // Redirect to sign-in if username is not available
      }
    };
    checkSession();
  }, [navigate]);

  // Function to get details based on the row's ID
  const getDetailsById = (id) => {
    const rowDetails = teamData.find((row) => row.id === id);
    if (rowDetails) {
      console.log("username:" + userName);
      console.log("UI-Component-Name:" + "see_details_with_" + rowDetails.alert_id);
      logUserAction(userName, "see_details_with_" + rowDetails.alert_id);
      setSelectedRow({
        id: rowDetails.id,
        alert_id: rowDetails.alert_id,
        type: rowDetails.type,
        firewall: rowDetails.firewall,
        anomaly_score: rowDetails.anomaly_score,
        severityLevel: rowDetails.severityLevel,
        alert_status: rowDetails.alert_status,
        timestamp: rowDetails.timestamp,
        
        sourceIP: rowDetails.sourceIP,
        desIP: rowDetails.desIP,
        sourcePort: rowDetails.sourcePort,
        desPort: rowDetails.desPort,
        protocol: rowDetails.protocol,
        packetLen: rowDetails.packetLen,
        trafficType: rowDetails.trafficType,
        payloadData: rowDetails.payloadData,

        malwareIOC: rowDetails.malwareIOC,
        userInfo: rowDetails.userInfo,
        attckSig: rowDetails.attckSig,
        deviceInfo: rowDetails.deviceInfo,
        networkSeg: rowDetails.networkSeg,
        geoLoc: rowDetails.geoLoc,
        proxyInfo: rowDetails.proxyInfo,
        IDS_IPS_Alert: rowDetails.IDS_IPS_Alert,
        logSource: rowDetails.logSource,
        packetType: rowDetails.packetType,

      });

      return {
        group1: {
          sourceIP: rowDetails.sourceIP || "N/A",
          desIP: rowDetails.desIP || "N/A",
          sourcePort: rowDetails.sourcePort || "N/A",
          desPort: rowDetails.desPort || "N/A",
          protocol: rowDetails.protocol || "N/A",
          packetLen: rowDetails.packetLen || "N/A",
          packetType: rowDetails.packetType || "N/A",
          trafficType: rowDetails.trafficType || "N/A",
        },
        group2: {
          malwareIOC: rowDetails.malwareIOC || "N/A",
          firewall: rowDetails.firewall || "N/A",
          IDS_IPS_Alert: rowDetails.IDS_IPS_Alert || "N/A",
          logSource: rowDetails.logSource || "N/A",
          attckSig: rowDetails.attckSig || "N/A",
        },
        group3: {
          userInfo: rowDetails.userInfo || "N/A",
          deviceInfo: rowDetails.deviceInfo || "N/A",
          networkSeg: rowDetails.networkSeg || "N/A",
        },
        group4: {
          geoLoc: rowDetails.geoLoc || "N/A",
          proxyInfo: rowDetails.proxyInfo || "N/A",
        },
        group5: {
          payloadData: rowDetails.payloadData || "N/A",
        },
      };
    }
    return null;
  };

  // Function to open the EventDetail dialog
  const handleClickOpen = (id) => {
    const details = getDetailsById(id);
    setSelectedDetails(details);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Function to update the alert status of selected rows
  const updateSelectedRowsCity = async(newAlert_status) => {
    await Promise.all(teamData.map(row => {
      if (selectionModel.includes(row.id)) {
        updateAlertStatus(row.id, newAlert_status);
      }
    }));
    const updatedRows = teamData.map((row) =>
      selectionModel.includes(row.id) ? { ...row, alert_status: newAlert_status } : row
    );
    setTeamData(updatedRows);  // Update the team data
    setSelectionModel([]);     // Clear selection after updating
  };

  // Function to update the alert status of the row in the dialog
  const updateDialogCity = async(newAlert_status) => {
    if (selectedRow) {
      await updateAlertStatus(selectedRow.id, newAlert_status);
      const updatedRows = teamData.map((row) =>
        row.id === selectedRow.id ? { ...row, alert_status: newAlert_status } : row
      );
      setTeamData(updatedRows);
      setSelectedRow((prev) => ({ ...prev, alert_status: newAlert_status })); // Update dialog city
    }
  };

  const columns = [
    { field: "alert_id", headerName: "Alert ID" },
    {
      field: "alert_status",
      headerName: "Status",
      minWidth: 80,
      maxWidth: 100,
      // flex: 1,
      // width: 100, 
    },
    {
      field: "type",
      headerName: "Attack Type",
      cellClassName: "name-column--cell",
      minWidth: 80,
      maxWidth: 100,
      // width: 100,
    },
    {
      field: "anomaly_score",
      headerName: "Anomaly Score",
      type: "number",
      headerAlign: "left",
      align: "left",
      width: 100, 
    },
    {
      field: "firewall",
      headerName: "Firewall Logs",
      flex: 1,
    },
    
    {
      field: "severityLevel",
      headerName: "Severity Level",
      headerAlign: "center",
      minWidth: 125,
      flex: 0.8,
      sortComparator: (v1, v2) => getSeverityLevelValue(v2) - getSeverityLevelValue(v1),
      renderCell: ({ row: { severityLevel } }) => {
        return (
          <Box
              width="50%"
              m="0 auto"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={
                severityLevel === "Low"
                  ? colors.greenAccent[600]     // Green for Low
                  : severityLevel === "Medium"
                  ? colors.orangeAccent[600]    // Orange for Medium
                  : colors.redAccent[600]       // Red for High
              }
              borderRadius="4px"
            >
              <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                {severityLevel}
              </Typography>
            </Box>
        );
      },
    },
    {
      field: "IDS_IPS_Alert", // Add City column
      headerName: "IDS/IPS Alert",
      headerAlign: "center",     // Center the header title
      // align: "center",           // Center the cell content
      flex: 0.75,                 // Make the column narrower
      minWidth: 120,             // Ensure a minimum width for readability
    },
    // {
    //   field: "alert_status",
    //   headerName: "Status",
    //   flex: 1,
    // },
    {
      field: "Summary",
      headerName: "Summary",
      flex: 0.8,
      headerAlign: "center",
      renderCell: ({ row: { id } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            borderRadius="4px"
            onClick={() => handleClickOpen(id)}
            style={{ cursor: "pointer" }}
          >
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              See Details
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      {/* Upper-right corner buttons */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            {
              updateSelectedRowsCity("Log");
              console.log("username:" + userName);
              console.log("UI-Component-Name:" + "List_page_Log");
              logUserAction(userName, "List_page_Log");
            }
          }
          disabled={selectionModel.length === 0}  // Buttons are active only when rows are selected
          sx={{ mr: 2 }}
        >
          Log
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => 
            {
              updateSelectedRowsCity("Block");
              console.log("username:" + userName);
              console.log("UI-Component-Name:" + "List_page_Block");
              logUserAction(userName, "List_page_Block");
            }
          }
          disabled={selectionModel.length === 0}  // Buttons are active only when rows are selected
          sx={{ mr: 2 }}
        >
          Block
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() =>
            {
              updateSelectedRowsCity("Escalate");
              console.log("username:" + userName);
              console.log("UI-Component-Name:" + "List_page_Escalate");
              logUserAction(userName, "List_page_Escalate");
            }
          }
          disabled={selectionModel.length === 0}  // Buttons are active only when rows are selected
        >
          Escalate
        </Button>
      </Box>

      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300], // Use name font color for selected checkbox
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[300]} !important`, // Set checkbox color to match name font color
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={teamData}  // Use state data to ensure updates are reflected
          columns={columns}
          selectionModel={selectionModel} // Bind selection model here
          onSelectionModelChange={(newSelection) => {
            setSelectionModel(newSelection);  // Track selected rows
          }}
          disableSelectionOnClick={true}
        />
      </Box>

      {/* Dialog with Event Details */}
      <Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>
          Event Details
         <IconButton
           aria-label="close"
           onClick={handleClose} // This will close the dialog
           sx={{
          position: 'absolute',
            right: 8,
            top: 8,
          color: (theme) => theme.palette.grey[500],
              }}
          >
          <CloseIcon />
        </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedDetails ? (
            <EventDetail details={selectedDetails} row={selectedRow} />
          ) : (
            <Typography>No details available</Typography>
          )}
        </DialogContent>
        <DialogActions>
          {/* Three buttons inside the dialog */}
          <Button 
            variant="contained"
            onClick={() =>
              {
                console.log("username:" + userName);
                console.log("UI-Component-Name:" + "Popup_Log");
                logUserAction(userName, "Popup_Log");
                updateDialogCity("Log");
              }
            } color="primary" sx={{ mr: 2 }}>
            Log
          </Button>
          <Button 
            variant="contained"
            onClick={() =>
              {
                console.log("username:" + userName);
                console.log("UI-Component-Name:" + "Popup_Block");
                logUserAction(userName, "Popup_Block");
                updateDialogCity("Block");
              }
            } color="secondary" sx={{ mr: 2 }}>
            Block
          </Button>
          <Button 
            variant="contained"
            onClick={() =>
              {
                console.log("username:" + userName);
                console.log("UI-Component-Name:" + "Popup_Escalate");
                logUserAction(userName, "Popup_Escalate");
                updateDialogCity("Escalate");
              }
            } color="success">
            Escalate
          </Button>
          {/* <Button 
            variant="contained"
            onClick={handleClose} color="primary">
            Close
          </Button> */}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Team;
