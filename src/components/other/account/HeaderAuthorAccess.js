import React, { useContext, useState } from "react";
import { FiPlus, FiPlusCircle, FiBookmark } from "react-icons/fi";
import { BsListCheck, BsQuestion, BsGear, BsPower } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import Button from "../../common/Button";
import userimg from "../../../assets/images/team1.jpg";
import { UserContext } from "../../../context/UserProvider";
import { USER_SET } from "../../../context/actions";
import Uploader from "../../filemgr/Uploader";
import { doPhoto } from "../../../store/api/user";

export default function HeaderAuthorAccess() {
  const [state, dispatch] = useContext(UserContext);
  const history = useHistory();
  const [AuthorAccessOpen, setAuthorAccessOpen] = useState(
    state.user?.id || false
  );
  const { user } = state;
  const d = new Date(user?.createdOn);
  const [show, setShow] = useState(false);
  const [dp, setDp] = useState(user?.photo || userimg);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const _addPhoto = async (image) => {
    if (user?.id && image?.location) {
      setDp(image?.location);
      const r = await doPhoto({
        id: user.id,
        phone: user.phone,
        photo: image?.location,
      });
      dispatch({ type: USER_SET, data: r.data });
    }
  };
  // const _logout = () => {
  //   console.log("loggin out ");
  //   setShow(false);
  //   setAuthorAccessOpen(!AuthorAccessOpen);
  //   //dispatch({ type: USER_SET, data: null });
  //   history.push("/login");
  // };

  return (
    <>
      <div className="logo-right-content">
        <ul className="author-access-list">
          {AuthorAccessOpen ? (
            <li>
              <Link onClick={() => setAuthorAccessOpen(!AuthorAccessOpen)}>
                logout
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/login">login</Link>
              <span className="or-text">or</span>
              <Link to="/sign-up">Sign up</Link>
            </li>
          )}

          <li>
            <Button text="add picket" url="/add-listing/new">
              <FiPlusCircle />
            </Button>
          </li>
        </ul>
        {AuthorAccessOpen && (
          <div
            className="side-user-menu-open"
            onClick={() => setAuthorAccessOpen(!AuthorAccessOpen)}
          >
            <AiOutlineUser />
          </div>
        )}
      </div>

      {/* Side User panel */}
      <div
        className={
          AuthorAccessOpen ? "side-user-panel active" : "side-user-panel"
        }
      >
        <div className="humburger-menu">
          <div
            className="humburger-menu-lines side-menu-close"
            onClick={() => setAuthorAccessOpen(!AuthorAccessOpen)}
          ></div>
        </div>
        <div className="side-menu-wrap side-user-menu-wrap">
          <div className="side-user-img">
            <img src={dp || userimg} alt="User" />
            <h4 className="su__name">{user.firstname}</h4>
            <span className="su__meta">{`Joined ${
              d.getMonth() + 1
            }/${d.getFullYear()}`}</span>
            {show ? (
              <Uploader
                title="Change Photo"
                cancel={() => setShow(false)}
                done={_addPhoto}
              />
            ) : (
              <div className="avatar-icon">
                <span
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Change Avatar"
                  variant="primary"
                  onClick={() => setShow(true)}
                >
                  <FiPlus />
                </span>
              </div>
            )}
          </div>
          <ul className="side-menu-ul">
            <li>
              <Link to="/dashboard">
                <AiOutlineUser className="user-icon" /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <BsListCheck className="user-icon" /> My Listings
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <FiBookmark className="user-icon" /> My Bookmarks
              </Link>
            </li>
            <li>
              <Link to="/dashboard">
                <FiPlusCircle className="user-icon" /> add picket
              </Link>
            </li>
            <li>
              <div className="dropdown-divider"></div>
            </li>
            <li>
              <Link to="#">
                <BsQuestion className="user-icon" /> help
              </Link>
            </li>
            <li>
              <Link to="#">
                <BsGear className="user-icon" /> Settings
              </Link>
            </li>
            <li>
              <Link
                to="#"
                onClick={() => setAuthorAccessOpen(!AuthorAccessOpen)}
              >
                <BsPower className="user-icon" /> Sign Out
              </Link>
            </li>
          </ul>
          <div className="side-user-search contact-form-action"></div>
        </div>
      </div>
    </>
  );
}
