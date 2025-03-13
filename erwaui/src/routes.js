import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdLogout,
  MdUpload
} from 'react-icons/md';

// Shared Imports (User & Admin)
import Profile from 'views/admin/profile';

// Admin Imports
import DataTables from 'views/admin/dataTables';
import AdminDashboard from 'views/admin/default';

// Employee  Imports
import EmployeeDashboard from 'views/employee/dashboard';
import FormsSubmission from 'views/employee/userSubmission';
import SubmissionConfirmation from 'views/employee/confirmation';

// Auth Imports
import SignInCentered from 'views/auth/signIn';
import SignUpCentered from 'views/auth/signup';
import LogoutCentered from 'views/auth/logout'
const routes = [
  {
    name: 'Admin Dashboard',
    layout: '/main',
    path: '/admin-default',
    roles:['ADMIN'],
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <AdminDashboard />,
  },
  {
    name: 'Reports',
    layout: '/main',
    roles:['ADMIN'],
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/data-tables',
    component: <DataTables />,
  },
  {
    name: 'Dashboard',
    layout: '/main',
    path: '/emp-dashboard',
    roles:['USER',],
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <EmployeeDashboard />,
  },
  {
    name: 'Upload Expense',
    layout: '/main',
    roles:['USER'],
    icon: <Icon as={MdUpload} width="20px" height="20px" color="inherit" />,
    path: '/employee-form',
    component: <FormsSubmission />,
  },
  {
    name: 'Expense Status',
    layout: '/main',
    roles:['USER'],
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/submission-confirmation',
    component: <SubmissionConfirmation />,
  },
  {
    name: 'Profile',
    layout: '/main',
    path: '/profile',
    roles:['USER','ADMIN'],
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: <Profile />,
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    roles:['USER','ADMIN'],
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <SignInCentered />,
  },
  {
    name: 'Logout',
    layout: '/auth',
    path: '/logout',
    roles:['USER','ADMIN'], 
    icon: <Icon as={MdLogout} width="20px" height="20px" color="inherit" />,
    component: <LogoutCentered />,
  },
  {
    name: 'Sign Up',
    layout: '/auth',
    path: '/sign-up',
    roles:['USER','ADMIN'],
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <SignUpCentered />,
  },
];

export default routes;
