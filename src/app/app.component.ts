import { Component } from '@angular/core'
import { CountdownComponent } from './countdown/countdown.component'
import { CountdownService } from './countdown.service'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-root',
  imports: [CountdownComponent, NgIf],
  standalone: true,
  template: `
    <main class="main">
      <ng-container *ngIf="hasData; else settings">
        <div class="app-container">
          <div class="text-wrapper">
            <app-countdown></app-countdown>
          </div>
        </div>
      </ng-container>
      <ng-template #settings> </ng-template>
    </main>
  `,
})
export class AppComponent {
  hasData = false

  constructor(private service: CountdownService) {
    this.hasData = this.service.hasData()
  }

  refresh() {
    this.hasData = true
  }

  title = 'natural-cycles-countdown'
}
