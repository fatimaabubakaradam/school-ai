import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader } from 'lucide-react';
import { ChatMessage, StudentProfile } from '../../types';
import { AzureOpenAIService } from '../../services/azureOpenAI';
import { upsertSession, fetchSessions } from '../../services/chatSync';
import { parse } from 'marked';
import DOMPurify from 'dompurify';

interface ChatInterfaceProps {
  userId?: string;
  onProfileComplete?: (profile: StudentProfile) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ userId, onProfileComplete }) => {
  // session-based local persistence keys
  const sessionsKey = `schooby_chat_sessions_${userId ?? 'guest'}`;

  interface ChatSession {
    id: string;
    title: string;
    createdAt: string; // ISO
    messages: ChatMessage[];
  }

  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      message: "Hello! I'm your AI Career Coach, here to help you explore your potential and discover exciting career paths that match your interests and strengths. Let's get started! 🤖✨",
      timestamp: new Date()
    },
    {
      id: '2',
      type: 'bot',
      message: "To give you the best guidance, I'd love to learn about your academic goals. What are you hoping to achieve in your studies? For example, are you aiming to excel in STEM subjects, develop creative skills, or prepare for university?",
      timestamp: new Date()
    }
  ]);
  
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<Array<{ role: string; content: string }>>([
    { role: 'assistant', content: "Hello! I'm your AI Career Coach, here to help you explore your potential and discover exciting career paths that match your interests and strengths. Let's get started! 🤖✨" },
    { role: 'assistant', content: "To give you the best guidance, I'd love to learn about your academic goals. What are you hoping to achieve in your studies? For example, are you aiming to excel in STEM subjects, develop creative skills, or prepare for university?" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // language selection (persisted)
  const [selectedLanguage, setSelectedLanguage] = useState<string>(() => {
    try {
      return (localStorage.getItem('schooby_lang') as string) || navigator.language || 'en';
    } catch (e) {
      return navigator.language || 'en';
    }
  });

  // Markdown renderer using marked + DOMPurify for safety
  const renderMarkdown = (text: string) => {
    if (!text) return null;
    const raw = parse(text || '');
    const clean = DOMPurify.sanitize(raw);
    return <div dangerouslySetInnerHTML={{ __html: clean }} />;
  };

  // Helper: create a new session and set active
  const createNewSession = (title?: string) => {
    const id = Date.now().toString();
    const newSession = {
      id,
      title: title || `Conversation ${new Date().toLocaleString()}`,
      createdAt: new Date().toISOString(),
      messages: [
        {
          id: Date.now().toString() + '-init',
          type: 'bot',
          message: "Hello! I'm your AI Career Coach, here to help you explore your potential and discover exciting career paths that match your interests and strengths. Let's get started! 🤖✨",
          timestamp: new Date()
        },
        {
          id: Date.now().toString() + '-q',
          type: 'bot',
          message: "To give you the best guidance, I'd love to learn about your academic goals. What are you hoping to achieve in your studies? For example, are you aiming to excel in STEM subjects, develop creative skills, or prepare for university?",
          timestamp: new Date()
        }
      ] as ChatMessage[]
    };

    setSessions(prev => [...prev, newSession]);
    setActiveSessionId(id);
    setMessages(newSession.messages);
    setConversationHistory(newSession.messages.map(m => ({ role: m.type === 'user' ? 'user' : 'assistant', content: m.message })));
  };

  const saveActiveSession = (msgs: ChatMessage[]) => {
    if (!activeSessionId) return;
    setSessions(prev => prev.map(s => s.id === activeSessionId ? { ...s, messages: msgs } : s));
  };

  const loadSession = (sessionId: string) => {
    const s = sessions.find(x => x.id === sessionId);
    if (!s) return;
    setActiveSessionId(sessionId);
    setMessages(s.messages.map(m => ({ ...m, timestamp: new Date(m.timestamp) })));
    setConversationHistory(s.messages.map(m => ({ role: m.type === 'user' ? 'user' : 'assistant', content: m.message })));
  };

  const deleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (activeSessionId === sessionId) {
      if (sessions.length > 1) {
        const next = sessions.find(s => s.id !== sessionId);
        if (next) loadSession(next.id);
      } else {
        createNewSession();
      }
    }
  };

  const clearCurrentSession = () => {
    setMessages([]);
    setConversationHistory([]);
    saveActiveSession([]);
  };

  // load sessions from storage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(sessionsKey);
      if (raw) {
        const parsed = JSON.parse(raw) as ChatSession[];
        setSessions(parsed);
        if (parsed.length > 0) {
          const last = parsed[parsed.length - 1];
          setActiveSessionId(last.id);
          setMessages(last.messages.map(m => ({ ...m, timestamp: new Date(m.timestamp) })));
          setConversationHistory(last.messages.map(m => ({ role: m.type === 'user' ? 'user' : 'assistant', content: m.message })));
        } else {
          // create default session
          createNewSession();
        }
      } else {
        createNewSession();
      }
    } catch (e) {
      console.error('Failed to load sessions:', e);
      createNewSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionsKey]);

  // If userId is provided, fetch remote sessions and merge with local
  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        const res = await fetchSessions(userId);
        if (res?.data) {
          const remote: ChatSession[] = res.data.map((r: any) => ({
            id: r.session_id,
            title: r.title || `Conversation ${new Date(r.created_at).toLocaleString()}`,
            createdAt: r.created_at,
            messages: (r.messages || []).map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }))
          }));

          // merge remote sessions with local; prefer remote for same session id
          const merged = [...sessions];
          remote.forEach(rs => {
            const idx = merged.findIndex(s => s.id === rs.id);
            if (idx >= 0) merged[idx] = rs;
            else merged.push(rs);
          });
          setSessions(merged);
        }
      } catch (e) {
        console.error('Failed to fetch remote sessions:', e);
      }
    })();
  }, [userId]);

  // persist sessions whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(sessionsKey, JSON.stringify(sessions.map(s => ({ ...s, messages: s.messages.map(m => ({ ...m, timestamp: m.timestamp.toISOString() })) }))))
    } catch (e) {
      console.error('Failed to save sessions:', e);
    }
  }, [sessions, sessionsKey]);

  // When sessions change and we have a userId, sync active session to Supabase
  useEffect(() => {
    if (!userId) return;
    const active = sessions.find(s => s.id === activeSessionId);
    if (!active) return;
    (async () => {
      try {
        await upsertSession(userId, { id: active.id, title: active.title, messages: active.messages, createdAt: active.createdAt });
      } catch (e) {
        console.error('Failed to upsert session to supabase', e);
      }
    })();
  }, [sessions, activeSessionId, userId]);

  // persist language selection
  useEffect(() => {
    try {
      localStorage.setItem('schooby_lang', selectedLanguage);
    } catch (e) {
      // ignore
    }
  }, [selectedLanguage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (message: string, type: 'user' | 'bot') => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!currentInput.trim()) return;

    const userMessage = currentInput;
    addMessage(userMessage, 'user');
    setCurrentInput('');
    setIsTyping(true);

    try {
      // Add user message to conversation history
      const updatedHistory = [...conversationHistory, { role: 'user', content: userMessage }];
      setConversationHistory(updatedHistory);

  // Get AI response
  // use selected language preference (fallback to browser language)
  const userLang = selectedLanguage || navigator.language || 'en';
  const aiResponse = await AzureOpenAIService.getCareerGuidanceResponse(userMessage, updatedHistory, userLang);

      // Add AI response to conversation history
      const newHistory = [...updatedHistory, { role: 'assistant', content: aiResponse }];
      setConversationHistory(newHistory);

      // Add AI response to messages
      setTimeout(() => {
        setIsTyping(false);
        addMessage(aiResponse, 'bot');
      }, 500);

    } catch (error) {
      console.error('Error getting AI response:', error);
      setTimeout(() => {
        setIsTyping(false);
        addMessage("I'm sorry, I'm having trouble connecting right now. Please try again later.", 'bot');
      }, 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl flex flex-col h-[60vh] md:h-[72vh] lg:h-[76vh] border border-white/30">
  <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-6 rounded-t-3xl relative overflow-hidden flex items-center justify-between">
        <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -translate-y-10 translate-x-10"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-white bg-opacity-10 rounded-full translate-y-8 -translate-x-8"></div>
  <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg animate-pulse">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-bold text-lg">AI Career Assistant</h3>
            <p className="text-sm text-indigo-100 flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Online • Ready to help
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Session selector */}
          <select
            aria-label="Load previous session"
            value={activeSessionId ?? ''}
            onChange={(e) => loadSession(e.target.value)}
            className="bg-white/10 text-white rounded-md px-3 py-2 text-sm"
          >
            {sessions.map(s => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>

          <button
            onClick={() => createNewSession()}
            className="bg-white/20 text-white px-3 py-2 rounded-md text-sm"
          >New</button>

          <button
            onClick={clearCurrentSession}
            className="bg-red-600/90 text-white px-3 py-2 rounded-md text-sm"
          >Clear</button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-3 max-w-xs md:max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                message.type === 'user' ? 'bg-blue-100' : 'bg-purple-100'
              }`}>
                {message.type === 'user' ? (
                  <User className="w-6 h-6 text-blue-600" />
                ) : (
                  <Bot className="w-6 h-6 text-purple-600" />
                )}
              </div>
              <div className={`px-5 py-3 rounded-2xl shadow-lg ${
                message.type === 'user' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md' 
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 rounded-bl-md'
              }`}>
                {message.type === 'user' ? (
                  <p className="leading-relaxed font-medium">{message.message}</p>
                ) : (
                  // simple markdown rendering for bot messages
                  <div className="leading-relaxed font-medium text-gray-900">
                    {renderMarkdown(message.message)}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-purple-100 shadow-lg">
                <Bot className="w-6 h-6 text-purple-600" />
              </div>
              <div className="px-5 py-3 rounded-2xl rounded-bl-md bg-gradient-to-r from-gray-100 to-gray-200 shadow-lg">
                <div className="flex space-x-2 items-center">
                  <Loader className="w-5 h-5 text-purple-500 animate-spin" />
                  <span className="text-gray-600 font-medium">AI is thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 border-t border-gray-200 bg-gray-50/50 rounded-b-3xl">
        <div className="flex space-x-3">
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your response..."
            className="flex-1 px-5 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-inner hover:shadow-lg font-medium"
          />
          <button
            onClick={handleSendMessage}
            disabled={!currentInput.trim() || isTyping}
            className="px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-2xl disabled:transform-none disabled:shadow-none"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;