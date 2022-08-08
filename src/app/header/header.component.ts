import { Component } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    constructor(
        private dataStorageService: DataStorageService
    ) {}

    onSaveData() {
        if(confirm('This will erase all the original data in storage. Are you sure you want to go on?')) {
            this.dataStorageService.storeRecipes();
        }
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }
}
