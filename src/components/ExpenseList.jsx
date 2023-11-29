import React, { Fragment } from 'react';
import {
    Container,
    List,
    ListItem,
    ListItemText,
    Typography,
    Divider,
    IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteExpenseById } from '../firestoreFunctions';

const ExpenseList = ({ expenses, setExpenses }) => {

    const handleDeleteExpense = async (expenseId) => {
        await deleteExpenseById(expenseId);
        // Update the component state after deletion
        setExpenses((prevExpenses) =>
            prevExpenses.filter((expense) => expense.id !== expenseId)
        );
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Expense List
            </Typography>

            <List>
                {expenses.map((expense) => (
                    <React.Fragment key={expense.id}>
                        <ListItem
                            secondaryAction={
                                <IconButton onClick={() => handleDeleteExpense(expense.id)} edge="end" aria-label="delete">
                                    <DeleteIcon color='error' />
                                </IconButton>
                            }
                        >
                            <ListItemText
                                primary={`R${expense.amount}`}
                                secondary={
                                    <Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {`${expense.description}`}
                                        </Typography>

                                        <Typography
                                            sx={{ display: 'block' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {`${expense.selectedOption}`}
                                        </Typography>
                                        {expense.expenseDate.toDate().toLocaleString()}

                                    </Fragment>
                                }
                            />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </Container>
    );
};

export default ExpenseList;
