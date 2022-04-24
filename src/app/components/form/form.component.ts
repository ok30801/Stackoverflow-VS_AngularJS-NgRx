import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Alert } from '../../shared/interfaces'
import { UsersService } from '../../shared/users.service'
import { Router } from '@angular/router';


const ALERTS: Alert[] = [
  {type: 'warning', message: 'Incorrect email or password'}
]

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  // @ts-ignore
  form: FormGroup
  checked = false
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
  }

  // getErrorMessage(control: string) {
  //
  //   if (control === 'email' && this.email.hasError('required')) {
  //     return 'Укажите Ваш Email';
  //   }
  //   if (control === 'password' && this.password.hasError('required')) {
  //     return 'Введите пароль';
  //   }
  //   return this.email.status === 'INVALID' || this.password.status === 'INVALID'
  //     ? 'Пожалуйста, введите корректные данные'
  //     : '';
  // }

  submit() {
    this.reset()
    if (this.form.invalid) return

    if (this.checked) {
      localStorage.setItem('userData', JSON.stringify(this.form.value))
    }
    this.fetchUsers()
    console.log('this.form', this.form.value)
  }

  fetchUsers() {
    this.usersService.fetchUsers()
      .subscribe(users => {
        users.forEach(user => {
          if (user.email !== this.form.value.email || user.password !== this.form.value.password) {
            this.formError = true
          } else {
            this.router.navigate(['/search'])
          }
        })
      })
  }

  handleChecked() {
    this.checked = !this.checked
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword
  }
}
