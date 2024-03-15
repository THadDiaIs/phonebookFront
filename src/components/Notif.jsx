const Notif = ({conf}) => {
  //warn is a boolean var
  const infoStyles = {
    display: "flex",
    position: "fixed",
    top: 10,
    right: 10,
    minWidth: 120,
    maxWidth: 300,
    padding: "1em 2em",
    backgroundColor: "#aea8a8",
    color: "green",
    borderRadius: "0.7em",
    border: "2px solid green",
    opacity: 0.9
  }
  const warnStyles = {
    display: "flex",
    position: "fixed",
    top: 10,
    right: 10,
    minWidth: 120,
    maxWidth: 300,
    padding: "1em 2em",
    backgroundColor: "#aea8a8",
    color: "red",
    borderRadius: "0.7em",
    border: "2px solid red",
    opacity: 0.9
  }
    if (conf[0]) {
      return (
        <div style={ conf[1] ? warnStyles : infoStyles}>
          {conf[0]}
        </div>
      )
    }
}

export default Notif
