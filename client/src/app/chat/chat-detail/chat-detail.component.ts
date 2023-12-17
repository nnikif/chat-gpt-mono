// chat-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChatService } from '../chat.service';


@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss']
})
export class ChatDetailComponent implements OnInit {
  chatForm!: FormGroup;
  chat: any; // Adjust the type as needed
  chatId!: string;

  constructor(private route: ActivatedRoute, private chatService: ChatService) {}

  ngOnInit() {
    this.chatId = this.route.snapshot.paramMap.get('id') as string;
    this.chatForm = new FormGroup({
      message: new FormControl('', Validators.required),
    });
    this.chatService.getByChatId(this.chatId as string).subscribe(
      data => {
        this.chat = data;
      },
      error => {
        console.error('Error fetching chat details', error);
      }
    );
  }

  onSubmit() {
    if (this.chatForm.valid) {
      const message = this.chatForm.value.message;
      // Call the service to send the message to the backend
      this.chatService.sendMessage('user', message, this.chatId).subscribe(
        response => {
          const lastTwo = response.messages.slice(-2);
          this.chat.messages.push(...lastTwo);

          // Handle the response
          // Optionally, update the chat view with the new message
        },
        error => {
          // Handle error
          console.error('Error sending message', error);
        }
      );

      // Reset the form after submission
      this.chatForm.reset();
    }
  }
}
