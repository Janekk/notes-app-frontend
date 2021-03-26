import { useParams } from "react-router-dom"
import React, { useEffect, useState, useContext } from "react"
import { get as getNote } from "../api/notes"
import { AppContext } from "../AppContext"
import NoteForm from "../components/NoteForm"
import { NotePermissionTypes } from "../utils"

export function EditNote() {
  const { id } = useParams()
  const [userNote, setUserNote] = useState(null)
  const { showError } = useContext(AppContext)

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data: note } = await getNote(id)
        setUserNote(note)
      } catch (e) {
        showError(e.message)
      }
    }
    if (!id) return

    fetchNote()
  }, [id])

  return (
    <>
      {userNote && (
        <>
          {
            userNote.permissionType === NotePermissionTypes.Edit ?
              <h2>Edit or share note</h2>
              :
              <h2>View note</h2>
          }
          <NoteForm note={userNote.note} permissionType={userNote.permissionType} />
        </>
      )}
    </>
  )
}
