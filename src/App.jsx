import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/authSlice";
import authService from "./appwrite/auth";
import { Header, Footer, Container } from "./components//index";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    async function currentUserInfo() {
      try {
        const currUser = await authService.getCurrentUser();
        if (currUser) dispatch(login({ userData: currUser }));
        else dispatch(logout());
      } catch (error) {
        console.log("current user error", error);
      } finally {
        setLoading(false);
      }
    }
    currentUserInfo();
  }, []);

  if (loading) {
    return (
      <>
        <div>
          <h1>Loading!</h1>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex min-h-screen flex-col bg-[#0b0b0b] text-white">
          <Header />

          <main className="flex-1">
            <Container>
              <Outlet />
            </Container>
          </main>

          <Footer />
        </div>
      </>
    );
  }
}

export default App;
