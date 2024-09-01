import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  userDetail: string = 'satish@gmail.com';
  user: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}
  ngOnInit() {
    this.authService.userSubject.subscribe((user) => {
      if (!user) {
        this.router.navigate(['/login']);
      }
      this.user = user;
    });
  }
}
