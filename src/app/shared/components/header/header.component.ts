import { NgStyle } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [RouterLink, NgStyle],
    templateUrl: './header.component.html',
    styles: '',
})
export class HeaderComponent {
    isAdmin = true;
    isConnected = true;
    isShow = signal(false);

    showSideMenu() {
        this.isShow.update((value) => !value);
        //a faire fermer le sidemenu quand clic sur un lien
    }
}
