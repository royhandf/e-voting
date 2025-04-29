export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 pt-6 sm:pt-0">
            {children}
        </div>
    );
}
