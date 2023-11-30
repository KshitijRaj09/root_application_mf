import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import {
  Box, Container,
  CssBaseline, Grid,
  Link, TextField,
  Typography, 
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { isUserIdExistPropType } from "../../typesdeclarations/type";
import { EventEmitter } from "../../util";
import { registerApi } from "./apis/registerApi";
import { LoadingButton } from "@mui/lab";

const styles = () => ({
  GridItem: {
    minWidth: "100%",
  },
  TypographyStyle: {
    maxWidth: "250px",
    "&:hover": { textDecoration: "underline" },
    cursor: "pointer",
  },
});

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="left" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export const RegisterForm = ({
  isExistingUser,
  setIsExistingUser,
}: isUserIdExistPropType) => {
  const classes = styles();

  const [registrationError, setRegistrationError] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    EventEmitter.subscribe("registrationfailed", (data: any) =>
      notifyErrorOnLogin(data?.response?.data?.errormessage)
    );
  }, []);

  const notifyErrorOnLogin = (error: string) => {
    if (error.includes("username")) {
      setRegistrationError({
        name: "",
        userName: error,
        email: "",
        password: "",
      });
    } else if (error.includes("email")) {
      setRegistrationError({
        name: "",
        userName: "",
        email: error,
        password: "",
      });
    } else if (error.includes("password")) {
      setRegistrationError({
        name: "",
        userName: "",
        email: "",
        password: error,
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formdata = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      username: formData.get("userName") as string,
      name: formData.get("name") as string,
    };

    const data = await registerApi(formdata);
    setIsLoading(false);
  };
  return (
    <Container component="main">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate={false}
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item sx={classes.GridItem}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                error={!!registrationError.name}
                helperText={registrationError.name}
              />
            </Grid>
            <Grid item sx={classes.GridItem}>
              <TextField
                required
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                autoComplete="user-name"
                error={!!registrationError.userName}
                helperText={registrationError.userName}
              />
            </Grid>
            <Grid item sx={classes.GridItem}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                error={!!registrationError.email}
                helperText={registrationError.email}
              />
            </Grid>
            <Grid item sx={classes.GridItem}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={!!registrationError.password}
                helperText={registrationError.password}
              />
            </Grid>

            <Grid item sx={classes.GridItem}>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={isLoading}
                loadingPosition="center"
              >
                Sign Up
              </LoadingButton>
            </Grid>
          </Grid>

          <Grid container justifyContent="flex-end">
            <Grid item sx={classes.GridItem}>
              <Typography
                sx={classes.TypographyStyle}
                onClick={() => setIsExistingUser(!isExistingUser)}
              >
                Already have an account? Sign in
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default RegisterForm;
