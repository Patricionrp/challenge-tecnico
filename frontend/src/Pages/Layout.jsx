import { Link, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export default function Layout() {
    const { user, token, setUser, setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleLogout(e) {
        e.preventDefault();

        const res = await fetch("/api/logout", {
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();
        console.log(data);

        if (res.ok) {
            setUser(null);
            setToken(null);
            localStorage.removeItem("token");
            navigate("/");
        }
    }

    return (
        <>
            <header className="bg-gray-800 text-white shadow-md">
                <nav className="container mx-auto flex justify-between items-center py-4 px-6">
                    <Link to="/" className="text-lg font-bold hover:text-gray-300">
                        Home
                    </Link>

                    {user ? (
                        <div className="flex items-center space-x-6">
                            <p className="text-sm text-gray-400">Bienvenido {user.name}</p>
                            <form onSubmit={handleLogout}>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                    type="submit"
                                >
                                    Logout
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="space-x-4">
                            <Link
                                to="/register"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                            >
                                Registrarse
                            </Link>
                            <Link
                                to="/login"
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                            >
                                Iniciar Sesión
                            </Link>
                        </div>
                    )}
                </nav>
            </header>

            <main className="container mx-auto py-8 px-6">
                <Outlet />
            </main>
        </>
    );
}
