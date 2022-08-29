import { ThemeContext } from "../contexts/ThemeContext";
import { useContext, useEffect, useState } from "react";
import "../styles/profilemobile.css";
import Image from "../images/pp2.jpg";
import { IconButton } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Usercontext } from "../contexts/Usercontext";
import { useNavigate, Link } from "react-router-dom";

const Profile = ({ close }) => {
    const { isLightTheme, light, dark } = useContext(ThemeContext);
    const theme = isLightTheme ? light : dark;
    const { logout, profile, fetchProfileDetails, profileDetails, setUser } =
        useContext(Usercontext);
    const [error, setError] = useState();

    const navigate = useNavigate();

    const handlelogout = async () => {
        try {
            await logout();
            navigate("/login");
            // console.log("you are logged out")
        } catch (e) {
            setError(e.message);
        }
    };

    useEffect(() => {
        // console.log("profile.jsx")
        fetchProfileDetails();
    }, [profile.uid]);

    return (
        <div
            className="mprofile-main"
            style={{ backgroundColor: theme.drop, color: theme.syntax }}
        >
            <IconButton
                onClick={() => close(false)}
                sx={{
                    backgroundColor: theme.bg,
                    color: theme.ui,
                    margin: "5px",
                }}
                size="medium"
            >
                <CloseOutlinedIcon
                    sx={{ color: theme.syntax }}
                    fontSize="medium"
                ></CloseOutlinedIcon>
            </IconButton>
            {!profileDetails && <span>loading...</span>}
            {profileDetails && (
                <div className="mmm">
                    <div className="mprofile-img">
                        <img width="80" src={Image} alt="efdffefdef" />
                    </div>
                    <Link
                        className="munderline link-fix"
                        to={"/aboutprofile/" + profileDetails.userId}
                    >
                        <h3 className="mprofile-name">
                            {profileDetails.username}
                        </h3>
                    </Link>
                    <div className="mprofile-email">{profileDetails.email}</div>
                    <div className="mfol">
                        <Link
                            className="link-fix"
                            onClick={() => close(false)}
                            to={"/following"}
                            state={{
                                following: profileDetails.following,
                                followers: profileDetails.followers,
                                returnPath: "/",
                            }}
                        >
                            <div>
                                <span className="mfolNum">
                                    {profileDetails.following.length}
                                </span>{" "}
                                following
                            </div>
                        </Link>
                        <Link
                            className="link-fix"
                            onClick={() => close(false)}
                            to={"/followers"}
                            state={{
                                followers: profileDetails.followers,
                                following: profileDetails.following,
                                returnPath: "/",
                            }}
                        >
                            <div>
                                <span className="mfolNum">
                                    {profileDetails.followers.length}
                                </span>{" "}
                                followers
                            </div>
                        </Link>
                    </div>
                </div>
            )}

            <button
                onClick={handlelogout}
                className="mlogout"
                style={{ backgroundColor: theme.bg, color: theme.syntax }}
            >
                logout
            </button>
        </div>
    );
};

export default Profile;
