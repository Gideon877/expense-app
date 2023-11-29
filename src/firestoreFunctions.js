import { addDoc, collection, deleteDoc, doc, getFirestore } from 'firebase/firestore';
import { app } from './firebase'; // Adjust the import path based on your setup

export const deleteExpenseById = async (expenseId) => {
    const expensesCollection = 'expenses'; // Adjust the collection name based on your setup
    const expenseDocRef = doc(getFirestore(app), expensesCollection, expenseId);

    try {
        await deleteDoc(expenseDocRef);
        console.log(`Expense with ID ${expenseId} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting expense with ID ${expenseId}:`, error.message);
    }
};

export const addExpense = async (expense) => {
    try {
        const expenseCollection = collection(getFirestore(app), 'expenses');

        const docRef = await addDoc(expenseCollection, expense);
        return docRef
    } catch (error) {
        console.error(`Error adding new expense`, error.message);
    }
}