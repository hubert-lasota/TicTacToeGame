export default class View {
  $ = {};
  $$ = {};

  constructor() {
    this.$.menu = this.#qs("#menu");
    this.$.menuItems = this.#qs("#menu-items");
    this.$.menuBtn = this.#qs("#menu-btn");
    this.$.resetBtn = this.#qs("#reset-btn");
    this.$.newRoundBtn = document.querySelector("#new-round-btn");
    this.$.modal = this.#qs("#modal");
    this.$.modalText = this.#qs("#modal-text");
    this.$.modalBtn = this.#qs("#modal-btn");
    this.$.turn = this.#qs("#turn");

    this.$$.squares = this.#qsAll(
      "#square-1, #square-2, #square-3, #square-4, #square-5, #square-6, #square-7, #square-8, #square-9"
    );

    this.$.menuBtn.addEventListener("click", (event) => {
      this.#toggleMenu();
    });
  }

  bindGameResetEvent(handler) {
    this.$.resetBtn.addEventListener("click", handler);
    this.$.modalBtn.addEventListener("click", handler);
  }

  bindNewRoundEvent(handler) {
    this.$.newRoundBtn.addEventListener("click", handler);
  }

  bindPlayerMoveEvent(handler) {
    this.$$.squares.forEach((square) => {
      square.addEventListener("click", () => handler(square));
    });
  }


  handlePlayerMove(squareElement, player) {
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", player.iconClass, player.colorClass);
    squareElement.replaceChildren(icon);
  }

  setTurnIndictor(player) {
    const icon = document.createElement("i");
    const label = document.createElement("p");

    icon.classList.add("fa-solid", player.iconClass, player.colorClass);
    
    label.classList.add(player.colorClass);
    label.innerText = `${player.name}, you're up!`;
   
    this.$.turn.replaceChildren(icon, label);
  }
  
  clearMoves() {
    this.$$.squares.forEach(square => square.replaceChildren())
  }

  openModal(message) {
    this.$.modalText.innerText = message;
    this.$.modal.classList.remove("hidden");
  }

  closeModal() {
    this.$.modal.classList.add("hidden");
  }

  #toggleMenu() {
    this.$.menuItems.classList.toggle("hidden");
    this.$.menuBtn.classList.toggle("border");

    const icon = this.$.menuBtn.querySelector("i");
    icon.classList.toggle("fa-chevron-down");
    icon.classList.toggle("fa-chevron-up");
  }

  #qs(selector, parent) {
    const element = parent
      ? parent.querySelector(selector)
      : document.querySelector(selector);

    if (!element) throw new Error("Could not find element");

    return element;
  }

  #qsAll(selectors, parent) {
    const elements = parent
      ? parent.querySelectorAll(selectors)
      : document.querySelectorAll(selectors);

    if (!elements) throw new Error("Coulnd not find elements");
    return elements;
  }
}
