import { useState } from "react";
import {
  Avatar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import Logout from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const AccountMenu = ({ onClickLogout, isAuth }) => {
  const userData = useSelector((state) => state.auth.data);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const avatar = userData ? (
    userData.fullName[0].toUpperCase()
  ) : (
    <AccountCircleIcon fontSize="medium" />
  );

  return (
    <>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar sx={{ width: 32, height: 32, bgcolor: "#757ce8" }}>
            {avatar}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            WebkitFilter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to={isAuth ? "/add-post" : "/register"}>
          <MenuItem style={{color: '#2f3243'}}>
            <ListItemIcon>
              {isAuth ? (
                <CreateIcon fontSize="small" color="primary" />
              ) : (
                <PersonAddOutlinedIcon fontSize="small" color="primary" />
              )}
            </ListItemIcon>
            {isAuth ? "Написать статью" : "Создать аккаунт"}
          </MenuItem>
        </Link>
        {isAuth ? (
          <MenuItem onClick={onClickLogout} style={{color: '#2f3243'}}>
            <ListItemIcon>
              <Logout fontSize="small" color="primary" />
            </ListItemIcon>
            Выйти
          </MenuItem>
        ) : (
          <Link to="/login">
            <MenuItem>
              <ListItemIcon>
                <LoginIcon fontSize="small" color="primary" />
              </ListItemIcon>
              Войти
            </MenuItem>
          </Link>
        )}
      </Menu>
    </>
  );
};
