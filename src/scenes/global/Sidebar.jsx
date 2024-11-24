import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { logUserAction } from '../../db/client';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => {
        const userName = localStorage.getItem("username");
        if (userName) {
          console.log("username:" + userName);
          if (location.pathname === "/team") {
            console.log("UI-Component-Name:" + "side_Bar_Alert_List");
            logUserAction(userName, "side_Bar_Alert_List");
          } else if (location.pathname === "/faq") {
            console.log("UI-Component-Name:" + "side_Bar_RunBook");
            logUserAction(userName, "side_Bar_RunBook");
          } else if (location.pathname === "/dashboard") {
            console.log("UI-Component-Name:" + "side_Bar_Dashbaord");
            logUserAction(userName, "side_Bar_Dashbaord");
          }
        }
        setSelected(title)
      }} // Update selected item when clicked
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation(); // Get current route
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard"); // Default selection
  const [username, setUsername] = useState("ADMINIS"); // Default username

    // Load username from localStorage on component mount
    useEffect(() => {
      const storedUsername = localStorage.getItem("username") || "ADMINIS";
      setUsername(storedUsername);
    }, []);

  // Update selected item whenever the route changes
  useEffect(() => {
    if (location.pathname === "/team") {
      setSelected("Detection Lists");
    } else if (location.pathname === "/contacts") {
      setSelected("Contacts Information");
    } else if (location.pathname === "/invoices") {
      setSelected("Entries");
    } else if (location.pathname === "/faq") {
      setSelected("FAQ Page");
    } else {
      setSelected("Dashboard"); // Default to Dashboard
    }
  }, [location.pathname]); // Run this effect every time the path changes

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "3px 25px 3px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} width={isCollapsed ? "95px" : "190px"}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  {username} {/* Display the username from localStorage */}
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "5%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Alert List"
              to="/team"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="Contacts Information"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            {/* <Item
              title="Detection Lists"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
            <Item
              title="Runbook (FAQ)"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
