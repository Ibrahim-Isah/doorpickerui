import React, { useContext, useEffect, useState } from "react";
import GeneralHeader from "../../components/common/GeneralHeader";
import Breadcrumb from "../../components/common/Breadcrumb";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link, useHistory } from "react-router-dom";
import { BsListCheck, BsBookmark, BsPencil } from "react-icons/bs";
import {
  FaBook,
  FaMailBulk,
  FaMinus,
  FaMoneyBill,
  FaPlus,
  FaRegEdit,
  FaRegEnvelope,
  FaStar,
  FaTrash,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { GiPositionMarker } from "react-icons/gi";
import { FiPhone, FiEdit } from "react-icons/fi";
import {
  AiOutlineUser,
  AiOutlinePlusCircle,
  AiOutlinePoweroff,
  AiOutlineExclamationCircle,
} from "react-icons/ai";
import Button from "../../components/common/Button";
import Footer from "../../components/common/footer/Footer";
import ScrollTopBtn from "../../components/common/ScrollTopBtn";
import sectiondata from "../../store/store";
import { UserContext } from "../../context/UserProvider";
import { changeStatus, getPosts, userPosts } from "../../store/api/post";
import { DRAFT_SET, MY_POSTS_SET, USER_SET } from "../../context/actions";
import { getUsers, userChangePwd, userUpdate } from "../../store/api/user";
import { Alert, Table } from "react-bootstrap";

function Dashboard(props) {
  const [state, dispatch] = useContext(UserContext);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [did, setId] = useState(null);
  const [msg, setMsg] = useState(null);
  const history = useHistory();
  const isAdmin = state.user?.roles?.includes("ADMIN");
  //const { isAuth } = props.location?.state;
  useEffect(() => {
    async function myDrafts() {
      const r = isAdmin ? await getPosts() : await userPosts(state.user?.id);
      dispatch({ type: MY_POSTS_SET, data: r.data });
      const allUsers = await getUsers();
      setUsers(allUsers?.data || []);
    }
    state.user?.id && myDrafts();
    setUser(state.user);
  }, [state.user]);
  useEffect(() => {
    const body = document.querySelector("body");
    function showDeleteAcntModal(e) {
      body.classList.add("modal-open");
      body.style.paddingRight = "17px";
      e.preventDefault();
    }
    document.addEventListener(
      "click",
      function (e) {
        for (
          let target = e.target;
          target && target !== this;
          target = target.parentNode
        ) {
          if (
            target.matches(
              ".delete-account-info .delete-account, .card-item .card-content-wrap .delete-btn"
            )
          ) {
            showDeleteAcntModal.call(target, e);
            break;
          }
        }
      },
      false
    );
    function hideDeleteAcntModal(e) {
      body.classList.remove("modal-open");
      body.style.paddingRight = "0";
      e.preventDefault();
    }
    document.addEventListener(
      "click",
      function (e) {
        for (
          let target = e.target;
          target && target !== this;
          target = target.parentNode
        ) {
          if (
            target.matches(
              ".account-delete-modal .modal-bg, .account-delete-modal .modal-dialog .btn-box .theme-btn"
            )
          ) {
            hideDeleteAcntModal.call(target, e);
            break;
          }
        }
      },
      false
    );
  });
  const _change = (e) => {
    e.preventDefault();
    const { id, value } = e.taregt;
    const userClone = { ...user };
    userClone[id] = value;
    setUser(userClone);
  };
  const _changePwd = async () => {
    const obj = { id: state.user.id, password: user.password };
    const r = await userChangePwd(obj);
    dispatch({ type: USER_SET, data: r.data });
  };
  const _update = async () => {
    const obj = { ...user };
    obj.id = state.user.id;
    const r = await userUpdate(obj);
    dispatch({ type: USER_SET, data: r.data });
  };
  const _edit = async (obj) => {
    obj.status = "DRAFT";
    obj.ownerId = state.user.id;
    const r = await changeStatus(obj);
    dispatch({ type: DRAFT_SET, data: r.data });
    history.push("/add-listing/new", { draft: r.data });
  };
  const _favorite = async (id, status) => {
    const mg = `${status} completed succesfully!`;
    const r = await changeStatus({ id, status, ownerId: state.user.id });
    r?.data ? setMsg({ type: "success", mg }) : setMsg({ type: "danger", mg });
    dispatch({ type: DRAFT_SET, data: r.data });
  };
  const _logout = () => {
    dispatch({ type: USER_SET, data: null });
    history.push("/login");
  };

  return (
    <main className="dashboard-page">
      <GeneralHeader />
      <Breadcrumb
        CurrentPgTitle="Dashboard"
        MenuPgTitle="pages"
        img={sectiondata.dashboard.breadcrumbimg}
      />
      <section className="dashboard-area padding-top-40px padding-bottom-90px">
        <div className="container">
          <Tabs>
            <div className="row">
              <div className="col-lg-12">
                <div className="dashboard-nav d-flex justify-content-between align-items-center mb-4">
                  <TabList className="nav nav-tabs border-0" id="nav-tab">
                    <Tab>
                      <div className="nav-item nav-link theme-btn pt-0 pb-0 mr-1">
                        <span className="la">
                          <BsListCheck />
                        </span>
                        Pickets
                      </div>
                    </Tab>
                    <Tab>
                      <div className="nav-item nav-link theme-btn pt-0 pb-0 mr-1">
                        <span className="la">
                          <AiOutlineUser />
                        </span>
                        Profile
                      </div>
                    </Tab>
                    <Tab>
                      <div className="nav-item nav-link theme-btn pt-0 pb-0 mr-1">
                        <span className="la">
                          <BsBookmark />
                        </span>
                        Favorites
                      </div>
                    </Tab>
                    {isAdmin && (
                      <>
                        <Tab>
                          <div className="nav-item nav-link theme-btn pt-0 pb-0 mr-1">
                            <span className="la">
                              <FaUsers />
                            </span>
                            Users
                          </div>
                        </Tab>
                        <Tab>
                          <div className="nav-item nav-link theme-btn pt-0 pb-0 mr-1">
                            <span className="la">
                              <FaBook />
                            </span>
                            Pages
                          </div>
                        </Tab>
                        <Tab>
                          <div className="nav-item nav-link theme-btn pt-0 pb-0 mr-1">
                            <span className="la">
                              <FaMoneyBill />
                            </span>
                            Transactions
                          </div>
                        </Tab>
                      </>
                    )}
                  </TabList>
                  <div className="btn-box">
                    <Link to="/add-listing/new" className="theme-btn">
                      <span className="la">
                        <AiOutlinePlusCircle />
                      </span>
                      add picket
                    </Link>
                    <button
                      variant="link"
                      onClick={_logout}
                      className="theme-btn ml-1"
                    >
                      <span className="la">
                        <AiOutlinePoweroff />
                      </span>
                      sign out
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="tab-content" id="nav-tabContent">
                  {msg && (
                    <Alert
                      variant={msg.type}
                      onClose={() => setMsg(null)}
                      dismissible
                    >
                      {msg.mg}
                    </Alert>
                  )}
                  <TabPanel id="pickets">
                    <div className="row">
                      {state.myPosts.map((item, i) => {
                        return (
                          <div key={i} className="col-lg-4 column-td-6">
                            <div className="card-item">
                              <div className="card-image">
                                <img
                                  src={
                                    item?.img ||
                                    "https://via.placeholder.com/100x50"
                                  }
                                  className="card__img"
                                  alt="Card"
                                />
                              </div>
                              <div className="card-content-wrap">
                                <div className="card-content">
                                  <h4 className="card-title mt-0">
                                    {item.title}
                                  </h4>
                                  <p className="card-sub">{`${item.location}, ${item.city}`}</p>
                                </div>
                                <div className="rating-row">
                                  <div className="edit-info-box">
                                    <button
                                      onClick={() => _edit(item)}
                                      type="button"
                                      className="theme-btn button-success border-0 mr-1"
                                    >
                                      <span className="la">
                                        <FaRegEdit />
                                      </span>
                                      edit
                                    </button>
                                    {isAdmin && (
                                      <>
                                        {item?.status === "LIVE" && (
                                          <button
                                            onClick={() =>
                                              _favorite(item.id, "FAVORITE")
                                            }
                                            type="button"
                                            className="theme-btn button-success border-0 mr-1"
                                          >
                                            <span className="la">
                                              <FaStar />
                                            </span>
                                            Favorite
                                          </button>
                                        )}
                                      </>
                                    )}
                                    <button
                                      onClick={() => setId(item.id)}
                                      type="button"
                                      className="theme-btn button-danger delete-btn border-0"
                                      data-toggle="modal"
                                      data-target=".product-delete-modal"
                                    >
                                      <span className="la">
                                        <FaTrash />
                                      </span>
                                      delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="user-profile-action">
                          <div className="user-pro-img mb-4">
                            <img
                              src={
                                state.user?.photo ||
                                "https://via.placeholder.com/368x331"
                              }
                              alt="user"
                            />
                            <div className="dropdown edit-btn">
                              <button
                                className="theme-btn edit-btn dropdown-toggle border-0 after-none"
                                type="button"
                                id="editImageMenu"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                              >
                                <i className="la la-photo"></i> Edit
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="editImageMenu"
                              >
                                <div className="upload-btn-box">
                                  <form>
                                    <input
                                      type="file"
                                      name="files[]"
                                      id="filer_input"
                                      multiple="multiple"
                                    />
                                    <button
                                      className="theme-btn border-0 w-100 button-success"
                                      type="submit"
                                      value="submit"
                                    >
                                      Save changes
                                    </button>
                                  </form>
                                </div>
                                <div className="btn-box mt-3">
                                  <button className="theme-btn border-0 w-100">
                                    Remove Photo
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="user-details">
                            <h2 className="user__name widget-title pb-2">
                              {`${state.user?.firstname} ${state.user?.lastname} [${state.user?.username}]`}
                            </h2>
                            <div className="section-heading">
                              <p className="sec__desc font-size-15 line-height-24">
                                {state.user?.bio}
                              </p>
                            </div>
                            <ul className="list-items mt-3">
                              <li>
                                <span className="la d-inline-block">
                                  <GiPositionMarker />
                                </span>
                                {state.user?.address}
                              </li>
                              <li className="text-lowercase">
                                <span className="la d-inline-block">
                                  <FiPhone />
                                </span>
                                {state.user?.phone}
                              </li>
                              <li className="text-lowercase">
                                <span className="la d-inline-block">
                                  <FaMailBulk />
                                </span>
                                {state.user?.email}
                              </li>
                            </ul>
                            <div className="user-edit-form mt-4">
                              <div
                                className={
                                  isOpenForm ? "dropdown show" : "dropdown"
                                }
                              >
                                <button
                                  className="theme-btn edit-form-btn shadow-none w-100 dropdown-toggle after-none"
                                  type="button"
                                  onClick={() => setIsOpenForm(!isOpenForm)}
                                >
                                  <i className="la">
                                    <FiEdit />
                                  </i>
                                  Edit
                                </button>
                                <div
                                  className={
                                    isOpenForm
                                      ? "dropdown-menu show"
                                      : "dropdown-menu"
                                  }
                                >
                                  <div className="contact-form-action">
                                    <div className="input-box">
                                      <label className="label-text">
                                        FirstName
                                      </label>
                                      <div className="form-group">
                                        <span className="la form-icon">
                                          <AiOutlineUser />
                                        </span>
                                        <input
                                          className="form-control"
                                          type="text"
                                          name="firstname"
                                          id="firstname"
                                          value={user?.firstname}
                                          placeholder="Enter your firstname"
                                          onChange={_change}
                                        />
                                      </div>
                                    </div>
                                    <div className="input-box">
                                      <div className="form-group">
                                        <span className="la form-icon">
                                          <FaUser />
                                        </span>
                                        <input
                                          className="form-control"
                                          type="text"
                                          name="lastname"
                                          value={user?.lastname}
                                          id="lastname"
                                          placeholder="lastname"
                                          onChange={_change}
                                        />
                                      </div>
                                    </div>
                                    <div className="input-box">
                                      <div className="form-group">
                                        <span className="la form-icon">
                                          <FaUser />
                                        </span>
                                        <input
                                          className="form-control"
                                          type="text"
                                          name="username"
                                          id="username"
                                          value={user?.username}
                                          placeholder="username"
                                          onChange={_change}
                                        />
                                      </div>
                                    </div>
                                    <div className="input-box">
                                      <label className="label-text">
                                        Bio Data
                                      </label>
                                      <div className="form-group">
                                        <span className="la form-icon">
                                          <BsPencil />
                                        </span>
                                        <textarea
                                          className="message-control form-control"
                                          name="message"
                                          placeholder="Add a bio"
                                          value={user?.bio}
                                          id="bio"
                                          onChange={_change}
                                        ></textarea>
                                      </div>
                                    </div>
                                    <div className="input-box">
                                      <div className="form-group">
                                        <span className="la form-icon">
                                          <GiPositionMarker />
                                        </span>
                                        <input
                                          className="form-control"
                                          type="text"
                                          name="location"
                                          placeholder="Location"
                                          value={user?.address}
                                          id="address"
                                          onChange={_change}
                                        />
                                      </div>
                                    </div>
                                    <div className="input-box">
                                      <div className="form-group">
                                        <span className="la form-icon">
                                          <FiPhone />
                                        </span>
                                        <input
                                          className="form-control"
                                          type="text"
                                          name="number"
                                          placeholder="Number"
                                          value={user?.phone}
                                          id="phone"
                                          onChange={_change}
                                        />
                                      </div>
                                    </div>
                                    <div className="input-box">
                                      <div className="form-group">
                                        <span className="la form-icon">
                                          <FaRegEnvelope />
                                        </span>
                                        <input
                                          className="form-control"
                                          type="email"
                                          name="email"
                                          placeholder="Email Address"
                                          id="email"
                                          value={user?.email}
                                          onChange={_change}
                                        />
                                      </div>
                                    </div>

                                    <div className="btn-box">
                                      <button
                                        type="button"
                                        className="theme-btn border-0 button-success mr-1"
                                        onClick={_update}
                                      >
                                        save changes
                                      </button>
                                      <button
                                        type="button"
                                        className="theme-btn border-0"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-8">
                        <div className="user-form-action">
                          <div className="billing-form-item">
                            <div className="billing-title-wrap">
                              <h3 className="widget-title pb-0">
                                Change Password
                              </h3>
                              <div className="title-shape margin-top-10px"></div>
                            </div>
                            <div className="billing-content">
                              <div className="contact-form-action">
                                <form>
                                  <div className="input-box">
                                    <label className="label-text">
                                      Current Password
                                    </label>
                                    <div className="form-group">
                                      <span className="la form-icon">
                                        <BsPencil />
                                      </span>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="text"
                                        placeholder="Current Password"
                                      />
                                    </div>
                                  </div>
                                  <div className="input-box">
                                    <label className="label-text">
                                      New Password
                                    </label>
                                    <div className="form-group">
                                      <span className="la form-icon">
                                        <BsPencil />
                                      </span>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="text"
                                        placeholder="New Password"
                                      />
                                    </div>
                                  </div>
                                  <div className="input-box">
                                    <label className="label-text">
                                      Confirm New Password
                                    </label>
                                    <div className="form-group">
                                      <span className="la form-icon">
                                        <BsPencil />
                                      </span>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="text"
                                        placeholder="Confirm New Password"
                                      />
                                    </div>
                                  </div>
                                  <div className="btn-box">
                                    <button
                                      className="theme-btn button-success border-0"
                                      onClick={_changePwd}
                                    >
                                      update password
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="delete-account-info">
                          <div className="billing-form-item">
                            <div className="billing-title-wrap">
                              <h3 className="widget-title pb-0 color-text">
                                Delete Account
                              </h3>
                              <div className="title-shape margin-top-10px"></div>
                            </div>
                            <div className="delete-info-content p-4">
                              <p className="mb-3">
                                <span className="text-warning">Warning:</span>{" "}
                                Once you delete your account, there is no going
                                back. Please be certain.
                              </p>
                              <Button
                                text="delete my account"
                                url="#"
                                className="delete-account border-0"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="row">
                      {[].map((item, i) => {
                        return (
                          <div key={i} className="col-lg-4 column-td-6">
                            <div className="card-item">
                              <Link
                                to={item.cardLink}
                                className="card-image-wrap"
                              >
                                <div className="card-image">
                                  <img
                                    src={item.img}
                                    className="card__img"
                                    alt="Card"
                                  />
                                </div>
                              </Link>
                              <div className="card-content-wrap">
                                <div className="card-content">
                                  <Link to={item.cardLink}>
                                    <h4 className="card-title mt-0">
                                      {item.title}
                                    </h4>
                                    <p className="card-sub">{item.subtitle}</p>
                                    <p className="card-sub">
                                      {item.description}
                                    </p>
                                  </Link>
                                </div>
                                <div className="rating-row">
                                  <div className="edit-info-box">
                                    <button
                                      type="button"
                                      className="theme-btn delete-btn border-0"
                                      data-toggle="modal"
                                      data-target=".product-delete-modal"
                                    >
                                      <span className="la">
                                        {item.deleteIcon}
                                      </span>
                                      {item.sellingPrice}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="invoice-table table-responsive">
                          <p>
                            Users ({users.length}){" "}
                            <Link to="/add-admin">
                              <FaPlus />
                            </Link>
                          </p>

                          <Table className="table-bordered hover striped w-100">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Joined</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {users.map((u) => (
                                <tr key={u.id}>
                                  <td>
                                    {u.id}{" "}
                                    {u.roles?.includes("ADMIN") && <FaStar />}
                                  </td>
                                  <td>{u.firstname}</td>
                                  <td>{u.lastname}</td>
                                  <td>{u.username}</td>
                                  <td>{u.email}</td>
                                  <td>
                                    {new Date(u.createdOn).toDateString()}
                                  </td>
                                  <td>
                                    <span className="float-right">
                                      <FaMinus /> <FaRegEdit />{" "}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="tranx-table table-responsive">
                          <table className="table-bordered w-100">
                            <thead>
                              <tr>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>VAT</th>
                                <th>Total</th>
                              </tr>
                            </thead>
                            <tbody></tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="row">
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                          </tr>
                        </thead>
                        <tbody></tbody>
                      </Table>
                    </div>
                  </TabPanel>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </section>

      <Footer />

      <ScrollTopBtn />

      {/* Modal */}
      <div className="modal-form text-center">
        <div
          className="modal fade account-delete-modal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="mySmallModalLabel"
        >
          <div className="modal-bg"></div>
          <div className="modal-dialog modal-sm" role="document">
            <div className="modal-content p-4">
              <div className="modal-top border-0 mb-4 p-0">
                <div className="alert-content">
                  <span className="la warning-icon">
                    <AiOutlineExclamationCircle />
                  </span>
                  <h4 className="modal-title mt-2 mb-1">
                    This item will be deleted permanently!
                  </h4>
                  <p className="modal-sub">Are you sure to proceed.</p>
                </div>
              </div>
              <div className="btn-box">
                <button
                  type="button"
                  className="theme-btn border-0 button-success mr-1"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  onClick={() => _favorite(did, "DELETED")}
                  type="button"
                  className="theme-btn border-0 button-danger"
                >
                  delete!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
