import { BrowserRouter, Routes, Route } from "react-router";
import AddInfoPage from "./Components/AddInfoPage";
import Login from "./Components/Login";
import PageCategory from "./Components/naim/Comp/PageCategory";
import UserProfilePage from "./Components/naim/Comp/UserProfilePage";
import HomePage from "./Components/naim/Comp/HomePage";

function App() {
  const token = localStorage.getItem("authToken")

  return (
    <>
      <BrowserRouter>
        <Routes>
          {
            token ?
              <Route>
                <Route index element={<HomePage />} />
                <Route path="/:category" element={<PageCategory />} />
                <Route path="/users/:id" element={< UserProfilePage />} />
                <Route path="/groups/add-info" element={<AddInfoPage />} />
              </Route>
              :
              <Route>
                <Route index element={<Login />} />
              </Route>
          }
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
