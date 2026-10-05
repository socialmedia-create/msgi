# Club Website - Premium HTML/CSS Template

A modern, premium club website built with HTML5 and CSS3 featuring:
- Parallax scrolling effects
- Smooth animations and transitions
- Responsive design for all devices
- Clean, minimal aesthetic
- Interactive elements

## Features

- **Hero Section** with parallax background and call-to-action
- **About Us** section with image and text
- **Events Grid** showcasing upcoming events with hover effects
- **Photo Gallery** with hover overlays
- **Contact Form** with validation styling
- **Footer** with social media links
- **Responsive Design** - works on mobile, tablet, and desktop
- **CSS Animations** - fade-in effects on scroll
- **Premium Styling** - gradients, shadows, and modern color scheme

## File Structure

```
CLUB SITE/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styling including parallax effects
├── js/
│   └── script.js       # Interactive elements and animations
├── images/             # Place for your images (add your own)
└── README.md           # This file
```

## Setup Instructions

1. **Replace placeholder images**:
   - Add your own images to the `images/` folder
   - Update the `src` attributes in `index.html` to point to your images
   - Key images to replace:
     - Hero background (currently using Unsplash placeholder)
     - About section image (`images/about.jpg`)
     - Gallery images (`images/gallery1.jpg` through `images/gallery4.jpg`)

2. **Customize content**:
   - Edit text in `index.html` to match your club's information
   - Update club name, event details, contact information, etc.
   - Modify colors in `css/styles.css` if needed (look for `--primary-color` variables or search for color values)

3. **Customize styling** (optional):
   - The main color scheme uses gradients from purple to blue (`#6a11cb` to `#2575fc`)
   - Secondary colors use teal/green (`#11998e` to `#38ef7d`)
   - To change colors, update the hex values in `styles.css`

4. **Test locally**:
   - Open `index.html` in your web browser to view the site
   - For best results, use a local server (like Live Server in VS Code) to avoid CORS issues

## Parallax Effect

The parallax effect is implemented in the hero section using:
```css
background-attachment: fixed;
```
This creates a smooth parallax scrolling effect where the background moves at a different speed than the foreground content.

## Customization Tips

### Colors
- Primary gradient: `#6a11cb` to `#2575fc` (purple to blue)
- Secondary gradient: `#11998e` to `#38ef7d` (teal to green)
- To change: Search for these hex values in `styles.css` and replace them

### Fonts
- Uses system fonts: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- To use Google Fonts: Add link in `<head>` and update `font-family` in CSS

### Images
- All images should be optimized for web use
- Recommended sizes:
  - Hero background: 1920x1080px or larger
  - About image: 800x600px
  - Gallery images: 800x600px (will be cropped to 280px height in grid)

## Browser Support

This website works in all modern browsers:
- Chrome, Firefox, Safari, Edge
- Mobile browsers (iOS Safari, Android Chrome)
- Graceful degradation in older browsers

## Credits

- Icons: Font Awesome 6 ([fontawesome.com](https://fontawesome.com))
- Background image placeholder: Unsplash ([unsplash.com](https://unsplash.com))
- Design inspiration: Modern web design trends

## License

Feel free to use and modify this template for your club or personal projects.