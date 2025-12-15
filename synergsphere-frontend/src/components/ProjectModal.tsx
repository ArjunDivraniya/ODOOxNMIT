import { useState } from 'react';
import { Calendar, Users, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { mockUsers } from '@/lib/mockData';

interface ProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProjectModal({ open, onOpenChange }: ProjectModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    members: [] as string[],
    passkey: ''
  });

  const generatePasskey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, passkey: result }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Transform members from IDs to emails (based on mockUsers)
    const teamMemberEmails = formData.members.map(
      id => mockUsers.find(user => user.id === id)?.email
    ).filter(Boolean) as string[];
  
    const payload = {
      name: formData.name,
      description: formData.description,
      startDate: formData.startDate,
      endDate: formData.endDate,
      teamMemberEmails, // Backend expects emails
      passkey: formData.passkey
    };
  
    try {
      const res = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        throw new Error("Failed to create project");
      }
  
      const data = await res.json();
      console.log("✅ Project created:", data);
  
      // Close modal & reset form
      onOpenChange(false);
      setFormData({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        members: [],
        passkey: ''
      });
  
    } catch (error) {
      console.error("❌ Error creating project:", error);
    }
  };
  

  const toggleMember = (userId: string) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.includes(userId)
        ? prev.members.filter(id => id !== userId)
        : [...prev.members, userId]
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">+</span>
            </div>
            <span>Create New Project</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter project name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your project"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Team Members</Label>
            <div className="space-y-2">
              {mockUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-2 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleMember(user.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-xs">{user.avatar}</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  {formData.members.includes(user.id) && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      Selected
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Project Passkey</Label>
            <div className="flex space-x-2">
              <Input
                value={formData.passkey}
                onChange={(e) => setFormData(prev => ({ ...prev, passkey: e.target.value }))}
                placeholder="Auto-generated passkey"
                readOnly
              />
              <Button type="button" variant="outline" onClick={generatePasskey}>
                <Key className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Team members will use this passkey to join the project
            </p>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              Create Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}