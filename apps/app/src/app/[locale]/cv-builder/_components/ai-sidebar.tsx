'use client'

import { useState } from 'react'
import { Button } from '@v1/ui/button'
import { Input } from '@v1/ui/input'
import { Textarea } from '@v1/ui/textarea'
import { Badge } from '@v1/ui/badge'
import { Separator } from '@v1/ui/separator'
import { ScrollArea } from '@v1/ui/scroll-area'
import { 
  Sparkles, 
  MessageSquare, 
  Send, 
  Lightbulb, 
  Target, 
  Zap,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Bot,
  User
} from 'lucide-react'
import type { CVData } from './types'

interface AISidebarProps {
  cvData: CVData
  onUpdateCV: (data: CVData) => void
}

interface ChatMessage {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
}

interface SmartSuggestion {
  id: string
  type: 'improvement' | 'keyword' | 'structure' | 'ats'
  title: string
  description: string
  action: string
  priority: 'high' | 'medium' | 'low'
}

export function AISidebar({ cvData, onUpdateCV }: AISidebarProps) {
  const [activeTab, setActiveTab] = useState<'suggestions' | 'chat'>('suggestions')
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hi! I\'m your AI assistant. I can help you optimize your CV, suggest improvements, and answer any questions about your resume. What would you like to work on?',
      timestamp: new Date()
    }
  ])

  // Mock smart suggestions - in real app, these would be AI-generated
  const smartSuggestions: SmartSuggestion[] = [
    {
      id: '1',
      type: 'ats',
      title: 'Improve ATS Score',
      description: 'Add more relevant keywords to improve your ATS compatibility score.',
      action: 'Add Keywords',
      priority: 'high'
    },
    {
      id: '2',
      type: 'improvement',
      title: 'Strengthen Summary',
      description: 'Your professional summary could highlight quantifiable achievements.',
      action: 'Enhance Summary',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'structure',
      title: 'Add Skills Section',
      description: 'Consider adding a dedicated skills section to showcase your expertise.',
      action: 'Add Skills',
      priority: 'medium'
    },
    {
      id: '4',
      type: 'keyword',
      title: 'Industry Keywords',
      description: 'Include more industry-specific terms relevant to your field.',
      action: 'Optimize Keywords',
      priority: 'low'
    }
  ]

  const handleSendMessage = () => {
    if (!chatInput.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: chatInput,
      timestamp: new Date()
    }

    setChatMessages(prev => [...prev, userMessage])
    setChatInput('')

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `I understand you want to ${chatInput.toLowerCase()}. Let me help you with that. Based on your current CV data, I suggest focusing on highlighting your achievements with specific metrics and results.`,
        timestamp: new Date()
      }
      setChatMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-200'
      case 'low': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ats': return <Target className="h-4 w-4" />
      case 'improvement': return <TrendingUp className="h-4 w-4" />
      case 'structure': return <Lightbulb className="h-4 w-4" />
      case 'keyword': return <Zap className="h-4 w-4" />
      default: return <Sparkles className="h-4 w-4" />
    }
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30 border border-slate-200/40 rounded-2xl backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-200/40 bg-white/70 backdrop-blur-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Assistant
            </h2>
            <p className="text-xs text-slate-500 font-medium">Smart suggestions & chat</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-1 p-1 bg-slate-100/60 rounded-xl backdrop-blur-sm border border-slate-200/40">
          <button
            onClick={() => setActiveTab('suggestions')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeTab === 'suggestions'
                ? 'bg-white text-blue-600 shadow-md shadow-blue-500/10 border border-blue-100'
                : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            Suggestions
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
              activeTab === 'chat'
                ? 'bg-white text-purple-600 shadow-md shadow-purple-500/10 border border-purple-100'
                : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            Chat
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'suggestions' ? (
          <div className="p-4 space-y-4">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="group p-3 rounded-xl bg-gradient-to-br from-blue-50/80 via-blue-50/60 to-blue-100/40 border border-blue-200/30 backdrop-blur-sm hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300">
                <div className="text-2xl font-bold text-blue-600 mb-1">85%</div>
                <div className="text-xs font-semibold text-blue-500/80 mb-1">ATS Score</div>
                <div className="w-full bg-blue-100 rounded-full h-1">
                  <div className="bg-blue-500 h-1 rounded-full transition-all duration-500" style={{width: '85%'}}></div>
                </div>
              </div>
              <div className="group p-3 rounded-xl bg-gradient-to-br from-emerald-50/80 via-emerald-50/60 to-emerald-100/40 border border-emerald-200/30 backdrop-blur-sm hover:shadow-md hover:shadow-emerald-500/5 transition-all duration-300">
                <div className="text-2xl font-bold text-emerald-600 mb-1">{smartSuggestions.length}</div>
                <div className="text-xs font-semibold text-emerald-500/80 mb-1">Active Tips</div>
                <div className="flex gap-1">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-full bg-emerald-100 rounded-full h-1">
                      <div className={`bg-emerald-500 h-1 rounded-full transition-all duration-500 delay-${i * 100}`} style={{width: i < smartSuggestions.length ? '100%' : '0%'}}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Smart Suggestions */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md">
                  <Lightbulb className="h-3 w-3" />
                </div>
                <h3 className="text-sm font-bold text-slate-800">Smart Suggestions</h3>
              </div>
              
              <ScrollArea className="max-h-[520px] pr-1">
                <div className="space-y-3">
                  {smartSuggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="group p-3 rounded-xl bg-white/90 border border-slate-200/40 backdrop-blur-md hover:shadow-lg hover:shadow-slate-500/10 hover:border-slate-300/50 transition-all duration-300"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 flex-1">
                          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 group-hover:from-blue-100 group-hover:to-purple-100 group-hover:text-blue-600 transition-all duration-300 flex-shrink-0">
                            {getTypeIcon(suggestion.type)}
                          </div>
                          <h4 className="text-sm font-bold text-slate-800 group-hover:text-slate-900 leading-tight">
                            {suggestion.title}
                          </h4>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`text-xs font-semibold ml-2 flex-shrink-0 ${getPriorityColor(suggestion.priority)}`}
                        >
                          {suggestion.priority}
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                        {suggestion.description}
                      </p>
                      
                      <Button 
                        size="sm" 
                        className="w-full h-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white border-0 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 font-semibold text-xs"
                      >
                        <span>{suggestion.action}</span>
                        <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Chat Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {chatMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start gap-2 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                      {/* Avatar */}
                      <div className={`flex items-center justify-center w-6 h-6 rounded-lg flex-shrink-0 ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white' 
                          : 'bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="h-3 w-3" />
                        ) : (
                          <Bot className="h-3 w-3" />
                        )}
                      </div>
                      
                      {/* Message Bubble */}
                      <div
                        className={`p-3 rounded-xl shadow-md ${
                          message.type === 'user'
                            ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white rounded-tr-sm'
                            : 'bg-white/95 border border-slate-200/50 text-slate-800 backdrop-blur-md rounded-tl-sm'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-blue-100' : 'text-slate-400'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Chat Input */}
            <div className="p-4 border-t border-slate-200/40 bg-white/80 backdrop-blur-md">
              <div className="space-y-3">
                {/* Quick Suggestions */}
                <div className="flex flex-wrap gap-1.5">
                  {['Improve summary', 'Add skills', 'Optimize for ATS', 'Enhance experience'].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setChatInput(suggestion)}
                      className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-slate-50 to-white hover:from-blue-50 hover:to-purple-50 text-slate-600 hover:text-blue-600 rounded-lg border border-slate-200/60 hover:border-blue-200/60 transition-all duration-200 hover:shadow-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
                
                {/* Input Area */}
                <div className="flex gap-2">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask me anything about your CV..."
                    className="flex-1 h-9 px-3 border-slate-200/60 focus:border-blue-300 focus:ring-blue-200/50 rounded-lg bg-white/80 backdrop-blur-sm text-sm placeholder:text-slate-400"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="sm"
                    className="h-9 px-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white border-0 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 rounded-lg"
                    disabled={!chatInput.trim()}
                  >
                    <Send className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 