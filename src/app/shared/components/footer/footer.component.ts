import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    imports: [],
    template: `<footer class="bg-secondary text-center text-sm ">
        <div class="grid grid-cols-1 gap-5 md:grid-cols-7 md:items-center">
            <div class="col-start-2">
                <p class="p-2">Siège Social :</p>
                <p>JO Entertainment</p>
                <p>Place de la Flamme</p>
                <p>75000 Paris</p>
            </div>
            <div class="col-start-4">
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
            <div class="flex flex-col gap-2 col-start-6">
                <a href="" class="hover:underline">Nous contacter</a>
                <a href="" class="hover:underline"
                    >Politique de confidentialité - CGV</a
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
