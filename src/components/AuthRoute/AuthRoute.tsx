import React, {useEffect, useState, Suspense} from "react";
import {SideMenuBar} from "../Homepage/SideMenuBar";
import {useLocation, useNavigate} from "react-router-dom";
import { getAccessToken } from "../../util";
import Loader from "../Loaders";
import { MemoizedSocketInit as SocketInit } from "../../Socket/SocketInit";
import { getUserDetailsApi } from "../../apis/getUserDetails";
import { WindowEvents } from "Sharedlib/eventservice";

type AuthRouteProps = {
   Component: React.ComponentType;
};

export const AuthRoute = ({Component}: AuthRouteProps) => {
   const navigate = useNavigate();
   const [isAuthenticated, setIsAuthticated] = useState(false);
   const [selectedPage, setSelectedPage] = useState<string>('')
   const eventName = 'currentUser' as typeof WindowEvents.currentUser;
   const {pathname} = useLocation();
   console.log('process.env.APIBASEURL', process.env.APIBASEURL, pathname);

   useEffect(() => {
      const userToken = getAccessToken();
      if (!userToken) {
         navigate("/");
      }
      if (pathname.includes('homepage')) {
         getUserDetailsHelper();
      }
      setIsAuthticated(true);
   }, [isAuthenticated, selectedPage]);

   useEffect(() => {
      const pathsplit = pathname.split('/')
      const currentPath = pathsplit[pathsplit.length - 1];
      setSelectedPage(currentPath);
   }, [pathname])
   
   const getUserDetailsHelper = async() => {
      let userInfo = await getUserDetailsApi();
      import("Sharedlib/eventservice").
         then((event) => {
            setTimeout(() => event.default.fire(eventName, { detail: userInfo }), 100);      
         }).catch(error => {
            console.error('Error occured in event', error);
         })
   }
   return (
      <div>
         {isAuthenticated && (
            <>
               <SideMenuBar setIsAuthenticated={setIsAuthticated}>
                  <Suspense fallback={<Loader />}>
                     <Component />
                  </Suspense>
               </SideMenuBar>
               <SocketInit />
            </>
         )}
      </div>
   );
};
