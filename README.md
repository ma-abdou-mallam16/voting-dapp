# Dapp Voting

    ## Pour la correction :

    Lien vidéo :

    Lien Déploiement : 

    Déployé sur Sepolia

    Groupe constitué de :

    Abdou Mallam Mahamadou Aminou
    
    Arnaud Clary

    ## Détails

        ### Contract :

        La faille a été corrigé comme suit :

        ### Sécurité et bonnes pratiques :

            - Vérification de limites et gestion des dépassements : dans 'tallyVotes()'.

            - Vérification si 'proposalsArray' n'est pas vide avant de faire des itéations dessus pour éviter les débordements.

            - Gestion des erreurs : utiliser des énumérations plutôt que des chaînes pour les états de worflow. Les énumérations sont plus sûres et moins coûteuses en gaz.

        Au niveau de la bonne pratique nous avons fait ceci :

        ### Optimisation des coûts de gaz :
            
            - Utilisation de 'bytes32' pour le stockage des descriptions de proposition : cela réduit la consommation de gaz car les comparaisons de 'bytes32' sont moins coûteuses que celles des chaînes de caractères.

            - DOS_GAS_LIMIT : dans "tallyVotes", si n'y a pas beaucoup de propositions, la mémoire se fige car le coût de la fonction est limité pour l'exécution.
            
            - Utilisation de 'mapping' pour stocker les propositions : remplacer 'proposalsArray' par un mapping de type 'mapping(uint =>Proposal) proposals;'. Cela permet un accès plus efficace aux propositions par leur ID.

        ### Front 

        Voici la liste de la stack utilisée pour la réalisation du projet :

        - Frontend : NextJS - Chakra-UI
        - Banckend : Hardhat - Wagmi - Viem - Rainbowkit - openzepplin
        - Réseaux : Sepolia - Hardhat
        - Wallet : MetaMask

    ## Structure du projet :

    /voting-dapp
    |-- /frontend
    |   |-- /app
    |       |-- /admin
    |           |-- page.js
    |       |-- /hooks
    |           |-- useVoting.js
    |       |-- /proposal
    |           |-- page.js
    |       |-- /providers
    |           |-- VotingProvider.js
    |       |-- layout.js
    |       |-- page.js
    |   |-- /components
    |       |-- /Admin
    |           |-- AdminComponent.js
    |           |-- Popup.js
    |       |-- /Contract
    |           |-- Contract.js
    |       |-- /Disconnected
    |           |-- Disconnected.js
    |       |-- /Footer
    |           |-- Footer.js
    |       |-- /Header
    |           |-- Header.js
    |       |-- /Popup
    |           |-- Popup.js
    |       |-- /Proposals
    |           |-- Proposals.js
    |       |-- /Sidebar
    |           |-- Sidebar.js
    |       |-- /Voters
    |           |-- Voters.js
    |       |-- /Voting
    |           |-- Voting.js
    |       |-- /WorkflowStatus
    |           |-- WorkflowStatus.js
    |   |-- /constants
    |       |-- index.js
    |   |-- /public
    |       |-- next.svg
    |       |-- vercel.svg
    |   |-- .env
    |   |-- .gitignore
    |   |-- jsconfig.json
    |   |-- next.config.js
    |   |-- package.json
    |   |-- README.md
    |   |-- yarn.lock
    |-- /hardhat
    |   |-- /contracts
    |       |-- Voting.sol
    |   |-- /scripts
    |       |-- deploy.js
    |   |-- .env
    |   |-- .gitignore
    |   |-- hardhat.config.js
    |   |-- package.json
    |   |-- README.md
    |   |-- yarn.lock
    |-- README.md
