import { blue } from "@mui/material/colors";

const facebookStyle = {
  paper: {
    padding: 20,
    marginTop: 8,
    backgroundColor: blue[50],
  },
  header: {
    color: blue[900],
  },
  profileList: {
    backgroundColor: blue[100],
    borderRadius: 10,
    padding: 10,
    margin: "10px 0",
  },
  listItem: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: blue[200],
    },
    borderRadius: "10px",
    margin: "10px 0",
    border: "3px solid #ffffff",
    padding: "5px 5px",
  },

  button: {
    margin: "10px",
    backgroundColor: blue[600],
    color: "white",
    "&:hover": {
      backgroundColor: blue[700],
    },
  },
  dialog: {
    backgroundColor: blue[100],
  },
};

export default facebookStyle;
