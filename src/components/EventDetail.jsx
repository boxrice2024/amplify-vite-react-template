import React from "react";
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography, Grid } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { logUserAction } from '../db/client';

const recordUserAction = (groupName) => {
  const userName = localStorage.getItem("username");
  const uiComponentName = "Alert_Accordion_with_" + groupName;
  if (userName) {
    console.log("username:" + userName);
    console.log("UI-Component-Name:" + uiComponentName);
    logUserAction(userName, uiComponentName);
  }
}

const EventDetail = ({ details, row }) => {
  const sections = [
    {
      title: "Group 1: Network Traffic Details",
      info: [
        <Typography component="span"><strong>Source IP Address:</strong> {row.sourceIP || "N/A"}</Typography>,
        <Typography component="span"><strong>Destination IP Address:</strong> {row.desIP || "N/A"}</Typography>,
        <Typography component="span"><strong>Source Port:</strong> {row.sourcePort || "N/A"}</Typography>,
        <Typography component="span"><strong>Destination Port:</strong> {row.desPort || "N/A"}</Typography>,
        <Typography component="span"><strong>Protocol:</strong> {row.protocol || "N/A"}</Typography>,
        <Typography component="span"><strong>Packet Length:</strong> {row.packetLen || "N/A"}</Typography>,
        <Typography component="span"><strong>Packet Type:</strong> {row.packetType || "N/A"}</Typography>,
        <Typography component="span"><strong>Traffic Type:</strong> {row.trafficType || "N/A"}</Typography>,
      ],
      recordUserAction: () => {recordUserAction("Network");},
    },
    {
      title: "Group 2: Threat Indicators and Detection",
      info: [
        <Typography component="span"><strong>Malware Indicators:</strong> {row.malwareIOC || "N/A"}</Typography>,
        <Typography component="span"><strong>Firewall Logs:</strong> {row.firewall || "N/A"}</Typography>,
        <Typography component="span"><strong>IDS/IPS Alerts:</strong> {row.IDS_IPS_Alert || "N/A"}</Typography>,
        <Typography component="span"><strong>Log Source:</strong> {row.logSource || "N/A"}</Typography>,
        <Typography component="span"><strong>Attack Signature:</strong> {row.attckSig || "N/A"}</Typography>,
      ],
      recordUserAction: () => {recordUserAction("Threat");},
    },
    {
      title: "Group 3: User and Device Context",
      info: [
        <Typography component="span"><strong>User Information:</strong> {row.userInfo || "N/A"}</Typography>,
        <Typography component="span"><strong>Device Information:</strong> {row.deviceInfo || "N/A"}</Typography>,
        <Typography component="span"><strong>Network Segment:</strong> {row.networkSeg || "N/A"}</Typography>,
      ],
      recordUserAction: () => {recordUserAction("User");},
    },
    {
      title: "Group 4:Geolocation and Proxy Information",
      info: [
        <Typography component="span"><strong>Geo-location Data:</strong> {row.geoLoc || "N/A"}</Typography>,
        <Typography component="span"><strong>Proxy Information:</strong> {row.proxyInfo || "N/A"}</Typography>,
      ],
      recordUserAction: () => {recordUserAction("Geolocation");},
    },
    {
      title: "Group 5:  Payload Analysis",
      info: [
        <Typography component="span"><strong>Payload Data:</strong> {row.payloadData || "N/A"}</Typography>,
      ],
      recordUserAction: () => {recordUserAction("Payload");},
    },
  ];

  return (
    <Box>
      {/* Display row-level details in two columns */}
      <Grid container spacing={2} mb={4}>
        <Grid item xs={6}>
          <Typography><strong>ID:</strong> {row.alert_id}</Typography>
          <Typography><strong>Timestamp:</strong> {row.timestamp}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography><strong>Attack Type:</strong> {row.type}</Typography>
          <Typography><strong>Severity Level:</strong> {row.severityLevel}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography><strong>Anomaly Score:</strong> {row.anomaly_score}</Typography>
        </Grid>
        <Grid item xs={6}>
        <Typography><strong>Status:</strong> {row.alert_status}</Typography>
        </Grid>
      </Grid>

      {/* Display grouped information in accordions */}
      {sections.map((section, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={section.recordUserAction}>
            <Typography>{section.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {section.info.map((line, lineIndex) => (
                <Grid item xs={6} key={lineIndex}>
                  <Typography>{line}</Typography>
                </Grid>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default EventDetail;
