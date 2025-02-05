export class UsersController {
  items = [];

   constructor(host) {
      this.host = host;
      this.host.addController(this);
   }

   async hostConnected() {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      this.items = await res.json();
      this.host.requestUpdate();
   }
}