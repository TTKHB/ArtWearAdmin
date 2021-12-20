import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import {
    CalendarToday,
    LocationSearching,
    MailOutline,
    PermIdentity,
    PhoneAndroid,
    Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "../QLUser/QLUser.css";
import { Input } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { parseImgCloudinaryUser } from "../../Handler/handlerCloudinary";
const InputFile = styled("input")({
    display: "none",
});
const EditUser = () => {
    let history = useHistory();
    const { id } = useParams();
    console.log("id user ne ba", id)
    const [FileImage, setFileImage] = React.useState("");

    const setFile = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        console.log("e", file);
        reader.onloadend = () => {
            setFileImage({
                file: file,
                imagePreviewUrl: reader.result,
            });
        };
        reader.readAsDataURL(file);
    };

    const [user, setUser] = useState({
        fullname: "",
        email: "",
        phone: "",
        sex: "",
        address: "",
        birthday: ""
    });

    const { fullname, email, phone, sex, address, birthday } = user;

    const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
        console.log(e)
    };

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:3000/api/v1/users/${id}`);
        setUser(result.data);
    };

    const onSubmit = async e => {
        e.preventDefault()
        let mainImg;
        const linkImg = await parseImgCloudinaryUser(FileImage.imagePreviewUrl);
        mainImg = linkImg;
        fetch(`http://localhost:3000/api/v1/users/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullname: user.fullname,
                email: user.email,
                avatar: mainImg,
                phone: user.phone,
                sex: user.sex,
                address: user.address,
                birthday: user.birthday,
            })
        }).then(res => res.json())
            .then(data => {
                console.log(`${data}is Update successffly!!`)
                history.push("/MainDrawer/UserPage");
            }).catch(err => {
                console.log("error", err)
            })
    }
    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Chỉnh sửa người dùng</h1>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img
                            src={
                                user
                                    ? user.avatar ||
                                    "https://res.cloudinary.com/artwear/image/upload/v1632695686/imageUser/LogoUser_khxsbc.jpg"
                                    : "https://res.cloudinary.com/artwear/image/upload/v1632695686/imageUser/LogoUser_khxsbc.jpg"
                            }
                            alt=""
                            className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{user.fullname}</span>
                            <span className="userShowUserTitle">{user.role}</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Thông tin tài khoản</span>
                        <div className="userShowInfo">
                            <PermIdentity className="userShowIcon" />
                            <span className="userShowInfoTitle">{user.fullname}</span>
                        </div>
                        <div className="userShowInfo">
                            <CalendarToday className="userShowIcon" />
                            <span className="userShowInfoTitle">{user.birthday}</span>
                        </div>
                        <span className="userShowTitle">Thông tin liên hệ</span>
                        <div className="userShowInfo">
                            <PhoneAndroid className="userShowIcon" />
                            <span className="userShowInfoTitle">{user.phone}</span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutline className="userShowIcon" />
                            <span className="userShowInfoTitle">{user.email}</span>
                        </div>
                        <div className="userShowInfo">
                            <LocationSearching className="userShowIcon" />
                            <span className="userShowInfoTitle">{user.address}</span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Chỉnh sửa thông tin</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Anna Becker"
                                    className="userUpdateInput"
                                    name="fullname"
                                    value={fullname}
                                    onChange={e => onInputChange(e)}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input
                                    type="text"
                                    placeholder="annabeck99@gmail.com"
                                    className="userUpdateInput"
                                    name="email"
                                    value={email}
                                    onChange={e => onInputChange(e)}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    placeholder="+84 123 456 67"
                                    className="userUpdateInput"
                                    name="phone"
                                    value={phone}
                                    onChange={e => onInputChange(e)}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Address</label>
                                <input
                                    type="text"
                                    placeholder="HCM | Việt Nam"
                                    className="userUpdateInput"
                                    name="address"
                                    value={address}
                                    onChange={e => onInputChange(e)}
                                />
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div direction="row" alignItems="center" spacing={2}>
                                <label htmlFor="icon-button-file">
                                    <p
                                        style={{
                                            marginLeft: 9,
                                            marginBottom: 8,
                                            marginTop: 10,
                                            fontWeight: "bold",
                                            fontSize: 20
                                        }}
                                    >
                                        Ảnh người dùng
                                    </p>
                                    <InputFile
                                        accept="image/*"
                                        multiple
                                        id="icon-button-file"
                                        type="file"
                                        onChange={setFile}
                                    />
                                    <IconButton
                                        color="primary"
                                        aria-label="upload picture"
                                        component="span"
                                    >
                                        <img
                                            class="fit-picture"
                                            src={
                                                FileImage.imagePreviewUrl
                                                    ? FileImage.imagePreviewUrl
                                                    : "https://static.thenounproject.com/png/187803-200.png"
                                            }
                                            width={200}
                                            height={200}
                                            alt="ảnh"
                                        />
                                    </IconButton>
                                </label>
                            </div>
                            <button
                                className="userUpdateButton"
                                onClick={e => onSubmit(e)}
                            >
                                Cập nhật thông tin
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditUser;