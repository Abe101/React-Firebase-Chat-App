import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../services/firebase";

import cogoToast from "cogo-toast";
import moment from "moment";
import {
  Avatar,
  Container,
  CssBaseline,
  Typography,
  Box,
  TextField,
  Button,
  LinearProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BsChatSquareDots } from "react-icons/bs";

const useStyles = makeStyles((theme) => ({
  header: {
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
  margin: {
    margin: theme.spacing(1),
  },
  chatItem: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
    borderRadius: "10px",
    wordWrap: "break-word",
    maxWidth: "98%",
    backgroundColor: theme.palette.action.hover,
  },
  chatList: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  form: {
    display: "flex",
    flexDirection: "row",
    "& Button": {
      marginLeft: theme.spacing(1),
      height: "100%",
    },
  },
  footer: {
    display: "inline",
    "& Button": {
      marginBottom: theme.spacing(2),
      backgroundColor: theme.palette.error.main,
      color: theme.palette.common.white,
      "&:hover": {
        backgroundColor: theme.palette.error.dark,
      },
    },
  },
}));

export default function Chat() {
  const [state, setState] = useState({
    user: auth().currentUser,
    chats: [],
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const myRef = useRef();

  const classes = useStyles();

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      readError: "",
    }));
    setLoading(true);
    const chatArea = myRef.current;
    (async function loadDataBase() {
      try {
        db.ref("chats").on("value", (snapshot) => {
          let chats = [];
          snapshot.forEach((snap) => {
            chats.push(snap.val());
          });
          setState((prevState) => ({
            ...prevState,
            chats,
          }));
          chatArea.scrollBy(0, chatArea.scrollHeight);
          setLoading(false);
        });
      } catch (err) {
        cogoToast.error(err.message);
      }
    })();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const chatArea = myRef.current;
    try {
      if (state.content === "") {
        cogoToast.error("Empty message");
      } else {
        await db.ref("chats").push({
          content: state.content,
          timestamp: moment().format("l"),
          uid: state.user.uid,
          author: state.user.displayName,
        });
        setState((prevState) => ({
          ...prevState,
          content: "",
        }));
        chatArea.scrollBy(0, chatArea.scrollHeight);
      }
    } catch (err) {
      cogoToast.error(err.message);
    }
  }

  function handleLogOut() {
    return auth().signOut();
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div>
        <div className={classes.header}>
          <Avatar className={classes.avatar}>
            <BsChatSquareDots />
          </Avatar>
          <Typography component="h1" variant="h5">
            Chat Room
          </Typography>
        </div>
        <div className={classes.chatList} ref={myRef}>
          {loading && (
            <LinearProgress className={classes.margin} color="secondary" />
          )}
          {state.chats.map((chat) => {
            return (
              <Box key={state.chats.indexOf(chat)} className={classes.chatItem}>
                <Typography
                  display="block"
                  component="span"
                  variant="button"
                  color={state.user.uid === chat.uid ? "secondary" : "primary"}
                  align={state.user.uid === chat.uid ? "right" : "left"}
                >
                  {chat.author}
                </Typography>
                <Typography
                  display="block"
                  component="span"
                  variant="body2"
                  color="textPrimary"
                  align={state.user.uid === chat.uid ? "right" : "left"}
                >
                  {chat.content}
                </Typography>
                <Typography
                  display="block"
                  component="span"
                  variant="subtitle2"
                  color="textSecondary"
                  align={state.user.uid === chat.uid ? "left" : "right"}
                >
                  {chat.timestamp}
                </Typography>
              </Box>
            );
          })}
        </div>
        <form noValidate onSubmit={handleSubmit} className={classes.form}>
          <TextField
            onChange={handleChange}
            name="content"
            value={state.content}
            variant="outlined"
            multiline
            fullWidth
          />
          <Button type="submit" variant="outlined" color="secondary">
            Send
          </Button>
        </form>
        <div className={classes.footer}>
          Logged in as:{" "}
          <Typography variant="subtitle2" color="primary">
            {state.user.email}
          </Typography>
          <Button
            type="button"
            variant="outlined"
            size="small"
            onClick={handleLogOut}
          >
            Log Out
          </Button>
        </div>
      </div>
    </Container>
  );
}
