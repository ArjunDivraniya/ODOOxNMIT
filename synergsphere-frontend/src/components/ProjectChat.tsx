// import { useState } from 'react';
// import { Send, Reply } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { ScrollArea } from '@/components/ui/scroll-area';
// import { chatMessages, ChatMessage, currentUser } from '@/lib/userMockData';
// import { format } from 'date-fns';

// interface ProjectChatProps {
//   projectId: string;
// }

// export default function ProjectChat({ projectId }: ProjectChatProps) {
//   const [messages, setMessages] = useState(chatMessages.filter(msg => msg.projectId === projectId));
//   const [newMessage, setNewMessage] = useState('');
//   const [replyingTo, setReplyingTo] = useState<string | null>(null);

//   const handleSendMessage = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newMessage.trim()) return;

//     const message: ChatMessage = {
//       id: Date.now().toString(),
//       projectId,
//       userId: currentUser.id,
//       user: currentUser,
//       message: newMessage,
//       timestamp: new Date().toISOString(),
//       replyTo: replyingTo || undefined
//     };

//     setMessages(prev => [...prev, message]);
//     setNewMessage('');
//     setReplyingTo(null);
//   };

//   const getReplyToMessage = (messageId: string) => {
//     return messages.find(msg => msg.id === messageId);
//   };

//   return (
//     <Card className="h-96 flex flex-col">
//       <CardHeader className="pb-3">
//         <CardTitle className="text-lg">Project Discussion</CardTitle>
//       </CardHeader>
//       <CardContent className="flex-1 flex flex-col p-0">
//         <ScrollArea className="flex-1 px-4">
//           <div className="space-y-4 pb-4">
//             {messages.map((message) => {
//               const replyToMessage = message.replyTo ? getReplyToMessage(message.replyTo) : null;
//               const isCurrentUser = message.userId === currentUser.id;
              
//               return (
//                 <div key={message.id} className="space-y-2">
//                   {replyToMessage && (
//                     <div className="ml-8 p-2 bg-gray-100 rounded text-sm text-gray-600 border-l-2 border-gray-300">
//                       <span className="font-medium">{replyToMessage.user.name}:</span> {replyToMessage.message}
//                     </div>
//                   )}
                  
//                   <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
//                     <div className={`max-w-xs lg:max-w-md ${isCurrentUser ? 'order-2' : 'order-1'}`}>
//                       <div className={`flex items-center space-x-2 mb-1 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
//                         {!isCurrentUser && (
//                           <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
//                             <span className="text-white font-medium text-xs">{message.user.avatar}</span>
//                           </div>
//                         )}
//                         <span className="text-sm font-medium text-gray-900">{message.user.name}</span>
//                         <span className="text-xs text-gray-500">
//                           {format(new Date(message.timestamp), 'HH:mm')}
//                         </span>
//                       </div>
                      
//                       <div className={`p-3 rounded-lg ${
//                         isCurrentUser 
//                           ? 'bg-blue-500 text-white' 
//                           : 'bg-gray-100 text-gray-900'
//                       }`}>
//                         <p className="text-sm">{message.message}</p>
//                       </div>
                      
//                       {!isCurrentUser && (
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="mt-1 h-6 text-xs text-gray-500 hover:text-gray-700"
//                           onClick={() => setReplyingTo(message.id)}
//                         >
//                           <Reply className="w-3 h-3 mr-1" />
//                           Reply
//                         </Button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </ScrollArea>
        
//         <div className="p-4 border-t">
//           {replyingTo && (
//             <div className="mb-2 p-2 bg-blue-50 rounded text-sm">
//               <span className="text-blue-600">Replying to:</span>
//               <span className="ml-2">{getReplyToMessage(replyingTo)?.message}</span>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="ml-2 h-5 w-5 p-0"
//                 onClick={() => setReplyingTo(null)}
//               >
//                 ×
//               </Button>
//             </div>
//           )}
          
