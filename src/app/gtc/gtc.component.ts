import { Component } from '@angular/core';

@Component({
    selector: 'app-gtc',
    imports: [],
    template: ` <section class="m-10 space-y-2 text-pretty">
        <h2 class="text-center text-2xl font-bold font-coustard">
            Conditions Générales de Vente (CGV)
        </h2>
        <p class="text-center p-2 italic">Dernière mise à jour : 18/03/2025</p>
        <h3 class="font-bold text-xl">1. Objet</h3>
        <p>
            Les présentes Conditions Générales de Vente (CGV) régissent la vente
            de billets pour des événements proposés sur le site La Billeterie
            des JO.
        </p>
        <h3 class="font-bold text-xl">2. Acceptation des CGV</h3>
        <p>
            Toute commande passée sur le site implique l'acceptation pleine et
            entière des présentes CGV.
        </p>
        <h3 class="font-bold text-xl">3. Prix et Paiement</h3>
        <p>
            Les prix des billets sont indiqués en euros toutes taxes comprises.
        </p>
        <p>
            Le paiement s'effectue en ligne par carte bancaire, PayPal ou tout
            autre moyen disponible sur le Site.
        </p>
        <p>
            Toute commande est ferme et définitive après validation du paiement.
        </p>
        <h3 class="font-bold text-xl">4. Livraison des Billets</h3>
        <p>
            Les billets sont téléchargeables sous format électronique (e-ticket)
            après confirmation du paiement sur votre espace personnel.
        </p>
        <p>
            L'acheteur est responsable de l'impression ou de la présentation du
            billet sur support numérique lors de l'événement.
        </p>
        <h3 class="font-bold text-xl">
            5. Conditions d'Annulation et de Remboursement
        </h3>
        <p>
            Les billets ne sont ni échangeables ni remboursables, sauf en cas
            d'annulation de l'événement par l'organisateur.
        </p>
        <p>
            En cas d'annulation ou de report, les modalités de remboursement
            seront précisées sur le Site.
        </p>
        <h3 class="font-bold text-xl">6. Responsabilités</h3>
        <p>
            Le Site agit en tant qu'intermédiaire et ne peut être tenu
            responsable des modifications ou annulations décidées par
            l'organisateur de l'événement.
        </p>
        <p>
            L'acheteur est responsable de l'utilisation de son billet et ne
            pourra prétendre à un remboursement en cas de perte ou de vol.
        </p>
        <h3 class="font-bold text-xl">7. Accès aux Événements</h3>
        <p>
            L'accès à l'événement est soumis aux règles fixées par
            l'organisateur.
        </p>
        <p>
            Toute personne ne respectant pas ces règles pourra se voir refuser
            l'entrée sans remboursement.
        </p>
        <h3 class="font-bold text-xl">
            8. Protection des Données Personnelles
        </h3>
        <p>
            Les informations collectées lors de l'achat sont utilisées
            uniquement dans le cadre de la gestion des commandes.
        </p>
        <p>
            Conformément à la réglementation en vigueur, l'acheteur dispose d'un
            droit d'accès, de rectification et de suppression de ses données
            personnelles.
        </p>
        <h3 class="font-bold text-xl">9. Droit Applicable et Litiges</h3>
        <p>Les présentes CGV sont soumises au droit [nom du pays].</p>
        <p>
            En cas de litige, une solution amiable sera recherchée avant toute
            action en justice.
        </p>
    </section>`,
    styles: '',
})
export class GtcComponent {}
