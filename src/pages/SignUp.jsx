import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { auth, storage, db } from '../firebase'

import { doc, setDoc } from 'firebase/firestore'

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});
function Copyright(props) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}
			<Link color="inherit" href="https://mui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}


const defaultTheme = createTheme();

export default function SignUp() {
	const [err, setErr] = useState(false);
	const navigate = useNavigate()

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const [displayName, email, password, file] = [
            data.get('username'),
            data.get('email'),
            data.get('password'),
            data.get('file')
        ];
		console.log({displayName, email, password, file });
		try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const { uid } = res.user;

            const storageRef = ref(storage, `user_images/${uid}/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed', null,
                (error) => {
                    console.error('Upload error:', error);
                    setErr(true);
                    setTimeout(() => setErr(false), 1000)
                },
                async () => {
                    try {
                        const photoURL = await getDownloadURL(uploadTask.snapshot.ref);
                
                        console.log('File available at', photoURL);
                
                        await updateProfile(res.user, { displayName, photoURL });
                        await setDoc(doc(db, 'users', uid), { uid, displayName, email, photoURL });
                        // await setDoc(doc(db, 'userMovies', uid), {});
                        navigate('/');
                      } catch (error) {
						console.log(error, {}, {});
                        console.error('Profile update error:', error);
                        setErr(true);
                      }
                }
            );
        } catch (error) {
            console.error('Create user error:', error);
            setErr(true)
        }
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12}>
								<TextField
									autoComplete="given-name"
									name="username"
									required
									fullWidth
									id="username"
									label="Username"
									autoFocus
								/>
							</Grid>
							
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
									Upload file
									<VisuallyHiddenInput name='file' type="file" />
								</Button>
							</Grid>


						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<p>
									Already have an account? {' '}
									<Link to='/login' variant="a">
										Sign in
									</Link>
								</p>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</ThemeProvider>
	);
}