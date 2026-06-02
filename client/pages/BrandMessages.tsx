import { useState } from "react";
import { Header, Footer, Sidebar } from "@/components/layout";
import { Container, Input } from "@/components/micro";
import { Send, Search, Hash, Lock, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  name: string;
  type: "agency" | "influencer";
  avatar: string;
  unread: number;
  lastMessage: string;
  lastMessageTime: string;
  participants: string[];
}

interface Message {
  id: string;
  sender: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
}

const mockConversationsData: Record<"agency" | "influencer", Conversation[]> = {
  agency: [
    {
      id: "1",
      name: "Creative Minds Agency",
      type: "agency",
      avatar: "🏢",
      unread: 2,
      lastMessage: "We'll start the influencer outreach next week",
      lastMessageTime: "2 min",
      participants: ["John", "Sarah"],
    },
    {
      id: "2",
      name: "Digital Growth Co",
      type: "agency",
      avatar: "📊",
      unread: 0,
      lastMessage: "Campaign metrics look great!",
      lastMessageTime: "1h",
      participants: ["Mike"],
    },
  ],
  influencer: [
    {
      id: "3",
      name: "Alex Johnson (@alexjohnson)",
      type: "influencer",
      avatar: "👤",
      unread: 1,
      lastMessage: "Sure! I'll have the content ready by Friday",
      lastMessageTime: "30 min",
      participants: ["Alex"],
    },
    {
      id: "4",
      name: "Sarah Chen (@sarahchenart)",
      type: "influencer",
      avatar: "🎨",
      unread: 0,
      lastMessage: "Thanks for the opportunity!",
      lastMessageTime: "2h",
      participants: ["Sarah"],
    },
    {
      id: "5",
      name: "Mike Davis (@mikedavis)",
      type: "influencer",
      avatar: "🎯",
      unread: 0,
      lastMessage: "Looking forward to the project",
      lastMessageTime: "5h",
      participants: ["Mike"],
    },
  ],
};

const mockMessages: Message[] = [
  {
    id: "1",
    sender: "Creative Minds Agency",
    senderAvatar: "🏢",
    content: "Hi! Thanks for partnering with us on this campaign.",
    timestamp: "09:30 AM",
    isCurrentUser: false,
  },
  {
    id: "2",
    sender: "You",
    senderAvatar: "👨‍💼",
    content: "Great! Looking forward to working together.",
    timestamp: "09:32 AM",
    isCurrentUser: true,
  },
  {
    id: "3",
    sender: "Creative Minds Agency",
    senderAvatar: "🏢",
    content: "We've identified 5 perfect influencers for your campaign.",
    timestamp: "10:15 AM",
    isCurrentUser: false,
  },
  {
    id: "4",
    sender: "Creative Minds Agency",
    senderAvatar: "🏢",
    content: "We'll start the influencer outreach next week",
    timestamp: "10:20 AM",
    isCurrentUser: false,
  },
  {
    id: "5",
    sender: "You",
    senderAvatar: "👨‍💼",
    content: "Perfect! What's the estimated timeline?",
    timestamp: "10:45 AM",
    isCurrentUser: true,
  },
];

export default function BrandMessages() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(
    mockConversationsData.agency[0]
  );
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const allConversations = [
    ...mockConversationsData.agency,
    ...mockConversationsData.influencer,
  ];

  const filteredConversations = allConversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log("Message sent:", messageInput);
      setMessageInput("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header isAuthenticated userRole="brand" />

      <div className="flex-grow flex">
        <Sidebar userRole="brand" />

        <main className="flex-grow flex">
          {/* Conversations Sidebar */}
          <div className="w-72 bg-sidebar border-r border-sidebar-border flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-sidebar-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-sidebar-foreground">
                  Messages
                </h2>
                <button className="p-2 hover:bg-sidebar-accent/50 rounded-lg transition-colors text-sidebar-foreground">
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-sidebar-foreground/50" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 bg-sidebar-accent/30 text-sidebar-foreground placeholder:text-sidebar-foreground/50 rounded-lg focus:outline-none focus:bg-sidebar-accent/50 transition-colors text-sm"
                />
              </div>
            </div>

            {/* Conversation List */}
            <div className="flex-grow overflow-y-auto">
              {/* Agencies Section */}
              {mockConversationsData.agency.length > 0 && (
                <div>
                  <div className="px-4 py-3 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">
                    Agencies
                  </div>
                  {mockConversationsData.agency.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={cn(
                        "w-full px-4 py-3 text-left transition-colors border-l-4",
                        selectedConversation.id === conv.id
                          ? "bg-sidebar-accent/30 border-sidebar-primary text-sidebar-accent-foreground"
                          : "border-transparent hover:bg-sidebar-accent/20 text-sidebar-foreground"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl flex-shrink-0">{conv.avatar}</span>
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h3 className="font-semibold text-sm truncate">
                              {conv.name}
                            </h3>
                            {conv.unread > 0 && (
                              <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full flex-shrink-0">
                                {conv.unread}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-sidebar-foreground/60 truncate">
                            {conv.lastMessage}
                          </p>
                          <p className="text-xs text-sidebar-foreground/50 mt-1">
                            {conv.lastMessageTime}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Influencers Section */}
              {mockConversationsData.influencer.length > 0 && (
                <div>
                  <div className="px-4 py-3 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider">
                    Influencers
                  </div>
                  {mockConversationsData.influencer.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv)}
                      className={cn(
                        "w-full px-4 py-3 text-left transition-colors border-l-4",
                        selectedConversation.id === conv.id
                          ? "bg-sidebar-accent/30 border-sidebar-primary text-sidebar-accent-foreground"
                          : "border-transparent hover:bg-sidebar-accent/20 text-sidebar-foreground"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl flex-shrink-0">{conv.avatar}</span>
                        <div className="flex-grow min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h3 className="font-semibold text-sm truncate">
                              {conv.name}
                            </h3>
                            {conv.unread > 0 && (
                              <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full flex-shrink-0">
                                {conv.unread}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-sidebar-foreground/60 truncate">
                            {conv.lastMessage}
                          </p>
                          <p className="text-xs text-sidebar-foreground/50 mt-1">
                            {conv.lastMessageTime}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-grow flex flex-col bg-background">
            {/* Chat Header */}
            <div className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{selectedConversation.avatar}</span>
                <div>
                  <h2 className="font-bold text-foreground">
                    {selectedConversation.name}
                  </h2>
                  <p className="text-sm text-foreground/60">
                    {selectedConversation.type === "agency"
                      ? `${selectedConversation.participants.join(", ")} from agency`
                      : `@${selectedConversation.name.split("(")[1]?.slice(0, -1) || "user"}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {mockMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex gap-3",
                    msg.isCurrentUser && "flex-row-reverse"
                  )}
                >
                  <span className="text-3xl flex-shrink-0">{msg.senderAvatar}</span>
                  <div
                    className={cn(
                      "max-w-md",
                      msg.isCurrentUser && "text-right"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-foreground text-sm">
                        {msg.sender}
                      </p>
                      <p className="text-xs text-foreground/50">
                        {msg.timestamp}
                      </p>
                    </div>
                    <div
                      className={cn(
                        "rounded-lg px-4 py-2 inline-block",
                        msg.isCurrentUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      )}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="border-t border-border bg-card px-6 py-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                  className="flex-grow px-4 py-3 rounded-lg border-2 border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-colors"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
