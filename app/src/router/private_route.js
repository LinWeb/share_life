import React, {
    Component
} from 'react';
import { Route, Redirect } from 'dva/router';
import checkLogin from '../check/check_login'

class PrivateRoute extends Component {
    render() {
        let { component: Comp, ...rest } = this.props
        return (
            <Route {...rest} render={
                props => checkLogin() ?
                    <Comp {...props}></Comp>
                    : <Redirect to={{
                        pathname: '/login', state: {
                            from: props.location
                        }
                    }}></Redirect>
            } >
            </Route>
        )
    }
}

export default PrivateRoute