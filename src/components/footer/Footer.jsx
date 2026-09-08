import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-orange-500">Inkly</h2>

            <p className="mt-3 max-w-xs text-sm leading-6 text-gray-400">
              A place to write, share, and discover ideas worth reading.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Explore</h3>

            <nav className="flex flex-col gap-3 text-sm">
              <NavLink
                to="/"
                className="text-gray-400 transition hover:text-orange-500"
              >
                Home
              </NavLink>

              <NavLink
                to="/all-posts"
                className="text-gray-400 transition hover:text-orange-500"
              >
                All Posts
              </NavLink>

              <NavLink
                to="/add-post"
                className="text-gray-400 transition hover:text-orange-500"
              >
                Create Post
              </NavLink>
            </nav>
          </div>

          {/* Account */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Account</h3>

            <nav className="flex flex-col gap-3 text-sm">
              <NavLink
                to="/login"
                className="text-gray-400 transition hover:text-orange-500"
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className="text-gray-400 transition hover:text-orange-500"
              >
                Sign Up
              </NavLink>
            </nav>
          </div>

          {/* Contact / Social */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Connect</h3>

            <p className="text-sm leading-6 text-gray-400">
              Built with React and Appwrite.
            </p>

            <div className="mt-4 flex gap-4">
              <a
                href="https://github.com/ayush75847"
                target="_blank"
                className="text-gray-400 hover:text-orange-500"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/ayushrawat9140/"
                target="_blank"
                className="text-gray-400 hover:text-orange-500"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          © 2026 Inkly. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
