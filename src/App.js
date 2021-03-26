import React, {useState, useEffect} from "react"
import {makeStyles} from "@material-ui/core/styles"
import {Route} from "react-router-dom"
import {Index} from "./pages"
import {Login} from "./pages/login"
import {Register} from "./pages/register"
import {EditNote} from "./pages/edit"
import {CreateNote} from "./pages/create"
import {AppContext} from "./AppContext"
import UserSession from "./auth/UserSession"
import {getProfile} from "./api/user"
import Notifications from "./components/Notifications"
import {TopBar} from "./components/TopBar"
import CssBaseline from "@material-ui/core/CssBaseline"
import Container from "@material-ui/core/Container"
import {useHistory} from "react-router-dom"

const useStyles = makeStyles(() => ({
  appContainer: {
    marginTop: "1rem",
  },
}))

function App() {
  const [auth, setAuth] = useState({token: UserSession.getToken()})
  const [profile, setProfile] = useState(null)
  const [notification, setNotification] = useState(null)
  const showError = (message) => setNotification({message, severity: "error"})
  const showSuccess = (message) => setNotification({message, severity: "success"})
  const history = useHistory()
  const logOut = () => {
    UserSession.setToken(null)
    setAuth({token: null})
    setProfile(null)
    history.replace("/")
  }

  const appContext = {
    auth,
    setAuth,
    isAuthenticated: !!auth?.token,
    profile,
    setProfile,
    logOut,
    notification,
    setNotification,
    showError,
    showSuccess,
  }

  const token = auth?.token

  async function fetchProfile() {
    const {data: profile} = await getProfile()
    setProfile(profile)
  }

  useEffect(() => {
    if (auth.token) {
      fetchProfile()
    }
  }, [token])

  const classes = useStyles()

  return (
    <div>
      <AppContext.Provider value={appContext}>
        <CssBaseline />
        <TopBar />
        <Notifications notification={notification} setNotification={setNotification} />
        <Container maxWidth="lg" className={classes.appContainer}>
          <Route path="/" exact component={Index} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/edit/:id" component={EditNote} />
          <Route path="/create" component={CreateNote} />
        </Container>
      </AppContext.Provider>
    </div>
  )
}

export default App
