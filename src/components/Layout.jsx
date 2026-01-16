import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen w-full bg-[#f8fafc] relative">
      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: "20px 30px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col text-gray-800">
        <Header />
        
        <main className="flex-1 container mx-auto px-6 py-16">
          {children}
        </main>
        
        <Footer />
      </div>
    </div>
  );
}