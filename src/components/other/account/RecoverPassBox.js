import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaRegEnvelope, FaUserSecret } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { userToken, userChangePwd } from '../../../store/api/user';
import { ALERT_SHOW, USER_SET } from '../../../context/actions';
import { UserContext } from '../../../context/UserProvider';
import { Alert } from 'react-bootstrap';

function RecoverPassBox(props) {
	const history = useHistory();
	const [state, dispatch] = useContext(UserContext);

	const [token, setToken] = useState('');
	const [isDisabled, setIsDisabled] = useState(false);
	const [contact, setContact] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [noToken, setNoToken] = useState(true);

	const handleSendToken = async (e) => {
		e.preventDefault();

		setIsDisabled(true);
		try {
			let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
			let obj;

			if (regex.test(contact.trim())) {
				let emailObj = { email: `${contact}` };
				obj = emailObj;
			} else {
				let phoneObj = { phone: `${contact.trim()}` };
				obj = phoneObj;
			}

			const sentToken = await userToken(obj);
			if (sentToken.error) {
				dispatch({
					type: ALERT_SHOW,
					data: {
						variant: 'danger',
						show: true,
						msg: 'Token not sent. Make sure the number or email is correct',
					},
				});
				setIsDisabled(false);
				return;
			}
			setNoToken(false);
			setIsDisabled(false);
		} catch (err) {
			console.log('error', err.message);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsDisabled(true);

		if (password.trim() !== confirmPassword.trim()) {
			dispatch({
				type: ALERT_SHOW,
				data: {
					variant: 'warning',
					show: true,
					msg: 'Password does not match',
				},
			});
			setIsDisabled(false);
			return;
		}

		const obj = {
			confirmationToken: `${token}`,
			password: `${password.trim()}`,
		};

		const changePassword = await userChangePwd(obj);
		if (changePassword.error) {
			dispatch({
				type: ALERT_SHOW,
				data: {
					variant: 'danger',
					show: true,
					msg: 'Password reset failed. Make sure token is correct',
				},
			});
			setIsDisabled(false);
		}
		if (changePassword.data) {
			dispatch({
				type: ALERT_SHOW,
				data: {
					variant: 'success',
					show: true,
					msg: 'Password reset successfully',
				},
			});

			const userStore = { ...changePassword?.data, auth: true };
			dispatch({ type: USER_SET, data: userStore });
			history.push('/dashboard');

			setPassword('');
			setConfirmPassword('');
			setContact('');
			setToken('');
			setIsDisabled(false);
		}
	};

	return (
		<>
			<section className='form-shared padding-top-40px padding-bottom-100px'>
				<div className='container'>
					<div className='row'>
						<div className='col-lg-6 mx-auto'>
							<div className='billing-form-item mb-0'>
								<div className='billing-title-wrap'>
									<h3 className='widget-title font-size-28'>
										Recover Password!
									</h3>
									<p className='font-size-16 font-weight-medium'>
										Enter your email or phone number to reset password. A reset
										code will be sent to you. If you have any issue about reset
										password
										<Link to='/contact' className='color-text'>
											contact us
										</Link>
									</p>
								</div>
								<div className='billing-content'>
									<div className='contact-form-action'>
										<form>
											{/* The noToken state will check for whether the user has send a request for a token and receive it or not */}
											{noToken ? (
												<>
													<Alert
														variant={state.alert?.variant}
														show={state.alert?.show}
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
														<label className='label-text'>
															Your Email or Phone Number(for example 0807136662)
														</label>
														<div className='form-group'>
															<span className='la form-icon'>
																<FaRegEnvelope />
															</span>
															<input
																className='form-control'
																type='text'
																name='text'
																placeholder='Enter email address or phone number'
																value={contact}
																onChange={({ target }) =>
																	setContact(target.value)
																}
															/>
														</div>
													</div>
													<div className='btn-box margin-top-20px margin-bottom-20px'>
														<button
															className='theme-btn border-0'
															type='button'
															onClick={handleSendToken}
															disabled={isDisabled}
														>
															Send Token
														</button>
													</div>
												</>
											) : (
												<>
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
														<label className='label-text'>
															Token (Sent to your email or phone)
														</label>
														<div className='form-group'>
															<span className='la form-icon'>
																<FaRegEnvelope />
															</span>
															<input
																className='form-control'
																type='text'
																name='text'
																placeholder='Token (Sent to your email or phone)'
																value={token}
																onChange={({ target }) =>
																	setToken(target.value)
																}
															/>
														</div>
													</div>
													<div className='input-box'>
														<label className='label-text'>Password</label>
														<div className='form-group'>
															<span className='la form-icon'>
																<FaUserSecret />
															</span>
															<input
																className='form-control'
																type='password'
																name='password'
																placeholder='New password'
																value={password}
																onChange={({ target }) =>
																	setPassword(target.value)
																}
															/>
														</div>
													</div>
													<div className='input-box'>
														<label className='label-text'>
															Confirm Password
														</label>
														<div className='form-group'>
															<span className='la form-icon'>
																<FaUserSecret />
															</span>
															<input
																className='form-control'
																type='password'
																name='password'
																placeholder='Confirm new password'
																value={confirmPassword}
																onChange={({ target }) =>
																	setConfirmPassword(target.value)
																}
															/>
														</div>
													</div>

													<div className='btn-box margin-top-20px margin-bottom-20px'>
														<button
															className='theme-btn border-0'
															type='submit'
															onClick={handleSubmit}
															disabled={isDisabled}
														>
															reset password
														</button>
													</div>
												</>
											)}
											<p className='font-weight-medium'>
												<Link to='/login' className='color-text'>
													Login{' '}
												</Link>
												or{' '}
												<Link to='/sign-up' className='color-text'>
													Register
												</Link>
											</p>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default RecoverPassBox;
