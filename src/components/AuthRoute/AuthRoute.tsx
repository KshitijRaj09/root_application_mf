import React, {useEffect, useState, Suspense} from "react";
import {SideMenuBar} from "../Homepage/SideMenuBar";
import {useLocation, useNavigate} from "react-router-dom";
import { getAccessToken, getCurrentPage, getUserDetailsHelper } from "../../util";
import Loader from "../Loaders";
type AuthRouteProps = {
   Component: React.ComponentType;
};

export const AuthRoute = ({Component}: AuthRouteProps) => {
   const navigate = useNavigate();
   const [isAuthenticated, setIsAuthticated] = useState(false);
   const [selectedPage, setSelectedPage] = useState<string>(() => getCurrentPage());
   const { pathname } = useLocation();
   console.log('process.env.APIBASEURL', process.env.APIBASEURL);

   useEffect(() => {
      const userToken = getAccessToken();
      if (!userToken) {        
         navigate("/");
      }
      setIsAuthticated(true);
      if (isAuthenticated && selectedPage.includes('homepage')) {
         getUserDetailsHelper();
      }
   }, [isAuthenticated, selectedPage]);

   useEffect(() => {
      setSelectedPage(getCurrentPage());
   }, [pathname]);
   
   return (
      <div>
         {isAuthenticated && (
            <>
               <SideMenuBar setIsAuthenticated={setIsAuthticated}>
                  <Suspense fallback={<Loader />}>
                     <Component />
                  </Suspense>
               </SideMenuBar>
            </>
         )}
      </div>
   );
};
