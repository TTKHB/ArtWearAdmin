import { Route, Redirect } from 'react-router-dom'
import { useLogin } from '../../Context/AuthContext';
import ErrorLogin from '../PageNotFound/ErrorLogin';

//Lớp bảo vệ bọc bên ngoài dùng để chặn khi chưa login vào app thì ko dc vào MainDrawer
const ProtectedRoute = ({ component: Component, ...rest }) => {
	const { isLoggedIn } = useLogin();

	return (
		<Route
			{...rest}
			render={props =>
				isLoggedIn ? (
					<>
						<Component {...rest} {...props} />
					</>
				) : null}
		/>
		// ** Khoá tạm thời (có thể xài) **
		// <Route
		// 	{...rest}
		// 	render={props =>
		// 		isLoggedIn ? (
		// 			<>
		// 				<Component {...rest} {...props} />
		// 			</>
		// 		) : (
		//             <>
		//                 <ErrorLogin/>
		//             </>
		//         )}
		// />
	)
}

export default ProtectedRoute