import React, { lazy, useState } from "react";
import {
   PowerSettingsNew as PowerSettingsNewIcon,
   TextsmsOutlined as TextsmsOutlinedIcon,
   Home as HomeIcon,
   PersonAddAlt as PersonAddAltIcon,
   AccountCircle as AccountCircleIcon,
   ChevronRight as ChevronRightIcon,
   ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import {
   Avatar,
   Box,
   Drawer,
   List,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   Popover,
   Stack,
   Typography,
   useMediaQuery,
   useTheme,
   IconButton,
   Badge
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
const LogoutModalLazy = lazy(() => import("../Login/LogoutModal"));
import { styled } from "@mui/material/styles";
import { getUserInfoFromStorage } from "../../util";
import { PageEnum } from "../../typesdeclarations/type";
import useNotificationProvider from "../../customHook/useNotificationProvider";
import { NotificationType, WindowEvents } from "@kshitijraj09/sharedlib_mf";

const drawerWidth = 200;
type SideMenuBarPropsType = {
   children: JSX.Element;
   setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const StyledLink = styled(Link)(() => ({
   color: "green",
}));

const styles = () => ({
   appName: {
      padding: "12px",
      color: "#364F6B",
   },
   page: {
      width: "100%",
      padding: "20px",
   },
   root: {
      display: "flex",
   },
   drawer: {
      width: drawerWidth,
   },
   drawerPaper: {
      width: drawerWidth,
   },
   active: {
      background: "#f4f4f4",
   },

});

const DrawerHeader = styled("div")(({ theme }) => ({
   display: "flex",
   alignItems: "center",
   padding: theme.spacing(1),
   // necessary for content to be below app bar
   justifyContent: "flex-start",
}));

export const SideMenuBar = ({
   children,
   setIsAuthenticated,
}: SideMenuBarPropsType) => {
   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
   const location = useLocation();
   const { name: currentUserName, avatar: currentuserAvatar } = JSON.parse(getUserInfoFromStorage());
   const classes = styles();

   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
   const messageNotification = 'messageNotification' as WindowEvents.messageNotification;
   const { outputStack: notificationStack } = useNotificationProvider<NotificationType>(messageNotification);
   
   const menuItems = [
      {
         text: PageEnum.Posts,
         icon: <HomeIcon />,
         path: "/homepage",
      },
      {
         text: PageEnum.People,
         icon: <PersonAddAltIcon />,
         path: "/people",
      },
      {
         text: PageEnum.Account,
         icon: <AccountCircleIcon />,
         path: "/account",
      },
      {
         text: PageEnum.Messenger,
         icon: (
            <Badge color="primary" badgeContent={notificationStack.length}>
               <TextsmsOutlinedIcon />
            </Badge>
         ),
         path: "/messenger",
      },

      {
         text: PageEnum.Logout,
         icon: <PowerSettingsNewIcon />,
      },
   ];

   const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handlePopoverClose = () => {
      setAnchorEl(null);
   };

   const theme = useTheme();
   const isMobileScreen = useMediaQuery(theme.breakpoints.down('tablet'));

   return (
      <Box sx={classes.root} component='div'>
         {isMobileScreen && (
            <DrawerHeader sx={{ alignItems: 'flex-start' }}>
               <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={() => setIsDrawerOpen(true)}
                  edge="start"
               >
                  <ChevronRightIcon />
               </IconButton>
            </DrawerHeader>
         )
         }
         <Drawer sx={classes.drawer}
            variant={isMobileScreen ? 'temporary' : 'permanent'}
            anchor='left'
            open={isDrawerOpen}
         >
            {isMobileScreen && (
               <DrawerHeader>
                  <IconButton onClick={() => setIsDrawerOpen(!isDrawerOpen)}>
                     <ChevronLeftIcon />
                  </IconButton>
               </DrawerHeader>)
            }
            <div>
               <Link to='/homepage'>
                  <Typography variant='h5' sx={classes.appName} align='center'>
                     Connect App
                  </Typography>
               </Link>
            </div>
            {/* links/list section */}
            <List>
               {menuItems.map((item) => (
                  <StyledLink to={item.path} key={item.text}>
                     {item.text === "Logout" ? (
                        <LogoutModalLazy
                           text={item.text}
                           icon={item.icon}
                           setIsAuthenticated={setIsAuthenticated}
                        />
                     ) : (
                        <ListItemButton
                           key={item.text}
                           sx={
                                 location.pathname == item.path && classes.active
                              }
                              onMouseEnter={(event) => item.path === '/account'
                                 && handlePopoverOpen(event)
                              }
                              onMouseLeave={() => item.path === '/account'
                                 && handlePopoverClose()
                              }
                           >
                           <ListItemIcon>{item.icon}</ListItemIcon>
                           <ListItemText
                              primary={item.text}
                                 sx={{ fontSize: "20px" }}
                           />
                        </ListItemButton>
                     )}
                  </StyledLink>
               ))}
            </List>
            <Popover
               id="mouse-over-popover"
               sx={{
                  pointerEvents: 'none',
                  minWidth: '100px'
               }}
               open={!!anchorEl}
               anchorEl={anchorEl}
               anchorOrigin={{
                  vertical: 3,
                  horizontal: 150,
               }}
               transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
               }}
               disableRestoreFocus
            >
               <Stack direction="row" spacing={1} padding={1}>
                  <Avatar
                     alt={currentUserName}
                     src={currentuserAvatar ||
                        'https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Blank&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Twinkle&skinColor=Light'}
                  />
                  <Typography fontFamily='Mooli, sans-serif' sx={{ p: 1, borderRadius: 5 }} color='#666362'>Hii, {currentUserName}</Typography>
               </Stack>
            </Popover>
         </Drawer>
         <Box sx={classes.page}>{children}</Box>
      </Box>
   );
};
