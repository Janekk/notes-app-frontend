import React, { useContext, useState, useEffect } from "react"
import { makeStyles, CircularProgress } from "@material-ui/core"
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { AppContext } from "../AppContext"
import { Link } from "react-router-dom"
import NotesList from "../components/NotesList"
import { list as getMyNotes } from "../api/notes"

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

export function Index() {
  const { isAuthenticated, showError } = useContext(AppContext)
  const [userNotes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const classes = useStyles()

  useEffect(() => {
    if (isAuthenticated) {
      async function fetchMyNotes() {
        try {
          setIsLoading(true)
          const { data: userNotes } = await getMyNotes()
          setNotes(userNotes)
        } catch (e) {
          showError(e.message)
        }
        setIsLoading(false)
      }
      fetchMyNotes()
    } else {
      setNotes([])
    }
  }, [isAuthenticated])

  return (
    <div>
      {isAuthenticated ? (
        <>
          <Fab color="primary" className={classes.fab} component={Link} to="/create">
            <AddIcon />
          </Fab>
          {
            isLoading ?
              <CircularProgress />
              :
              <NotesList userNotes={userNotes} />
          }
        </>
      ) : (
        <>
          <h1>Notes App</h1>
          <Link to="/login">Log In</Link> or <Link to="/register">Create account</Link>
        </>
      )}
    </div>
  )
}
