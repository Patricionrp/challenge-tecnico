import { useState } from 'react';

export default function Login() {

    const[formData, setFormData] = useState({ 
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    async function handleLogin(e) {
        e.preventDefault();
        const res = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (data.errors){
            setErrors(data.errors);
        }else{
            console.log(data.token);
            localStorage.setItem('token', data.token);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Iniciar Sesion</h1>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <div>
                        <input 
                            type="text" 
                            placeholder="Email" 
                            className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div>
                        <input 
                            type="password" 
                            placeholder="Contraseña" 
                            className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    <button
                        
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Iniciar Sesion
                    </button>
                </form>
            </div>
        </div>
    );
}