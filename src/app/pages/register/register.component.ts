import { AuthService } from './../../core/services/auth.service';
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoadingSpinnerComponent } from '../../shared/component/loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';
import { ToastComponent } from '../../shared/component/toast/toast.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    LoadingSpinnerComponent,
    CommonModule,
    ToastComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;
  error: string | null = null;

  constructor(
    private AuthService: AuthService,
    private router: Router,
  ) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    console.log(this.registerForm);
    const { email, password } = this.registerForm.value;
    this.isLoading = true;
    this.AuthService.getRegister(email, password).subscribe({
      next: (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      error: (errorMessage: string) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
        this.registerForm.reset();
      },
      complete: () => {
        console.log('complete');
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
    });
  }
}
