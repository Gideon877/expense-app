import { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { AuthContext } from './context/AuthContext';


import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { app } from './firebase';
import Button from '@mui/material/Button'

const db = getFirestore(app); // Assuming 'app' is your Firebase app

// const dropdownOptions = ['Monthly', 'Weekday', 'Weekend', 'Once-off', 'Daily'];

// const addDropdownOptionsToFirestore = async () => {
//   try {
//     const optionsRef = doc(collection(db, 'options'), 'dropdown');
//     await setDoc(optionsRef, { options: dropdownOptions });
//     console.log('Dropdown options added to Firestore successfully!');
//   } catch (error) {
//     console.error('Error adding dropdown options to Firestore:', error.message);
//   }
// };



function App() {

  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser || !currentUser.uid) {
      return <Navigate to='/login' />
    }

    return children;
  }

  return (
    <BrowserRouter>
      <Routes>

        <Route path='/'>
          <Route index element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />

          <Route path='login' element={<SignIn />} />
          <Route path='register' element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
