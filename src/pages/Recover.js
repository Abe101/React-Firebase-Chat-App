import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { recoverPassword } from "../helpers/auth";

import {
  Container,
  CssBaseline,
  Avatar,
  TextField,
  Button,
  Typography,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MdAutorenew } from "react-icons/md";
import cogoToast from "cogo-toast";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Recover() {
  const [state, setState] = useState({
    email: "",
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
    try {
      await recoverPassword(state.email).then(() => {
        cogoToast.success("Email Sent");
      });
    } catch (err) {
      cogoToast.error(err.message);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <MdAutorenew />
        </Avatar>
        <Typography component="h1" variant="h5">
          Recover Account
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="dense"
            required
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            onChange={handleChange}
          />
          <FormHelperText variant="outlined">
            Enter your email so a password reset can be send to you
          </FormHelperText>
          <Button
            className={classes.submit}
            type="submit"
            fullWidth
            variant="outlined"
            color="primary"
          >
            Send Email
          </Button>
        </form>
        <Button
          type="button"
          fullWidth
          variant="outlined"
          color="secondary"
          component={RouterLink}
          to="/"
        >
          Go Back
        </Button>
      </div>
    </Container>
  );
}
