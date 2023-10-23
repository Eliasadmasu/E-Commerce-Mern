import { styled } from "@mui/system";
import { Box, Grid } from "@mui/material";

export const StyledMainContainer = styled(Box)({
  height: "100vh",
});
export const StyledSideBarMenu = styled(Box)({
  height: "3rem",
  display: "flex",
  alignItems: "center",
  gap: "20px",
  fontSize: "18px",
  fontWeight: "500",
  padding: "1rem",
});
export const SidebarContainer = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});
