import Login from "../auth/Login"
import { AuthContext } from '../../Context/AuthContext'
import { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

const Auth = ({ authRoute }) => {
	let body
	body = (
		<>
			{authRoute === 'login' && <Login />}
		</>
	)

	return (
		<div className='landing'>
			<div className='dark-overlay'>
				<div className='landing-inner'>
					<h1>Art Wear</h1>
					<h4>Shop easy shop happy</h4>
					{body}
				</div>
			</div>
		</div>
	)
}

export default Auth