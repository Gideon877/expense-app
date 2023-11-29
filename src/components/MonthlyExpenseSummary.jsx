import React, { useState, useEffect, useContext } from 'react';
import { Typography, Container } from '@mui/material';
import { collection, getDocs, query, where, getFirestore } from 'firebase/firestore';
import { app } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const MonthlyExpenseSummary = () => {
    const { currentUser } = useContext(AuthContext);

  const [monthlyTotal, setMonthlyTotal] = useState(0);

  useEffect(() => {
    const fetchMonthlyTotal = async () => {
        const expensesCollection = collection(getFirestore(app), 'expenses');
        const userExpensesQuery = query(expensesCollection, where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(userExpensesQuery);

      let total = 0;

      querySnapshot.forEach((doc) => {
        const expense = doc.data();
        const category = expense.selectedOption;
        const amount = Number(expense.amount);

        // Calculate monthly total based on expense category
        switch (category) {
          case 'Monthly':
            total += amount;
            break;
          case 'Weekly':
            total += amount * 4; // 4 weeks in a month
            break;
          case 'Weekday':
            total += amount * 5 * 4; // 5 days a week, 4 weeks in a month
            break;
          case 'Weekend':
            total += amount * 2 * 4; // 2 days a week, 4 weeks in a month
            break;
          case 'Once-off':
            total += amount;
            break;
          case 'Daily':
            total += amount * 30; // 30 days in a month
            break;
          default:
            break;
        }
      });

      setMonthlyTotal(total);
    };

    fetchMonthlyTotal();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Monthly Expense Summary
      </Typography>
      <Typography variant="h6">
        Total Spent: R{monthlyTotal.toFixed(2)}
      </Typography>
    </Container>
  );
};

export default MonthlyExpenseSummary;
