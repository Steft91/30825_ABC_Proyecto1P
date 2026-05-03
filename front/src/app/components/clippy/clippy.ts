import { Component, Input, OnChanges } from '@angular/core';
import {CommonModule} from "@angular/common";

export type ClippyState = 'idle' | 'thinking' | 'talking' | 'happy';

@Component({
  selector: 'app-clippy',
  imports: [CommonModule],
  templateUrl: './clippy.html',
  styleUrl: './clippy.css',
})
export class ClippyComponent implements OnChanges {
  @Input() state: ClippyState = 'idle';

  browLTransform = '';
  browRTransform = '';
  mouthPath = 'M63 84 Q73 93 85 84';

  ngOnChanges() {
    this.updateFace();
  }

  updateFace(){
    if (this.state === 'thinking') {
      this.browLTransform = 'rotate(-15deg)';
      this.browRTransform = 'rotate(15deg)';
      this.mouthPath = 'M63 84 Q73 78 85 84';
    } else if (this.state === 'talking' || this.state === 'happy') {
      this.browLTransform = 'rotate(15deg)';
      this.browRTransform = 'rotate(-15deg)';
      this.mouthPath = 'M63 84 Q73 90 85 84';
    }else{
      this.browLTransform = '';
      this.browRTransform = '';
      this.mouthPath = 'M63 84 Q73 93 85 84';
    }
  }
}