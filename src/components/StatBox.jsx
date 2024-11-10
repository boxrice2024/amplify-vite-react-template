// StatBox.jsx
import React, { useState } from "react";
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase, filledData, unfilledData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  // Open dialog and show the data for the clicked part of the progress circle
  const handleClickOpen = (part) => {
    setSelectedData(part === 'filled' ? filledData : unfilledData);
    setOpen(true);
  };

  // Close dialog
  const handleClose = () => {
    setOpen(false);
    setSelectedData(null);
  };

  return (
    <>
      <Box width="100%" m="0 30px">
        <Box display="flex" justifyContent="space-between">
          <Box>
            {icon}
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ color: colors.grey[100] }}
            >
              {title}
            </Typography>
          </Box>
          <Box>
            <ProgressCircle progress={progress} subtitle={subtitle} onClick={handleClickOpen} />
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" mt="2px">
          <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
            {subtitle}
          </Typography>
          <Typography
            variant="h5"
            fontStyle="italic"
            sx={{ color: colors.greenAccent[600] }}
          >
            {increase}
          </Typography>
        </Box>
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{selectedData ? selectedData.title : "No Data"}</DialogTitle>
        <DialogContent>
          {selectedData ? (
            <>
              <Typography variant="h6" sx={{ color: selectedData.color }}>
                {selectedData.percentage}%
              </Typography>
              <Typography variant="body1">{selectedData.description}</Typography>
            </>
          ) : (
            <Typography variant="body1">No data available.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StatBox;
