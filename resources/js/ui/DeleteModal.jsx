import classes from "./DeleteModal.module.css";

function Modal(props) {
    function confirmHandler() {
        props.onConfirm();
    }

    function cancelHandler() {
        props.onCancel();
    }

    return (
        <div className={classes.modal}>
            <p className="mb-5">Are you sure?</p>
            <button className={`${classes.button} ${classes.buttonCancel}`} onClick={cancelHandler}>Cancel</button>
            <button className={`${classes.button} ${classes.buttonDelete}`} onClick={confirmHandler}>Confirm</button>
        </div>
    )
}

export default Modal;
