import { Component, OnInit, DoCheck } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../services/users.services';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit , DoCheck{
  public email: string = '';
  public pass: string = '';
  public errors: string;
  public errorsRegister: string;

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    public _authService: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router,
    public formBuilder:FormBuilder
  ) {
      this.loginForm = this.formBuilder.group({
        email:['',[Validators.required,Validators.pattern(/\S+@\S+\.\S+/)]],
        password:['',[Validators.required,Validators.minLength(7)]],
      });

      this.registerForm = this.formBuilder.group({
        name:['',[Validators.required,Validators.pattern("[a-zA-Z]+")]],
        email:['',[Validators.required,Validators.pattern(/\S+@\S+\.\S+/)]],
        password:['',[Validators.required,Validators.minLength(7)]],
      });
     }

  ngOnInit() {
  }

  ngDoCheck() {
    this.errorsRegister = this._authService.errorsRegistre;
  }


async onRegister(){
    const user = await this._authService.createUser(this.registerForm.value);
   if (this.errorsRegister) {
    this.errorsRegister = this._authService.errorsRegistre;
    this.errorsRegister = 'Error al crear usuario'
   }
}

  onLoginMail(): void {
    this._authService
      .loginEmailUser(this.loginForm.value)
      .then(res => {
        this.router.navigate(['carta']);
      })
      .catch((err) => {
        console.log('err', err);
        this.errors = err.message;
        this.errors = 'Email o contraseña incorrecto!';
      });
  }
  
  onLoginGoogle(): void {
    this._authService
      .loginGoogleUser()
      .then(res => {
        console.log('Respuesta:', res);
         this.router.navigate(['carta']);
         setTimeout(() => {
           location.reload();
        }, 0.1);
      })
      .catch((err) => {
        console.log('err', err);
        this.errors = err.message;
      });
  }

  onLoginFacebook(): void {
    this._authService
      .loginFacebookUser()
      .then(res => {
        this.router.navigate(['carta']);
      })
      .catch(err => console.log('err', err));
  }
}
