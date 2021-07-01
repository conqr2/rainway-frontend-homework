const { useState, useEffect } = require("react");

const Hook = (url = "") => {
  const [currentWS, setCurrentWS] = useState(undefined);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState(undefined);
  const [currentError, setCurrentError] = useState(undefined);

  useEffect(
    (_) => {
      try {
        currentWS.close(1000);
      } catch (e) {}
      setReady(false);

      return (_) => {
        try {
          currentWS.close(1000);
        } catch (e) {}
        setReady(false);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [url]
  );

  useEffect(
    (_) => {
      if (url === "") return;
      let socket;
      try {
        socket = new WebSocket(url.trim());
      } catch (e) {
        setCurrentError("Unable to connect");
        return;
      }

      //Workaround for https://stackoverflow.com/questions/31002592/javascript-doesnt-catch-error-in-websocket-instantiation
      setTimeout((_) => {
        if (!socket)
          setCurrentError(
            `[${Math.floor(Date.now() / 1000)}] Connection timeout`
          );
      }, 5000);

      if (!socket) {
        setCurrentError(
          `[${Math.floor(Date.now() / 1000)}] Invalid socket connection`
        );
        return;
      }

      socket.addEventListener("open", (_) => setReady(true));
      socket.addEventListener("message", ({ data }) => {
        let message;
        try {
          message = JSON.parse(data);
        } catch (e) {
          return;
        }
        setMessage(message);
      });
      socket.addEventListener("close", ({ code }) => {
        if (code === 1000) setMessage(undefined);
        setReady(false);
      });
      socket.addEventListener("error", (_) =>
        setCurrentError(
          `[${Math.floor(Date.now() / 1000)}] Socket returned error`
        )
      );
      setCurrentWS(socket);
    },

    [setCurrentWS, url]
  );
  return { ready, message, error: currentError };
};

export default Hook;
