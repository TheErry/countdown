import { Component } from '@angular/core'
import { CountdownComponent } from './countdown/countdown.component'

@Component({
  selector: 'app-root',
  imports: [CountdownComponent],
  standalone: true,
  template: `<app-countdown />`,
})
export class AppComponent {}
