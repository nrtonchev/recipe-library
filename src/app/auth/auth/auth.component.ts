import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthResponseData, AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  buttonLabel = 'Login';
  signUpForm: FormGroup;
  
  constructor(private route: ActivatedRoute, private authService: AuthService){}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.InitForm();
    });
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmitForm(){
    if(!this.signUpForm.valid){
      return;
    }

    this.error = null;
    
    let email = this.signUpForm.value.authEmail;
    let password = this.signUpForm.value.authPass;
    let authObs: Observable<AuthResponseData>;
    
    this.isLoading = true;
    if(this.isLoginMode){
      authObs = this.authService.login(email, password);
    }
    else{
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe({
      next: (responseData) => {
        console.log(responseData);
        this.isLoading = false;
      },
      error: (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    });
    
    this.signUpForm.reset();
  }

  private InitForm(){
    let email = '';
    let password = '';
    this.signUpForm  = new FormGroup({
      'authEmail': new FormControl(email, [Validators.required, Validators.email]),
      'authPass': new FormControl(password, [Validators.required, Validators.minLength(6)])
    });
  }
}
