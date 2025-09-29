import ShortenForm from "./components/ShortenForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          🔗 URL Shortener
        </h1>
        <ShortenForm />
      </div>
    </div>
  );
}

export default App;
