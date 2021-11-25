import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link, useHistory } from 'react-router-dom'
import { useState, useContext } from 'react'
import { isValidObjField, updateError, isValidEmail } from './CheckForm';
import { useLogin } from '../../Context/AuthContext';
import { signIn } from '../../pages/auth/User';
import Modal from "../../pages/Admin/ModalLoginError";
const Login = () => {

	const { setIsLoggedIn, setProfile } = useLogin();
	const [userInfo, setUserInfo] = useState({
		email: '',
		password: '',
	});

	const [error, setError] = useState('');
	const { email, password } = userInfo;

	const history = useHistory();

	//Submit form dang nhap
	const submitForm = async event => {
		event.preventDefault()
		//Xu ly dang nhap
		if (isValidForm()) {
			try {
				const res = await signIn(userInfo.email, userInfo.password);
				if (res.data.success) {
					setUserInfo({ email: '', password: '' })
					setProfile(res.data.user);
					// setIsLoggedIn(true);
					if (res.data.user.role !== 'admin') {
						setIsLoggedIn(false);
						setModalOpen(true);
					}
					else {
						setIsLoggedIn(true);
					}

				} else {
					console.log("Đăng nhập thất bại")
					setModalOpen(true);
				}
			} catch (error) {
				console.log(error.message);
			}
		}
	};


	//Hàm xử lý OnChangeText email,password
	const handleOnChangeText = event =>
		setUserInfo({ ...userInfo, [event.target.name]: event.target.value })

	//Form kiem tra loi
	const isValidForm = () => {
		//Không dc bõ trống
		if (!isValidObjField(userInfo)) {
			return updateError('Xin mời nhập tài khoản và mật khẩu!', setError);
		}
		//Check định dạng email
		if (!isValidEmail(email)) {
			return updateError('Email sai định dạng!', setError);
		}
		return true;
	}

	// Open Modal
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<>
			{/* Open Model Eror when login faild */}
			{modalOpen && <Modal setOpenModal={setModalOpen} />}
			{/* Check lỗi form sẽ hiện text tại đây */}
			{error ? (
				<h2 className='text-error'>{error}</h2>
			) : null}
			<Form className='my-4'
				onSubmit={submitForm}
			>
				<Form.Group>
					<Form.Control
						type='text'
						placeholder='Email'
						name='email'
						required
						value={email}
						onChange={handleOnChangeText}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type='password'
						placeholder='Password'
						name='password'
						required
						value={password}
						onChange={handleOnChangeText}
					/>
				</Form.Group>
				<Button type='submit' className='btnLogin'>
					Đăng nhập
				</Button>
			</Form>
		</>
	)
}

export default Login



