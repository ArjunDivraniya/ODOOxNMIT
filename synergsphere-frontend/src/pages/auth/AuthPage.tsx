import { useEffect, useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(isAdmin ? '/admin/dashboard' : '/dashboard', { replace: true });
    }
  }, [isAuthenticated, isAdmin, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center p-4">
        
        {/* Illustration Section */}
        <div className="w-full lg:w-1/2 flex justify-center items-center mb-8 lg:mb-0">
          <img src="/project-illustration.svg" alt="Project Collaboration Illustration" className="max-w-md w-full" />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
            {isLoginView ? <LoginForm /> : <SignupForm />}
            <p className="text-center text-sm text-gray-600 mt-6">
              {isLoginView ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => setIsLoginView(!isLoginView)} 
                className="font-semibold text-blue-600 hover:text-blue-700 ml-1"
              >
                {isLoginView ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;
