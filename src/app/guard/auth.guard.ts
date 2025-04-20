import { inject } from '@angular/core';
import { CanActivateFn, Router,UrlTree } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {


  const router = inject(Router);
  const userRole = localStorage.getItem('userRole'); // Get role from local storage
  const userName=localStorage.getItem('username');

  

 // Determine which page is being(current) accessed
 const isAccessingAdmin = route.routeConfig?.path === 'admin-dashboard';    // its give  access only for current path
 const isAccessingUser = route.routeConfig?.path === 'user-dashboard';

 // Role-based access control
 if (isAccessingAdmin && userRole === 'admin') {
   console.log("✅ Admin Access Granted");
   return true;
 }
 if (isAccessingUser && userRole === 'user') {
   console.log("✅ User Access Granted");
   return true;
 }

    router.parseUrl('/login');
    console.log("Auth LOGIN");
  return  router.createUrlTree(['/login']);;
};
