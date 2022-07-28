import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    name = 'William';
    showPass = false;
    numClicks = 0;
    clicks: number[] = [];

    showSecretPass() {
        this.showPass = !this.showPass;
        this.numClicks++;
        this.clicks.push(this.numClicks);
    }
}
