import React, {useState, useEffect} from "react";
import {
   Avatar, CssBaseline,
   TextField, FormControlLabel,
   Checkbox, Link as MuiLink,
   Grid, Box, Typography,
   Container
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {isUserIdExistPropType} from "../../typesdeclarations/type";
import {loginApi} from "./apis/loginApi";
import {useNavigate} from "react-router-dom";
import { EventEmitter, setAccessToken, setUserInfoInStorage } from "../../util";
import { LoadingButton } from "@mui/lab";

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
   const [isLoading, setIsLoading] = useState(false);
   const navigate = useNavigate();
   const classes = styles();
   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      setIsLoading(true);
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
         return;
      }
      setIsLoading(false);
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
               <LoadingButton
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                  loading={isLoading}
                  loadingPosition="center"
               >
                  Sign In
               </LoadingButton>
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
