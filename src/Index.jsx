import {Link} from "react-router-dom";

function Index() {
    return (
        <>
            <Link to={'/attractions'}> Attractions</Link>
            <Link to={'/visiteurs'}> Visiteurs</Link>
        </>
    )
}

export default Index;