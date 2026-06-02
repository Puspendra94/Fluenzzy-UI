import { useState } from "react";
import { Header, Footer, Sidebar } from "@/components/layout";
import { Container, Button, Input, Card, CardContent } from "@/components/micro";
import { Send, FileText } from "lucide-react";

interface Conversation {
  id: string;
  name: string;
  role: string;
  campaign: string;
  avatar: string;
  lastMessage: string;
  unread: number;
}

const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "John Smith",
    role: "Brand Manager",
    campaign: "Tech Product Launch",
    avatar: "JS",
    lastMessage: "Thanks for the demo video! Looks great.",
    unread: 2,
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "Agency Manager",
    campaign: "Summer Collection",
    avatar: "SC",
    lastMessage: "Can you adjust the video length to 45 seconds?",
    unread: 0,
  },
  {
    id: "3",
    name: "Michael Brown",
    role: "Brand Manager",
    campaign: "Beauty Campaign Q2",
    avatar: "MB",
    lastMessage: "Perfect! Payment sent.",
    unread: 0,
  },
];

export default function InfluencerMessages() {
  const [selectedConversation, setSelectedConversation] = useState<string>("1");
  const [messages, setMessages] = useState<Array<{ text: string; sender: "me" | "them" }>>([
    { text: "Hi! I'm interested in collaborating with you", sender: "them" },
    {
      text: "I'd love to work on the Tech Product Launch campaign",
      sender: "them",
    },
    { text: "Thanks! I'm excited about this opportunity", sender: "me" },
    { text: "Let me share the campaign brief with you", sender: "them" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { text: newMessage, sender: "me" }]);
      setNewMessage("");
    }
  };

  const currentConversation = mockConversations.find(
    (c) => c.id === selectedConversation
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isAuthenticated userRole="influencer" />

      <div className="flex-grow flex">
        <Sidebar userRole="influencer" />

        <main className="flex-grow">
          <div className="h-full flex bg-muted/10">
            {/* Conversations List */}
            <div className="w-80 border-r border-border bg-background">
              <div className="p-4 border-b border-border">
                <h2 className="font-semibold text-foreground">Messages</h2>
                <p className="text-xs text-foreground/60 mt-1">
                  {mockConversations.length} conversations
                </p>
              </div>

              <div className="overflow-y-auto h-full">
                {mockConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`w-full px-4 py-4 border-b border-border text-left hover:bg-muted/50 transition-colors ${
                      selectedConversation === conversation.id
                        ? "bg-primary/10 border-l-4 border-l-primary"
                        : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                        {conversation.avatar}
                      </div>
                      <div className="min-w-0 flex-grow">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-semibold text-foreground text-sm truncate">
                            {conversation.name}
                          </p>
                          {conversation.unread > 0 && (
                            <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                              {conversation.unread}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-foreground/60">
                          {conversation.role}
                        </p>
                        <p className="text-xs text-foreground/50 truncate mt-1">
                          {conversation.lastMessage}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat View */}
            {currentConversation && (
              <div className="flex-grow flex flex-col">
                {/* Header */}
                <div className="bg-background border-b border-border p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {currentConversation.name}
                    </h3>
                    <p className="text-xs text-foreground/60 mt-1">
                      {currentConversation.campaign}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Share Brief
                  </Button>
                </div>

                {/* Messages */}
                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                  {messages.map((message, idx) => (
                    <div
                      key={idx}
                      className={`flex ${
                        message.sender === "me" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          message.sender === "me"
                            ? "bg-primary text-primary-foreground rounded-br-none"
                            : "bg-muted text-foreground rounded-bl-none"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="bg-background border-t border-border p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                    />
                    <Button onClick={handleSend} className="flex-shrink-0">
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
