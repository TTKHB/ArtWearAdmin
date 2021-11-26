import React from "react";
import { Input } from "@mui/material";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import useCategories from "../../hooks/useCategories";
import NumberFormatCustom from "../../components/Format/NumberFormatCustom";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import MenuItem from "@mui/material/MenuItem";
import ALertMui from "../../components/Alert/ALertMui";
import Snackbar from "@mui/material/Snackbar";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CustomInput from "./CustomInput";
import DateTimePicker from '@mui/lab/DateTimePicker';
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 10,
  borderWidth: 10,
  borderColor: "gray",
  backgroundColor: "#E0FFFF",
  justifyContent: 'center',
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '24ch',
      },
      marginTop: 7
    },
  },
}));

const columns = [
  { field: 'col1', headerName: 'Tên thông báo', width: 200, editable: true },
  { field: 'col2', headerName: 'Ngày tạo', type: 'date', width: 300, editable: true },
  { field: 'col3', headerName: 'Được tạo bởi', width: 300, editable: true },
  { field: 'col4', headerName: 'Ngày gửi', type: 'date', width: 300, editable: true },
];

const rows = [
  { id: 1, col1: 'Thông báo 1', col2: '4/2/2020, 5:32:20 PM', col3: 'Lý Cao Thắng', col4: '4/2/2020' },
  { id: 2, col1: 'Thông báo 2', col2: '4/2/2020, 5:32:20 PM', col3: 'Lý Cao Thắng', col4: '4/2/2020' },
  { id: 3, col1: 'Thông báo 3', col2: '4/2/2020, 5:32:20 PM', col3: 'Lý Cao Thắng', col4: '4/2/2020' },
  { id: 4, col1: 'Thông báo 4', col2: '4/2/2020, 5:32:20 PM', col3: 'Lý Cao Thắng', col4: '4/2/2020' },
  { id: 5, col1: 'Thông báo 5', col2: '4/2/2020, 5:32:20 PM', col3: 'Lý Cao Thắng', col4: '4/2/2020' },
  { id: 6, col1: 'Thông báo 6', col2: '4/2/2020, 5:32:20 PM', col3: 'Lý Cao Thắng', col4: '4/2/2020' },
  { id: 7, col1: 'Thông báo 7', col2: '4/2/2020, 5:32:20 PM', col3: 'Lý Cao Thắng', col4: '4/2/2020' },
  { id: 8, col1: 'Thông báo 8', col2: '4/2/2020, 5:32:20 PM', col3: 'Lý Cao Thắng', col4: '4/2/2020' },
  { id: 9, col1: 'Thông báo 9', col2: '4/2/2020, 5:32:20 PM', col3: 'Lý Cao Thắng', col4: '4/2/2020' },
];

const Users = [
  { key: "abc@gmail.com", value: "User" },
  { key: "admin@gmail.com", value: "Admin" },
];



