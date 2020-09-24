import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AuthRoute = ({component: Component, ...rest }) => {
    const authedUser = useSelector((state)=>state.authedUser);
    return(
        <Route
            {...rest}
            render={(props) => (
               authedUser.userId!==undefined
                    ? 
                    <Component {...props} />
                    :  <Redirect to={{
                            pathname: '/',
                            state: {from: props.location}
                        }}
                    />
            )}
        />
    )
}

export default AuthRoute
