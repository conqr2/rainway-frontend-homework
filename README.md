# rainway-frontend-homework

## Credits
- Controller body is a skin image from https://www.xtremeskins.co.uk/products/xbox-one-s-controller-skins
- Uses Create-React-App
- Borrowed a few colors from https://play.rainway.com thanks your ui design is actually pretty good

## Running:

### Server
1. Clone the rpo
2. Navigate into the directory
3. Navigate into the `server` directory
4. Install the `websockets` dependency using `pip3 install websockets` (`sudo pip3 install websockets` for Mac users)
5. Run the server with `python3 server.py localhost [port]`, with `[port]` being any available non-reserved port (I used port `8382`)
6. Profit?!

### Webapp
1. Clone the repo
2. Navigate into the directory
3. Install dependencies with `npm i`
4. Run the app with `npm start`, if you are prompted for permission to access your web browser please allow so
5. If you haven't been taken to `localhost:3000` within 1 minute, navigate there manually
6. In the URL input (top left), enter `ws://localhost:[port]`, with `[port]` being the port you selected above in the server setup
7. Press connect
8. If it throws a timeout or connection error make sure you have the right URL
9. On the below controller, the buttons press and the thumbsticks move
10. To disconnect, press disconnect (required to change the URL)
