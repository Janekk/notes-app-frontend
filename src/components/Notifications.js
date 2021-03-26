import React from "react"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"
import {makeStyles} from "@material-ui/core/styles"

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginRight: theme.spacing(1),
    },
  },
}))

export default function Notifications({notification, setNotification}) {
  const classes = useStyles()
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    setNotification(null)
  }

  return (
    <div className={classes.root}>
      <Snackbar
        open={!!notification?.message}
        anchorOrigin={{vertical: "top", horizontal: "right"}}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        {notification && (
          <Alert onClose={handleClose} severity={notification.severity || "error"}>
            {notification.message}
          </Alert>
        )}
      </Snackbar>
    </div>
  )
}
