import { useRef, useState, useEffect } from "react";

import styles from "./styles.module.css";

const defaultURL = "ws://localhost:8382";

const Hook = ({ setCurrentURL, connected, message, connectionError }) => {
  const inputField = useRef(null);
  const [currentInputInvalid, setCurrentInputInvalid] = useState(false);
  const [currentInputValue, setCurrentInputValue] = useState(defaultURL);
  const [connecting, setConnecting] = useState(false);

  useEffect(
    (_) => {
      setCurrentInputInvalid(
        currentInputValue.search(
          /^wss?:\/\/([0-9A-Za-z]*:[0-9A-Za-z]*@)?[0-9A-Za-z-]+(:[0-9]+)?(\/.*)?$/g
        ) === -1
      );
    },
    [currentInputValue, setCurrentInputInvalid]
  );

  useEffect(
    (_) => {
      console.log(connectionError);
      if (!connectionError) return;

      setConnecting(false);
      setCurrentInputInvalid(true);
    },
    [connectionError, setConnecting, setCurrentInputInvalid]
  );

  useEffect(
    (_) => {
      if (connected) {
        setConnecting(false);
      }
    },
    [connected, setConnecting]
  );

  return (
    <div className={styles.root}>
      <h1 className={styles.title}>Connection</h1>
      <div className={styles.panels}>
        <form
          action="#"
          method="get"
          onSubmit={(e) => {
            try {
              e.preventDefault();
              e.stopPropagation();
            } catch (e) {}
            if (!currentInputInvalid && !connecting) {
              setConnecting(true);
              setCurrentURL(
                `${inputField.current.value.trim()}${new Array(
                  Math.ceil(Math.random() * 100)
                )
                  .fill(" ")
                  .join("")}`
              );
            }

            return false;
          }}
          className={styles.panel}
        >
          <h2 className={styles.panelTitle}>Settings</h2>
          <span
            className={styles.panelInputStatus}
            style={{
              display:
                !connectionError || !currentInputInvalid ? "none" : "flex",
            }}
          >
            {connectionError}
          </span>
          <input
            type="url"
            defaultValue={defaultURL}
            ref={inputField}
            onChange={(_) =>
              setCurrentInputValue(inputField.current.value.trim())
            }
            placeholder="WebSocket URL"
            className={`${styles.panelInput} ${
              currentInputInvalid ? styles.panelInputInvalid : ""
            }`.trim()}
            readOnly={connected || connecting}
            disabled={connected || connecting}
          />
          <button
            type="submit"
            style={{ marginTop: 24, marginBottom: 0 }}
            className={styles.panelButton}
            disabled={currentInputInvalid || connected || connecting}
          >
            Connect
          </button>
        </form>
        <form
          className={styles.panel}
          method="get"
          action="#"
          onSubmit={(_) => false}
        >
          <h2 className={styles.panelTitle}>Status</h2>
          <input
            className={`${
              connecting
                ? styles.panelStatusIndicatorYellow
                : !connected
                ? styles.panelStatusIndicatorRed
                : !message
                ? styles.panelStatusIndicatorYellow
                : styles.panelStatusIndicatorGreen
            } ${styles.panelInput}`.trim()}
            value={
              connecting
                ? "CONNECTING"
                : !connected
                ? "NOT CONNECTED"
                : !message
                ? "WAITING"
                : "CONNECTED"
            }
            style={{ userSelect: "none" }}
            disabled={true}
            readOnly={true}
          />
          <button
            type="button"
            disabled={!connected}
            className={styles.panelButton}
            onClick={(_) => (connected === false ? null : setCurrentURL(""))}
            style={{ marginTop: 24, marginBottom: 0 }}
          >
            Disconnect
          </button>
        </form>
      </div>
    </div>
  );
};

export default Hook;
