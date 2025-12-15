import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [name, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user' as 'user' | 'admin');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      setSuccess("Registration successful! You can now log in.");
      // Optional: Navigate to login page after a short delay
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (err) {
      console.error('Signup error:', err);
      setError("Network error. Please ensure the backend server is running on port 5001.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Create an Account</h2>
        <p className="text-sm text-gray-600">Join SynergySphere to start collaborating.</p>
      </div>
      {error && (
        <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg">
          {error}
        </div>
      )}
      {success && (
        <div className="p-4 text-sm text-green-700 bg-green-100 rounded-lg">
          {success}
        </div>
      )}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="fullname">Full Name</Label>
          <Input
            id="fullname"
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setFullname(e.target.value)}
            autoComplete="name"
            required
          />
        </div>
        <div className="space-y-2">
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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
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
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
