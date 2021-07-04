# Personal Portfolio

### Project Structure

    express_v1                  # root folder
        ├── example-html        # contains mock up html files 
        ├── mockups             # images for page layout
        ├── public              # contains static files such as css and images
        ├── utils               # constains utility functions
        ├── views               # pug files
        ├── app.js              # main express app logic
        ├── data.json           # contains data for protfolio
        ├── package.json          
        └── README.md

### style adjustments

public/css/styles.css

``` css
body{
  ...
  font-family: 'Work Sans', sans-serif;
  ...
  background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/ ... ");
}
...
h1,h2,h3,h4,h5,p{
  font-family: 'Crimson Text', serif;
 }

nav a span {
   ...
   border: 4px solid paleturquoise;
   ...
 }
```

views/layout.pug

```pug
 ...
 link(href='https://fonts.googleapis.com/css?family=Crimson+Text|Work+Sans:400,700', rel='stylesheet')
 ...
```

### How to run
```sh
git clone <repo_link>
cd express_v1
npm install
npm start
```
