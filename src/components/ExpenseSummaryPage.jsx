import React, { Fragment, useContext, useEffect, useState } from 'react';
import { collection, getDocs, query, where, getFirestore } from 'firebase/firestore';
import { app } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { Container, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';

const ExpenseSummaryPage = () => {
    const { currentUser } = useContext(AuthContext);

    const [summaryData, setSummaryData] = useState([]);

    useEffect(() => {
        const fetchSummaryData = async () => {
            try {
                const expensesCollection = collection(getFirestore(app), 'expenses');
                const userExpensesQuery = query(expensesCollection, where('userId', '==', currentUser.uid));
                const querySnapshot = await getDocs(userExpensesQuery);

                const summary = {};
                querySnapshot.forEach((doc) => {
                    const expense = doc.data();
                    const category = expense.selectedOption;

                    if (!summary[category]) {
                        summary[category] = {
                            total: 0,
                            category,
                            count: 0
                        };
                    }

                    summary[category].total += Number(expense.amount);
                    summary[category].count += 1;
                });

                // Convert summary object to an array
                const summaryArray = Object.values(summary);

                setSummaryData(summaryArray);
            } catch (error) {
                console.error('Error fetching expense summary:', error.message);
            }
        };

        fetchSummaryData();
    }, []);

    return (
        <Container>
            <Typography variant='h4' gutterBottom>Expense Summary</Typography>
            <List>
                {summaryData.map((categorySummary) => (
                    <Fragment key={categorySummary.category}>
                        <ListItem>
                            <ListItemText
                                primary={`${categorySummary.category}: R${categorySummary.total}`}
                                secondary={
                                    <Fragment>
                                         <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                           {`count: ${categorySummary.count}`}
                                        </Typography>
                                    </Fragment>
                                }
                            >
                            </ListItemText>
                        </ListItem>
                        <Divider />
                    </Fragment>
                ))}
            </List>
            
        </Container>
    );
};

export default ExpenseSummaryPage;
