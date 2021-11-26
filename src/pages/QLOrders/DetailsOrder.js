import React from 'react';
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PropTypes from 'prop-types';
import {
    Timeline,
    TimelineItem,
    TimelineContent,
    TimelineConnector,
    TimelineSeparator,
    TimelineDot
} from '@mui/lab';
import {
    Card,
    Table,
    Grid,
    Stack,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
    CardHeader,
    CardContent
} from '@mui/material';

const TIMELINES = [
    {
        title: 'Thứ Năm, ngày 25 tháng 11 năm 2021, 10:20 sáng',
        time: 'Đặt hàng # A5JG53',
        items: '2 mặt hàng - 286,82 US $ - đã đặt hàng',
        type: 'order1'
    },
    {
        title: 'Thứ sáu, ngày 14 tháng 5 năm 2021, 12:51 sáng',
        time: 'Đánh giá về áp phích "Đồng hồ trắng"',
        items: 'Hoặc để đổ lỗi cho họ. Và mọi ham muốn đều làm hài lòng cô ấy, vì đó không bao giờ là một niềm vui. từ chối và sự khác biệt kết quả. Họ trông giống như một lỗi!',
        type: 'order2'
    },
    {
        title: 'Thứ bảy, ngày 5 tháng 10 năm 2019, 11:57 CH',
        time: 'Đánh giá về áp phích "Ghế văn phòng"',
        items: 'Có những nỗi đau ngăn cản khoái cảm trở nên hư hỏng. Tất cả các cơn đau hoặc các triệu chứng xảy ra. Vui vẻ thích thú hơn là từ chối tất cả mọi người',
        type: 'order3'
    },
    {
        title: 'Thứ Ba, ngày 5 tháng 6 năm 2018, 10:41 CH',
        time: 'Đặt hàng # KQ0YOJ',
        items: '2 mặt hàng - 118,53 US $ - đã giao',
        type: 'order4'
    },
];

OrderItem.propTypes = {
    item: PropTypes.object,
    isLast: PropTypes.bool
};


