"use client";

import { useState } from "react";
import { Card } from "@/components/common/card";
import { PageHeader } from "@/components/common/page-header";
import { EmptyState } from "@/components/common/empty-state";
import { Button } from "@/components/common/button";
import { Badge } from "@/components/common/badge";
import type { Message } from "@/types";

// Mock data for demo
const mockMessages: Message[] = [
  {
    id: "msg-1",
    taskId: "task-1",
    senderRole: "writer",
    senderName: "Sarah Johnson",
    content: "I've started working on your research paper. I have a question about the expected structure.",
    sentAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "msg-2",
    taskId: "task-1",
    senderRole: "student",
    senderName: "You",
    content: "Hi Sarah! Sure, let me clarify. The structure should follow the rubric I provided.",
    sentAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "msg-3",
    taskId: "task-3",
    senderRole: "admin",
    senderName: "Admin",
    content: "Pricing approved for your case study task. Ready to be assigned.",
    sentAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

export default function StudentMessagesPage() {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const tasks = Array.from(new Set(mockMessages.map((m) => m.taskId)));
  const currentMessages = selectedTaskId ? mockMessages.filter((m) => m.taskId === selectedTaskId) : [];

  const handleSend = () => {
    if (newMessage.trim()) {
      // In production, POST to /api/messages
      setNewMessage("");
    }
  };

  return (
    <div className="space-y-6 p-6">
      <PageHeader title="Messages" description="Communicate with writers and admins about your tasks." />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Task list */}
        <Card className="lg:col-span-1" title="Conversations">
          {tasks.length === 0 ? (
            <EmptyState title="No conversations yet" description="Messages from writers will appear here." />
          ) : (
            <div className="space-y-2">
              {tasks.map((taskId) => {
                const taskMessages = mockMessages.filter((m) => m.taskId === taskId);
                const lastMsg = taskMessages[taskMessages.length - 1];
                const unreadCount = taskMessages.filter((m) => m.senderRole !== "student").length;

                return (
                  <button
                    key={taskId}
                    onClick={() => setSelectedTaskId(taskId)}
                    className={`w-full rounded-lg border px-3 py-2 text-left transition ${
                      selectedTaskId === taskId
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-slate-900">Task {taskId}</span>
                      {unreadCount > 0 && <Badge tone="warning">{unreadCount}</Badge>}
                    </div>
                    <p className="text-xs text-slate-600">
                      {lastMsg.senderName}: {lastMsg.content.substring(0, 30)}...
                    </p>
                  </button>
                );
              })}
            </div>
          )}
        </Card>

        {/* Message thread */}
        <Card className="lg:col-span-2" title={selectedTaskId ? `Conversation: ${selectedTaskId}` : "Select a conversation"}>
          {selectedTaskId && currentMessages.length > 0 ? (
            <div className="flex flex-col gap-4">
              <div className="max-h-96 space-y-3 overflow-y-auto rounded-lg bg-slate-50 p-4">
                {currentMessages.map((message) => {
                  const isOwn = message.senderRole === "student";
                  return (
                    <div
                      key={message.id}
                      className={`flex gap-2 ${isOwn ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <div className={`flex max-w-xs flex-col gap-1 rounded-lg p-3 ${
                        isOwn ? "bg-indigo-100" : "bg-white"
                      }`}>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-slate-700">{message.senderName}</span>
                          <Badge tone={message.senderRole === "admin" ? "warning" : "muted"} className="text-xs">
                            {message.senderRole}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-900">{message.content}</p>
                        <span className="text-xs text-slate-500">
                          {new Date(message.sentAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 rounded-md border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <Button variant="primary" onClick={handleSend} disabled={!newMessage.trim()}>
                  Send
                </Button>
              </div>
            </div>
          ) : (
            <EmptyState title="No conversation selected" description="Choose a conversation to view messages." />
          )}
        </Card>
      </div>
    </div>
  );
}
