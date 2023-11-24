import React, { createContext, lazy, useState } from "react";
const RecommendedPeople = lazy(()=> import("People/RecommendedPeople"));
import { Box, Drawer, IconButton, styled, useMediaQuery, useTheme } from "@mui/material";
const Posts = lazy(()=> import("Post/Post"));
import { getUserInfoFromStorage } from "../../util";
import {
   ChevronLeft as ChevronLeftIcon,
   GroupAddOutlined as GroupAddOutlinedIcon
} from "@mui/icons-material";

export const currentUserInfoContext = createContext({ currentUserId: '' });
const drawerWidth = 300;

const DrawerHeader = styled("div")(({ theme }) => ({
   display: "flex",
   alignItems: "center",
   padding: theme.spacing(1),
   // necessary for content to be below app bar
   justifyContent: "flex-start",
}));

const Homepage = () => {
   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
   const theme = useTheme();
   const isMobileScreen = useMediaQuery(theme.breakpoints.down('tablet'));
   const { userid: currentUserId } = JSON.parse(getUserInfoFromStorage());
   return (
      <currentUserInfoContext.Provider value={{ currentUserId }}>
         <Box
            component='div'
            sx={{display: "flex", gap: "20px", marginTop: "20px"}}
            id='homepage'>
            <Box
               component='div'
               maxWidth='tablet'
               sx={{ minWidth: { mobile: "90%", laptop: "45vw" } }}
            >
               <Posts />
            </Box>
            {isMobileScreen ?
               (<>
                  <Box sx={{ display: 'block' }}>
                     <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setIsDrawerOpen(true)}
                        edge="start"
                     >
                        <GroupAddOutlinedIcon />
                     </IconButton>
                  </Box>
                  <Drawer
                     sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                           width: drawerWidth,
                           background: '#F9F6EE'
                        },
                     }}
                     variant='temporary'
                     anchor='right'
                     open={isDrawerOpen}>
                     <DrawerHeader>
                        <IconButton onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                           <ChevronLeftIcon />
                        </IconButton>
                     </DrawerHeader>
                     <RecommendedPeople />
                  </Drawer>
               </>)
               :
               (<Box component='div' sx={{ minWidth: '35vw' }}>
                  <RecommendedPeople />
               </Box>)
            }
         </Box>
      </currentUserInfoContext.Provider>
   );
};

export default Homepage;
