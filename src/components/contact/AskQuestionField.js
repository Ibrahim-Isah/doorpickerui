<<<<<<< HEAD
import React, { useContext } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { FaRegEnvelope } from 'react-icons/fa';
import { BsPencil } from 'react-icons/bs';
import { RiSendPlane2Line } from 'react-icons/ri';
import { Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../context/UserProvider';
import { contactUs } from '../../store/api/user';
import { ALERT_SHOW } from '../../context/actions';

function AskQuestionField({ title }) {
	const [state, dispatch] = useContext(UserContext);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			const user = await contactUs(data);
			if (user.error) {
				dispatch({
					type: ALERT_SHOW,
					data: {
						variant: 'danger',
						show: true,
						msg: 'Email failed to send!',
					},
				});
			}
			if (user.data) {
				const { data } = user;
				dispatch({
					type: ALERT_SHOW,
					data: {
						variant: 'success',
						show: true,
						msg: `${data.name}, Email sent successfully`,
					},
				});
				reset();
			}
		} catch (err) {
			console.log(err.message);
			dispatch({
				type: ALERT_SHOW,
				data: {
					variant: 'danger',
					show: true,
					msg: 'Email failed to send!',
				},
			});
		}
	};

	return (
		<>
			<div className='faq-forum'>
				<div className='billing-form-item'>
					{title ? (
						<div className='billing-title-wrap'>
							<h3 className='widget-title pb-0'>{title}</h3>
							<div className='title-shape margin-top-10px'></div>
						</div>
					) : (
						''
					)}
					<div className='billing-content'>
						<div className='contact-form-action'>
							<form method='post' onSubmit={handleSubmit(onSubmit)}>
								<Alert
									show={state.alert?.show}
									variant={state.alert?.variant}
									dismissible
									onClose={() =>
										dispatch({
											type: ALERT_SHOW,
											data: {
												show: false,
											},
										})
									}
								>
									{state.alert?.msg}
								</Alert>
								<div className='input-box'>
									<label className='label-text'>Your name</label>
									{errors.name && (
										<span role='alert' className='color-text'>
											{errors.name.message}
										</span>
									)}
									<div className='form-group'>
										<span className='form-icon'>
											<AiOutlineUser />
										</span>
										<input
											className='form-control'
											type='text'
											name='name'
											placeholder='Your name'
											{...register('name', { required: 'required!' })}
										/>
									</div>
								</div>
								<div className='input-box'>
									<label className='label-text'>Your email</label>
									{errors.email && (
										<span role='alert' className='color-text'>
											{errors.email.message}
										</span>
									)}
									<div className='form-group'>
										<span className='form-icon'>
											<FaRegEnvelope />
										</span>
										<input
											className='form-control'
											type='text'
											name='name'
											placeholder='Email address'
											{...register('email', {
												required: 'required!',
												pattern: {
													value: /\S+@\S+\.\S+/,
													message: 'Invalid !',
												},
											})}
										/>
									</div>
								</div>
								<div className='input-box'>
									<label className='label-text'>message</label>
									<div className='form-group'>
										<span className='form-icon'>
											<BsPencil />
										</span>
										<textarea
											className='message-control form-control'
											name='message'
											placeholder='Write message'
											{...register('message')}
										></textarea>
									</div>
								</div>
								<div className='btn-box'>
									<button type='submit' className='theme-btn border-0'>
										<i>
											<RiSendPlane2Line />
										</i>{' '}
										send message
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
=======
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { FaRegEnvelope } from "react-icons/fa";
import { BsPencil } from "react-icons/bs";
import { RiSendPlane2Line } from "react-icons/ri";
import { BASE_URL, PostSettings } from "../../utils/constant";

function AskQuestionField({ title }) {
  const _submit = (e) => {
    const obj = {
      name: "emi ",
      email: "demo@me.com",
      message: "do re mi fa so la ti do",
    };
    fetch(`${BASE_URL}contact/add`, PostSettings(obj))
      .then((d) => console.log(d))
      .catch((e) => console.error(e));
  };
  return (
    <>
      <div className="faq-forum">
        <div className="billing-form-item">
          {title ? (
            <div className="billing-title-wrap">
              <h3 className="widget-title pb-0">{title}</h3>
              <div className="title-shape margin-top-10px"></div>
            </div>
          ) : (
            ""
          )}
          <div className="billing-content">
            <div className="contact-form-action">
              <form method="post">
                <div className="input-box">
                  <label className="label-text">Your name</label>
                  <div className="form-group">
                    <span className="form-icon">
                      <AiOutlineUser />
                    </span>
                    <input
                      className="form-control"
                      type="text"
                      name="text"
                      placeholder="Your name"
                    />
                  </div>
                </div>
                <div className="input-box">
                  <label className="label-text">Your email</label>
                  <div className="form-group">
                    <span className="form-icon">
                      <FaRegEnvelope />
                    </span>
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      placeholder="Email address"
                    />
                  </div>
                </div>
                <div className="input-box">
                  <label className="label-text">message</label>
                  <div className="form-group">
                    <span className="form-icon">
                      <BsPencil />
                    </span>
                    <textarea
                      className="message-control form-control"
                      name="message"
                      placeholder="Write message"
                    ></textarea>
                  </div>
                </div>
                <div className="btn-box">
                  <button
                    type="button"
                    className="theme-btn border-0"
                    onClick={_submit}
                  >
                    <i>
                      <RiSendPlane2Line />
                    </i>{" "}
                    send message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
>>>>>>> 9f9a0d57e589c2b3d9912dfa95ab0972c2a8752c
}

export default AskQuestionField;
