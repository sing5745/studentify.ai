"use client";

import { Bot, GraduationCap, Globe2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Bot className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">StudyAbroad AI Advisor</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your intelligent companion for studying abroad in USA, UK, Australia, and Canada. Get instant answers about admissions, visas, and immigration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {destinations.map((destination) => (
            <Card key={destination.name} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <Globe2 className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-semibold">{destination.name}</h2>
              </div>
              <p className="text-muted-foreground">{destination.description}</p>
            </Card>
          ))}
        </div>

        <div className="flex justify-center gap-6">
          <Link href="/chat">
            <Button size="lg" className="gap-2">
              <MessageSquare className="h-5 w-5" />
              Start Chatting
            </Button>
          </Link>
          <Link href="/admin">
            <Button variant="outline" size="lg" className="gap-2">
              <GraduationCap className="h-5 w-5" />
              Admin Portal
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

const destinations = [
  {
    name: "USA",
    description: "Navigate the American education system, F-1 visa process, and OPT opportunities.",
  },
  {
    name: "UK",
    description: "Understand Tier 4 visas, Russell Group universities, and post-study work options.",
  },
  {
    name: "Australia",
    description: "Learn about student visas, top universities, and graduate work rights.",
  },
  {
    name: "Canada",
    description: "Explore study permits, college options, and post-graduation work permits.",
  },
];