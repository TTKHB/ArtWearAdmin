import {
    createContext,
    useReducer,
    useEffect,
    useState,
    useContext
}
    from 'react'
import '../QLUser/QLUser.css';
import baseURL from '../../assets/common/baseUrl';
import axios from 'axios';
const ResetPassUser = (props) => {
    const [password, setPassword] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
    const [alert, setAlert] = useState('');
    //Biến nhập password
    const changePassword = (e) => {
        const value = e.target.value
        setPassword(value)
        if (!value) {
            setErrorPassword('Mật khẩu không được bỏ trống')
        } else {
            setErrorPassword('')
        }
    }
    //Biến nhập xác nhận password
    const changeConfirmPassword = (e) => {
        const value = e.target.value
        setConfirmPassword(value)
        if (!value) {
            setErrorConfirmPassword('Xác nhận mật khẩu không được bỏ trống')
        } else if (password !== value) {
            setErrorConfirmPassword('Xác nhận mật khẩu không trùng khớp')
        }
        else {
            setErrorConfirmPassword('')
        }
    }
    //Biến đồng ý đổi mật khẩu
    const resetPasswrod = () => {
        const data = {
            //lấy value từ password trên
            password: password,
            //props.match.params.token (lấy link token đổi pass mà người dùng đã gửi, tìm token đã truyền lên web)
            token: props.match.params.token,
        }
        console.log(props.match.params.token)
        axios.put(`${baseURL}/users/new-Password`, data)
            .then(res => {
                //Nếu thành công (input pass, xác nhận pass sẽ xoá text và để rỗng)
                //Đồng thời hiện alert thành công
                if (res) {
                    setPassword('')
                    setConfirmPassword('')
                    setAlert('Đổi mật khẩu thành công')
                    setTimeout(() => {
                        setAlert('')
                    }, 3000)
                }
            })
    }
    return (
        <div style={{ marginTop: 200 }}>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='view-body'>
                            <div className='card-body'>
                                {/* Đây là nơi alert hiện */}
                                {
                                    alert && (
                                        <div className="alert alert-primary">
                                            {alert}
                                        </div>
                                    )
                                }
                                <div className='HeaderResetPass'>
                                    <h1>Đổi mật khẩu </h1>
                                </div>
                                <br />
                                <br />
                                <div className='form-group'>
                                    <label className='labelPass'>Mật khẩu mới</label>
                                    <input placeholder="Password" className='form-control'
                                        value={password}
                                        onChange={changePassword}
                                    />
                                    {/* Đây là nơi hiện lỗi errorPassword */}
                                    {
                                        errorPassword && (
                                            <p className='text-danger'>{errorPassword}</p>
                                        )
                                    }
                                </div>
                                <div className='form-group'>
                                    <label className='labelPass'>
                                        Xác nhận lại mật khẩu
                                    </label>
                                    <input placeholder="Password" className='form-control'
                                        value={confirmPassword}
                                        onChange={changeConfirmPassword}
                                    />
                                    {/* Đây là nơi hiện lỗi errorConfirmPassword */}
                                    {
                                        errorConfirmPassword && (
                                            <p className='text-danger'>{errorConfirmPassword}</p>
                                        )
                                    }
                                </div>
                                <div className='viewResetPass' onClick={resetPasswrod}>
                                    <h1>Đồng ý</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPassUser;