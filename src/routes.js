import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Users = React.lazy(() => import('./views/tables/users/Users'))
const Challenges = React.lazy(() => import('./views/tables/challenges/Challenges'))
const ReviewChallenges = React.lazy(() => import('./views/tables/reviewChallenges/ReviewChallenges'))
const Payments = React.lazy(() => import('./views/tables/payments/Payments'))
const Payment = React.lazy(() => import('./views/tables/payment/Payment'))
const Deposits = React.lazy(() => import('./views/tables/deposits/Deposits'))
const Withdraws = React.lazy(() => import('./views/tables/withdraws/Withdraws'))
const User = React.lazy(() => import('./views/tables/user/User'))
const Challenge = React.lazy(() => import('./views/tables/challenge/Challenge'))
const Deposit = React.lazy(() => import('./views/tables/deposit/Deposit'))
const Withdraw = React.lazy(() => import('./views/tables/withdraw/Withdraw'))
const Backstatement = React.lazy(() => import('./views/tables/user/Backstatement'))
const Bethistory = React.lazy(() => import('./views/tables/user/Bethistory'))
const Adduser = React.lazy(() => import('./views/adduser/Adduser'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/adduser', name: 'Adduser', element: Adduser },
  { path: '/users', name: 'Users', element: Users },
  { path: '/challenges', name: 'Challenges', element: Challenges },
  { path: '/reviewchallenges', name: 'reviewChallenges', element: ReviewChallenges },
  { path: '/deposits', name: 'Deposits', element: Deposits },
  { path: '/payments', name: 'Payments', element: Payments },
  { path: '/withdraws', name: 'Withdraws', element: Withdraws },
  { path: '/user/:id/profile', name: 'User', element: User },
  { path: '/challenge/:id', name: 'Challenge', element: Challenge },
  { path: '/deposit/:id', name: 'Deposit', element: Deposit },
  { path: '/payment/:id', name: 'Payment', element: Payment },
  { path: '/withdraw/:id', name: 'Withdraw', element: Withdraw },
  { path: '/user/:id/bankstatement', name: 'Backstatement', element: Backstatement },
  { path: '/user/:id/bethistory', name: 'Bethistory', element: Bethistory },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
