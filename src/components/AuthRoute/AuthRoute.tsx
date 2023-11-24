import React, {useEffect, useState, Suspense} from "react";
import {SideMenuBar} from "../Homepage/SideMenuBar";
import {useNavigate} from "react-router-dom";
import { getAccessToken } from "../../util";
import Loader from "../Loaders";
import { MemosizedSocketInit as SocketInit } from "./SocketInit";
import { getUserDetailsApi } from "../../apis/getUserDetails";
import { WindowEvents, default as WindowEventService } from "Sharedlib/eventservice";
import { PageEnum } from "../../typesdeclarations/type";

type AuthRouteProps = {
   Component: React.ComponentType;
};

export const AuthRoute = ({Component}: AuthRouteProps) => {
   const navigate = useNavigate();
   const [isAuthenticated, setIsAuthticated] = useState(false);
   const [selectedPage, setSelectedPage] = useState<PageEnum>(PageEnum.Posts);
   const eventName = 'currentUser' as typeof WindowEvents.currentUser;
   console.log('process.env.APIBASEURL', process.env.APIBASEURL,);
   useEffect(() => {
      const userToken = getAccessToken();
      if (!userToken) {
         navigate("/");
      }
      if (selectedPage === PageEnum.Posts) {
         getUserDetailsHelper();
      }
      setIsAuthticated(true);
   }, [isAuthenticated, selectedPage]);
   
   const getUserDetailsHelper = async() => {
      const userInfo = await getUserDetailsApi();
      console.log({userInfo});
      
      import("Sharedlib/eventservice").
         then((event) => {
            event.default.fire(eventName, { detail: userInfo })
         }).catch(error => {
            console.error('Error occured in event', error);
         })
      console.log('called here ', WindowEventService);
   }
   return (
      <div>
         {isAuthenticated && (
            <>
               <SideMenuBar setIsAuthenticated={setIsAuthticated} setSelectedPage={setSelectedPage}>
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
