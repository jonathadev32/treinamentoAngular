import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { ALERT_MESSAGE } from '../../../enums/erro-mensagem.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading: boolean = false;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private authService: AuthService,
    private toaster: ToastrService
  ) {
    localStorage.removeItem('access_token');
  }

  ngOnInit() {
    const html = document.getElementsByTagName('html')[0];
    html.classList.add('login');
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('bg-login');
  }
  ngOnDestroy() {
    const html = document.getElementsByTagName('html')[0];
    html.classList.remove('login');
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('bg-login');
  }

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  public onSubmit() {
    if (this.form.valid) {
      this.loading = true;
      this.authService.signIn(this.form.value).subscribe(
        (result: any) => {
          this.loading = false;

          this.form.reset();
          this.toaster.success(ALERT_MESSAGE.SUCCESS_SIGNIN, '', {
            timeOut: 2000,
          });
        },
        (error) => {
          this.loading = false;
          this.toaster.error(ALERT_MESSAGE.ERROR_SIGNIN, '', {
            timeOut: 2000,
          });
        }
      );
    } else {
      this.loading = false;
      this.toaster.warning('Preencha todos os campos', '', {
        timeOut: 2000,
      });
    }
  }
}
