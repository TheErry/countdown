import { Component, OnInit, OnDestroy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { AutoFontSizeDirective } from '../auto-font-size.directive'

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule, FormsModule, AutoFontSizeDirective],
  templateUrl: './countdown.component.html',
})
export class CountdownComponent implements OnInit, OnDestroy {
  eventName = ''
  eventDate = ''
  countdownText = ''
  private intervalId: any

  get hasData(): boolean {
    return !!this.eventName && !!this.eventDate
  }

  ngOnInit() {
    const savedName = localStorage.getItem('eventName')
    const savedDate = localStorage.getItem('eventDate')
    if (savedName) this.eventName = savedName
    if (savedDate) {
      this.eventDate = savedDate
      this.startCountdown()
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId)
  }

  onChange() {
    if (this.eventName && this.eventDate) {
      localStorage.setItem('eventName', this.eventName)
      localStorage.setItem('eventDate', this.eventDate)
      this.startCountdown()
    }
  }

  startCountdown() {
    clearInterval(this.intervalId)

    const targetDate = new Date(this.eventDate)
    targetDate.setHours(0, 0, 0, 0)

    const update = () => {
      const now = Date.now()
      const dist = targetDate.getTime() - now

      if (dist <= 0) {
        this.countdownText = '0 days, 0 h, 0 m, 0 s'
        clearInterval(this.intervalId)
        return
      }

      const d = Math.floor(dist / (1000 * 60 * 60 * 24))
      const h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60))
      const s = Math.floor((dist % (1000 * 60)) / 1000)

      this.countdownText = `${d} days, ${h} h, ${m} m, ${s} s`
    }

    update()
    this.intervalId = setInterval(update, 1000)
  }
}
