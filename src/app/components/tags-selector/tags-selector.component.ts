import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Tag } from 'src/app/interfaces/tag';
import { startWith, map } from 'rxjs/operators';

@Component({
    selector: 'app-tags-selector',
    templateUrl: './tags-selector.component.html',
    styleUrls: ['./tags-selector.component.css']
})
export class TagsSelectorComponent implements OnInit {
    @Output() tagSelected: EventEmitter<string> = new EventEmitter();
    @Input() defaultTag: string;
    myControl = new FormControl();
    filteredTags: Observable<Tag[]>;
    allTags: Tag[];

    constructor(private service: CommonService) { }

    async ngOnInit(): Promise<void> {
        this.allTags = await this.service.getTags();
        this.myControl.setValue({ name: this.defaultTag});
        this.filteredTags = this.myControl.valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'string' ? value : value.name),
                map(tag => tag ? this._filter(tag) : this.allTags.slice())
            );
    }
    updateTag(event) {
        this.tagSelected.emit(event.target.value);
    }
    _filter(name: string): Tag[] {
        const filterValue = name.toLowerCase();

        return this.allTags.filter(tag => tag.name.indexOf(filterValue) === 0);
    }
    displayFn(tag: Tag): string {
        return tag && tag.name ? tag.name : '';
    }

}
