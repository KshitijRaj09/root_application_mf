import {
   Container,
   CssBaseline,
   Divider,
   Grid,
   Typography,
   useMediaQuery,
} from "@mui/material";
import React, {Suspense, lazy, useEffect, useState} from "react";
import {LoginForm} from "./Login/LoginForm";
import {useTheme, Theme} from "@mui/material/styles";
const RegisterFormLazy = lazy(() => import("./Login/RegisterForm"));
import {useNavigate} from "react-router-dom";
import {getAccessToken} from "../util";
import Loader from "./Loaders";

const styles = (theme: Theme) => ({
   GridItem: {
      maxHeight: "40vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px",
      [theme.breakpoints.up("tablet")]: {
         minHeight: "100%",
         padding: "30",
      },
   },
   GridContainer: {
      bgcolor: "#f0f2f5",
      height: "100vh",
   },
   dividerStyle: {
      minWidth: "60vw",
      padding: "0 30px",
      [theme.breakpoints.up("tablet")]: {
         minWidth: "0",
         maxWidth: "10px",
         maxHeight: "100%",
         padding: "40px 0",
      },
   },
});

export const MainPage = () => {
   const theme = useTheme();
   const classes = styles(theme);
   const navigate = useNavigate();
   const [isExistingUser, setIsExistingUser] = useState<boolean>(true);
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   console.log('process.env.APIBASEURL', process.env.APIBASEURL);
   useEffect(() => {
      const userToken = getAccessToken();
      if (userToken) {
         setIsLoggedIn(true);
         navigate("/homepage");
      }
   }, []);
   return (
      <div>
         <CssBaseline />
         {!isLoggedIn && (
            <Container disableGutters>
               <Grid container sx={classes.GridContainer}>
                  <Grid sx={classes.GridItem} item mobile={12} tablet={5}>
                     <Typography variant='h3'>Connect App</Typography>
                  </Grid>
                  <Grid item mobile={12} tablet={2} sx={classes.dividerStyle}>
                     <Divider
                        variant='middle'
                        orientation={
                           useMediaQuery(theme.breakpoints.up("tablet"))
                              ? "vertical"
                              : "horizontal"
                        }
                     />
                  </Grid>
                  <Grid item mobile={12} tablet={5} sx={classes.GridItem}>
                     {isExistingUser ? (
                        <LoginForm
                           isExistingUser={isExistingUser}
                           setIsExistingUser={setIsExistingUser}
                        />
                     ) : (
                        <Suspense fallback={<Loader />}>
                           <RegisterFormLazy
                              isExistingUser={isExistingUser}
                              setIsExistingUser={setIsExistingUser}
                           />
                        </Suspense>
                     )}
                  </Grid>
               </Grid>
            </Container>
         )}
      </div>
   );
};
