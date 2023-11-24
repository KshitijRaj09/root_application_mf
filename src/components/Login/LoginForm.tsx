import React, {useState, useEffect} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MuiLink from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {isUserIdExistPropType} from "../../typesdeclarations/type";
import {loginApi} from "./apis/loginApi";
import {useNavigate} from "react-router-dom";
import { EventEmitter, setAccessToken, setUserInfoInStorage } from "../../util";

const styles = () => ({
   GridItem: {
      minWidth: "100%",
   },
   TypographyStyle: {
      maxWidth: "250px",
      "&:hover": {textDecoration: "underline"},
      cursor: "pointer",
   },
});

interface loginErrorInterface {
   email: string;
   password: string;
}

export const LoginForm = ({
   isExistingUser,
   setIsExistingUser,
}: isUserIdExistPropType) => {

   const [loginError,setLoginError] = useState<loginErrorInterface>({email:"",password:""});

   const navigate = useNavigate();
   const classes = styles();
   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const formdata = {
         email: formData.get("email") as string,
         password: formData.get("password") as string,
      };
      const data = await loginApi(formdata);
      if (data?.userToken) {
         setAccessToken(data.userToken);
         setUserInfoInStorage({
            userid: data.userid,
            username: data.username,
            name: data.name,
            avatar: data.avatar
         });
         navigate("/homepage");
      }
   };

   useEffect(() => {
      EventEmitter.subscribe("loginfailed", (data: any) =>
         notifyErrorOnLogin(data?.response?.data)
      );
   }, []);

   const notifyErrorOnLogin = (error: string) => {
      if (error.includes("User")) setLoginError({email: error, password: ""});
      else setLoginError({email: "", password: error});
   };

   return (
      <Container component='main'>
         <CssBaseline />
         <Box
            sx={{
               marginTop: 8,
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
            }}>
            <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
               <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
               Sign in
            </Typography>
            <Box
               component='form'
               onSubmit={handleSubmit}
               noValidate={false}
               sx={{mt: 1}}>
               <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  autoFocus
                  error={!!loginError.email}
                  helperText={loginError.email}
               />
               <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  error={!!loginError.password}
                  helperText={loginError.password}
               />
               <FormControlLabel
                  control={<Checkbox value='remember' color='primary' />}
                  label='Remember me'
               />
               <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{mt: 3, mb: 2}}>
                  Sign In
               </Button>
               <Grid container>
                  {
                     // To be implemented in future
                     false && (
                        <Grid item mobile>
                           <MuiLink href='#' variant='body2'>
                              Forgot password?
                           </MuiLink>
                        </Grid>
                     )
                  }
                  <Grid item sx={classes.GridItem}>
                     <Typography
                        sx={classes.TypographyStyle}
                        onClick={() => setIsExistingUser(!isExistingUser)}>
                        Don't have an account? Sign up
                     </Typography>
                  </Grid>
               </Grid>
            </Box>
         </Box>
      </Container>
   );
};
