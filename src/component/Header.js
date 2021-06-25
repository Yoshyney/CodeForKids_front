import React from 'react';
import './../App.css';

export default function HeaderComponent() {
    return(
        <>
        <div id="header">
            <p class="title logo">Code For Kids</p>
            <button class="button is-rounded is-light btn-header">
                Connexion
            </button>
        </div>
        </>
    );
}