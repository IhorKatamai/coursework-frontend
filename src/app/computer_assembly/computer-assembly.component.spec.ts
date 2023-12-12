import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComputerAssemblyComponent } from './computer-assembly.component';

describe('ComputerAssemblyComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [ComputerAssemblyComponent]
  }));

  it('should create component', () => {
    const fixture = TestBed.createComponent(ComputerAssemblyComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
