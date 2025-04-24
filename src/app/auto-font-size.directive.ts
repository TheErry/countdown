import {
  Directive,
  ElementRef,
  Renderer2,
  AfterViewInit,
  OnDestroy,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core'

@Directive({
  selector: '[appAutoFontSize]',
  standalone: true,
})
export class AutoFontSizeDirective
  implements AfterViewInit, OnDestroy, OnChanges
{
  @Input() appAutoFontSize: string | number = ''

  private resizeObserver!: ResizeObserver

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.resizeText()
      this.observeResize()
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appAutoFontSize']) {
      this.resizeText()
    }
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
    }
  }

  private observeResize(): void {
    const container = this.findAppContainer()
    if (!container) return

    this.resizeObserver = new ResizeObserver(() => {
      if (this.el?.nativeElement?.isConnected) {
        this.resizeText()
      }
    })
    this.resizeObserver.observe(container)
  }

  private resizeText(): void {
    const element = this.el.nativeElement as HTMLElement
    const container = this.findAppContainer()
    if (!element || !container) return

    this.renderer.setStyle(element, 'white-space', 'nowrap')
    this.renderer.setStyle(element, 'display', 'inline-block')

    let min = 10
    let max = 300
    let fontSize = max

    const style = window.getComputedStyle(container)
    const paddingX =
      parseFloat(style.paddingLeft || '0') +
      parseFloat(style.paddingRight || '0')
    const paddingY =
      parseFloat(style.paddingTop || '0') +
      parseFloat(style.paddingBottom || '0')

    const maxWidth = container.clientWidth - paddingX
    const maxHeight = container.clientHeight - paddingY

    while (min <= max) {
      const mid = Math.floor((min + max) / 2)

      this.renderer.setStyle(element, 'font-size', `${mid}px`)

      const isTooBig =
        element.scrollWidth > maxWidth || element.scrollHeight > maxHeight

      if (isTooBig) {
        max = mid - 1
      } else {
        fontSize = mid
        min = mid + 1
      }
    }

    if (element) {
      this.renderer.setStyle(element, 'font-size', `${fontSize}px`)
    }
  }

  private findAppContainer(): HTMLElement | null {
    let parent = this.el.nativeElement.parentElement
    while (parent && !parent.classList.contains('app-container')) {
      parent = parent.parentElement
    }
    return parent
  }
}
