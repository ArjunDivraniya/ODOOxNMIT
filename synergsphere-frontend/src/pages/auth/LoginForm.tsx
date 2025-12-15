import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    try {
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }
  
      const u = data.user;
      if (!u || !data.token) {
        setError('Malformed response from server');
        return;
      }

      login(
        {
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role,
        },
        data.token,
        { remember }
      );
  
      navigate(u.role === 'admin' ? '/admin/dashboard' : '/dashboard');
  
    } catch (err) {
      console.error('Login error:', err);
      setError("Network error. Please ensure the backend server is running on port 5001.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Welcome Back!</h2>
        <p className="text-sm text-gray-600">Log in to continue to SynergySphere.</p>
      </div>
      {error && (
        <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
      */
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="name@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required 
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <Input 
            id="password" 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required 
          />
        </div>
        <div className="space-y-2">
          <Label>Account Type</Label>
          <Select value={role} onValueChange={(value: 'user' | 'admin') => setRole(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select account type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">Regular User</SelectItem>
              <SelectItem value="admin">Administrator</SelectItem>
            </SelectContent>
          </Select>
          <input type="hidden" name="role" value={role} />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4"
            />
            <span>Remember me for 7 days</span>
          </label>
          <a href="#" className="text-sm font-medium text-blue-600 hover:underline">Need help?</a>
        </div>
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Log In
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
