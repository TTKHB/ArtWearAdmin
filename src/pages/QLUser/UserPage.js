import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../QLUser/QLUser.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
const UserPage = () => {
    const [users, setUser] = useState([]);
    const [filterUser, setfilterUser] = useState([]);
    const [search, setSearch] = useState('');

    const searchFilter = (event) => {
        if (event) {
            const newData = filterUser.filter((item) => {
                const itemData = item.fullname ? item.fullname.toString().toUpperCase() : ''.toString().toUpperCase();
                const textData = event.target.value.toString().toString().toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            console.log(newData)
            setUser(newData)
            setSearch(event.target.value)
        }
        else {
            setUser(filterUser)
            setSearch(event.target.value)
        }
    }

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:3000/api/v1/users/UserAll");
        setUser(result.data.reverse());
        setfilterUser(result.data.reverse());
    };

    const deleteUser = async id => {
        await axios.delete(`http://localhost:3000/api/v1/users/deleteUser/${id}`);
        loadUsers();
    };

    return (
        <div className="container">
            <div className="py-4">
                <TextField
                    required
                    id="outlined-required"
                    label="Tìm kiếm"
                    defaultValue={search}
                    onChange={(text) => searchFilter(text)}
                    // onChangeText={(text) => searchFilter(text)}
                    style={{paddingBottom:10}}
                />
                <table class="table border shadow">
                    <thead class="headerUser">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Họ tên</th>
                            <th scope="col">Email</th>
                            <th scope="col">Số điện thoại</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Ngày sinh</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {users.map((user, index) => (
                        <tbody>
                            {user.role == "user" ? (
                                <>
                                    <tr>
                                        <th scope="row">{index + 0}</th>
                                        <div className="abcd">
                                            <img className="imageUser"
                                                src={
                                                    user
                                                        ? user.avatar ||
                                                        "https://res.cloudinary.com/artwear/image/upload/v1632695686/imageUser/LogoUser_khxsbc.jpg"
                                                        : "https://res.cloudinary.com/artwear/image/upload/v1632695686/imageUser/LogoUser_khxsbc.jpg"
                                                }
                                            />
                                            <td>{user.fullname}</td>
                                        </div>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.address}</td>
                                        <td>{user.birthday}</td>
                                        <td>
                                            <Link
                                                class="btn btn-outline-primary mr-2"
                                                to={`/MainDrawer/EditUser/${user._id}`}
                                            >
                                                Chỉnh sửa
                                            </Link>
                                            <Button
                                                class="btn btn-danger"
                                                onClick={() => deleteUser(user._id)}
                                            >
                                                Xoá
                                            </Button>
                                        </td>
                                    </tr>
                                </>
                            ) : null}
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    );
};

export default UserPage;




