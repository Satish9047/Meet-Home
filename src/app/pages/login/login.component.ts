import { ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { LoadingSpinnerComponent } from '../../shared/component/loading-spinner/loading-spinner.component';
import { ToastComponent } from '../../shared/component/toast/toast.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    LoadingSpinnerComponent,
    ToastComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  //login USING AUTHSERVICE FOR LOGIN
  onSubmit() {
    const { email, password } = this.loginForm.value;
    this.isLoading = true;
    this.authService.getLogin(email, password).subscribe({
      next: (resData) => {
        console.log(resData);
        this.isLoading = false;
      },
      error: (errorMessage) => {
        console.log(errorMessage);
        this.isLoading = false;
      },
      complete: () => {
        console.log('complete');
        this.router.navigate(['/']);
      },
    });
  }
}
