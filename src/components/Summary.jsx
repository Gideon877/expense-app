import { Grid } from '@mui/material'
import React, { Fragment } from 'react'
import ExpenseSummaryPage from './ExpenseSummaryPage'
import MonthlyExpenseSummary from './MonthlyExpenseSummary'

const Summary = () => {
  return (
   <Fragment>
    <Grid container>
        <Grid xs={12} md={8} lg={6}>
            <ExpenseSummaryPage />
        </Grid>
        <Grid xs={6} md={4} lg={6}>
            <MonthlyExpenseSummary />
        </Grid>
    </Grid>
   </Fragment>
  )
}

export default Summary