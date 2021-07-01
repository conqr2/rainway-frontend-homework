import styles from "./styles.module.css";

//The higher this is the more obvious thumbstick changes will be
const maxOffset = 12;

const Hook = ({ message }) => {
  const buttonsActive = {
    x: !(!message || !message.buttons || !message.buttons.x),
    y: !(!message || !message.buttons || !message.buttons.y),
    a: !(!message || !message.buttons || !message.buttons.a),
    b: !(!message || !message.buttons || !message.buttons.b),
  };

  const offsets = {
    left: {
      x:
        !message || !message.thumbsticks || !message.thumbsticks.left
          ? 0
          : Number(message.thumbsticks.left.x) * maxOffset,
      y:
        !message || !message.thumbsticks || !message.thumbsticks.left
          ? 0
          : Number(message.thumbsticks.left.y) * maxOffset,
    },
    right: {
      x:
        !message || !message.thumbsticks || !message.thumbsticks.right
          ? 0
          : Number(message.thumbsticks.right.x) * maxOffset,
      y:
        !message || !message.thumbsticks || !message.thumbsticks.right
          ? 0
          : Number(message.thumbsticks.right.y) * maxOffset,
    },
  };

  return (
    <div className={styles.root}>
      <div
        className={`${styles.controller} ${
          !message ? styles.controllerInactive : ""
        }`.trim()}
      >
        <div className={styles.controllerInteractive}>
          <div
            className={styles.thumbstick}
            style={{ left: 164 + offsets.left.x, top: 129 + offsets.left.y }}
          >
            <span></span>
          </div>
          <div
            className={styles.thumbstick}
            style={{ left: 442 + offsets.right.x, top: 237 + offsets.right.y }}
          >
            <span></span>
          </div>
          <div
            className={`${styles.button} ${
              buttonsActive.x ? styles.buttonActive : ""
            }`.trim()}
            style={{ left: 485, top: 135, color: "#13A1DA" }}
          >
            X
          </div>
          <div
            className={`${styles.button} ${
              buttonsActive.b ? styles.buttonActive : ""
            }`.trim()}
            style={{ left: 582, top: 137, color: "#DF323B" }}
          >
            B
          </div>
          <div
            className={`${styles.button} ${
              buttonsActive.y ? styles.buttonActive : ""
            }`.trim()}
            style={{ left: 535, top: 88, color: "#F2E110" }}
          >
            Y
          </div>
          <div
            className={`${styles.button} ${
              buttonsActive.a ? styles.buttonActive : ""
            }`.trim()}
            style={{ left: 532, top: 182, color: "#94C761" }}
          >
            A
          </div>
        </div>
        <div className={styles.controllerSkin}></div>
        <div className={styles.controllerBody}></div>
      </div>
    </div>
  );
};

export default Hook;
