import theme from "../theme"

export const myBets = {

  container: {
    backgroundColor: theme.palette.secondary.light,
    padding: "10px 0px 0px 20px",
  },

  headerContainer: {
    height: "100%"
  },

  headerText: {
    paddingLeft: "19px",
  },

  availableFundsText: {
    padding: "10px 0px",
  },

  noActiveBetsMessage: {
    height: "100%",
    paddingBottom: "100%",
    marginTop: "20px",
  },

  betsViewToggleContainer: {
    border: "1px solid black",
    width: "99%",
  },

  activeBetsViewToggleButton: {
    width: "50%",
    border: "0px solid black",
  },

  betsViewToggleContainer: {
    width: "51%",
    borderLeft: "1px solid black",
  },

  activeViewToggle: {
    backgroundColor: theme.palette.primary.main
  },

  inactiveViewToggle: {
    backgroundColor: theme.palette.primary.light
  },

  itemContainer: {
    backgroundColor: theme.palette.primary.contrastText,
    width: "300px",
    margin: "10px 0px 10px 0px",
    border: "1px solid black",
    boxShadow: "1px",
    padding: "10px"
  },

  itemOutcome: {fontWeight: "bold",},

  itemGame: {fontWeight: "lighter", fontStyle: "italic"},

  itemDate: {fontWeight: "lighter", fontStyle: "italic"},

  itemWager: {},

  itemPayout: {},


}