function OrderItem({ item, isLast }) {
    const { type, title, time, items } = item;
    return (
        <TimelineItem>
            <TimelineSeparator>
                <TimelineDot
                    sx={{
                        bgcolor:
                            (type === 'order1' && 'primary.main') ||
                            (type === 'order2' && 'success.main') ||
                            (type === 'order3' && 'info.main') ||
                            (type === 'order4' && 'warning.main') ||
                            'error.main'
                    }}
                />
                {isLast ? null : <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
                <Typography variant="subtitle2" style={{ fontWeight: 'bold', fontSize: 17 }}>{title}</Typography>
                <Typography variant="caption" style={{ fontWeight: '400', fontSize: 14, color: 'blue' }} sx={{ color: 'text.secondary' }}>
                    {(time)}
                </Typography>
                <Typography variant="subtitle2" style={{ fontWeight: '400', fontSize: 14 }} sx={{ color: 'text.secondary' }}>
                    {(items)}
                </Typography>
            </TimelineContent>
        </TimelineItem>
    );
}

export default function DetailsOrder() {
    const [value, setValue] = React.useState(new Date().now);
    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Container maxWidth="xl">

                <Grid container spacing={2}>
                    <Grid item xs={20} sm={6} md={6}>
                        <Box >
                            <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: 20 }} gutterBottom>
                                Xác thực
                            </Typography>
                            <Box style={{ marginBottom: 20 }}>
                                <TextField
                                    required
                                    id="outlined-disabled"
                                    label="Họ tên"
                                    style={{ width: 300, marginRight: 30 }}
                                    defaultValue="Marcelino"
                                />
                                <TextField
                                    required
                                    id="outlined-disabled"
                                    label="Tên"
                                    style={{ width: 300 }}
                                    defaultValue="Jacobi"
                                />
                            </Box>
                            <TextField
                                sx={{ alignSelf: 'flex-end' }}
                                required
                                id="outlined-disabled"
                                label="Email"
                                style={{ width: 640, marginBottom: 20 }}
                                defaultValue="Calista_Batz@hotmail.com"
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Stack spacing={3}>
                                    <DesktopDatePicker
                                        label="Ngày sinh"
                                        inputFormat="MM/dd/yyyy"
                                        value={value}
                                        onChange={handleChange}
                                        renderInput={(params) => <TextField sx={{ width: 640, marginBottom: 4 }} {...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>

                            <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: 20 }} gutterBottom>
                                Địa chỉ
                            </Typography>
                            <TextField
                                sx={{ alignSelf: 'flex-end' }}
                                required
                                id="outlined-disabled"
                                label="Địa chỉ"
                                style={{ width: 640, marginBottom: 20 }}
                                defaultValue="13325 Kennedi Prairie"
                            />
                            <Box style={{ marginBottom: 20 }}>
                                <TextField
                                    required
                                    id="outlined-disabled"
                                    label="Quận Huyện"
                                    style={{ width: 200, marginRight: 14 }}
                                    defaultValue="South Winonabury"
                                />
                                <TextField
                                    required
                                    id="outlined-disabled"
                                    label="Thành Phố"
                                    style={{ width: 200, marginRight: 14 }}
                                    defaultValue="ME"
                                />
                                <TextField
                                    required
                                    id="outlined-disabled"
                                    label="Zipcode"
                                    style={{ width: 200, marginRight: 14 }}
                                    defaultValue="03293"
                                />
                            </Box>
                            <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: 20 }} gutterBottom>
                                Đổi mật khẩu
                            </Typography>
                            <Box style={{ marginBottom: 20 }}>
                                <TextField
                                    required
                                    id="outlined-disabled"
                                    label="Mật Khẩu"
                                    style={{ width: 300, marginRight: 30 }}
                                />
                                <TextField
                                    required
                                    id="outlined-disabled"
                                    label="Xác nhận mật khẩu"
                                    style={{ width: 300 }}
                                />
                            </Box>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                <Button variant="contained" color="success">
                                    Lưu
                                </Button>
                                <Button variant="outlined" color="error">
                                    Xóa
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={20} sm={6} md={3}>
                        <Box>
                            <Card
                                sx={{
                                    '& .MuiTimelineItem-missingOppositeContent:before': {
                                        display: 'none'
                                    }
                                }}
                            >
                                <CardHeader title="Dòng thời gian đặt hàng" />
                                <CardContent>
                                    <Timeline>
                                        {TIMELINES.map((item, index) => (
                                            <OrderItem key={item.title} item={item} isLast={index === TIMELINES.length - 1} />
                                        ))}
                                    </Timeline>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>

                    <Grid item xs={20} sm={6} md={3}>
                        <Box sx={{ width: '60%', height: 500, maxHeight: '100%', backgroundColor: "#fff", padding: 3, }}>
                            <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: 20 }} gutterBottom>
                                Lịch sử
                            </Typography>

                            <Box>
                                <Typography variant="h7" style={{ marginBottom: 20 }} gutterBottom>
                                    <AccessTimeIcon />  Lần đầu tiên
                                </Typography>
                                <Typography variant="h6" style={{ marginLeft: 20 }} gutterBottom>
                                    8/3/2021
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="h7" style={{ marginBottom: 20 }} gutterBottom>
                                    <AccessTimeIcon />  Lần cuối
                                </Typography>
                                <Typography variant="h6" style={{ marginLeft: 20 }} gutterBottom>
                                    14/10/2021
                                </Typography>
                            </Box>
                            <Typography variant="h6" style={{ marginBottom: 20 }} gutterBottom>
                                <AccessTimeIcon />  3 nhận xét
                            </Typography>
                            <Typography variant="h6" style={{ marginBottom: 20 }} gutterBottom>
                                <AccessTimeIcon />  3 đơn đặt hàng
                            </Typography>

                        </Box>
                    </Grid>



                </Grid>
            </Container>
        </Box>
    )
}
