# Dapp Voting

    ## Pour la correction :

    NOTES : Toute l'architecture du front et du back sont présentent mais nous avons rencontré des erreurs qui, malgré nos efforts, n'ont pas pu être corrigées. Celles-ci incluent : 
    - problèmes pour récupérer des évents. 
    - problème pour changer le workflowStatus (erreur de type unknow) 
    Il semblerait que ça soit un problème pour communiquer directement avec le contrat, nous avons revérifié plusieurs fois l'addresse et l'api de ce dernier, sans succès. 
    L'application bloquant dès les premières phases du processus de vote, nous n'avons pas fait de vidéo pour la présenter... nous nous en excusons, et nous serions extrèmement intéressé de comprendre où étaient les erreurs. 

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
    |            |-- /changeWorflow
    |                |--page.jsx
    |            |-- /registerVoter
    |                |--page.jsx
    |           |-- page.js
    |       |-- /Voter
    |            |-- /add-Proposal
    |                     |--page.jsx
    |            |-- /add-Vote
    |                     |--page.js
    |           |-- page.js
    |       |-- layout.js
    |       |-- page.js
    |   |-- /components
    |       |-- /finished
    |           |-- Page.js
    |       |-- /Footer
    |           |-- gooter.jsx
    |       |-- /Nav-bar
    |           |-- page.jsx
    |       |-- /not-allowed
    |           |-- Page.jsx
    |       |-- /table-proposals
    |           |-- /proposal
    |                |--page.jsx
    |           |--page.jsx
    |       |-- /Welcome-stepper
    |           |-- Page.jsx
    |       |-- /whitelist
    |           |-- /voter-card
    |                |--page.jsx
    |            |--page.jsx
    |       |-- /winning-proposal
    |           |-- page.jsx

    |   |-- /constants
    |       |-- index.js
    |       |-- proposalTable.js
    |       |-- voterTable.js
    |       |-- workflowStatus.js
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
