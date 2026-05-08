function ErrorBar( {error}) {
    if (!error || error.length === 0) return null;

    return (
        <div id="global-error" className="global-error">
            {Array.isArray(error) ? (
                error.map((err, index) => (
                        <p key={index}>{err}</p>
                    ))
            ) : (
                <p>{error}</p>
            )}
        </div>
    );
}

export default ErrorBar;