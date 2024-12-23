import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onSubmit(): void {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      (response: any) => {
        console.log("Login successful", response);
        this.loginForm.reset();
        this.router.navigate(['/operations']);
      },
      (error: any) => {
        console.error("Login error", error);
      }
    );
  }
}
