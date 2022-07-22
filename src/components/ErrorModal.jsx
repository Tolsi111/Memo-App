import Fab from '@material-ui/core/Fab';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import "./ErrorModal.css"

function ErrorModal(props) {
    return (
        <div className={"backdrop"}>
            <div className={"modal"}>
                <header>
                    <h2>{props.title}</h2>
                </header>
                <div className={"content"}>
                    <p>{props.message}</p>
                </div>
                <div className={"actions"}>
                    <Fab onClick={props.closeError}>
                        <KeyboardReturnIcon/>
                    </Fab>
                </div>
            </div>
        </div>
    );
}

export default ErrorModal;