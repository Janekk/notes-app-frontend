import React from "react"
import NoteForm from "../components/NoteForm"

export function CreateNote() {
  return (
    <>
      <h2>Create new note</h2>
      <NoteForm note={{ title: '', content: '' }} isCreateMode />
    </>
  )
}
