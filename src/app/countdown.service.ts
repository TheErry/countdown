import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class CountdownService {
  save(name: string, date: string): void {
    localStorage.setItem('eventName', name)
    localStorage.setItem('eventDate', new Date(date).toISOString())
  }

  getName(): string | null {
    return localStorage.getItem('eventName')
  }

  getDate(): Date | null {
    const date = localStorage.getItem('eventDate')
    return date ? new Date(date) : null
  }

  hasData(): boolean {
    return !!this.getName() && !!this.getDate()
  }

  clear(): void {
    localStorage.removeItem('eventName')
    localStorage.removeItem('eventDate')
  }

  constructor() {}
}
