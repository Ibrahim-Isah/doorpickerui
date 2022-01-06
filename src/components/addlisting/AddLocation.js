import React, { useContext, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { FiMap } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';
import { UserContext } from '../../context/UserProvider';
import { addLocation } from '../../store/api/post';
import * as ngcities from '../../utils/ng-cities.json';
const cities = ngcities.ngcities.map((c) => {
	return {
		label: c.city,
		value: c.city.toLowerCase(),
	};
});

const AddLocation = (props) => {
	const [state, dispatch] = useContext(UserContext);
	const [selectedCity, setCity] = useState(null);
	// const [selectedState, setState] = useState(null);
	// const [locale, setLocation] = useState(null);
	const [al, setAlert] = useState({ show: false });
	const [addr, setAddr] = useState('');
	const [title] = useState('Add Location');
	const history = useHistory();
	// useEffect(() => {
	//   findLoc().then((d) => setLocation(d?.data));
	// }, []);

	const handleChangeCity = (s) => {
		setCity(s);
	};
	// const handleChangeState = (v) => {
	//   setState(v);
	// };
	const _done = async () => {
		if (!state.user?.id || !state.draft?.id) {
			setAlert({
				show: true,
				msg: 'Login is required',
				variant: 'danger',
				isLogin: true,
			});
			return;
		}
		//data.location = locale;
		const data = {
			id: state.draft.id,
			ownerId: state.user.id,
			city: selectedCity?.value,
			location: addr,
			status: 'DRAFT',
		};

		const r = await addLocation(data);
		console.log(r);
		props.next();
	};
	return (
		<>
			<div className='billing-form-item'>
				<div className='billing-title-wrap'>
					<h3 className='widget-title pb-0'>{title}</h3>
					<Alert
						variant={al?.variant}
						show={al?.show}
						onClose={() => setAlert({ show: false, msg: '' })}
						dismissible
					>
						{al?.msg}
						{al.isLogin && (
							<Button
								variant='link'
								style={{ marginLeft: '4px', textDecoration: 'none' }}
								onClick={() =>
									history.push('/login', {
										from: '/add-listing/new',
									})
								}
							>
								Go to login
							</Button>
						)}
					</Alert>
					<div className='title-shape margin-top-10px'></div>
				</div>
				<div className='billing-content'>
					<div className='contact-form-action'>
						<form method='post'>
							<div className='row'>
								<div className='col-lg-12'>
									<div className='input-box'>
										<label className='label-text'>Address</label>
										<div className='form-group'>
											<span className='la form-icon'>
												<FiMap />
											</span>
											<input
												className='form-control'
												type='text'
												name='name'
												placeholder='Item address'
												value={addr}
												onChange={(e) => setAddr(e.target.value)}
											/>
										</div>
									</div>
								</div>
								<div className='col-lg-12'>
									<div className='input-box'>
										<label className='label-text'>City</label>
										<div className='form-group'>
											<Select
												value={selectedCity}
												onChange={handleChangeCity}
												placeholder='Select a City'
												options={cities}
											/>
										</div>
									</div>
								</div>
								<div className='col-lg-6'>
									<div className='input-box'>
										{/* <label className="label-text">State</label>
                    <div className="form-group">
                      <Select
                        value={selectedState}
                        onChange={handleChangeState}
                        placeholder="Select a State"
                        options={states}
                      />
                    </div> */}
									</div>
								</div>

								{/* <div className="col-lg-6">
                    <label className="label-text">Country</label>
                    <div className="form-group">
                      <SelectCountry />
                    </div>
                  </div> */}
							</div>
							<Button onClick={_done}>Done</Button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddLocation;