const InsertNotificationPage = () => {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [openDate, setOpenDate] = React.useState(false);
  const [valueDate, setValueDate] = React.useState(new Date().now);
  const [user, setUser] = React.useState("");
  const [userAutoComple, setUserAutoComple] = React.useState([]);

  let users = [];
  userAutoComple.forEach((user) => {
    users.push(user.key);
  });

  const handleChangeDate = (newValue) => {
    setValueDate(newValue);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenDate = () => {
    setOpenDate(true);
  };
  const handleCloseDate = () => {
    setOpenDate(false);
  };


  return (
    <Container>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          ARTWEAR
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/"
        >
          Quản lý thông báo
        </Link>
        <Typography color="text.primary">Thông báo</Typography>
      </Breadcrumbs>

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1 },
          flexGrow: 1
        }}
        style={{
          alignItems: "center",
          backgroundColor: "white",
          padding: 10,
          marginTop: 10,
        }}
      >
        <Typography
          style={{ textAlign: "start", fontWeight: "bold" }}
          variant="h5"
          component="div"
          gutterBottom
        >
          Thông báo
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: 1,
            m: 1,
            bgcolor: 'background.paper',
          }}
        >
          {/* <div>
            <TextField
              style={{ marginTop: 30 }}
              required
              // id="input-with-icon-textfield"
              id="outlined-required"
              placeholder="Tìm kiếm"
              // variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </div> */}

          <Search style={{marginTop: 20}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Tìm thông báo"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

          <Box
            sx={{
              p: 1,
              m: 1,
              bgcolor: 'background.paper',
            }}
          >
            <Button variant="outlined" startIcon={<FilterListIcon />}>
              Thêm bộ lọc
            </Button>

            <Button variant="contained" disableElevation style={{ marginLeft: 12 }} onClick={handleClickOpen}>
              Soạn mới
            </Button>
            <BootstrapDialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
              maxWidth="lg"
              maxHeight="lg"
              fullWidth
            >
              <BootstrapDialogTitle id="customized-dialog-title" padding="10" onClose={handleClose}>
                Gửi thông báo mới  <InfoIcon color="primary" />
              </BootstrapDialogTitle>
              <DialogContent dividers>
                <div style={{
                  display: 'flex',
                  // marginRight: 40,
                  justifyContent: 'left',
                }}>
                  <Typography color="primary" gutterBottom style={{ fontWeight: 'bold', fontSize: 18, backgroundColor: '#FFF', marginRight: 60 }} >
                    Tên thông báo
                  </Typography>
                  <CustomInput aria-label="Demo input" placeholder="Nhãn mô tả (không có trong thông báo)" />
                </div>
                <div style={{
                  display: 'flex',
                  // marginRight: 40,
                  justifyContent: 'space-between'
                }}>
                  <Typography color="primary" gutterBottom style={{ fontWeight: 'bold', fontSize: 18, marginRight: -280 }} >
                    Tiêu chí mục tiêu
                  </Typography>
                  {/* <CustomInput aria-label="Demo input" placeholder="Chỉ định người dùng nào sẽ nhận được thông báo này" /> */}
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    style={{ width: 420, marginRight: -40 }}
                    options={Users}
                    getOptionLabel={(option) => option.key}
                    defaultValue={userAutoComple}
                    onChange={(e, data) => {
                      setUserAutoComple(data);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required={userAutoComple.length > 0 ? false : true}
                        label="Chỉ định người dùng nào sẽ nhận được thông báo này"
                      />
                    )}
                  />
                  <Typography gutterBottom style={{ fontWeight: 'bold', fontSize: 18 }} >
                    Sẽ được gửi đến 355 người dùng
                  </Typography>
                </div>
                <div style={{
                  display: 'flex',
                  // marginRight: 40,
                  justifyContent: 'space-between',
                  marginBottom: 20
                }}>
                  <Typography color="primary" gutterBottom style={{ fontWeight: 'bold', fontSize: 18, marginRight: -330 }} >
                    Tiêu đề
                  </Typography>
                  <CustomInput aria-label="Demo input" placeholder="Tiêu đề thông báo (chỉ IOS - tùy chọn)" />
                  <Typography gutterBottom style={{ fontWeight: 'bold', fontSize: 18 }} >
                    Còn lại 35 ký tự
                  </Typography>
                </div>
                <TextField
                  id="outlined-multiline-static"
                  label="Viết nội dung thông báo của bạn"
                  multiline
                  rows={5}
                  marginTop={20}
                  required
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Typography gutterBottom style={{ fontWeight: 'bold', fontSize: 18, padding: 10 }} >
                  Còn lại 250 ký tự
                </Typography>
                <Button variant="outlined" onClick={handleClose}>
                  Lưu bản nháp
                </Button>
                <Button variant="contained" onClick={handleClose}>
                  Gửi ngay bây giờ
                </Button>
                <Button variant="contained" onClick={handleClickOpenDate}>
                  <AccessTimeIcon />
                </Button>
                <BootstrapDialog
                  onClose={handleCloseDate}
                  aria-labelledby="customized-dialog-title"
                  open={openDate}
                  maxWidth="xs"
                  maxHeight="xs"
                  fullWidth
                >
                  <BootstrapDialogTitle id="customized-dialog-title" padding="10" fontWeight="bold" fontSize="14" onClose={handleCloseDate}>
                    Gửi lên lịch thông báo
                  </BootstrapDialogTitle>
                  <DialogContent dividers>
                    <Typography gutterBottom style={{ marginBottom: 20 }} >
                      Chọn ngày và giờ để gửi thông báo này.
                      Sẽ có thể chỉnh sửa hoặc hủy thông báo của bạn cho đến khi thông báo gửi đi.
                    </Typography>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Stack spacing={3}>
                        <DateTimePicker
                          label="Ngày và giờ"
                          value={valueDate}
                          onChange={handleChangeDate}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </Stack>
                    </LocalizationProvider>

                  </DialogContent>
                  <DialogActions style={{ justifyContent: "space-around", alignContent: "center" }}>
                    <Button fullWidth autoFocus onClick={handleCloseDate}>
                      Hủy
                    </Button>
                    <Button variant="contained" fullWidth autoFocus onClick={handleCloseDate}>
                      Lên lịch trình
                    </Button>
                  </DialogActions>
                </BootstrapDialog>
              </DialogActions>
            </BootstrapDialog>

          </Box>
        </Box>
      </Box>

      <Box sx={{ width: '100%', height: 500, maxHeight: '100%', backgroundColor: "#fff" }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', fontWeight: 'bold' }}>
          <Tabs
            // textColor="inherit"
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            value={value} onChange={handleChange}
            aria-label="full width tabs example"
          >
            <Tab label="Gửi" style={{ fontWeight: 'bold', fontSize: 14 }} {...a11yProps(0)} />
            <Tab label="Bản nháp" style={{ fontWeight: 'bold', fontSize: 14 }} {...a11yProps(1)} />
            <Tab label="Lên kế hoạch" style={{ fontWeight: 'bold', fontSize: 14 }} {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel style={{ textAlign: 'center' }} value={value} index={0}>
          <img
            backgroundColor={"#fff"}
            src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM9bF2mdpsUoV-0GMIvFkRWx4hps9pidXagA&usqp=CAU"}
            width="250"
            loading="lazy"
          />
          <Typography sx={{ fontWeight: 'bold', fontSize: 18, }} color="text.primary">Không có thông báo nào được gửi</Typography>
        </TabPanel>
        <TabPanel style={{ textAlign: 'center' }} value={value} index={1}>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              onCellDoubleClick={(params, event) => {
                if (!event.ctrlKey) {
                  event.defaultMuiPrevented = true;
                }
              }}
              {...rows}
            />
          </div>
        </TabPanel>
        <TabPanel style={{ textAlign: 'center' }} value={value} index={2}>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
            // pageSize={5}
            // rowsPerPageOptions={[5]}
            // onCellDoubleClick={(params, event) => {
            //   if (!event.ctrlKey) {
            //     event.defaultMuiPrevented = true;
            //   }
            // }}
            // {...rows}
            />
          </div>
        </TabPanel>
      </Box>
    </Container >
  );
};


export default InsertNotificationPage;
