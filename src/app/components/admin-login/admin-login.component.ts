import { Component } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.state';
import { UserActions } from 'src/app/store/user/user.actions';
import { selectUser } from 'src/app/store/user/user.selector';
import { passwordsMatchValidator } from 'src/app/utilities/pwMatchValidator';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent {
  user$ = this.store.select(selectUser);
  isSignUp = false;
  userForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    isAdmin: [false],
  });

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<IAppState>
  ) {}

  onSubmit(userForm: FormGroup) {
    if (userForm.invalid) return;

    this.isSignUp ? this.signUp(userForm) : this.login(userForm);
  }

  signUp(userForm: FormGroup) {
    const { email, password, repeatPassword, isAdmin } = userForm.value;
    this.store.dispatch(
      UserActions.signUpUser({ email, password, repeatPassword, isAdmin })
    );
    this.userForm.reset();
  }

  login(userForm: FormGroup) {
    const { email, password } = userForm.value;
    console.log(email, password);
    this.store.dispatch(UserActions.loginUser({ email, password }));
    this.userForm.reset();
  }

  toggleSignUp() {
    this.isSignUp = !this.isSignUp;

    if (this.isSignUp) {
      this.userForm.addControl(
        'repeatPassword',
        this.formBuilder.control('', [Validators.required])
      );
      this.userForm.setValidators(passwordsMatchValidator);
      this.userForm
        .get('email')
        ?.setValidators(
          Validators.compose([Validators.required, Validators.email])
        );
      this.userForm
        .get('password')
        ?.setValidators(
          Validators.compose([Validators.required, Validators.minLength(8)])
        );
    } else {
      this.userForm.removeControl('repeatPassword');
      this.userForm.clearValidators();
      this.userForm.get('email')?.setValidators(Validators.required);
      this.userForm.get('password')?.setValidators(Validators.required);
    }

    this.userForm.reset();
  }
}
