import { Box, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const Custom404 = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        flexDirection: "column",
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Image
        src="/img/pixar.jpeg"
        alt="404 - Page Not Found"
        width={300}
        height={300}
        style={{
          borderRadius: "50%",
          background: "transparent",
        }}
      />
      <Typography
        variant="h3"
        color="inherit"
        sx={{
          color: (theme) => (theme.palette.mode === "dark" ? "white" : "black"),
        }}
      >
        404 - Page Not Found
      </Typography>
    </Box>
  );
};

export default Custom404;
