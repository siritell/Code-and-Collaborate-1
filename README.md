# Code-and-Collaborate-1

# TrendWear — Mobile-First Clothing Store Landing Page

## Project Overview

TrendWear is a local clothing brand stepping into the digital world. This project was developed as a group assignment at **Hyper Island** by a team of 6 Frontend Development students.

The goal was to design and build a **mobile-first landing page** where users can browse clothing items, spot sales and promotions at a glance, and save their favorite products — all through a clean, intuitive interface tailored for fashion-conscious mobile shoppers.

The project followed a full UX process: from research and survey analysis, through wireframing, to a working HTML/CSS/JS prototype — with usability testing and iteration built in.

## Features

- **Product Browsing** — Scrollable product listing with card-based layout optimized for mobile
- **Sale & Promotion Highlights** — Visual sale tags, before/after pricing, and promotional banners that stand out without cluttering the page
- **Add to Favorites** — Heart icon interaction with instant visual feedback, allowing users to save items to a personal favorites list
- **Favorites Page** — Dedicated page to view and manage all saved favorite products
- **Product Detail Page** — Individual product view with image slider, accordions for size/material/description, and the ability to add an item to the bag
- **Shopping Bag** — Persistent cart system where users can add products, adjust quantities, remove items, and review their bag on a dedicated page
- **Filters & Load More** — Buttons allow filtering the grid for sale/new items and progressively loading more products
- **Responsive Design** — Mobile-first approach with support for tablet and desktop viewports
- **Touch-Friendly UI** — Large tap targets and intuitive interactions designed for mobile users

## Key Functionality

| Feature                 | Description                                                                                                                 |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Product Cards           | Displays product image, name, price, sale/discount label, and a favorites button                                            |
| Favorites Toggle        | Clicking the heart icon instantly updates the icon state and saves the item                                                 |
| Sale Indicators         | Bright discount badges and crossed-out original prices for easy comparison                                                  |
| Filter & Load More      | Sale/new filter buttons and a "load more" control let users narrow results and reveal more items without a full page reload |
| Product Detail Page     | Slider for multiple images, accordion sections for size/material/description, favorites toggle, and add-to-bag control      |
| Shopping Bag Management | Cart page shows added items with quantities, prices, removal controls, and persists data via localStorage                   |
| Category Navigation     | Clear menu categories and filters (size, price, color) for quick discovery                                                  |
| Responsive Layout       | CSS media queries ensure the layout adapts seamlessly across devices                                                        |
| Smooth Scrolling        | Optimized infinite/lazy loading for a smooth mobile browsing experience                                                     |

## Tech Stack

| Technology           | Purpose                                                     |
| -------------------- | ----------------------------------------------------------- |
| HTML5                | Semantic page structure                                     |
| CSS3                 | Styling, animations, responsive layout (mobile-first)       |
| JavaScript (Vanilla) | Favorites interaction, DOM manipulation, dynamic UI updates |
| Figma                | Wireframing and UI design                                   |
| Typeform             | UX survey and user research                                 |
| Notion / Trello      | Kanban board for project management                         |

## UX Research

We conducted a UX survey to guide our design decisions. Key findings:

- **Clean, minimal layout** was the top priority for a good scrolling experience
- Users expect to see **price, sale labels, and product images** at a glance on product cards
- **Price comparisons** (before/after) and **small discount badges** were preferred over large banners
- **Pop-ups and repeating promotions** were the biggest sources of frustration
- Users expect the **favorite icon to change instantly** upon interaction
- **Clear menu categories** and a **visible search bar** are essential for first-time navigation

These insights directly shaped our card design, promotion styling, and favorites interaction patterns.

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Because the app fetches `products.json`, it should be served over HTTP. You can simply open `index.html` with a light local server (e.g. `npx serve`, `python -m http.server`, or the Live Server extension).
3. Navigate to `index.html` in your browser and start exploring the landing page, product detail view, favorites, and shopping bag — no additional build tools are required.

## License

This project was created for educational purposes as part of the Hyper Island Frontend Developer program.
