import {LOGO_IMG, USER_IMG} from "../utils/constants.js";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";
import MenuItem from "@mui/material/MenuItem";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {auth} from "../utils/firebase.js";
import {addUser, removeUser} from "../utils/userSlice.js";


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleSignOut = () => {
        signOut(auth).then(() => {
            // navigate("/")
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const {uid, email, displayName, photoURL} = user;
                dispatch(
                    addUser({
                        uid: uid,
                        email: email,
                        displayName: displayName,
                        photoURL: photoURL
                    })
                );
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        });

    }, [])

    return (
        <header className="p-3 bg-gradient-to-b from-black">
            <img className="w-40" src={LOGO_IMG}/>
            {console.log(user)}

            {user &&
            <div className='absolute top-0 right-0 flex w-fit '>

                <Button
                    id="fade-button"
                    aria-controls={open ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <img className='h-8 w-8' src={user.photoURL}/>
                </Button>

                <Menu
                    id="fade-menu"
                    MenuListProps={{
                        'aria-labelledby': 'fade-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={() => {
                        handleClose();
                        handleSignOut();
                    }}>Sign Out</MenuItem>
                </Menu>

            </div>
            }

        </header>
    )
}

export default Header
