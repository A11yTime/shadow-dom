import './style.css'

class MyCard extends HTMLElement {

    #shadow;
  
    constructor() {
      super();
      
      // Attach shadow DOM
      this.#shadow = this.attachShadow({ mode: 'open' });
  
      // Initialize the card's structure
      this.#initializeCard();
      
      // Load CSS asynchronously
      this.#loadCSS();
    }
  
    // Initialize the card structure
    #initializeCard() {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');
  
      const img = document.createElement('img');
      img.setAttribute('class', 'card-image');
  
      const title = document.createElement('h2');
      title.setAttribute('class', 'card-title');
  
      const description = document.createElement('p');
      description.setAttribute('class', 'card-description');
  
      // Populate the card content with attributes
      img.src = this.getAttribute('image');
      title.textContent = this.getAttribute('title');
      description.textContent = this.getAttribute('description');
  
      // Append elements to the card
      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(description);
  
      // Add card structure to the shadow DOM
      this.#shadow.appendChild(card);
    }
  
    // Async function to load CSS dynamically
    async #loadCSS() {
      const style = document.createElement("style");
  
      // Fetch the CSS file
      const response = await fetch("/css/user-card.css");
  
      if (response.ok) {
        // If the CSS file is successfully fetched, load it into the shadow DOM
        style.textContent = await response.text();
        this.#shadow.appendChild(style);
      } else {
        console.error('Failed to load CSS:', response.statusText);
      }
    }
  }
  
  // Define the custom element 'my-card'
  customElements.define('my-card', MyCard);
  