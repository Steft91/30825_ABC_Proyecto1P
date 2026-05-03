import { Component, Output, EventEmitter } from '@angular/core';
import { ChatService } from '../../services/chat';
import { ClippyState } from '../clippy/clippy';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Mensaje {
  texto: string;
  quien: 'user' | 'bot';
}

@Component({
  selector: 'app-chat-window',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-window.html',
  styleUrl: './chat-window.css',
})

export class ChatWindowComponent {
  @Output() stateChange = new EventEmitter<ClippyState>();
  @Output() newMessage = new EventEmitter<Mensaje>();

    mensajes: Mensaje[] = [
    { texto: 'Hola! Sube un documento y pregúntame lo que quieras.', quien: 'bot' }
  ];
  pregunta = '';
  pensando = false;

  constructor(private chatService: ChatService) {}

  enviar(){
    if(!this.pregunta.trim() || this.pensando) return;

    const q = this.pregunta.trim();
    this.pregunta = '';
    this.mensajes.push({texto: q, quien: 'user'});
    this.newMessage.emit({texto: q, quien: 'user'});

    this.pensando = true;
    this.stateChange.emit('thinking');

    this.chatService.enviarPregunta(q).subscribe({
      next: (res) => {
        const respuesta = res.respuesta ?? 'sin respuesta';
        this.mensajes.push({texto: respuesta, quien: 'bot'});
        this.newMessage.emit({texto: respuesta, quien: 'bot'});
        this.pensando = false;
        this.stateChange.emit('talking');

        setTimeout(() => this.stateChange.emit('happy'), 1600);
        setTimeout(() => this.stateChange.emit('idle'), 2800);
      },
      error: (err) => {
        this.mensajes.push({texto: 'Error al obtener respuesta', quien: 'bot'});
        this.pensando = false;
        this.stateChange.emit('idle');
      }
    });
  }
}
