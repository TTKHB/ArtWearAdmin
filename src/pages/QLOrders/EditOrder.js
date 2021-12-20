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
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { height } from "@mui/system";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
const EditOrder = () => {
    let history = useHistory();
    const { id } = useParams();
    console.log("id order ne", id)

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const [order, setOrder] = useState({
        fullname: "",
        phone: "",
        city: "",
        status: ""
    });

    const [itemOrder, setitemOrder] = useState([])

    const { fullname, phone, city, status } = order;

    useEffect(() => {
        loadOrder();
    }, []);

    const loadOrder = async () => {
        const result = await axios.get(`http://localhost:3000/api/v1/orders/${id}`);
        setOrder(result.data);
        setitemOrder(result.data.orderitems)
    };


    const [value, setValue] = useState(1);

    const onSubmit = async e => {
        e.preventDefault()
        fetch(`http://localhost:3000/api/v1/orders/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: age
            })
        }).then(res => res.json())
            .then(data => {
                console.log(`${data}is Update successffly!!`)
                history.push("/MainDrawer/qlorders/PageOrder");
            }).catch(err => {
                console.log("error", err)
            })
    }

    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Chi tiết đơn hàng</h1>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img
                            src="https://res.cloudinary.com/artwear/image/upload/v1632695686/imageUser/LogoUser_khxsbc.jpg"
                            alt=""
                            className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{order.fullname}</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Thông tin tài khoản</span>
                        <div className="userShowInfo">
                            <PermIdentity className="userShowIcon" />
                            <span className="userShowInfoTitle">{order.fullname}</span>
                        </div>
                        <div className="userShowInfo">
                            <CalendarToday className="userShowIcon" />
                            <span className="userShowInfoTitle">{order.country}</span>
                        </div>
                        <span className="userShowTitle">Thông tin liên hệ</span>
                        <div className="userShowInfo">
                            <PhoneAndroid className="userShowIcon" />
                            <span className="userShowInfoTitle">{order.phone}</span>
                        </div>
                        <div className="userShowInfo">
                            <LocationSearching className="userShowIcon" />
                            <span className="userShowInfoTitle">{order.city}</span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Thông tin vận chuyển</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Tên khách hàng</label>
                                <input
                                    type="text"
                                    placeholder="Anna Becker"
                                    className="userUpdateInput"
                                    name="fullname"
                                    value={fullname}
                                // onChange={e => onInputChange(e)}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Số điện thoại</label>
                                <input
                                    type="text"
                                    placeholder="+84 123 456 67"
                                    className="userUpdateInput"
                                    name="phone"
                                    value={phone}
                                // onChange={e => onInputChange(e)}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Address</label>
                                <input
                                    type="text"
                                    placeholder="HCM | Việt Nam"
                                    className="userUpdateInput"
                                    name="address"
                                    value={city}
                                />
                            </div>
                            <div className="userUpdateItem">
                                {/* <label>Trạng thái giao hàng</label> */}
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Trạng thái giao hàng</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={age}
                                        label="Age"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={1}>Xử lý hàng</MenuItem>
                                        <MenuItem value={2}>Chờ thanh toán</MenuItem>
                                        <MenuItem value={3}>Đang vận chuyển</MenuItem>
                                        <MenuItem value={4}>Đã giao</MenuItem>
                                        <MenuItem value={5}>Huỷ đơn</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            {itemOrder.map((item, index) => (
                                <div className="userUpdateUpload">
                                    <img
                                        className="userUpdateImg"
                                        src={order.imageSp}
                                        alt=""
                                    />
                                    <div style={{ fontWeight: 'bold', fontSize: 18 }}>
                                        <td>{item.product ? item.product.ten : ''}</td>
                                    </div>

                                    <div style={{ fontWeight: 'bold', fontSize: 18 }}>
                                        <td>{item.product ? item.product.gia.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&.') : ''} VNĐ</td>
                                    </div>

                                </div>
                            ))}
                            <button className="userUpdateButton" onClick={e => onSubmit(e)}>Cập nhật đơn hàng</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditOrder;