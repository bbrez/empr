import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminEmpresasPage } from './admin-empresas.page';

describe('AdminEmpresasPage', () => {
  let component: AdminEmpresasPage;
  let fixture: ComponentFixture<AdminEmpresasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminEmpresasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
