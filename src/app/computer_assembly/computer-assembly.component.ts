import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-computer-assembly',
  templateUrl: './computer-assembly.component.html',
  styleUrls: ['./computer-assembly.component.scss']
})
export class ComputerAssemblyComponent {
  form: FormGroup;
  loading = false;

  constructor(private router: Router, private http: HttpClient) {
    this.form = new FormGroup({
      computerModel: new FormControl('', [Validators.required]),
      delivery: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      deliveryAddress: new FormControl('', [Validators.required]),
      urgent: new FormControl('0', [Validators.required]),
      payment: new FormControl('card', [Validators.required]),
      additionalInfo: new FormControl('')
    });
  }

  submit() {
    this.loading = true;
    this.http.post(
      'http://localhost:8080/api/computer-assembly',
      { ...this.form.value }
    ).subscribe(() => {
      this.loading = false;
      this.returnBack();
    });
  }

  returnBack() {
    this.router.navigate(['/']);
  }
}
