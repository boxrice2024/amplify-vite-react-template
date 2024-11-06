import { Box, Tooltip, useTheme, styled } from "@mui/material";
import { tokens } from "../theme";
import { useState, useEffect, useRef } from "react";

// Styled Tooltip component
const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    fontSize: "1rem", // Customize font size
    fontWeight: "bold", // Customize font weight
    color: "Black", // Customize text color
    backgroundColor: "white", // Customize background color
  },
}));

const ProgressCircle = ({ progress = 0.75, unfilledProgress = 0.25, size = 40 }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const totalAngle = progress * 360;
  const unfilledAngle = unfilledProgress * 360;
  const [tooltipText, setTooltipText] = useState('');
  const [showTooltip, setShowTooltip] = useState(false);
  const circleRef = useRef(null);

  // Function to calculate which portion of the circle is hovered
  const handleMouseMove = (event) => {
    const { offsetX, offsetY, target } = event.nativeEvent;
    const rect = target.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const distanceX = offsetX - centerX;
    const distanceY = offsetY - centerY;
    const distanceFromCenter = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    const hoverAngle = (Math.atan2(distanceY, distanceX) * 180) / Math.PI + 180;

    if (distanceFromCenter <= size / 2) {
      if (hoverAngle <= totalAngle) {
        setTooltipText(`Filled: ${Math.round(progress * 100)}%`);
      } else if (hoverAngle <= totalAngle + unfilledAngle) {
        setTooltipText(`Unfilled: ${Math.round(unfilledProgress * 100)}%`);
      }
      setShowTooltip(true);
    } else {
      setShowTooltip(false);
    }
  };

  const handleOutsideClick = (event) => {
    if (circleRef.current && !circleRef.current.contains(event.target)) {
      setShowTooltip(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
  };

  return (
    <CustomTooltip
      title={tooltipText}
      open={showTooltip}
      placement="top"
      arrow
    >
      <Box
        ref={circleRef}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setShowTooltip(false)}
        sx={{
          background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${totalAngle}deg, ${colors.blueAccent[500]} ${totalAngle}deg 360deg),
            ${colors.greenAccent[500]}`,
          borderRadius: "50%",
          width: `${size}px`,
          height: `${size}px`,
          cursor: "pointer",
          position: "relative",
        }}
      />
    </CustomTooltip>
  );
};

export default ProgressCircle;
