// chat-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import {ChatRecord} from "../chatRecord";

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  chatRecords: ChatRecord[] = [];

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.getChatTitles().subscribe(
      (titles: ChatRecord[]) => this.chatRecords = titles,
      (error: any) => {
        // Handle error
        console.error(error);
      }
    );
  }
}
