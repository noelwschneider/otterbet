import theme from "../theme"

export const btn = {

  color: theme.palette.text.main,
  backgroundColor: theme.palette.primary.main,
  fontWeight: "bold",
  display: "inline-block",
  padding: "10px 20px",
  borderWidth: "1px 1px 3px",
  borderRadius: "4px",
  fontSize: "1.1rem",
  outline: 0,
  cursor: "pointer",
  "&:hover": {
    textDecoration: "none",
  },


  asLink: {
    padding: 0,
    borderWidth: 0,
    borderBottom: "1px solid #444",
    borderRadius: 0,
    background: "none",
    font: "inherit",
    color: "#444"
  },

  btn_sizeFull: {
    display: "block",
    width: "100%",
  },

  btn_sizeMin: {
    minHeight: "50px",
    minWidth: "100px",
  },

  btn_sizeSm: {
    padding: "10px 15px",
    fontSize: "0.8rem",
  },
}