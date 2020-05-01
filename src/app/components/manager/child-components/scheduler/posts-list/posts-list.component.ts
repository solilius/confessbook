import { Component, OnInit } from '@angular/core';
import { FacebookPostsService } from '../../../../../services/facebook-posts.service';
import { CommonService } from '../../../../../services/common.service';
import { Confession } from 'src/app/models/confession/confession.module';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-posts-list',
    templateUrl: './posts-list.component.html',
    styleUrls: ['./posts-list.component.css']
})

export class PostsListComponent implements OnInit {
    posts: Confession[];
    isMobile: boolean;
    
    constructor( private facebookPostsService: FacebookPostsService, private commonService:CommonService) {
        this.posts = [];
    }

    async ngOnInit(): Promise<any> {
        try {
            this.posts = await this.facebookPostsService.getPosts();
            this.isMobile = this.commonService.isMobile();

        } catch (error) {
            Swal.fire({
                title: 'אופס',
                text: error.error.message,
                icon: 'warning',
                confirmButtonText: 'אוקיי'
            });
        }
    }

    removePost(id: string) {
        console.log("qwe", id)
        this.posts = this.posts.filter(post => post._id !== id);
    }
}
