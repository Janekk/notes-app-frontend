import React, {useContext, useReducer} from "react"
import {AppContext} from "../AppContext"
import {login} from "../api/auth"
import {Link, Redirect, useLocation} from "react-router-dom"
import queryString from "query-string"
import UserSession from "../auth/UserSession"
import {Button, TextField, Paper, Container} from "@material-ui/core"
import {makeStyles} from "@material-ui/core/styles"

export default function Login() {
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

  const {isAuthenticated, setAuth, showError} = useContext(AppContext)

  const [formInput, setFormInput] = useReducer((state, newState) => ({...state, ...newState}), {
    email: "",
    password: "",
  })

  const handleInput = (evt) => {
    const name = evt.target.name
    const newValue = evt.target.value
    setFormInput({[name]: newValue})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {email, password} = formInput
    try {
      const {data} = await login(email, password)
      UserSession.setToken(data.token)
      setAuth(data)
    } catch (e) {
      showError(e)
    }
  }

  const location = useLocation()
  if (isAuthenticated) {
    const query = queryString.parse(location.search)
    return <Redirect to={query.redirectTo || ""} />
  }
  const {email, password} = formInput

  return (
    <Container maxWidth="sm">
      <Paper className={classes.root}>
        <h1>Log in</h1>
        <form onSubmit={handleSubmit} className={classes.form}>
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
            disabled={!(email && password)}
          >
            login
          </Button>
        </form>
        <div style={{marginTop: 8}}>
          or <Link to="/register">Create Account</Link>
        </div>
      </Paper>
    </Container>
  )
}
