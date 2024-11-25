import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { tokens } from "../../theme";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"; // Only new components here
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { logUserAction } from '../../db/client';

const recordUserAction = (sectionName) => {
  const userName = localStorage.getItem("username");
  const uiComponentName = "Runbook_Accordion_with_" + sectionName;
  if (userName) {
    console.log("username:" + userName);
    console.log("UI-Component-Name:" + uiComponentName);
    logUserAction(userName, uiComponentName);
  }
}

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="Incident Response Runbook" 
      // subtitle="Frequently Asked Questions and Some Tips" 
      />
      <Accordion 
        // defaultExpanded
        >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={() => {recordUserAction("Response");}}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Response Action Guidance
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Action</strong></TableCell>
                  <TableCell style={{ width: '25%' }}><strong>When to use</strong></TableCell>
                  <TableCell style={{ width: '45%' }}><strong>Criteria</strong></TableCell>
                  <TableCell><strong>Result</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell><strong>Log</strong></TableCell>
                  <TableCell>The alert is suspicious but does not require immediate action.  Select "Log" to keep track of the alert for additional signs of malicious behavior or further evidence.
                  </TableCell>
                  <TableCell>
                  <Typography component="ul">
                    <li><strong>Non-critical Malware Signature Matches</strong></li>
                    <li><strong>Low-severity alerts or routine incidents</strong> without clear malicious indicators.</li>
                    <li><strong>Routine Protocol Matches</strong>: Aligning with expected traffic patterns or previously identified benign anomalies</li>
                  </Typography>
                  </TableCell>
                  <TableCell>The alert is logged and recorded in the system, but no further action is required.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Block</strong></TableCell>
                  <TableCell>The alert indicates <strong>clear malicious behavior</strong> (e.g., malware, DDoS, suspicious traffic).</TableCell>
                  <TableCell>
                  <Typography component="ul">
                    <li><strong>High Anomaly Levels or Unauthorized Access Attempts</strong>: Involving repeated violations or unauthorized IPs.</li>
                    <li><strong>Traffic Associated with Malicious Activity</strong> : Including known DDoS patterns, repeated unauthorized attempts, or alerts for malware, intrusion attempts.</li>
                  </Typography>
                  </TableCell>
                  <TableCell>Stop the traffic or quarantine a compromised system. The system or network traffic is blocked, isolating the threat and preventing further damage</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Escalate</strong></TableCell>
                  <TableCell>An alert is <strong>too complex or high-risk</strong> for you to resolve. Escalate when the alert is with <strong>significant threat indicators, high severity, or unconfirmed behavior</strong> merit further investigation.</TableCell>
                  <TableCell>
                  <Typography component="ul">
                    <li><strong>High-severity intrusion or malware</strong></li>
                    <li><strong>Malicious Patterns or Signatures</strong>: Especially those flagged in IDS/IPS with repeated Indicators of Compromise (IoCs) or known advanced threats.</li>
                  </Typography>
                  </TableCell>
                  <TableCell>The alert is passed on to more experienced team members for advanced investigation, ensuring serious threats are properly handled.
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      
      <Accordion 
        // defaultExpanded
        >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={() => {recordUserAction("Criteria");}}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Criteria Box
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Attack Type</strong></TableCell>
                  <TableCell><strong>Severity Level</strong></TableCell>
                  <TableCell><strong>Firewall Logs</strong></TableCell>
                  <TableCell><strong>Anomaly Score</strong></TableCell>
                  <TableCell><strong>IDS/IPS Alert</strong></TableCell>
                  <TableCell><strong>Recommended Action</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell><strong>DDoS/Intrusion</strong></TableCell>
                  <TableCell><Typography >Low</Typography>
                  </TableCell>
                  <TableCell> Accepted Connection, Protocol Match
                  </TableCell>
                  <TableCell>*less than 30 </TableCell>
                  <TableCell> 
                          
                  </TableCell>
                  <TableCell> 
                          Log
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Malware</strong></TableCell>
                  <TableCell><Typography >Low</Typography>
                  </TableCell>
                  <TableCell> 
                  </TableCell>
                  <TableCell> </TableCell>
                  <TableCell> 
                  Malware Signature Match
                  </TableCell>
                  <TableCell> 
                          Log
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Malware</strong></TableCell>
                  <TableCell><Typography >Medium</Typography>
                  </TableCell>
                  <TableCell> Unauthorized Access Attempt
                  </TableCell>
                  <TableCell> *less than 30</TableCell>
                  <TableCell> 
                 
                  </TableCell>
                  <TableCell> 
                          Block
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>DDoS</strong></TableCell>
                  <TableCell><Typography >Low /  Medium</Typography>
                  </TableCell>
                  <TableCell> IP range mismatch
                  </TableCell>
                  <TableCell> </TableCell>
                  <TableCell> 
                  Anomaly Detected
                  </TableCell>
                  <TableCell> 
                          Block
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Malware /  Intrusion</strong></TableCell>
                  <TableCell><Typography >High</Typography>
                  </TableCell>
                  <TableCell>
                  </TableCell>
                  <TableCell> more than 50</TableCell>
                  <TableCell> 
                          Malware Signature Match
                  </TableCell>
                  <TableCell> 
                          Escalate
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Malware</strong></TableCell>
                  <TableCell><Typography >Medium</Typography>
                  </TableCell>
                  <TableCell> High Anomaly
                  </TableCell>
                  <TableCell> more than 50</TableCell>
                  <TableCell> 
                          Malicious Pattern Match
                  </TableCell>
                  <TableCell> 
                          Escalate
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      
      <Accordion 
        // defaultExpanded
        >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={() => {recordUserAction("Entry");}}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Entry Classification and Related Information
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography> */}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell ><strong>Alert Entry Title</strong></TableCell>
                  <TableCell><strong>Description & Common Values </strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell><strong>Alert Type</strong></TableCell>
                  <TableCell>
                  <Typography component="ul">
                    <li><strong>DDoS</strong> - Denial of Service attempts detected by abnormal traffic volumes</li>
                    <li><strong>Malware </strong> - Indicators of Compromise (IoCs) indicating malicious activity or known malware patterns.</li>
                    <li><strong>Intrusion</strong> - Unauthorized access attempts or known attack signatures.</li>
                    <li><strong>Anomalies</strong> - Out-of-pattern network behaviors, potentially a precursor to an attack.	</li>
                  </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Severity Level</strong></TableCell>
                  <TableCell>
                  <Typography component="ul">
                    <li><strong>Low</strong> - Minimal impact with low risk, often involving non-urgent issues or informational events.</li>
                    <li><strong>Medium </strong> - Moderate risk, usually pointing to potential security concerns that may require attention but are not immediately critical.</li>
                    <li><strong>High</strong> - Critical threats with high impact and urgency, likely active threat.</li>
                  </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Firewall Logs</strong></TableCell>
                  <TableCell>
                  <Typography>
                    Firewall logs provide additional context about whether traffic has been blocked, allowed, or redirected. They can help assess if an ongoing attack was already mitigated or if additional actions are needed.
                  </Typography>
                  <Typography component="ul">                    
                    <li><strong>Protocol Match</strong> - Traffic aligns with expected communication protocol.</li>
                    <li><strong>IP Range Mismatch </strong> - Source IP falls outside allowed IP range.</li>
                    <li><strong>Accepted Connection</strong> - Connection permitted by firewall rules.</li>
                    <li><strong>Blocked Connection </strong> - Connection denied due to firewall restrictions.</li>
                    <li><strong>High Anomaly</strong> - Unusual activity indicating potential threat.	</li>
                    <li><strong>Unauthorized IP</strong> - Access attempt from an unapproved IP address.	</li>
                  </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Attack Signature</strong></TableCell>
                  <TableCell>
                  <Typography>A specific pattern or sequence of behaviors in network traffic or system activity that indicates a known cyberattack or malicious activity.</Typography>
                  <Typography component="ul">
                    <li><strong>Known Pattern A</strong> - Often associated with a specific, targeted vulnerability or a well-known exploit (e.g., targeting a particular application, version, or protocol). Alerts for Pattern A suggest a precise, repeatable attack method, where blocking or patching the specific vulnerability may mitigate further incidents. </li>
                    <li><strong>Known Pattern B</strong> - Generally indicates a broader attack strategy that may adapt or morph (e.g., reconnaissance or brute-force methods targeting a range of systems or ports). Pattern B may not target one specific weakness but aims to find any exploitable entry.</li>
                  </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Anomaly Score</strong></TableCell>
                  <TableCell>
                  <Typography>This score quantifies how unusual or suspicious an activity is. Higher scores indicate a greater deviation from normal behavior, suggesting a higher likelihood of threat.</Typography>
                  <Typography component="ul">
                  Score Range:
                    <li><strong>0-30</strong>: Low anomaly, likely benign.</li>
                    <li><strong>31-70 </strong>: Moderate anomaly, warrants further review.</li>
                    <li><strong>71-100</strong>: High anomaly, potentially malicious, needs immediate attention.
                    </li>
                  </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>IDS/IPS  Alert</strong></TableCell>
                  <TableCell>
                  <Typography>This is a notification from an Intrusion Detection/Prevention System indicating potentially harmful network activity.</Typography>
                  <Typography component="ul">
                    <li><strong>Malware Signature Match</strong> - Identified known malware by its unique signature.</li>
                    <li><strong>Malicious Pattern Match</strong> - Detected activity aligning with known malicious behavior.</li>
                    <li><strong>Intrusion Detected </strong> - Unapproved access attempt or intrusion into the network.</li>
                    <li><strong>Suspicious Packet Detected</strong> - Unusual packet flagged that may indicate risk.</li>
                    <li><strong>DDoS Attempt Detected</strong> -  Distributed Denial-of-Service attack suspected.</li>
                    <li><strong>Anomaly Detected</strong> - Activity deviating significantly from typical patterns.	</li>
                  </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Timestamp</strong></TableCell>
                  <TableCell>
                  <Typography >
                  Exact time the alert was triggered.
                  </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Source IP Address</strong></TableCell>
                  <TableCell>
                  <Typography>
                  IP address initiating the traffic.
                  </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Destination IP Address</strong></TableCell>
                  <TableCell>
                  <Typography>
                  IP address receiving the traffic.
                  </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Source Port</strong></TableCell>
                  <TableCell>
                  <Typography>
                  Port number used by the source device.
                  </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Destination Port</strong></TableCell>
                  <TableCell>
                  <Typography>
                  Port number on the destination device.
                  </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Protocol</strong></TableCell>
                  <TableCell>
                  <Typography>
                  Communication protocols are standardized rules and formats that enable devices to exchange data efficiently and reliably over networks. They define how data is formatted, transmitted, and received, ensuring that different systems (like computers, IoT devices, or vehicles) can understand and respond to each other’s messages.
                  </Typography>
                  
                  <Typography component="ul">
                    <li><strong>TCP </strong>(Transmission Control Protocol) - A connection-oriented protocol that ensures reliable, ordered data delivery between devices.</li>
                    <li><strong>UDP </strong>(User Datagram Protocol) - A connectionless protocol that sends data without establishing a connection, making it faster but less reliable than TCP. UDP is used in scenarios where speed is prioritized over reliability.</li>
                    <li><strong>ICMP </strong>(Internet Control Message Protocol) - Primarily used for diagnostics and network management, ICMP helps report errors and send control messages. ICMP traffic generally consists of control packets rather than actual user data.</li>
                  </Typography>              
                  </TableCell>
                </TableRow>
               
                <TableRow>
                  <TableCell><strong>Packet Length:</strong></TableCell>
                  <TableCell>
                  <Typography>
                  Size of the packet in bytes.
                  </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Packet Type</strong></TableCell>
                  <TableCell>
                  <Typography>
                  Type/category of packet. Control packets and Data packets serve different purposes:
                  </Typography>
                  <Typography component="ul">
                    <li><strong>Control</strong> - Control packets can reveal unauthorized connection attempts or disruptions.</li>
                    <li><strong>Data </strong> - Data packets help detect data leaks, malware, and unusual data transfers.</li>
                  </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Traffic Type</strong></TableCell>
                  <TableCell>
                  <Typography>
                  Specify the purpose or content of the communication (web, file transfer, domain resolution).
                  </Typography>
                  <Typography component="ul">
                    <li><strong>HTTP/HTTPS:</strong> - HTTP and HTTPS are used for web-based services within vehicles, such as infotainment, navigation, over-the-air (OTA) updates, and cloud connectivity for remote diagnostics. Alerts may indicate unauthorized access attempts, data exfiltration, phishing, or man-in-the-middle (MITM) attacks targeting vehicle applications or services.</li>
                    <li><strong>FTP </strong> (File Transfer Protocol) - FTP-related alerts could point to unauthorized data uploads/downloads, malware payload transfers, or vulnerabilities due to the lack of encryption in standard FTP.</li>
                    <li><strong>DNS </strong> - DNS resolves domain names to IP addresses, enabling vehicles to connect to cloud services, navigation servers, and IoT devices.DNS alerts may highlight DNS spoofing, DNS tunneling (used for data exfiltration), or phishing attempts where malicious domains mimic legitimate services.</li>
                  </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Payload Data</strong></TableCell>
                  <TableCell>
                  <Typography>
                  Content within the packet.
                  </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Malware Indicators</strong></TableCell>
                  <TableCell>
                  <Typography>
                  Signs or evidence suggesting the presence of malicious software on a network or device
                  </Typography>
                  <Typography component="ul">
                    <li><strong>IoC (Indicator of Compromise) Detected</strong> -  it means specific evidence (like a known malicious IP, domain, or file hash) suggests compromise but doesn’t confirm active malware presence.</li>
                  </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>User Information</strong></TableCell>
                  <TableCell>
                  <Typography>
                  Associated user or account details.
                  </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Device Information</strong></TableCell>
                  <TableCell>
                  <Typography>
                  Identifying info of the involved device.
                  </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Network Segment</strong></TableCell>
                  <TableCell>
                  <Typography>
                  Specific network area where traffic originated.
                  </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Geo-location Data</strong></TableCell>
                  <TableCell>
                  <Typography>
                  Physical location of the source IP.
                  </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell><strong>Proxy Information</strong></TableCell>
                  <TableCell>
                  <Typography>
                  Details if traffic passed through a proxy.
                  </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      
      <Accordion
        // defaultExpanded
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={() => {recordUserAction("Recommended");}}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Recommended Workflow
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography component="ul">
          <li><strong>Step 1</strong>: Look at the attack type and severity level to determine whether immediate action or escalation is necessary.          </li>
          <li><strong>Step 2</strong>: Review anomaly scores to prioritize high-scoring alerts.          </li>
          <li><strong>Step 3</strong>: Check the source and provided information, such as destination IP addresses and geolocation data, to assess whether the traffic comes from known malicious sources or unusual locations.</li>
          <li><strong>Step 4</strong>: Analyze provided information to understand the nature of the attack.</li>
          <li><strong>Step 5</strong>: Identify Required Action.</li>
        </Typography>
      </AccordionDetails>
      </Accordion>

    </Box>
  );
};

export default FAQ;
