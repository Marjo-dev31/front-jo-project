import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-footer',
    imports: [RouterLink],
    template: `<footer class="bg-secondary text-center text-sm ">
        <div class="grid grid-cols-1 gap-5 md:grid-cols-3 md:items-center">
            <div>
                <p class="p-2">Siège Social :</p>
                <p>JO Entertainment</p>
                <p>Place de la Flamme</p>
                <p>75000 Paris</p>
            </div>
            <div>
                <ul class="flex items-center justify-center gap-4">
                    <li>
                        <a href=""
                            ><img
                                src="/icon-facebook.svg"
                                alt="Lien vers notre compte Facebook"
                        /></a>
                    </li>
                    <li>
                        <a href=""
                            ><img
                                src="/icon-instagram.svg"
                                alt="Lien vers notre compte Instagram"
                        /></a>
                    </li>
                    <li>
                        <a href=""
                            ><img
                                src="/twitter-x.svg"
                                alt="Lien vers notre compte X"
                        /></a>
                    </li>
                </ul>
            </div>
            <div class="flex flex-col gap-2">
                <a href="" class="hover:underline">Nous contacter</a>
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
