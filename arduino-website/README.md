# Arduino Hub (Static Site)

Modern, responsive website for electronics and Arduino projects. Includes sections for Projects, Components, Tutorials, and Contact.

## Structure
- `index.html`: Home with hero and featured projects
- `projects.html`: Project listings with difficulty filters
- `components.html`: Sensors, Motors, and Modules with specs
- `tutorials.html`: Step-by-step guides
- `contact.html`: Contact form with client-side validation
- `assets/css/styles.css`: Styling and responsive layout
- `assets/js/main.js`: Navigation, filters, animations, form handler

## Run locally
- Option 1: Open `index.html` directly in a browser (works for most features)
- Option 2: Serve via a local server for best results

```bash
# Python 3
python3 -m http.server 5173 --directory ./
# Then open: http://localhost:5173/arduino-website/
```

## Customize
- Update colors and typography in `assets/css/styles.css`
- Add or edit projects/components/tutorials by modifying the respective HTML files
- Replace Unsplash images with your own assets if preferred

## License
MIT — for educational purposes.