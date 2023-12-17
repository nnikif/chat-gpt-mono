// chat.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = environment.apiUrl; // Update with your backend URL

  constructor(private http: HttpClient) {}

  getChatTitles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/chat/titles`, { withCredentials: true });
  }
  getByChatId(chatId:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/chat/titles/${chatId}`, { withCredentials: true });
  }

  sendMessage(role: string, content: string, chatId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/chat/titles/${chatId}`, { role, content }, { withCredentials: true });
  }

  createChat(title: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/chat/create`, { title}, { withCredentials: true });
  }


}
