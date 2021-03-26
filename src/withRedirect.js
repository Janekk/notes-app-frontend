import React, {useEffect, useContext} from "react"
import queryString from "query-string"
import {AppContext} from "./AppContext"
import {useLocation, useHistory} from "react-router-dom"

const withRedirect = (Component) => (props) => {
  const {isAuthenticated} = useContext(AppContext)
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    if (!isAuthenticated) {
      history.push({
        pathname: "/login",
        search: queryString.stringify({
          redirectTo: location.pathname + location.search,
        }),
      })
    }
  }, [])
  return <Component {...props} />
}
export default withRedirect
