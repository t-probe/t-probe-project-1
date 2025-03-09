// components/Layout.js
export default function Layout({ children }) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-blue-600 text-white p-4">
          <h1 className="text-xl font-bold">Prediction Market</h1>
        </header>
  
        {/* Main Content */}
        <main className="flex-1 p-4">{children}</main>
  
        {/* Footer */}
        <footer className="bg-blue-600 text-white p-4 text-center">
          <p>Built with ❤️ by Tegg</p>
        </footer>
      </div>
    );
  }
  