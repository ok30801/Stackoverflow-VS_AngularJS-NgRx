import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Alert } from '../../shared/interfaces/interfaces'
import { UsersService } from '../../shared/services/users.service'
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

const ALERTS: Alert[] = [
  {type: 'warning', message: 'Incorrect email or password'}
]

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})

export class AuthPageComponent implements OnInit {

  form !: FormGroup
  alerts: Alert[] = []
  formError = false
  showPassword = false

  constructor(private usersService: UsersService, private router: Router) {}

  close(alert: Alert) {
    this.formError = false
    this.alerts.splice(this.alerts.indexOf(alert), 1)
  }

  reset() {
    this.alerts = Array.from(ALERTS);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
    if(localStorage.getItem('userData')) {
      this.router.navigate(['/search'])
    }
  }

  submit() {
    this.reset()
    if (this.form.invalid) return
    this.fetchUsers()
  }

  fetchUsers() {
    this.usersService.fetchUsers()
      .subscribe(users => {
        users.forEach(user => {
          if (user.email !== this.form.value.email || user.password !== this.form.value.password) {
            this.formError = true
          } else {
            localStorage.setItem('userData', JSON.stringify(environment.defaultToken))
            this.router.navigate(['/search'])
          }
        })
      })
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword
  }
}
