import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Alert } from '../../shared/interfaces'
import { UsersService } from '../../shared/users.service'
import {Router, RouterOutlet} from '@angular/router';

const ALERTS: Alert[] = [
  {type: 'warning', message: 'The user with this email is not in the system'}
]

@Component({
  selector: 'app-recovery-password-page',
  templateUrl: './recovery-password-page.component.html',
  styleUrls: ['./recovery-password-page.component.scss'],
})

export class RecoveryPasswordPageComponent implements OnInit {

  public form !: FormGroup
  alerts: Alert[] = []
  formError = false
  successfullySent = false
  test = 'start'

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
    })
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
          if (user.email !== this.form.value.email) {
            this.formError = true
          } else {
            this.successfullySent = true
          }
        })
      })
  }
}
