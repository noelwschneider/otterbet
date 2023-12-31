import theme from "../theme";

export const betslip = {
  container: {
    paddingTop: "2vh",
    overflow: "scroll",
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: "start",
    margin: "10px",

    outcome: {
      display: "inline",
    },

    clearWagerIcon: {
      color: 'red'
    },
  },

  selectEntryMenu: {
    padding: "16px",
  },

  submitButton: {
    padding: "16px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },

}