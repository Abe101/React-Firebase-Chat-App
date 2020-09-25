import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { signIn, signInWithGoogle, signInWithGitHub } from "../helpers/auth";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { makeStyles } from "@material-ui/core/styles";
import cogoToast from "cogo-toast";
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  providerBtn: {
    backgroundColor: theme.palette.common.white,
  },
  providerIcon: {
    marginLeft: theme.spacing(1),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const classes = useStyles();

  function handleChange(event) {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    cogoToast.loading("Loading");
    try {
      await signIn(state.email, state.password).then(() => {
        cogoToast.success("Logged in");
      });
    } catch (err) {
      console.log(err);
      cogoToast.error(err.message);
    }
  }

  async function googleSignIn() {
    cogoToast.loading("Loading");
    try {
      await signInWithGoogle().then(() => {
        cogoToast.success("Logged in through Google");
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function gitHubSignIn() {
    cogoToast.loading("Loading");
    try {
      await signInWithGitHub().then(() => {
        cogoToast.success("Logged in through Github");
      });
    } catch (err) {
      console.log(err);
      cogoToast.error(err.message);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Button
            type="button"
            fullWidth
            variant="outlined"
            color="white"
            className={classNames(classes.submit, classes.providerBtn)}
            onClick={googleSignIn}
          >
            Sign In with Google
            <FcGoogle size={"2em"} className={classes.providerIcon} />
          </Button>
          <Button
            type="button"
            fullWidth
            variant="outlined"
            color="white"
            className={classNames(classes.submit, classes.providerBtn)}
            onClick={gitHubSignIn}
          >
            Sign In with Github
            <FaGithub size={"2em"} className={classes.providerIcon} />
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="/recover" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
