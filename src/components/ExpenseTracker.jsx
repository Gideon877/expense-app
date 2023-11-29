// src/ExpenseTracker.js
import React, { useContext, useState, useEffect } from 'react';
import { Grid, Divider } from '@mui/material';
import ExpenseForm from './ExpenseForm';
import { AuthContext } from '../context/AuthContext';
import ExpenseList from './ExpenseList';
import { getFirestore, collection, onSnapshot, query, where } from 'firebase/firestore';
import { app } from '../firebase';

const ExpenseTracker = () => {
	const { currentUser } = useContext(AuthContext);
	const [expenses, setExpenses] = useState([]);

	useEffect(() => {
		const expensesCollection = collection(getFirestore(app), 'expenses');
		const userExpensesQuery = query(expensesCollection, where('userId', '==', currentUser.uid));

		const unsubscribe = onSnapshot(userExpensesQuery, (snapshot) => {
			const expensesData = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setExpenses(expensesData);
		});

		return () => {
			unsubscribe();
		};
	}, [currentUser.uid]);

	return (
		<Grid container>
			<Grid xs={12} md={4} >
				<ExpenseForm />
			</Grid>

			<Grid xs={12} md={8} >
				<ExpenseList expenses={expenses} setExpenses={setExpenses} />
			</Grid>

		</Grid>
	);
};

export default ExpenseTracker;
