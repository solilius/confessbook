import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ConfessionsService } from '../../services/confessions.service';
import { CommonService } from '../../services/common.service';
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

    constructor(private fb: FormBuilder, private confessionsService: ConfessionsService, private commonService: CommonService, private router: Router) {
        this.initForm();
    }
    async ngOnInit(): Promise<any> {
        this.loginForm.controls['username'].setValue(localStorage.getItem('username'));
        try {
            const res = await this.commonService.getAppData();
            this.appName = res.name;
        } catch (error) {
            console.log(error);
        }
    }

    initForm() {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.minLength(3)]
        });
    }

    async login() {
        try {
            this.commonService.setSpinnerMode(true);
            await this.commonService.login(this.loginForm.value);
            localStorage.setItem('username', this.loginForm.get('username').value);
            this.router.navigateByUrl('/manager/main');
        } catch (error) {
            Swal.fire({
                title: '!You Shall Not Pass',
                text: 'ההזדהות נכשלה',
                icon: 'warning',
                confirmButtonText: 'אוקיי'
            })
        }
        this.commonService.setSpinnerMode(false);

    }
}
