import "./App.css";
import React from "react";
import axios from "axios";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

function App() {
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [sendSuccess, setSendSuccess] = React.useState(false);
  const [messageList, setMessageList] = React.useState([]);

  const messageToBack = { name, message };

  React.useEffect(() => {
    try {
      axios.get("http://localhost:5555/api/messages").then((res) => {
        setMessageList(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [sendSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSendSuccess(true);
    try {
      await axios.post("http://localhost:5555/api/messages", messageToBack);
      setTimeout(() => {
        setSendSuccess(false);
      }, 2000);
      setName("");
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const classes = useStyles();
  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="form">
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Message"
          multiline
          rowsMax={10}
          value={message}
          variant="outlined"
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
        >
          Send
        </Button>
        {sendSuccess && (
          <Alert severity="success">Your message is send success</Alert>
        )}
      </form>
      <ul className="listMessage">
        {messageList.map((message) => {
          return (
            <li className="listItem" key={message._id}>
              <p className="nameUser">{message.name}</p>
              <p className="messageText">{message.message}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
