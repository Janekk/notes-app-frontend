import React, { useReducer, useContext } from "react"
import { useHistory } from "react-router-dom"
import {
  makeStyles,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core"
import ShareIcon from "@material-ui/icons/Share"
import dayjs from "dayjs"
import { edit, create, share } from "../api/notes"
import { AppContext } from "../AppContext"
import { NotePermissionTypes } from "../utils"

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: "100%",
    },
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  validUntil: {
    width: "100%",
  },
}))

export default function NoteForm({ note, permissionType, isCreateMode }) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const openShareDialog = () => {
    setOpen(true)
  }
  const closeShareDialog = () => {
    setOpen(false)
  }

  const shareNote = async () => {
    try {
      await share(note.id, shareEmail, shareValidUntil)
      showSuccess(`Message has been shared with ${shareEmail}!`)
      closeShareDialog()
    } catch (e) {
      showError(e.message)
    }
  }

  const [formInput, setFormInput] = useReducer((state, newState) => ({ ...state, ...newState }), {
    title: note.title,
    content: note.content,
  })
  const { showError, showSuccess } = useContext(AppContext)
  const history = useHistory()

  const saveNote = async () => {
    const { title, content } = formInput
    try {
      if (isCreateMode) {
        const { data: { note } } = await create(title, content)
        history.push(`/edit/${note.id}`)
        showSuccess('Message has been added!')
      } else {
        await edit(note.is, title, content)
        showSuccess('Message saved!')
      }
    } catch (e) {
      showError(e.message)
    }
  }
  const handleInput = (evt) => {
    const name = evt.target.name
    const newValue = evt.target.value
    setFormInput({ [name]: newValue })
  }

  const { title, content } = formInput
  const canEdit = isCreateMode || permissionType === NotePermissionTypes.Edit
  const [shareValidUntil, setShareValidUntil] = React.useState(dayjs().add(7, 'day').toDate());
  const [shareEmail, setShareEmail] = React.useState('');

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          multiline
          rowsMax={2}
          variant="outlined"
          value={title}
          name="title"
          onChange={handleInput}
          disabled={!canEdit}
        />
        <TextField
          multiline
          rows={10}
          variant="outlined"
          value={content}
          name="content"
          onChange={handleInput}
          disabled={!canEdit}
        />
      </div>
      <div className={classes.buttonsContainer}>
        {canEdit && (
          <Button variant="contained" color="primary" onClick={saveNote}>
            Save
          </Button>
        )}
        {!isCreateMode && canEdit &&
          <Button variant="contained" color="primary" onClick={openShareDialog}>
            Share <ShareIcon />
          </Button>
        }
      </div>
      <Dialog onClose={closeShareDialog} open={open}>
        <DialogTitle>Share note</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter another user's email to share this note.</DialogContentText>
          <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" value={shareEmail} onChange={(e) => setShareEmail(e.target.value)} fullWidth />
          <div>
            <TextField
              label="Share valid until"
              type="datetime-local"
              value={shareValidUntil.toISOString().substring(0, 23)}
              onChange={(e) => setShareValidUntil(new Date(e.target.value))}
              className={classes.validUntil}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeShareDialog} color="primary" variant="contained">
            Cancel
          </Button>
          <Button onClick={shareNote} color="primary" variant="contained" disabled={!shareEmail}>
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  )
}
