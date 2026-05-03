import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar';
import { ChatWindowComponent, Mensaje } from './components/chat-window/chat-window';
import { ClippyComponent, ClippyState } from './components/clippy/clippy';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, SidebarComponent, ChatWindowComponent, ClippyComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class AppComponent {
  clippyState: ClippyState = 'idle';
  historial: Mensaje[] = [];

  onStateChange(state: ClippyState) {
    this.clippyState = state;
  }

  onNewMessage(msg: Mensaje) {
    this.historial.push(msg);
  }
}