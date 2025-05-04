import { Link } from "react-router";

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-gradient-to-r from-cyan-700 to-emerald-700 py-4 shadow-sm">
        <nav className="container mx-auto flex items-center justify-between">
          <h1 className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-2xl font-bold text-transparent">
            ItsAydrian LLC
          </h1>
          <ul className="flex space-x-6">
            <li>
              <a
                href="#home"
                className="text-gray-100 transition duration-300 hover:text-emerald-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="text-gray-100 transition duration-300 hover:text-emerald-300"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="text-gray-100 transition duration-300 hover:text-emerald-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-gray-100 transition duration-300 hover:text-emerald-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section
          id="home"
          className="bg-gradient-to-br from-cyan-50 to-emerald-50 py-20 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-gray-800 md:text-6xl">
            Empowering Developers, Elevating Technology
          </h2>
          <p className="mb-8 text-xl text-gray-600">
            Your partner in Developer Relations and cutting-edge app development
          </p>
          <Link
            to="mailto:howdy@itsaydrian.com"
            className="rounded bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-3 font-bold text-white shadow-md transition duration-300 hover:from-cyan-600 hover:to-emerald-600 hover:shadow-lg"
          >
            Contact Us
          </Link>
        </section>

        <section id="services" className="bg-white py-20">
          <div className="container mx-auto">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-800">
              Our Services
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-gray-50 p-6 shadow-md transition duration-300 hover:shadow-lg">
                <h3 className="mb-4 text-xl font-semibold text-cyan-600">
                  Developer Relations Consulting
                </h3>
                <p className="text-gray-600">
                  Enhance your developer community engagement and strategy
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-6 shadow-md transition duration-300 hover:shadow-lg">
                <h3 className="mb-4 text-xl font-semibold text-emerald-600">
                  Web Application Development
                </h3>
                <p className="text-gray-600">
                  Create powerful and responsive web applications
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-6 shadow-md transition duration-300 hover:shadow-lg">
                <h3 className="mb-4 text-xl font-semibold text-cyan-600">
                  Mobile App Development
                </h3>
                <p className="text-gray-600">
                  Build cross-platform mobile apps using Expo and React Native
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="bg-gradient-to-br from-cyan-50 to-emerald-50 py-20"
        >
          <div className="container mx-auto">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
              About ItsAydrian LLC
            </h2>
            <p className="mx-auto max-w-2xl text-center text-gray-600">
              ItsAydrian LLC is a technology consulting firm specializing in
              Developer Relations and application development. We bridge the gap
              between companies and developer communities while delivering
              top-notch web and mobile solutions.
            </p>
          </div>
        </section>

        <section id="contact" className="bg-white py-20">
          <div className="container mx-auto text-center">
            <h2 className="mb-8 text-3xl font-bold text-gray-800">
              Get in Touch
            </h2>
            <p className="mb-8 text-gray-600">
              Ready to elevate your developer relations or start your next
              project?
            </p>
            <Link
              to="mailto:howdy@itsaydrian.com"
              className="rounded bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-3 font-bold text-white shadow-md transition duration-300 hover:from-cyan-600 hover:to-emerald-600 hover:shadow-lg"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 py-6 text-center text-white">
        <p>&copy; 2025 ItsAydrian LLC. All rights reserved.</p>
      </footer>
    </div>
  );
}
