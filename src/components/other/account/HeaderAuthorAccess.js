import React, { useContext, useState } from "react";
import { FiPlus, FiPlusCircle, FiBookmark, FiSearch } from "react-icons/fi";
import { BsListCheck, BsQuestion, BsGear, BsPower } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import Button from "../../common/Button";
import userimg from "../../../assets/images/team1.jpg";
import { UserContext } from "../../../context/UserProvider";
import { USER_SET } from "../../../context/actions";
import { Modal } from "react-bootstrap";
import PhotoUploader from "../../addlisting/PhotoUploader";

export default function HeaderAuthorAccess() {
  const [state, dispatch] = useContext(UserContext);
  const [AuthorAccessOpen, setAuthorAccessOpen] = useState(
    state.user?.id || false
  );
  const { user } = state;
  const d = new Date(user?.createdOn);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="logo-right-content">
        <ul className="author-access-list">
          {AuthorAccessOpen ? (
            <li>
              <Button onClick={() => dispatch({ type: USER_SET, data: {} })}>
                logout
              </Button>
            </li>
          ) : (
            <li>
              <Link to="/login">login</Link>
              <span className="or-text">or</span>
              <Link to="/sign-up">Sign up</Link>
            </li>
          )}

          <li>
            <Button text="add listing" url="/add-listing/new">
              <FiPlusCircle />
            </Button>
          </li>
        </ul>
        <div
          className="side-user-menu-open"
          onClick={() => setAuthorAccessOpen(!AuthorAccessOpen)}
        >
          <AiOutlineUser />
        </div>
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
            <img src={userimg} alt="User" />
            <h4 className="su__name">{user.firstname}</h4>
            <span className="su__meta">{`Joined ${
              d.getMonth() + 1
            }/${d.getFullYear()}`}</span>
              
             < div className="avatar-icon"> 
              <Link
                
                data-toggle="tooltip"
                data-placement="top"
                title="Change Avatar"
                variant="primary" 
                onClick={handleShow}
              >

                {" "}
                <FiPlus />
              </Link>
              <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title>Photo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <PhotoUploader/>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} size="sm" >
            Close
          </Button>
          </Modal.Footer>
          </Modal>
          </div> 
  
          {/* < div className="avatar-icon">
           <Button 
           variant="secondary" 
           onClick={handleShow}
           size="sm"
           >
             {" "}
           <FiPlus />
        </Button> 
          

          </div> */}



          </div>

          <ul className="side-menu-ul">
            <li>
              <Link to="/dashboard">
                <AiOutlineUser className="user-icon" /> My Profile
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
                <FiPlusCircle className="user-icon" /> add listing
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
              <Link to="#">
                <BsPower className="user-icon" /> Sign Out
              </Link>
            </li>
          </ul>
          <div className="side-user-search contact-form-action">
           
          </div>
        </div>
      </div>
    </>
  );
}
