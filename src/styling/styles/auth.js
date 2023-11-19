import theme from "../theme";

export const auth = {
    container: {
        backgroundColor: theme.palette.tertiary.light,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        
        height: "calc(100% - 400px)",
        minHeight: "300px",
        maxHeight: "100vh",
        width: "calc(100% - 1000px)",
        minWidth: "300px",
        maxWidth: "100vw",

        position: "absolute",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        margin: "auto",

        padding: "20px",

        border: "1px solid black",
        borderRadius: "10px",
    },

    title: {
        // color: theme.palette.primary.dark,
        display: "flex",
        justifyContent: "center"
    },

    input: {
        backgroundColor: theme.palette.text.main,
        border: "1px solid black",
        container: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        },

        label: {
            // color: theme.palette.primary.dark,
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            textAlign: "center",
            position: "absolute",
            left: "23%",
        },
    },

    btn: {
        primary: {
            color: theme.palette.text.main,
            backgroundColor: theme.palette.primary.dark,
            fontWeight: "bold",
            display: "flex",
            maxWidth: "50%",
            padding: "10px 20px",
            borderWidth: "1px 1px 3px",
            borderRadius: "4px",
            fontSize: "1.1rem",
            outline: 0,
            cursor: "pointer",
            "&:hover": {
              textDecoration: "none",
              backgroundColor: theme.palette.primary.light,
            },
        },

        secondary: {
            display: "flex",
            // maxWidth: "19%",
            padding: 0,
            font: "inherit",
            color: "#444",
        },
    }
}