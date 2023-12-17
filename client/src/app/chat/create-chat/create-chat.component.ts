// create-chat.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-chat',
  templateUrl: './create-chat.component.html',
  styleUrls: ['./create-chat.component.scss']
})
export class CreateChatComponent {
  chatForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  constructor(private chatService: ChatService, private router: Router) {}

  onSubmit() {
    if (this.chatForm.valid) {
      this.chatService.createChat(this.chatForm.value.title as string).subscribe(
        newChat => {
          // Assuming newChat contains the id of the created chat
          this.router.navigate(['/chat', newChat._id]);
        },
        error => {
          console.error('Error creating chat:', error);
          // Handle error
        }
      );
    }
  }
}
