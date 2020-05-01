import { Component } from '@angular/core';
import { CommonService } from '../../services/common.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent {
    isMobile: boolean;
    constructor(service: CommonService) {
        this.isMobile = service.isMobile();
    }
}
