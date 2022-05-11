import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Alert } from '../../shared/interfaces/interfaces'
import { UsersService } from '../../shared/services/users.service'
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import {EventManager} from '@angular/platform-browser';

const ALERTS: Alert[] = [
  {type: 'warning', message: 'User with this email is already registered'}
]

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  public form !: FormGroup
  alerts: Alert[] = []
  formError = false
  showPassword = false

  constructor(
    private usersService: UsersService,
    private router: Router,
    private eventManager: EventManager
  ) {}

  close(alert: Alert) {
    this.formError = false
    this.alerts.splice(this.alerts.indexOf(alert), 1)
  }

  reset() {
    this.alerts = Array.from(ALERTS);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    this.reset()
    if (this.form.invalid) return
    this.fetchUsers()
  }

  fetchUsers() {
    this.usersService.fetchUsers()
      .subscribe(data => {
        let email = data.some(item => item.email === this.form.value.email)

        if (email) {
          this.formError = true
        } else {
          this.addUser()
          localStorage.setItem('userData', JSON.stringify(environment.defaultToken))
          this.router.navigate(['/search'])
        }
      })
  }

  addUser() {
    this.usersService.addUser(this.form.value)
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword
  }
}
