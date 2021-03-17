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
  const [zeroMessage, setZeroMessage] = React.useState(false);
  const [error, setError] = React.useState(false);

  const messageToBack = { name, message };

  const url = "https://peaceful-forest-09240.herokuapp.com/api/messages";
  // const url ='http://localhost:5555/api/messages'

  React.useEffect(() => {
    try {
      axios.get(url).then((res) => {
        setMessageList(res.data);

        if (res.data.length === 0) {
          setZeroMessage(true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [sendSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message) {
      setError(true);
      return;
    }
    setSendSuccess(true);

    try {
      await axios.post(url, messageToBack);
      setTimeout(() => {
        setSendSuccess(false);
      }, 2000);
      setName("");
      setMessage("");
      setError(false);
    } catch (error) {
      console.log(error);
    }
  };

  const classes = useStyles();
  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="form">
        <TextField
          error={error}
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          error={error}
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
        {zeroMessage && <Alert severity="info">You first user</Alert>}
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
