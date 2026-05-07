import { Outlet, Link } from "react-router-dom";

function Layout() {
    return (
        <div className="app-container">
            <aside className="sidebar">
                <div className="sidebar-logo">
                    <div className="sidebar-logo-icon">P</div>
                    <div className="sidebar-logo-text">
                        <span>ParcAdmin</span>
                        <small>TP2 Web 2026</small>
                    </div>
                </div>
                <div className="sidebar-section">Menu</div>
                <Link to="/attractions" className="nav-item"><div className="nav-dot"></div>Attractions</Link>
                <Link to="/visiteurs" className="nav-item"><div className="nav-dot"></div>Visiteurs</Link>
                <Link to="/categories" className="nav-item"><div className="nav-dot"></div>Catégories</Link>
                <Link to="/evenements" className="nav-item"><div className="nav-dot"></div>Événements</Link>
                <Link to="/tickets" className="nav-item"><div className="nav-dot"></div>Tickets</Link>
            </aside>

            <div className="main-wrapper">
                <header className="main-header">
                    <span className="main-header-title">Parc d'Attractions</span>
                </header>
                <main className="content">
                    <Outlet />
                </main>
                <footer className="main-footer">2026 Parc d'Attractions — TP2 Web</footer>
            </div>
        </div>
    );
}

export default Layout;