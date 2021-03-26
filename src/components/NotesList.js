import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { List, ListItem, Divider, ListItemText, Paper, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { NotePermissionTypes } from "../utils"
dayjs.extend(relativeTime)

const useStyles = makeStyles(() => ({
  inline: {
    display: "inline",
  },
}))

export default function NotesList({ userNotes }) {
  const classes = useStyles()

  if (!userNotes.length) {
    return (
      <h2>
        No notes yet, add one!
      </h2>
    )
  }

  return (
    <Paper className={classes.root}>
      <List>
        {userNotes.map((userNote, i) => {
          const { note, validUntil, permissionType } = userNote
          return (
            <>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography component={Link} to={`/edit/${note.id}`}>
                      {note.title}
                    </Typography>
                  }
                  secondary={
                    <>
                      {
                        permissionType === NotePermissionTypes.View ?
                          <>
                            <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                              View expires
                            </Typography>
                            {' '}{dayjs(validUntil).fromNow()}
                          </>
                          :
                          <>
                            <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                              Editable
                            </Typography>
                          </>
                      }
                      {'; '}
                      <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                        Created
                      </Typography>
                      {" "}{dayjs(note.created).fromNow()}
                    </>
                  }
                />
              </ListItem>
              {i < userNotes.length - 1 && <Divider component="li" />}
            </>
          )
        })}
      </List>
    </Paper>
  )
}
