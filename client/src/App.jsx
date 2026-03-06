// App.jsx — Main application with routing and global providers
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home/Home';
import Services from './pages/Services/Services';
import Pricing from './pages/Pricing/Pricing';
import Contact from './pages/Contact/Contact';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Dashboard from './pages/Dashboard/Dashboard';
import Admin from './pages/Admin/Admin';
import CustomProjectBuilder from './pages/CustomProject/CustomProjectBuilder';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Protected Routes */}
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>} />
                <Route path="/custom-project" element={<ProtectedRoute><CustomProjectBuilder /></ProtectedRoute>} />
              </Routes>
            </main>
            <Footer />
          </div>
          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: { borderRadius: '12px', padding: '12px 16px', fontSize: '14px' },
              success: { iconTheme: { primary: '#22c55e', secondary: '#fff' } },
              error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
            }}
          />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
