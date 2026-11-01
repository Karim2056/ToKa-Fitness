import "./Modal.css"

export default function Modal({isopen,onclose,children}) {

    // renders nothing if not open
    if (!isopen) return null;

    return(
        <div className="modal-overlay" onClick={onclose}>
            {/* e.propagation prevents closing modal by clicking inside the container */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={onclose}>&times;</button>
                {/* anything inside children is rendered */}
                {children}
            </div>
        </div>
    )
}