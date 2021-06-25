import React from 'react';
import './../App.css';
import HeaderComponent from './Header';
import FooterComponent from './Footer';

export default function UserInterface() {

    return(
        <>
        <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.2/css/bulma.min.css"></link>
        </head>
        
        <HeaderComponent />
        <div class="card menu">
            <div class="card exercice-title subtitle">
                Titre
            </div>
            <div class="exercice-content">
                Lorem ipsum leo risus, porta ac consectetur ac, vestibulum at eros. Donec id elit non mi porta gravida at eget metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras mattis consectetur purus sit amet fermentum.
            </div>
        </div>
      
        <div id="contenu">
        </div>
        <FooterComponent />
        </>
    );
}