import { Outlet, Link } from "react-router-dom";

function Layout() {
    return (
        <div className="app-container">
            <header className="main-header">
                <nav>
                    <div>
                        <nav className="nav-container">
                            <Link to="/attractions">
                                <button>Attractions</button>
                            </Link>
                            <Link to="/visiteurs">
                                <button>Visiteurs</button>
                            </Link>
                            <Link to="/categories">
                                <button>Catégories</button>
                            </Link>
                            <Link to="/evenements">
                                <button>Événements</button>
                            </Link>
                            <Link to="/tickets">
                                <button>Tickets</button>
                            </Link>
                        </nav>
                    </div>
                </nav>
            </header>

            <main className="content">
                {}
                <Outlet />
            </main>

            <footer className="main-footer">
                <p>2026 Parc d'Attractions TP2 Web</p>
            </footer>
        </div>
    );
}

export default Layout;