import theme from "../theme"

export const markets = {
  container: {
    backgroundColor: theme.palette.secondary.light,
  },

  col: {
    alignItems: "start",
  },

  header: {
    height: "auto",
    margin: "10px",
    display: "inline-flex",
  },

  itemContainer: {
    width: "45vw",
    alignSelf: "center",
    margin: "10px",
  },

  itemHeaderContainer: {
    backgroundColor: theme.palette.primary.main,
    border: "solid 2px black",
    fontWeight: "bold",
    padding: "5px",
    // paddingBottom: "2px",
    display: "flex",
    justifyContent: "center",
    justifyItems: "center",
    alignItems: "center",
  },

  itemHeaderDate: {
    paddingLeft: "5px",
  },

  itemHeaderCell: {
    display: "flex",
    justifyContent: "center",
  },

  itemRow: {
    backgroundColor: "white",
    padding: "5px",
    border: "1px solid black",
  },

  teamName: {
    paddingLeft: "5px",
    alignSelf: "center",
  },

  marketOption: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingBottom: "3px",
    border: "0px",
    borderRadius: "10px 10px 10px 10px",
    overflow: "hidden",
    backgroundClip: "border-box",
    height: "100%",
    "&:hover": {
      backgroundColor: "#e1e1e1",
      cursor: "pointer"
    },
  },

  marketOptionContents: {
    display: "flex",
    justifyContent: "center",
  },
}