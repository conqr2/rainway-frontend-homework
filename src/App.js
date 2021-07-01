// eslint-disable-next-line
import styles from "./App.module.css";

import useWS from "./components/useWS";
import { useState } from "react";

import UI from "./components/UI";
import GamePad from "./components/GamePad";

const Hook = (_) => {
  const [currentURL, setCurrentURLInternal] = useState(undefined);
  const {
    ready: connected,
    message: currentMessage,
    error: connectionError,
  } = useWS(
    currentURL /* message => !!message.thumbsticks && !!message.buttons*/
  );

  return (
    <>
      <UI
        setCurrentURL={(url) => setCurrentURLInternal(url)}
        connected={connected}
        message={currentMessage}
        connectionError={connectionError}
      />
      <GamePad message={currentMessage} />
    </>
  );
};

export default Hook;
