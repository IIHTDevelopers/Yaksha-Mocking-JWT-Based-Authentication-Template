import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // Trigger change detection to render the template
  });

  describe('boundary', () => {
    it('should create the HomeComponent', () => {
      expect(component).toBeTruthy();  // Ensure the component is created successfully
    });

    it('should display the correct title in the HTML', () => {
      const compiled = fixture.nativeElement;  // Get the native DOM element
      expect(compiled.querySelector('h2').textContent).toContain('Welcome to the Home Page!');  // Check the h2 text content
    });

    it('should display the correct description in the HTML', () => {
      const compiled = fixture.nativeElement;  // Get the native DOM element
      expect(compiled.querySelector('p').textContent).toContain('Click on the Login button to get started.');  // Check the p text content
    });
  });
});
