import {Link} from "react-router-dom";

function Index() {
    return (
        <>
            <Link to={'/attractions'}> Attractions</Link>
            <Link to={'/visiteurs'}> Visiteurs</Link>
            <Link to={'/categories'}> Categories</Link>
            <Link to={'/evenements'}> Evenements</Link>
            <Link to={'/tickets'}> Tickets</Link>
        </>
    )
}

export default Index;