//           <form onSubmit={handleSendMessage} className="flex space-x-2">
//             <Input
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder="Type your message..."
//               className="flex-1"
//             />
//             <Button type="submit" size="sm" disabled={!newMessage.trim()}>
//               <Send className="w-4 h-4" />
//             </Button>
//           </form>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }


// import { useEffect, useState } from "react";
// import { Send, Reply } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { currentUser } from "@/lib/userMockData";
// import { format } from "date-fns";

// interface ChatMessage {
//   _id?: string;
//   projectId: string;
//   userId: string;
//   user: { id: string; name: string; avatar: string };
//   message: string;
//   timestamp: string;
//   replyTo?: string | null;
// }

// interface ProjectChatProps {
//   projectId: string;
// }

// export default function ProjectChat({ projectId }: ProjectChatProps) {
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [replyingTo, setReplyingTo] = useState<string | null>(null);

//   // Fetch messages from backend
//   useEffect(() => {
//     fetch(`http://localhost:5000/api/messages/${projectId}`)
//       .then(res => res.json())
//       .then(data => setMessages(data))
//       .catch(err => console.error(err));
//   }, [projectId]);

//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newMessage.trim()) return;

//     const message: ChatMessage = {
//       projectId,
//       userId: currentUser.id,
//       user: currentUser,
//       message: newMessage,
//       timestamp: new Date().toISOString(),
//       replyTo: replyingTo || null,
//     };

//     try {
//       const res = await fetch("http://localhost:5000/api/messages", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(message),
//       });
//       const savedMessage = await res.json();
//       setMessages(prev => [...prev, savedMessage]);
//       setNewMessage("");
//       setReplyingTo(null);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const getReplyToMessage = (messageId: string) => messages.find(msg => msg._id === messageId);

//   return (
//     <Card className="h-96 flex flex-col">
//       <CardHeader className="pb-3">
//         <CardTitle className="text-lg">Project Discussion</CardTitle>
//       </CardHeader>
//       <CardContent className="flex-1 flex flex-col p-0">
//         <ScrollArea className="flex-1 px-4">
//           <div className="space-y-4 pb-4">
//             {messages.map(message => {
//               const replyToMessage = message.replyTo ? getReplyToMessage(message.replyTo) : null;
//               const isCurrentUser = message.userId === currentUser.id;

//               return (
//                 <div key={message._id} className="space-y-2">
//                   {replyToMessage && (
//                     <div className="ml-8 p-2 bg-gray-100 rounded text-sm text-gray-600 border-l-2 border-gray-300">
//                       <span className="font-medium">{replyToMessage.user.name}:</span> {replyToMessage.message}
//                     </div>
//                   )}

//                   <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
//                     <div className={`max-w-xs lg:max-w-md ${isCurrentUser ? 'order-2' : 'order-1'}`}>
//                       <div className={`flex items-center space-x-2 mb-1 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
//                         {!isCurrentUser && (
//                           <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
//                             <span className="text-white font-medium text-xs">{message.user.avatar}</span>
//                           </div>
//                         )}
//                         <span className="text-sm font-medium text-gray-900">{message.user.name}</span>
//                         <span className="text-xs text-gray-500">
//                           {format(new Date(message.timestamp), 'HH:mm')}
//                         </span>
//                       </div>

//                       <div className={`p-3 rounded-lg ${isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'}`}>
//                         <p className="text-sm">{message.message}</p>
//                       </div>

//                       {!isCurrentUser && (
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="mt-1 h-6 text-xs text-gray-500 hover:text-gray-700"
//                           onClick={() => setReplyingTo(message._id!)}
//                         >
//                           <Reply className="w-3 h-3 mr-1" />
//                           Reply
//                         </Button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </ScrollArea>

