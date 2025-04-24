import { Component } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { AutoFontSizeDirective } from './auto-font-size.directive'
import { By } from '@angular/platform-browser'

@Component({
  template: `
    <div class="app-container">
      <p appAutoFontSize>Test text</p>
    </div>
  `,
})
class TestHostComponent {}

describe('AutoFontSizeDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [AutoFontSizeDirective],
    }).compileComponents()

    fixture = TestBed.createComponent(TestHostComponent)
    fixture.detectChanges()
  })

  it('should create the directive and attach to element', () => {
    const el = fixture.debugElement.query(By.directive(AutoFontSizeDirective))
    expect(el).toBeTruthy()
  })

  it('should apply font-size style on element', () => {
    const el = fixture.debugElement.query(By.css('p'))
    const style = getComputedStyle(el.nativeElement)
    expect(style.fontSize).toBeTruthy()
  })

  it('should find .app-container as parent', () => {
    const directiveInstance = fixture.debugElement
      .query(By.directive(AutoFontSizeDirective))
      .injector.get(AutoFontSizeDirective)
    const container = (directiveInstance as any).findAppContainer()
    expect(container?.classList.contains('app-container')).toBeTrue()
  })
})
