import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [RouterLink, NgStyle],
    templateUrl: './header.component.html',
    styles: '',
})
export class HeaderComponent {
    isAdmin = false;
    isConnected = false;
    isShow = false;

    showSideMenu() {
        this.isShow = !this.isShow;
        //a faire fermer le sidemenu quand clic sur un lien
    }
}
