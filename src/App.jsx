import './App.css'
import AttractionList from "./attractions/AttractionList.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AttractionEdit from "./attractions/AttractionEdit.jsx";
import AttractionCreate from "./attractions/AttractionCreate.jsx";
import VisiteurList from "./visiteurs/VisiteurList.jsx";
import VisiteurEdit from "./visiteurs/VisiteurEdit.jsx";
import VisiteurCreate from "./visiteurs/VisiteurCreate.jsx";
import Index from "./Index.jsx";
import CategorieList from "./categories/CategorieList.jsx";
import CategorieEdit from "./categories/CategorieEdit.jsx";
import CategorieCreate from "./categories/CategorieCreate.jsx";
import EvenementList from "./evenements/EvenementList.jsx";
import EvenementEdit from "./evenements/EvenementEdit.jsx";
import EvenementCreate from "./evenements/EvenementCreate.jsx";
import TicketList from "./tickets/TicketList.jsx";
import TicketEdit from "./tickets/TicketEdit.jsx";
import TicketCreate from "./tickets/TicketCreate.jsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index/>} />

                <Route path="/attractions" element={<AttractionList />} />
                <Route path="/attractions/edit/:id" element={<AttractionEdit />} />
                <Route path="/attractions/create" element={<AttractionCreate />} />

                <Route path="/visiteurs" element={<VisiteurList />} />
                <Route path="/visiteurs/edit/:id" element={<VisiteurEdit />} />
                <Route path="/visiteurs/create" element={<VisiteurCreate />} />

                <Route path="/categories" element={<CategorieList />} />
                <Route path="/categories/edit/:id" element={<CategorieEdit />} />
                <Route path="/categories/create" element={<CategorieCreate />} />

                <Route path="/evenements" element={<EvenementList />} />
                <Route path="/evenements/edit/:id" element={<EvenementEdit />} />
                <Route path="/evenements/create" element={<EvenementCreate />} />

                <Route path="/tickets" element={<TicketList />} />
                <Route path="/tickets/edit/:id" element={<TicketEdit />} />
                <Route path="/tickets/create" element={<TicketCreate />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
