import { Component, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-notify-modal',
  standalone: true,
  imports: [],
  template: `
    <div class="backdrop"></div>
    <div class="alert-box">
      <div>
        <p style=" font-size: 2em; font-weight: 900;">
          {{ errorMessage?.name }}
        </p>
        <p>
          {{ errorMessage?.message }}
        </p>
      </div>
      <div class="my-2 float-end">
        <button type="button" class="btn btn-primary" (click)="onCloseModal()">
          OK
        </button>
      </div>
    </div>
  `,
  styleUrl: './notify-modal.component.css',
})
export class NotifyModalComponent {
  @Input() errorMessage?: Error;
  onCLose = new EventEmitter<void>();
  onCloseModal() {
    this.onCLose.emit();
  }
}
