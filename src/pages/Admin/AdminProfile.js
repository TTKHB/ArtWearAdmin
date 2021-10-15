import React from "react";
import { createContext, useReducer, useEffect, useState, useContext } from 'react'
import { Input } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from 'react-bootstrap/Button'
import '../Admin/Admin.css'
import { useLogin } from '../../Context/AuthContext';
import baseURL from '../../assets/common/baseUrl';
import Modal from "../../pages/Admin/Modal";

const AdminProfile = () => {
    //Profile
    const { profile } = useLogin();
    const [userInfo, setUserInfo] = useState({
        fullname: profile.fullname,
        email: profile.email,
        phone: profile.phone,
        sex: profile.sex,
        address: profile.address,
        birthday: profile.birthday,
    });

    const { fullname, email, phone, sex, address, birthday } = userInfo;

    //Sử dụng chung setUserInfo 
    //Gọi đúng value của từng tên và xài onchange ở TextField bên dưới
    const handleOnChangeText = event =>
        setUserInfo({ ...userInfo, [event.target.name]: event.target.value })

    //Avatar tạo biến riêng do setUserInfo xài event.target.value(image xài e.target.files[0])
    const [avatar, setAvartar] = useState(profile.avatar);

     //Biến setfile Image 
    const setFile = (e) => {
        setAvartar(e.target.files[0]);
    };

    //Biến update Image lên Cloudinary
    const handleUpdata = () => {
        const data = new FormData()
        data.append('file', avatar)
        data.append("upload_preset", "_artwear")
        data.append("cloud_name", "artwear")
        fetch("https://api.cloudinary.com/v1_1/artwear/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => {
                //Truyền vào url
                setAvartar(data.url)
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    //Biến cập nhật thông tin admin
    const updateData = async event => {
        event.preventDefault()
        fetch(`${baseURL}/users/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: profile._id,
                fullname: userInfo.fullname,
                email: userInfo.email,
                avatar: avatar,
                phone: userInfo.phone,
                sex: userInfo.sex,
                address: userInfo.address,
                birthday: userInfo.birthday,
            })
        }).then(res => res.json())
            .then(data => {
                //Nếu thành công sẽ hiên modal dialog chúc mừng
                setModalOpen(true);
                console.log(`${data}is Update successffly!!`)
            }).catch(err => {
                console.log("error", err)
            })
    }

    // Open Modal
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="ContainerAdmin">
            <div className="HeaderAdmin">
                <div className="AvatarAdmin">
                    <img
                        src={
                            profile
                                ? profile.avatar ||
                                "https://res.cloudinary.com/artwear/image/upload/v1632695686/imageUser/LogoUser_khxsbc.jpg"
                                : "https://res.cloudinary.com/artwear/image/upload/v1632695686/imageUser/LogoUser_khxsbc.jpg"
                        } />
                </div>
            </div>
            <Input
                accept="image/*"
                onChange={setFile}
                type="file"
                multiple
                style={{ marginLeft: 9, marginTop: '6%' }}
            >
            </Input>
            <Button onClick={handleUpdata} className='btnSaveImage'>
                Cập nhật ảnh
            </Button>

            {modalOpen && <Modal setOpenModal={setModalOpen} />}

            <Container>
                <Box
                    component="form"
                    sx={{
                        "& .MuiTextField-root": { m: 1 },
                    }}
                    className="InfomationAdmin"
                >
                    <Typography
                        style={{ textAlign: "center", fontWeight: "bold", fontSize: 40 }}
                        variant="h5"
                        component="div"
                        gutterBottom
                    >
                        Thông tin Admin
                    </Typography>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: '7px' }}>
                        <div />
                        <Button type='submit' className='btnSave' onClick={updateData}>
                            Lưu thông tin
                        </Button>
                    </div>

                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Họ và tên "
                            defaultValue="Hello World"
                            fullWidth
                            name='fullname'
                            onChange={handleOnChangeText}
                            value={fullname}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Email"
                            defaultValue="Hello World"
                            fullWidth
                            name='email'
                            onChange={handleOnChangeText}
                            value={email}
                        />
                    </div>

                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Địa chỉ"
                            defaultValue="Hello World"
                            fullWidth
                            name='address'
                            onChange={handleOnChangeText}
                            value={address}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Ngày sinh"
                            defaultValue="Hello World"
                            fullWidth
                            name='birthday'
                            onChange={handleOnChangeText}
                            value={birthday}
                        />
                    </div>

                    <div style={{ flexDirection: 'row', display: 'flex' }}>
                        <TextField
                            required
                            id="outlined-required"
                            label="Số điện thoại"
                            defaultValue="Hello World"
                            fullWidth
                            name='phone'
                            onChange={handleOnChangeText}
                            value={phone}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Giới tính"
                            defaultValue="Hello World"
                            fullWidth
                            name='sex'
                            onChange={handleOnChangeText}
                            value={sex}
                        />
                    </div>
                </Box>

            </Container>
            {/* Footer */}
            <div style={{ height: 50, backgroundColor: 'white', width: '100%', marginTop: 50 }} />
        </div>
    );
};

export default AdminProfile;