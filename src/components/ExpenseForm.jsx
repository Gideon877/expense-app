import React, { useState, useEffect, useContext } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Container, Box, Snackbar, Slider } from '@mui/material';
import { getFirestore, collection, doc, getDoc, addDoc } from 'firebase/firestore';
import { app } from '../firebase'; // Assuming you have Firebase initialized and exported as 'app'
import { AuthContext } from '../context/AuthContext';
import { addExpense } from '../firestoreFunctions';

const ExpenseForm = () => {
    const { currentUser } = useContext(AuthContext);
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({
        amount: '',
        description: '',
        selectedOption: '',
    });

    const [dropdownOptions, setDropdownOptions] = useState([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const optionsDoc = await getDoc(doc(collection(getFirestore(app), 'options'), 'dropdown'));
                if (optionsDoc.exists()) {
                    setDropdownOptions(optionsDoc.data().options);
                    console.log(optionsDoc.data().options)
                }
            } catch (error) {
                console.error('Error fetching dropdown options from Firestore:', error.message);
            }
        };

        fetchOptions();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newExpense = {
                userId: currentUser.uid,
                amount: formData.amount,
                description: formData.description,
                selectedOption: formData.selectedOption,
                expenseDate: new Date(),
            };

            const docRef = await addExpense(newExpense)

            console.log('Expense added to Firestore with ID:', docRef.id);
            setOpen(true)

            // Clear the form after submission
            setFormData({
                amount: '',
                description: '',
                selectedOption: '',
            });

            setTimeout(()=> setOpen(false), 2000)

        } catch (error) {
            console.error('Error adding expense to Firestore:', error.message);
        }
    };

    return (
        <Container>
            <Snackbar message='New expense added!' open={open} />
            <Typography variant="h4" gutterBottom>
                Add New Expense
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Amount"
                    variant="outlined"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                <TextField
                    label="Description"
                    variant="outlined"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />

                <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel id="select-label">Select an Option</InputLabel>
                    <Select
                        label="Select an Option"
                        name="selectedOption"
                        value={formData.selectedOption}
                        onChange={handleChange}
                        labelId="select-label"
                    >
                        {dropdownOptions.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </form>
        </Container>
    );
};

export default ExpenseForm;
