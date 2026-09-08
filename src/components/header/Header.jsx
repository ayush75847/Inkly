import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { LogoutBtn, Container } from "../index";
import Home from "../../pages/Home";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Sign up",
      slug: "/signup",
      active: !authStatus,
    },
  ];
  return (
    <>
      <header className="border-b border-gray-800 bg-black text-white">
        <Container>
          <nav className="flex min-h-20 items-center justify-between px-4 sm:px-6">
            {/* Logo */}
            <div>
              <NavLink
                to="/"
                className="text-2xl font-bold text-orange-500 transition hover:text-orange-400"
              >
                Inkly
              </NavLink>
            </div>

            {/* Navigation */}
            <ul className="flex flex-1 items-center justify-center gap-2 sm:gap-5">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-400 transition hover:bg-gray-900 hover:text-orange-500"
                    >
                      {item.name}
                    </button>
                  </li>
                ) : null,
              )}

              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </nav>
        </Container>
      </header>
    </>
  );
}

export default Header;
