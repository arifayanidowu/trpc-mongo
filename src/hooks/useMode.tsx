import { createTheme, type PaletteMode } from "@mui/material";
import React from "react";

const fontFamily = "'Barlow Condensed', sans-serif";

const useMode = () => {
  const [mode, setMode] = React.useState<PaletteMode>(
    "light" ?? (localStorage.getItem("t3-color-mode") as PaletteMode)
  );

  React.useEffect(() => {
    const localMode = localStorage.getItem("t3-color-mode");
    if (localMode) {
      setMode(localMode as PaletteMode);
    }
  }, []);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => {
          const mode = prevMode === "light" ? "dark" : "light";
          localStorage.setItem("t3-color-mode", mode);
          return mode;
        });
      },
    }),
    []
  );

  const memoizedTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          primary: {
            main: "#181826",
          },
          secondary: {
            main: "#681e51",
          },
          background: {
            default: mode === "light" ? "#f4f4f4" : "#0e161e",
          },
        },
        components: {
          MuiButtonBase: {
            styleOverrides: {
              root: {
                fontFamily,
                textTransform: "none",
                borderRadius: "0px",
                "&:disabled": {
                  cursor: "not-allowed",
                  pointerEvents: "auto",
                },
              },
            },
          },
          MuiTypography: {
            styleOverrides: {
              root: {
                fontFamily,
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              disableElevation: {
                boxShadow: "none",
              },
              root: {
                fontFamily,
                fontWeight: 600,
                textTransform: "none",
                borderRadius: "0px",
                "&:hover": {
                  transform: "translateY(-2px)",
                  transition: "transform 0.2s ease-in-out",
                },
                boxShadow: "none",
                "&.Mui-contained": {
                  color: mode === "light" ? "#fff" : "#fff",
                },
                "&.MuiButton-text": {
                  color: mode === "light" ? "#000" : "#fff",
                },
              },
            },
          },
          MuiTab: {
            styleOverrides: {
              root: {
                textTransform: "none",
                fontSize: "1.2rem",
              },
            },
          },
          MuiInputBase: {
            styleOverrides: {
              root: {
                fontFamily,
                "&.MuiOutlinedInput-root": {
                  borderRadius: "0px",
                  "& fieldset": {
                    borderColor: mode === "light" ? "#000" : "#fff",
                  },
                  "&:hover fieldset": {
                    borderColor: mode === "light" ? "#000" : "#fff",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: mode === "light" ? "#000" : "#fff",
                  },
                },
                "&.MuiInput-underline": {
                  border: `1px solid ${
                    mode === "light" ? "#e0e0e0" : "#515151"
                  }`,
                  padding: "5px 10px",
                },
                "&.MuiInput-root:after": {
                  borderBottom: `2px solid ${
                    mode === "light" ? "#000" : "#fff"
                  } !important`,
                },
              },
            },
          },
          MuiFormLabel: {
            styleOverrides: {
              root: {
                fontFamily,
                color: mode === "light" ? "#000" : "#fff",
                "&.Mui-focused": {
                  color: mode === "light" ? "#000" : "#fff",
                },
              },
            },
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: mode === "light" ? "#fff" : "#0e121b",
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                borderRadius: 0,
                backgroundColor: mode === "light" ? "#fafafa" : "#0e161e",
                // border: `1px solid ${mode === "light" ? "#e0e0e0" : "#515151"}`,
              },
            },
            defaultProps: {
              elevation: 0,
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: "0px",
              },
            },
          },
          MuiInputLabel: {
            styleOverrides: {
              root: {
                fontFamily,
              },
            },
          },
          MuiMenuItem: {
            styleOverrides: {
              root: {
                fontFamily,
              },
            },
          },
          MuiDialog: {
            styleOverrides: {
              paper: {
                fontFamily,
              },
            },
          },

          MuiTableCell: {
            styleOverrides: {
              root: {
                fontFamily,
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                fontFamily,
              },
            },
          },
          MuiTablePagination: {
            styleOverrides: {
              root: {
                fontFamily,
              },
              selectLabel: {
                fontFamily,
              },
              displayedRows: {
                fontFamily,
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                fontFamily,
              },
            },
          },
        },
      }),
    [mode]
  );

  return {
    colorMode,
    memoizedTheme,
  };
};

export default useMode;
