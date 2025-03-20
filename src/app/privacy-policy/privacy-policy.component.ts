import { Component } from '@angular/core';

@Component({
    selector: 'app-privacy-policy',
    imports: [],
    template: `<section class="m-10 space-y-2 text-pretty">
        <h2 class="text-center text-2xl font-bold font-coustard">
            Politique de Confidentialité
        </h2>
        <p class="text-center p-2 italic">Dernière mise à jour : 18/03/2025</p>
        <h3 class="font-bold text-xl">1. Introduction</h3>
        <p>
            Nous accordons une grande importance à la protection de votre vie
            privée et de vos données personnelles. Cette politique de
            confidentialité décrit comment nous collectons, utilisons,
            partageons et protégeons les informations que vous nous fournissez
            lorsque vous utilisez notre site web et nos services.
        </p>
        <h3 class="font-bold text-xl">2. Collecte des Données Personnelles</h3>
        <p>
            Nous collectons des informations personnelles vous concernant
            lorsque vous interagissez avec notre site ou nos services. Ces
            informations peuvent inclure, mais sans s'y limiter :
        </p>
        <ul>
            <li>Votre nom</li>
            <li>Votre prénom</li>
            <li>Votre email</li>
            <li>
                Les informations relatives à votre utilisation de notre site,
                telles que l'adresse IP, le type de navigateur, etc.
            </li>
        </ul>
        <h3 class="font-bold text-xl">
            3. Utilisation des données personnelles
        </h3>
        <p>Les informations que nous collectons sont utilisées pour :</p>
        <ul>
            <li>Fournir, exploiter et améliorer nos services</li>
            <li>Communiquer avec vous au sujet de nos services</li>
        </ul>
        <h3 class="font-bold text-xl">4. Partage des Données Personnelles</h3>
        <p>
            Nous ne vendons pas vos données personnelles à des tiers. Cependant,
            nous pouvons partager vos informations avec :
        </p>
        <ul>
            <li>Les autorités légales si cela est requis par la loi</li>
        </ul>
        <h3 class="font-bold text-xl">
            5. Utilisation du LocalStorage pour stocker des informations
        </h3>
        <p>
            Nous utilisons le localStorage pour stocker des informations liées à
            la sécurité lors de votre utilisation de notre site web ou
            application. Nous stockons uniquement des données essentielles à la
            sécurité, telles que : Des jetons de session pour vous identifier.
        </p>
        <p>
            Aucune donnée personnelle sensible, comme des mots de passe ou des
            informations bancaires, n'est stockée.
        </p>
        <h3 class="font-bold text-xl">6. Sécurité des Données</h3>
        <p>
            Nous mettons en œuvre des mesures de sécurité techniques et
            organisationnelles pour protéger vos données personnelles contre
            l'accès non autorisé, l'altération, la divulgation ou la
            destruction. Cependant, aucune méthode de transmission sur Internet
            ou de stockage électronique n'est complètement sécurisée, et nous ne
            pouvons pas garantir une sécurité absolue.
        </p>

        <h3 class="font-bold text-xl">7. Vos Droits</h3>
        <p>
            En vertu de la réglementation applicable, vous disposez de certains
            droits concernant vos données personnelles, y compris :
        </p>
        <ul>
            <li>
                Le droit d'accéder à vos données personnelles que nous détenons
            </li>
            <li>Le droit de rectifier des données inexactes ou incomplètes</li>
            <li>
                Le droit de demander l'effacement de vos données personnelles
            </li>
            <li>
                Le droit de limiter le traitement de vos données personnelles
            </li>
            <li>
                Le droit de vous opposer au traitement de vos données pour des
                motifs légitimes
            </li>
        </ul>
        <h3 class="font-bold text-xl">8. Modifications de cette Politique</h3>
        <p>
            Nous pouvons mettre à jour cette politique de confidentialité de
            temps à autre pour refléter les changements dans nos pratiques ou
            pour d'autres raisons opérationnelles, légales ou réglementaires.
            Nous vous encourageons à consulter régulièrement cette page pour
            rester informé des mises à jour.
        </p>
        <h3 class="font-bold text-xl">9. Contact</h3>
        <p>
            Si vous avez des questions ou des préoccupations concernant cette
            politique de confidentialité ou le traitement de vos données
            personnelles, vous pouvez nous contacter à l'adresse suivante :
        </p>
        <p>contact&#64;billeteriejo.com</p>
    </section>`,
    styles: '',
})
export class PrivacyPolicyComponent {}
