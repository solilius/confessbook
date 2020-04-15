import { Component, OnInit } from '@angular/core';
import { SchedulersService } from '../../../../services/schedulers.service';
import { FacebookPostsService } from '../../../../services/facebook-posts.service';
import { Scheduler } from '../../../../models/scheduler/scheduler.module'
import { Confession } from 'src/app/models/confession/confession.module';
import { SchedulerAddComponent } from '../scheduler-add/scheduler-add.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-scheduler',
    templateUrl: './scheduler.component.html',
    styleUrls: ['./scheduler.component.css']
})

export class SchedulerComponent implements OnInit {
    schedulers: Scheduler[];
    posts: Confession[];

    constructor(private SchedulersService: SchedulersService, private FacebookPostsService: FacebookPostsService, public dialog: MatDialog) {
        this.schedulers = [];
        this.posts = [];

    }
    async ngOnInit(): Promise<any> {
        try {
            this.schedulers = await this.SchedulersService.getSchedulers();
            this.posts = await this.FacebookPostsService.getPosts();

        } catch (error) {
            Swal.fire({
                title: 'אופס',
                text: error.error.message,
                icon: 'warning',
                confirmButtonText: 'אוקיי'
            });
        }
    }

    createScheduler() {
        const dialogRef = this.dialog.open(SchedulerAddComponent, {
            width: '27vw',
            data: { scheduler: {} }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.schedulers.push(result);
            }
        });
    }

    removeScheduler(id: string) {
        this.schedulers = this.schedulers.filter(scheduler => scheduler._id !== id);
    }

    removePost(id: string) {
        this.posts = this.posts.filter(post => post._id !== id);
    }

    lastItemClicked(id) {
        if (id === this.posts[this.posts.length - 1]._id) {
            const objDiv = document.getElementById("posts-list");
            objDiv.scrollTop = objDiv.scrollHeight;
        }
    }
}