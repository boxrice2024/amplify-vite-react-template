import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleNavigate = () => {
    navigate("/team"); // Navigate to /Team route
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="17"
            subtitle="New Detections "
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="17.6% "
            subtitle="High Severity Breakdown"
            progress="0.50"
            increase="+3.2%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Malware"
            subtitle="Top Attack Types"
            progress="0.30"
            increase="352 / week"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="21.7%"
            subtitle="False Positive Rate"
            progress="0.80"
            increase="-3%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Severity Breakdown
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                2,736 Alerts (last week)
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        {/* ROW 2 RIGHT */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          {/* Fixed Most Recent Detections */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p="15px"
            sx={{
              position: 'sticky', // Make it sticky
              top: 0,
              zIndex: 1,
              backgroundColor: colors.primary[400], // Keep the same background color
              borderBottom: `4px solid ${colors.primary[500]}`,
            }}
          >
            <Typography
              color={colors.grey[100]}
              variant="h5"
              fontWeight="600"
              onClick={handleNavigate} // Click handler to navigate
              sx={{
                cursor: "pointer", // Make it look clickable
                // textDecoration: "underline", // Add underline to show it's clickable
              }}
            >
              Most Recent Detections
            </Typography>
          </Box>
          {mockDataTeam.map((alert, i) => (
          <Box
              key={`${alert.id}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {alert.id}  {/* Display ID */}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {alert.timestamp}  {/* Display Timestamp */}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{alert.type}</Box>  {/* Display Attack Type */}
              <Box
                backgroundColor={
                  alert.severityLevel === "Low"
                    ? colors.greenAccent[500]
                    : alert.severityLevel === "Medium"
                    ? colors.orangeAccent[500]
                    : colors.redAccent[500]
                }
                p="5px 10px"
                borderRadius="4px"
                width="80px"  // Set a fixed width for consistent size
                textAlign="center"  // Center align the text
              >
                {alert.severityLevel}  {/* Display Severity Level */}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;