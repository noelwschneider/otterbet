import theme from "../theme"

export const header = {
  menu: {
    logout: {
      alignSelf: "flex-end",
      backgroundColor: theme.palette.primary.dark,
      border: "1px solid black",
      borderRadius: "10px 10px 0px 0px",
      overflow: "hidden",
      backgroundClip: "border-box",
      width: "100%", color: theme.palette.primary.contrastText,
    },
  },

  logo: {
    container: {
      height: "100%",
    },

    picture: {
      height: "100%",
      border: "0px dashed black",
    },

    text: {
      height: "inherit",
      alignItems: "flex-end",
      display: "flex",
    },
  },
}