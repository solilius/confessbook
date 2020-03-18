import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ConfessionsService } from '../../services/confessions.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    appName: string

    constructor(private fb: FormBuilder, private service: ConfessionsService, private router: Router) {
        this.initForm();
    }
    ngOnInit(): void { 
        this.loginForm.controls['username'].setValue(localStorage.getItem('username'));
        this.appName = environment.appName;
    }

    initForm() {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.minLength(3)]
        });
    }

    login() {
        this.service.login(this.loginForm.value).subscribe((res)=> {
            localStorage.setItem('username', this.loginForm.get('username').value);
            this.router.navigateByUrl('/manager');
        }, (err) => {
            Swal.fire({
                title: '!You Shall Not Pass',
                text: 'ההזדהות נכשלה',
                icon: 'warning',
                confirmButtonText: 'אוקיי'
            })
        });
    }
}
