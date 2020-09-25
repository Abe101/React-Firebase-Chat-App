import React from "react";
import { Link as RouterLink } from "react-router-dom";

import {
  Container,
  CssBaseline,
  Typography,
  Avatar,
  Button,
  ButtonGroup,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { RiHome2Line } from "react-icons/ri";

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
  button: {
    margin: theme.spacing(2),
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <RiHome2Line />
        </Avatar>
        <Typography component="h1" variant="h5">
          Home
        </Typography>
        <ButtonGroup className={classes.button}>
          <Button
            variant="outlined"
            color="secondary"
            component={RouterLink}
            to="/signin"
          >
            Sign In
          </Button>
          <Button
            variant="outlined"
            color="primary"
            component={RouterLink}
            to="/signup"
          >
            Sign Up
          </Button>
        </ButtonGroup>
      </div>
    </Container>
  );
}
