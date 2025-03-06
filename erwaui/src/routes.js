import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdLogout,
} from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import Profile from 'views/admin/profile';
import DataTables from 'views/admin/dataTables';
import FormsSubmission from 'views/employee/userSubmission';
import SubmissionConfirmation from 'views/employee/confirmation';

// Auth Imports
import SignInCentered from 'views/auth/signIn';
import SignUpCentered from 'views/auth/signup';
import LogoutCentered from 'views/auth/logout'
const routes = [
  {
    name: 'Main Dashboard',
    layout: '/main',
    path: '/default',
    roles:['USER','ADMIN'],
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
  },
  {
    name: 'Data Tables',
    layout: '/main',
    roles:['ADMIN'],
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/data-tables',
    component: <DataTables />,
  },
  {
    name: 'Employee Forms',
    layout: '/main',
    roles:['USER'],
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/employee-form',
    component: <FormsSubmission />,
  },
  {
    name: 'Submission Confirmation',
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
