import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  buttonLabel = 'Login';
  signUpForm: FormGroup;
  subscription: Subscription;
  
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
    
    let email = this.signUpForm.value.authEmail;
    let password = this.signUpForm.value.authPass;
    
    if(this.isLoginMode){

    }
    else{
      this.subscription = this.authService.signUp(email, password)
        .subscribe({
          next: (responseData) => console.log(responseData),
          error: (error) => console.log(error)
        });
    }
    
    this.signUpForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
