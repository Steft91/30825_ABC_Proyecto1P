import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ChatService } from '../../services/chat';
import { CommonModule } from "@angular/common";
import { Mensaje } from '../chat-window/chat-window';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})

export class SidebarComponent {
  @Input() historial: Mensaje[] = [];

  archivos: string[] = [];
  subiendo = false;
  error = '';

  constructor(private chatService: ChatService) {}

  onDragOver(e: DragEvent) { e.preventDefault(); }

  onDrop(e: DragEvent) {
    e.preventDefault();
    const files = e.dataTransfer?.files;
    if (files?.length) this.subirArchivo(files[0]);
  }

  onFileSelect(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files?.length) this.subirArchivo(input.files[0]);
  }

  subirArchivo(file: File) {
    const permitidos = ['.pdf', '.docx', '.xlsx', '.txt'];
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!permitidos.includes(ext)) {
      this.error = 'Formato no permitido. Solo PDF, DOCX, XLSX o TXT.';
      return;
    }
    this.error = '';
    this.subiendo = true;
    this.chatService.subirArchivo(file).subscribe({
      next: () => {
        this.archivos.push(file.name);
        this.subiendo = false;
      },
      error: () => {
        this.error = 'Error al subir el archivo.';
        this.subiendo = false;
      }
    });
  }
}