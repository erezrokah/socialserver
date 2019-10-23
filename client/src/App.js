import React from 'react'
import {PrescriptionProvider} from './contexts/PrescriptionContext'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

//Providers
import {UserProvider} from './contexts/UserContext'
import {ThemeProvider} from './contexts/ThemeContext'
import {AuthProvider} from './contexts/AuthContext'

//Home Pages
import SignInPage from './components/Pages/SignInPage/SignInPage'
import SignUpPage from './components/Pages/SignupPage/SignupPage'
import SignUpProfilePage from './components/Pages/SignUpProfilePage/SignUpProfilePage'

//Patient Components
import {PatientLayoutRoute} from './components/Pages/Patients/PatientLayout'
import DetailedPrescriptionPage from './components/Pages/Patients/DetailedPrescriptionPage/DetailedPrescriptionPage'
import DashboardPage from './components/Pages/Patients/DashboardPage/DashboardPage'
import AppointmentPage from './components/Pages/Patients/AppointmentPage/AppointmentPage'
import Appointment from './components/Pages/Patients/Appointment/Appointment'
import PharmacistInfo from './components/Pages/Patients/PharmacistInfo/PharmacistInfo'
import Profile from './components/Pages/Patients/Profile/Profile'
import Navigation from './components/Pages/Patients/Navigation/Navigation'
import CompleteProfilePatient from './components/Pages/Patients/CompleteProfilePatient/CompleteProfilePatient'
// import Error404 from './components/Error404'

//Doctor Components
import {DoctorLayoutRoute} from './components/Pages/Doctors/DoctorLayout'
import PrescriptionEnterPage from './components/Pages/Doctors/PrescriptionEnterPage/PrescriptionEnterPage'
import FetchRecordPage from './components/Pages/Doctors/FetchRecordPage/FetchRecordPage'
import QRCodePage from './components/Pages/Doctors/QRCodePage/QRCodePage'
import ProfileDoctor from './components/Pages/Doctors/Profile/ProfileDoctor'
import ViewSchedulePage from './components/Pages/Doctors/ViewSchedulePage/ViewSchedulePage'
import CompleteProfileDoctor from './components/Pages/Doctors/CompleteProfileDoctor/CompleteProfileDoctor'

//Pharmacist Components
import {PharmacistLayoutRoute} from './components/Pages/Pharmacists/PharmacistLayout'
import FetchPrescriptionPage from './components/Pages/Pharmacists/FetchPrescriptionPage/FetchPrescriptionPage'
import QRCodePagePharmacist from './components/Pages/Pharmacists/QRCodePagePharmacist/QRCodePagePharmacist'
import ProfilePharmacist from './components/Pages/Pharmacists/ProfilePharmacist/ProfilePharmacist'
import CompleteProfilePharmacist from './components/Pages/Pharmacists/CompleteProfilePharmacist/CompleteProfilePharmacist'

const App = () => {
	return(
		<div className="App">
		<Router>
			<AuthProvider>
			<UserProvider>
			<PrescriptionProvider>
			<ThemeProvider>
			<Switch>
				<Route path="/" exact component={SignInPage}/>
				<Route path="/signup" component={SignUpPage}/>
				<Route path="/profilePicture" component={SignUpProfilePage}/>
				<PatientLayoutRoute path="/dashboard" component={DashboardPage}/>
				<PatientLayoutRoute path="/detailedPrescription/:id" 
				component={DetailedPrescriptionPage}/>
				<PatientLayoutRoute path="/appointment"
				component={Appointment}/>
				<PatientLayoutRoute path="/appointmentpage" 
				component={AppointmentPage}/>
				<PatientLayoutRoute path="/pharmacistinfo" 
				component={PharmacistInfo}/>
				<PatientLayoutRoute path="/profilePatient" 
				component={Profile}/>
				<PatientLayoutRoute path="/navigation" 
				component={Navigation}/>
				<PatientLayoutRoute path="/pa" 
				component={CompleteProfilePatient}/>
				<DoctorLayoutRoute path="/enterPrescription"
				component={PrescriptionEnterPage}/>
				<DoctorLayoutRoute path="/fetchRecord"
				component={FetchRecordPage}/>
				<DoctorLayoutRoute path="/qrcodeRecord"
				component={QRCodePage}/>
				<DoctorLayoutRoute path="/profileDoctor"
				component={ProfileDoctor}/>
				<DoctorLayoutRoute path="/viewSchedule"
				component={ViewSchedulePage}/>
				<DoctorLayoutRoute path="/do"
				component={CompleteProfileDoctor}/>
				<PharmacistLayoutRoute path="/fetchPrescription"
				component={FetchPrescriptionPage}/>
				<PharmacistLayoutRoute path="/qrcodePrescription"
				component={QRCodePagePharmacist}/>
				<PharmacistLayoutRoute path="/profilePharmacist"
				component={ProfilePharmacist}/>
				<PharmacistLayoutRoute path="/ph"
				component={CompleteProfilePharmacist}/>
				{/*<Route component={Error404}/>*/}
			</Switch>	
			</ThemeProvider>
			</PrescriptionProvider>
			</UserProvider>
			</AuthProvider>
		</Router>		
		</div>
		)
};

export default App;