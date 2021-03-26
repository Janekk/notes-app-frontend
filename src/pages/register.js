import React, {useContext, useReducer} from "react"
import {AppContext} from "../AppContext"
import {register} from "../api/auth"
import {Link, Redirect} from "react-router-dom"
import {Button, TextField, Paper, Container} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"
import {useHistory} from "react-router-dom"

export function Register() {
  const useStyles = makeStyles((theme) => ({
    root: {
      padding: "1rem",
      marginTop: "1rem",
    },
    textField: {
      marginTop: 8,
    },
    submit: {
      marginTop: "1rem",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
  }))
  const classes = useStyles()

  const {isAuthenticated, showError} = useContext(AppContext)

  const [formInput, setFormInput] = useReducer((state, newState) => ({...state, ...newState}), {
    name: "",
    email: "",
    password: "",
  })

  const handleInput = (evt) => {
    const name = evt.target.name
    const newValue = evt.target.value
    setFormInput({[name]: newValue})
  }

  const history = useHistory()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const {name, email, password} = formInput
    try {
      await register(name, email, password)
      history.push("/login")
    } catch (e) {
      showError(e.message)
    }
  }

  if (isAuthenticated) {
    return <Redirect to="/" />
  }
  const {name, email, password} = formInput

  return (
    <Container maxWidth="sm">
      <Paper className={classes.root}>
        <h1>Create Account</h1>

        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField label="Name" className={classes.textField} name="name" onChange={handleInput} />
          <TextField
            label="Email"
            className={classes.textField}
            name="email"
            helperText="e.g. name@gmail.com"
            onChange={handleInput}
          />
          <TextField
            label="Password"
            className={classes.textField}
            name="password"
            type="password"
            onChange={handleInput}
          />
          <Button
            className={classes.submit}
            variant="contained"
            color="primary"
            type="submit"
            disabled={!(email && password && name)}
          >
            submit
          </Button>
        </form>
        <div style={{marginTop: 8}}>
          or <Link to="/login">Log In</Link>
        </div>
      </Paper>
    </Container>
  )
}
