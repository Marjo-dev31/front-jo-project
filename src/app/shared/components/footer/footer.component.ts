import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-footer',
    imports: [RouterLink],
    template: `<footer class="bg-secondary text-center text-sm ">
        <div class="grid grid-cols-1 gap-5 md:grid-cols-7 md:items-center">
            <div class="md:col-start-2">
                <p class="p-2">Siège Social :</p>
                <p>JO Entertainment</p>
                <p>Place de la Flamme</p>
                <p>75000 Paris</p>
            </div>
            <div class="md:col-start-4">
                <ul class="flex items-center justify-center gap-4">
                    <li>
                        <a
                            ><img
                                src="/icon-facebook.svg"
                                alt="Lien vers notre compte Facebook"
                        /></a>
                    </li>
                    <li>
                        <a
                            ><img
                                src="/icon-instagram.svg"
                                alt="Lien vers notre compte Instagram"
                        /></a>
                    </li>
                    <li>
                        <a
                            ><img
                                src="/twitter-x.svg"
                                alt="Lien vers notre compte X"
                        /></a>
                    </li>
                </ul>
            </div>
            <div class="flex flex-col gap-2 md:col-start-6 justify-around">
                <!-- <a href="" class="hover:underline p-2">Nous contacter</a> -->
                <a
                    [routerLink]="['/politiquedeconfidentialite']"
                    class="hover:underline"
                    >Politique de confidentialité</a
                >
                <a
                    [routerLink]="['/conditionsgeneralesdevente']"
                    class="hover:underline"
                    >CGV</a
                >
            </div>
        </div>
        <div class="italic p-4 text-sm hover:underline">
            <a href="https://github.com/Marjo-dev31">MB Project</a>
        </div>
    </footer>`,
    styles: ``,
})
export class FooterComponent {}
