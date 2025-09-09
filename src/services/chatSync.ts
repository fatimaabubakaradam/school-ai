import { supabase } from '../lib/supabase';
import type { ChatMessage } from '../types';

export interface RemoteChatSession {
  id?: number;
  session_id: string;
  user_id: string;
  title?: string;
  messages: ChatMessage[];
  created_at?: string;
  updated_at?: string;
}

export async function upsertSession(userId: string, session: { id: string; title?: string; messages: ChatMessage[]; createdAt?: string }) {
  try {
    const payload: RemoteChatSession = {
      session_id: session.id,
      user_id: userId,
      title: session.title,
      messages: session.messages,
      created_at: session.createdAt
    };

    const { data, error } = await supabase
      .from('chat_sessions')
      .upsert(payload, { onConflict: 'session_id' })
      .select();

    if (error) {
      console.error('Supabase upsertSession error:', error);
      return { error };
    }

    return { data };
  } catch (error) {
    console.error('upsertSession exception:', error);
    return { error };
  }
}

export async function fetchSessions(userId: string) {
  try {
    const { data, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Supabase fetchSessions error:', error);
      return { error };
    }

    return { data };
  } catch (error) {
    console.error('fetchSessions exception:', error);
    return { error };
  }
}
