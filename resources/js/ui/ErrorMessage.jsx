function ErrorMessage({ message }) {
    return (
        <div className="text-sm bg-red-100 border mb-4 border-red-400 text-red-700 px-3 py-2 rounded relative" role="alert">
            <span className="block sm:inline">{message.split('\n').map((item, key) => {
                return <span key={key}>{item}<br/></span>
            })}</span>
        </div>
    );
}

export default ErrorMessage;