//         <div className="p-4 border-t">
//           {replyingTo && (
//             <div className="mb-2 p-2 bg-blue-50 rounded text-sm">
//               <span className="text-blue-600">Replying to:</span>
//               <span className="ml-2">{getReplyToMessage(replyingTo)?.message}</span>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 className="ml-2 h-5 w-5 p-0"
//                 onClick={() => setReplyingTo(null)}
//               >
//                 ×
//               </Button>
//             </div>
//           )}

//           <form onSubmit={handleSendMessage} className="flex space-x-2">
//             <Input
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//               placeholder="Type your message..."
//               className="flex-1"
//             />
//             <Button type="submit" size="sm" disabled={!newMessage.trim()}>
//               <Send className="w-4 h-4" />
//             </Button>
//           </form>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }


import { useEffect, useState, useRef } from "react";
import { Send, Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { currentUser } from "@/lib/userMockData";
import { format } from "date-fns";
import { buildApiUrl } from '@/lib/api-base';

interface ChatMessage {
  _id?: string;
  projectId: string;
  userId: string;
  user: { id: string; name: string; avatar: string };
  message: string;
  timestamp: string;
  replyTo?: string | null;
}

interface ProjectChatProps {
  projectId: string;
}

export default function ProjectChat({ projectId }: ProjectChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch messages from backend
  useEffect(() => {
    fetch(buildApiUrl(`/messages/${projectId}`))
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error(err));
  }, [projectId]);

  // Scroll to latest message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      projectId,
      userId: currentUser.id,
      user: currentUser,
      message: newMessage,
      timestamp: new Date().toISOString(),
      replyTo: replyingTo || null,
    };

    try {
      const res = await fetch(buildApiUrl('/messages'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(message),
      });
      const savedMessage = await res.json();
      setMessages(prev => [...prev, savedMessage]);
      setNewMessage("");
      setReplyingTo(null);
    } catch (err) {
      console.error(err);
    }
  };

  const getReplyToMessage = (messageId: string) => messages.find(msg => msg._id === messageId);

  return (
    <Card className="h-96 flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Project Discussion</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-4" ref={scrollRef}>
          <div className="space-y-4 pb-4">
            {messages.map(message => {
              const replyToMessage = message.replyTo ? getReplyToMessage(message.replyTo) : null;
              const isCurrentUser = message.userId === currentUser.id;

              return (
                <div key={message._id} className="space-y-2">
                  {replyToMessage && (
                    <div className="ml-8 p-2 bg-gray-100 rounded text-sm text-gray-600 border-l-2 border-gray-300 italic">
                      <span className="font-medium">{replyToMessage.user.name}:</span> {replyToMessage.message}
                    </div>
                  )}

                  <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md ${isCurrentUser ? 'order-2' : 'order-1'}`}>
                      <div className={`flex items-center space-x-2 mb-1 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                        {!isCurrentUser && (
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-xs">{message.user.avatar}</span>
                          </div>
                        )}
                        <span className="text-sm font-medium text-gray-900">{message.user.name}</span>
                        <span className="text-xs text-gray-500">
                          {format(new Date(message.timestamp), 'HH:mm')}
                        </span>
                      </div>

                      <div className={`p-3 rounded-lg ${isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'}`}>
                        <p className="text-sm">{message.message}</p>
                      </div>

                      {!isCurrentUser && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-1 h-6 text-xs text-gray-500 hover:text-gray-700"
                          onClick={() => setReplyingTo(message._id!)}
                        >
                          <Reply className="w-3 h-3 mr-1" />
                          Reply
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          {replyingTo && (
            <div className="mb-2 p-2 bg-blue-50 rounded text-sm flex items-center justify-between">
              <div>
                <span className="text-blue-600">Replying to:</span>
                <span className="ml-2 font-medium">{getReplyToMessage(replyingTo)?.message}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0"
                onClick={() => setReplyingTo(null)}
              >
                ×
              </Button>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button type="submit" size="sm" disabled={!newMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
