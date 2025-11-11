import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    return (
        <nav className="flex w-full items-center justify-between p-4 md:p-8 bg-white dark:bg-gray-900 rounded-lg">
            <input
                type="text"
                placeholder="Masukkan nama kota"
                className="w-1/2 p-3 pl-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 transition-all duration-200"
            />
            <ThemeToggle />
        </nav>
    )
}