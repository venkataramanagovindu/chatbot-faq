export default function Sidenav() {
    return (
        <div className="flex flex-col h-screen bg-gray-800 text-white">
            <div className="flex items-center justify-center h-16 bg-gray-900">
                <h1 className="text-lg font-bold">My App</h1>
            </div>
            <nav className="flex-1">
                <ul className="space-y-2 p-4">
                    <li>
                        <a href="#" className="block p-2 hover:bg-gray-700 rounded">
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block p-2 hover:bg-gray-700 rounded">
                            Settings
                        </a>
                    </li>
                    <li>
                        <a href="#" className="block p-2 hover:bg-gray-700 rounded">
                            Profile
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="flex items-center justify-center h-16 bg-gray-900">
                <p className="text-sm">© 2023 My App</p>
            </div>
        </div>
    );
}