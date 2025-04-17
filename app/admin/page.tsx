"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, LogIn, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newEntry, setNewEntry] = useState({
    question: "",
    answer: "",
    category: "",
    tags: "",
  });

  const supabase = createClient();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      setIsAuthenticated(true);
      toast.success("Logged in successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tags = newEntry.tags.split(',').map(tag => tag.trim());
      
      const { data, error } = await supabase
        .from('knowledge_entries')
        .insert([
          {
            question: newEntry.question,
            answer: newEntry.answer,
            category: newEntry.category,
            tags,
          }
        ]);

      if (error) throw error;

      setNewEntry({ question: "", answer: "", category: "", tags: "" });
      toast.success("Entry added successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const addTestData = async () => {
    const testEntries = [
      {
        question: "What are the requirements for an F-1 student visa in the USA?",
        answer: "To obtain an F-1 student visa for the USA, you need: 1) An acceptance letter from a SEVP-approved school, 2) Form I-20 from your school, 3) Proof of financial support, 4) Valid passport, 5) Completed DS-160 form, 6) Visa application fee payment, 7) Strong ties to your home country. You must also attend a visa interview at a U.S. embassy or consulate.",
        category: "USA",
        tags: ["visa", "F-1", "requirements"]
      },
      {
        question: "How much bank balance is required for a UK student visa?",
        answer: "For a UK student visa, you must show enough money to cover your tuition fees and living costs. You need to show living costs of £1,334 per month for courses in London or £1,023 per month for courses outside London, for up to 9 months. This is in addition to your first year's tuition fees. The funds must be held in your account for at least 28 consecutive days.",
        category: "UK",
        tags: ["visa", "finances", "requirements"]
      },
      {
        question: "What is the post-study work visa duration in Canada?",
        answer: "In Canada, the Post-Graduation Work Permit (PGWP) duration depends on your study program length. For programs 8 months to 2 years, you can get a PGWP equal to your program length. For programs 2 years or longer, you can get a 3-year PGWP. The minimum program length requirement is 8 months, and you must have studied full-time.",
        category: "Canada",
        tags: ["PGWP", "work permit", "post-graduation"]
      }
    ];

    try {
      for (const entry of testEntries) {
        const { error } = await supabase
          .from('knowledge_entries')
          .insert([entry]);
        
        if (error) throw error;
      }
      toast.success("Test data added successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-md">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Knowledge Base Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={addTestData}>
            Add Test Data
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
      
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Question</label>
            <Input
              value={newEntry.question}
              onChange={(e) => setNewEntry({ ...newEntry, question: e.target.value })}
              placeholder="Enter a common question..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Answer</label>
            <Textarea
              value={newEntry.answer}
              onChange={(e) => setNewEntry({ ...newEntry, answer: e.target.value })}
              placeholder="Provide a detailed answer..."
              rows={6}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <Input
                value={newEntry.category}
                onChange={(e) => setNewEntry({ ...newEntry, category: e.target.value })}
                placeholder="e.g., Visa, Admissions..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Tags</label>
              <Input
                value={newEntry.tags}
                onChange={(e) => setNewEntry({ ...newEntry, tags: e.target.value })}
                placeholder="Comma-separated tags..."
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setNewEntry({ question: "", answer: "", category: "", tags: "" })}
            >
              Clear
            </Button>
            <Button type="submit">
              <Plus className="h-4 w-4 mr-2" />
              Add Entry
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}